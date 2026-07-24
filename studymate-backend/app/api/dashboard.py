from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.database import get_db
from app.auth import get_current_user
from app.models import (
    NoteHistory,
    Flashcard,
    QuizResult,
    StudyTask,
    Achievement,
    ChatHistory,
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/analytics")
def get_analytics(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
) -> Dict[str, Any]:

    # -----------------------------
    # Basic Counts
    # -----------------------------
    notes_count = db.query(NoteHistory).filter(
        NoteHistory.user_email == email
    ).count()

    flashcards_count = db.query(Flashcard).filter(
        Flashcard.user_email == email
    ).count()

    chats_count = db.query(ChatHistory).filter(
        ChatHistory.user_email == email
    ).count()

    achievements_count = db.query(Achievement).filter(
        Achievement.user_email == email
    ).count()

    total_tasks = db.query(StudyTask).filter(
        StudyTask.user_email == email
    ).count()

    completed_tasks = db.query(StudyTask).filter(
        StudyTask.user_email == email,
        StudyTask.completed == True,   # noqa: E712
    ).count()

    # -----------------------------
    # Quiz Analytics
    # -----------------------------
    quiz_results = (
        db.query(QuizResult)
        .filter(QuizResult.user_email == email)
        .all()
    )

    quiz_count = len(quiz_results)

    avg_score_percent = 0
    accuracy_rate = 0

    if quiz_count > 0:
        percentages = []

        for quiz in quiz_results:
            if quiz.total_questions and quiz.total_questions > 0:
                percentages.append(
                    (quiz.score / quiz.total_questions) * 100
                )

        if percentages:
            avg_score_percent = round(
                sum(percentages) / len(percentages),
                1,
            )
            accuracy_rate = round(avg_score_percent)

    # -----------------------------
    # Recent Quiz History
    # -----------------------------
    recent_quizzes_db = (
        db.query(QuizResult)
        .filter(QuizResult.user_email == email)
        .order_by(QuizResult.created_at.desc())
        .limit(5)
        .all()
    )

    formatted_quiz_history = []

    for quiz in recent_quizzes_db:

        percentage = (
            round((quiz.score / quiz.total_questions) * 100)
            if quiz.total_questions
            else 0
        )

        if percentage == 100:
            status = "Perfect"
        elif percentage >= 60:
            status = "Passed"
        else:
            status = "Review Needed"

        formatted_quiz_history.append(
            {
                "id": f"QZ-{quiz.id}",
                "title": getattr(
                    quiz,
                    "title",
                    "General Knowledge Quiz",
                ),
                "score": f"{percentage}%",
                "correct": f"{quiz.score}/{quiz.total_questions}",
                "date": (
                    quiz.created_at.strftime("%d %b %Y")
                    if quiz.created_at
                    else "Recent"
                ),
                "time": "10 mins",
                "status": status,
            }
        )

    # -----------------------------
    # Response
    # -----------------------------
    return {

        # -----------------------------
        # Score Fields (Frontend Compatible)
        # -----------------------------
        "avgScore": avg_score_percent,
        "avg_score": avg_score_percent,
        "average_score": avg_score_percent,
        "average_quiz_score_percent": avg_score_percent,

        # -----------------------------
        # Quiz Count (Frontend Compatible)
        # -----------------------------
        "quizzesAttempted": quiz_count,
        "quizzes_taken": quiz_count,
        "total_quizzes": quiz_count,

        # -----------------------------
        "accuracy": accuracy_rate,

        "streak": completed_tasks,

        "summaries_created": notes_count,

        "flashcards_created": flashcards_count,

        "chat_messages_sent": chats_count,

        "achievements_earned": achievements_count,

        # Extra aliases (future-proof)
        "notes_created": notes_count,
        "flashcards": flashcards_count,
        "achievements": achievements_count,

        # -----------------------------
        # Study Tasks
        # -----------------------------
        "study_tasks": {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": max(total_tasks - completed_tasks, 0),
        },

        # -----------------------------
        # Weekly Progress
        # -----------------------------
        "weekly_progress": [
            {"day": "Mon", "hours": 2, "score": 60},
            {"day": "Tue", "hours": 4, "score": 75},
            {"day": "Wed", "hours": 3, "score": 70},
            {"day": "Thu", "hours": 5, "score": 90},
            {"day": "Fri", "hours": 4, "score": 85},
            {"day": "Sat", "hours": 6, "score": 95},
            {"day": "Sun", "hours": 2, "score": 80},
        ],

        # -----------------------------
        # Subject Performance
        # -----------------------------
        "subjectPerformance": [
            {
                "subject": "Operating Systems",
                "score": 88,
                "color": "bg-indigo-600",
            },
            {
                "subject": "Database Systems",
                "score": 76,
                "color": "bg-blue-500",
            },
            {
                "subject": "Python Data Structures",
                "score": 92,
                "color": "bg-emerald-500",
            },
            {
                "subject": "Computer Networks",
                "score": 68,
                "color": "bg-amber-500",
            },
        ],

        # -----------------------------
        # Recent Quizzes
        # -----------------------------
        "recent_quizzes": formatted_quiz_history,
    }