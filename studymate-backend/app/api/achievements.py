from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import (
    Achievement,
    NoteHistory,
    Flashcard,
    QuizResult,
    StudyTask,
    UserStats,
)
from app.schemas import AchievementResponse

router = APIRouter(prefix="/achievements", tags=["Achievements"])


# Badge definitions: (code, title, description, condition_function)
def _badge_rules(db: Session, user_email: str):
    notes_count = db.query(NoteHistory).filter(NoteHistory.user_email == user_email).count()
    flashcards_count = db.query(Flashcard).filter(Flashcard.user_email == user_email).count()
    quiz_count = db.query(QuizResult).filter(QuizResult.user_email == user_email).count()
    tasks_done = db.query(StudyTask).filter(
        StudyTask.user_email == user_email, StudyTask.completed == True  # noqa: E712
    ).count()

    return [
        ("first_summary", "First Steps", "Generated your first note summary", notes_count >= 1),
        ("five_summaries", "Note Taker", "Generated 5 note summaries", notes_count >= 5),
        ("first_flashcard_set", "Flashcard Starter", "Created your first flashcard set", flashcards_count >= 1),
        ("ten_flashcards", "Flashcard Pro", "Created 10+ flashcards", flashcards_count >= 10),
        ("first_quiz", "Quiz Rookie", "Completed your first quiz", quiz_count >= 1),
        ("five_quizzes", "Quiz Master", "Completed 5 quizzes", quiz_count >= 5),
        ("first_task_done", "Planner Pro", "Completed your first study task", tasks_done >= 1),
        ("ten_tasks_done", "Consistency King", "Completed 10 study tasks", tasks_done >= 10),
    ]


def check_and_award_achievements(db: Session, user_email: str):
    already_earned = {
        a.code for a in db.query(Achievement).filter(Achievement.user_email == user_email).all()
    }

    newly_earned = []

    for code, title, description, condition_met in _badge_rules(db, user_email):
        if condition_met and code not in already_earned:
            achievement = Achievement(
                user_email=user_email,
                code=code,
                title=title,
                description=description,
            )
            db.add(achievement)
            newly_earned.append(code)

    if newly_earned:
        db.commit()

    return newly_earned


# 🚀 NEW: GET Stats API Endpoint
@router.get("/stats")
def get_user_stats(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    stats = db.query(UserStats).filter(UserStats.user_email == email).first()

    if not stats:
        return {
            "user_email": email,
            "xp": 0,
            "level": 1,
            "study_streak": 0,
            "total_notes": 0,
            "total_flashcards": 0,
            "total_quizzes": 0
        }

    return stats


# 📜 GET Badges List
@router.get("", response_model=list[AchievementResponse])
def get_achievements(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    return (
        db.query(Achievement)
        .filter(Achievement.user_email == email)
        .order_by(Achievement.earned_at.desc())
        .all()
    )