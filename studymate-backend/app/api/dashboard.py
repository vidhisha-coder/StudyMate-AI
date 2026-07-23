from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import NoteHistory, Flashcard, QuizResult, StudyTask, Achievement, ChatHistory

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    notes_count = db.query(NoteHistory).filter(NoteHistory.user_email == email).count()
    flashcards_count = db.query(Flashcard).filter(Flashcard.user_email == email).count()
    quiz_results = db.query(QuizResult).filter(QuizResult.user_email == email).all()
    chats_count = db.query(ChatHistory).filter(ChatHistory.user_email == email).count()

    total_tasks = db.query(StudyTask).filter(StudyTask.user_email == email).count()
    completed_tasks = db.query(StudyTask).filter(
        StudyTask.user_email == email, StudyTask.completed == True  # noqa: E712
    ).count()

    achievements_count = db.query(Achievement).filter(Achievement.user_email == email).count()

    quiz_count = len(quiz_results)
    avg_score_percent = 0
    if quiz_count > 0:
        total_percent = sum(
            (q.score / q.total_questions * 100) if q.total_questions else 0 for q in quiz_results
        )
        avg_score_percent = round(total_percent / quiz_count, 1)

    # Recent activity feed — sabhi types ko combine karke latest 5 dikhate hain
    recent_notes = db.query(NoteHistory).filter(NoteHistory.user_email == email).order_by(
        NoteHistory.created_at.desc()
    ).limit(5).all()

    recent_activity = [
        {"type": "summary", "title": n.title, "created_at": n.created_at} for n in recent_notes
    ]
    recent_activity.sort(key=lambda x: x["created_at"], reverse=True)

    return {
        "summaries_created": notes_count,
        "flashcards_created": flashcards_count,
        "quizzes_taken": quiz_count,
        "average_quiz_score_percent": avg_score_percent,
        "chat_messages_sent": chats_count,
        "study_tasks": {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": total_tasks - completed_tasks,
        },
        "achievements_earned": achievements_count,
        "recent_activity": recent_activity[:5],
    }