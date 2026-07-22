from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import NoteHistory
from app.schemas import NoteHistoryResponse

router = APIRouter(prefix="/notes", tags=["Notes History"])


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