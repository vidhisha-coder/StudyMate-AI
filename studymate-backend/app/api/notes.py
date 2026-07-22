from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import NoteHistory, UserStats
from app.schemas import NoteHistoryResponse
from app.utils import add_xp, check_and_award_achievements  # 👈 XP & Achievements helpers

router = APIRouter(prefix="/notes", tags=["Notes History"])


# 🚀 NEW: Generate/Save Note Summary & Award XP
@router.post("/generate-summary", response_model=NoteHistoryResponse)
def create_note_summary(
    title: str,
    original_text: str,
    summary_text: str,  # AI generated summary pass karein
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    # 1. Note history mein entry save karein
    new_note = NoteHistory(
        user_email=email,
        title=title if title else "Untitled Notes",
        original_text=original_text,
        summary=summary_text,
    )
    db.add(new_note)

    # 2. UserStats increment karein
    stats = db.query(UserStats).filter(UserStats.user_email == email).first()
    if not stats:
        stats = UserStats(user_email=email)
        db.add(stats)

    stats.total_notes += 1
    db.commit()
    db.refresh(new_note)

    # 3. Add 10 XP & check achievements
    add_xp(db, email, 10)
    check_and_award_achievements(db, email)

    return new_note


# 📜 Get All Notes History
@router.get("/history", response_model=list[NoteHistoryResponse])
def get_notes_history(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    return (
        db.query(NoteHistory)
        .filter(NoteHistory.user_email == email)
        .order_by(NoteHistory.created_at.desc())
        .all()
    )


# 🔍 Get Single Note Details
@router.get("/history/{note_id}", response_model=NoteHistoryResponse)
def get_single_note(
    note_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    note = (
        db.query(NoteHistory)
        .filter(NoteHistory.id == note_id, NoteHistory.user_email == email)
        .first()
    )
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


# 🗑️ Delete Note
@router.delete("/history/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    note = (
        db.query(NoteHistory)
        .filter(NoteHistory.id == note_id, NoteHistory.user_email == email)
        .first()
    )
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}