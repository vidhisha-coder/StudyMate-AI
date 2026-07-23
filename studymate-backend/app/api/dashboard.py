from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.database import get_db
from app.auth import get_current_user
from app.models import NoteHistory, Flashcard, QuizResult, StudyTask, Achievement, ChatHistory

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db), email: str = Depends(get_current_user)) -> Dict[str, Any]:
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
    accuracy_rate = 0
    
    if quiz_count > 0:
        total_percent = sum(
            (q.score / q.total_questions * 100) if q.total_questions else 0 for q in quiz_results
        )
        avg_score_percent = round(total_percent / quiz_count, 1)
        accuracy_rate = round(avg_score_percent)

    # Fetch recent quizzes for frontend dynamic table mapping
    recent_quizzes_db = db.query(QuizResult).filter(
        QuizResult.user_email == email
    ).order_by(QuizResult.created_at.desc()).limit(5).all()

    formatted_quiz_history = []
    for q in recent_quizzes_db:
        pct = round((q.score / q.total_questions * 100)) if q.total_questions else 0
        status = "Perfect" if pct == 100 else ("Passed" if pct >= 60 else "Review Needed")
        
        formatted_quiz_history.append({
            "id": f"QZ-{q.id}",
            "title": getattr(q, 'title', 'General Knowledge Quiz'),
            "score": f"{pct}%",
            "correct": f"{q.score}/{q.total_questions}",
            "date": q.created_at.strftime("%d %b %Y") if hasattr(q, 'created_at') and q.created_at else "Recent",
            "time": "10 mins",
            "status": status
        })

    return {
        "avgScore": avg_score_percent,
        "accuracy": accuracy_rate,
        "quizzesAttempted": quiz_count,
        "streak": 7,
        "summaries_created": notes_count,
        "flashcards_created": flashcards_count,
        "chat_messages_sent": chats_count,
        "achievements_earned": achievements_count,
        "study_tasks": {
            "total": total_tasks,
            "completed": completed_tasks,
            "pending": total_tasks - completed_tasks,
        },
        "weekly_progress": [
            {"day": "Mon", "hours": 2, "score": 60},
            {"day": "Tue", "hours": 4, "score": 75},
            {"day": "Wed", "hours": 3, "score": 70},
            {"day": "Thu", "hours": 5, "score": 90},
            {"day": "Fri", "hours": 4, "score": 85},
            {"day": "Sat", "hours": 6, "score": 95},
            {"day": "Sun", "hours": 2, "score": 80},
        ],
        "subjectPerformance": [
            {"subject": "Operating Systems", "score": 88, "color": "bg-indigo-600"},
            {"subject": "Database Systems", "score": 76, "color": "bg-blue-500"},
            {"subject": "Python Data Structures", "score": 92, "color": "bg-emerald-500"},
            {"subject": "Computer Networks", "score": 68, "color": "bg-amber-500"},
        ],
        "recent_quizzes": formatted_quiz_history
    }