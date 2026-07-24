import os
from dotenv import load_dotenv
from groq import Groq


load_dotenv()

_client = None


def _get_client() -> Groq:
    """Groq client sirf tab banta hai jab pehli baar zaroorat pade —
    isse missing GROQ_API_KEY ki wajah se poori app startup pe crash nahi hoti."""
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GROQ_API_KEY is not set. Add it to your .env file "
                "(or as an environment variable / Docker secret) before using AI features."
            )
        _client = Groq(api_key=api_key)
    return _client


def ask_claude(prompt: str):

    response = _get_client().chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content