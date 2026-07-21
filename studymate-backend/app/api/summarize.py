from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ask_claude

router = APIRouter(
    prefix="/summarize",
    tags=["Summarization"]
)


class SummaryRequest(BaseModel):
    text: str


@router.post("/")
def summarize_pdf(data: SummaryRequest):

    prompt = f"""
    Summarize the following study material in simple bullet points.

    {data.text}
    """

    summary = ask_claude(prompt)

    return {
        "summary": summary
    }