import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import anthropic

# .env file se environment variables load karo (API key wahan se aayegi)
load_dotenv()

app = FastAPI(title="StudyMate AI Backend")

# Frontend se requests aane ke liye CORS allow karna zaroori hai
# Development mein "*" theek hai, production mein apna actual frontend URL daalna
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Anthropic client banate hain - key .env se automatically uthayega
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

MODEL_NAME = "claude-sonnet-4-6"


# Request body ka structure define karte hain
class NotesRequest(BaseModel):
    notes: str


@app.get("/")
def health_check():
    """Simple check to confirm server chal raha hai"""
    return {"status": "StudyMate AI backend is running"}


@app.post("/summarize")
def summarize_notes(request: NotesRequest):
    """
    Notes ko summarize karta hai aur response ko streaming mein bhejta hai
    (text token-by-token frontend mein render hoga, ek saath nahi)
    """

    def generate():
        with client.messages.stream(
            model=MODEL_NAME,
            max_tokens=1024,
            system=(
                "Tum ek study assistant ho. Diye gaye notes ko concise, "
                "well-structured summary mein convert karo. Headings aur "
                "bullet points use karo. Important terms ko bold karo."
            ),
            messages=[{"role": "user", "content": request.notes}],
        ) as stream:
            for text in stream.text_stream:
                # Har chunk ko frontend ko bhejte jao
                yield text

    return StreamingResponse(generate(), media_type="text/plain")


@app.post("/quiz")
def generate_quiz(request: NotesRequest):
    """
    Notes se ek quiz generate karta hai aur structured JSON return karta hai
    (streaming nahi - quiz ko poora JSON ek saath chahiye)
    """
    response = client.messages.create(
        model=MODEL_NAME,
        max_tokens=1500,
        system=(
            "Tum ek quiz generator ho. Diye gaye notes se 5 multiple-choice "
            "questions banao. SIRF valid JSON return karo, koi extra text "
            "ya markdown formatting nahi. Format bilkul ye hona chahiye: "
            '{"questions": [{"question": "...", "options": ["a", "b", "c", "d"], '
            '"correct_answer": "a"}]}'
        ),
        messages=[{"role": "user", "content": request.notes}],
    )

    raw_text = response.content[0].text

    try:
        quiz_data = json.loads(raw_text)
    except json.JSONDecodeError:
        # Agar Claude ne pure JSON ke alawa kuch aur bhi likh diya,
        # yaha ek fallback rakha hai
        quiz_data = {"error": "Quiz format mein issue aaya, dobara try karo", "raw": raw_text}

    return quiz_data