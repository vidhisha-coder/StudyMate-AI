from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.services.ai_service import ask_claude
from app.database import get_db
from app.models import ChatHistory
from app.auth import get_current_user


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class PromptRequest(BaseModel):
    prompt: str



@router.post("/ask")
def ask_ai(
    data: PromptRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user)
):

    response = ask_claude(data.prompt)


    chat = ChatHistory(
        user_email=email,
        prompt=data.prompt,
        response=response
    )


    db.add(chat)
    db.commit()
    db.refresh(chat)


    return {
        "response": response
    }
# ==========================
# CHAT HISTORY
# ==========================

@router.get("/history")
def get_chat_history(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user)
):

    chats = db.query(ChatHistory).filter(
        ChatHistory.user_email == email
    ).all()


    return chats