from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ask_claude


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class PromptRequest(BaseModel):
    prompt: str



@router.post("/ask")
def ask_ai(data: PromptRequest):

    response = ask_claude(data.prompt)

    return {
        "response": response
    }