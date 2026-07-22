from fastapi import APIRouter
from pydantic import BaseModel
import json

from app.services.ai_service import ask_claude

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz"]
)

class QuizRequest(BaseModel):
    text: str

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