import json
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import QuizResult
from app.services.ai_service import ask_claude
from app.utils import add_xp
from app.api.achievements import check_and_award_achievements

router = APIRouter(prefix="/quiz", tags=["Quiz"])


class QuizRequest(BaseModel):
    text: str


class QuizSubmitRequest(BaseModel):
    topic: str
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


# 🚀 NEW: Quiz complete submit endpoint (20 XP + Achievements)
@router.post("/submit")
def submit_quiz(
    data: QuizSubmitRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    # 1. Result save karo
    result = QuizResult(
        user_email=email,
        topic=data.topic,
        score=data.score,
        total_questions=data.total_questions,
    )
    db.add(result)
    db.commit()

    # 2. Add 20 XP
    add_xp(db, email, 20)

    # 3. Check & award badges
    check_and_award_achievements(db, email)

    return {"message": "Quiz result saved successfully!", "xp_gained": 20}