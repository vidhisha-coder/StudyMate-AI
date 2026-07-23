import json

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.services.ai_service import ask_claude
from app.database import get_db
from app.auth import get_current_user
from app.models import QuizResult
from app.api.achievements import check_and_award_achievements

router = APIRouter(prefix="/quiz", tags=["Quiz"])


class QuizRequest(BaseModel):
    text: str


class QuizSubmitRequest(BaseModel):
    topic: str = "General"
    score: int
    total_questions: int


@router.post("/generate")
def generate_quiz(data: QuizRequest):
    prompt = f"""
Generate 10 multiple choice questions from the following study material.

Return ONLY valid JSON.

Format:

[
  {{
    "question":"...",
    "options":["A","B","C","D"],
    "answer":"..."
  }}
]

Study Material:

{data.text}
"""

    response = ask_claude(prompt)
    return json.loads(response)


@router.post("/submit")
def submit_quiz_result(
    data: QuizSubmitRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    """Quiz complete hone ke baad frontend ye call karega score save karne ke liye"""
    result = QuizResult(
        user_email=email,
        topic=data.topic,
        score=data.score,
        total_questions=data.total_questions,
    )
    db.add(result)
    db.commit()

    check_and_award_achievements(db, email)

    return {"message": "Quiz result saved"}


@router.get("/history")
def get_quiz_history(db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    return (
        db.query(QuizResult)
        .filter(QuizResult.user_email == email)
        .order_by(QuizResult.created_at.desc())
        .all()
    )