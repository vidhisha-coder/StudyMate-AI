from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.services.ai_service import ask_claude
from app.database import get_db
from app.auth import get_current_user
from app.models import NoteHistory
from app.api.achievements import check_and_award_achievements

router = APIRouter(prefix="/summarize", tags=["Summarization"])


class SummaryRequest(BaseModel):
    text: str


@router.post("/")
def summarize_pdf(
    data: SummaryRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    prompt = f"""
    Summarize the following study material in simple bullet points.

    {data.text}
    """

    summary = ask_claude(prompt)

    title = data.text.strip().split("\n")[0][:50] if data.text.strip() else "Untitled Notes"

    entry = NoteHistory(user_email=email, title=title, original_text=data.text, summary=summary)
    db.add(entry)
    db.commit()

    check_and_award_achievements(db, email)

    return {"summary": summary}