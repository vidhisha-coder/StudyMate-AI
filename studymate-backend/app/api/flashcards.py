import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.ai_service import ask_claude
from app.database import get_db
from app.auth import get_current_user
from app.models import Flashcard
from app.schemas import FlashcardGenerateRequest, FlashcardResponse
from app.api.achievements import check_and_award_achievements

router = APIRouter(prefix="/flashcards", tags=["Flashcards"])


@router.post("/generate", response_model=list[FlashcardResponse])
def generate_flashcards(
    data: FlashcardGenerateRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    prompt = f"""
Generate {data.count} flashcards (question and answer pairs) from the following study material.

Return ONLY valid JSON in this exact format, nothing else:

[
  {{"question": "...", "answer": "..."}}
]

Study Material:

{data.text}
"""

    response = ask_claude(prompt)

    try:
        cards = json.loads(response)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Could not generate flashcards, please try again")

    saved_cards = []
    for card in cards:
        entry = Flashcard(
            user_email=email,
            topic=data.topic,
            question=card.get("question", ""),
            answer=card.get("answer", ""),
        )
        db.add(entry)
        saved_cards.append(entry)

    db.commit()
    for entry in saved_cards:
        db.refresh(entry)

    check_and_award_achievements(db, email)

    return saved_cards


@router.get("/", response_model=list[FlashcardResponse])
def get_flashcards(db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    return (
        db.query(Flashcard)
        .filter(Flashcard.user_email == email)
        .order_by(Flashcard.created_at.desc())
        .all()
    )


@router.delete("/{flashcard_id}")
def delete_flashcard(flashcard_id: int, db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    card = db.query(Flashcard).filter(Flashcard.id == flashcard_id, Flashcard.user_email == email).first()
    if not card:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    db.delete(card)
    db.commit()
    return {"message": "Flashcard deleted successfully"}