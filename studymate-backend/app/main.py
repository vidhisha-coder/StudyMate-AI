from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.database import Base, engine
import app.models

# Routers
from app.api.auth import router as auth_router
from app.api.ai import router as ai_router
from app.api.upload import router as upload_router
from app.api.summarize import router as summarize_router
from app.api.quiz import router as quiz_router
from app.api.planner import router as planner_router
from app.api.notes import router as notes_router
from app.api.achievements import router as achievements_router
from app.api.flashcards import router as flashcards_router
from app.api.dashboard import router as dashboard_router
from app.api.profile import router as profile_router
from app.api.settings import router as settings_router
from app.api.forget_password import router as forgot_password_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StudyMate AI Backend",
    description="AI-powered Personalized Learning Assistant",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Runtime error handler
@app.exception_handler(RuntimeError)
async def runtime_error_handler(request: Request, exc: RuntimeError):
    return JSONResponse(
        status_code=503,
        content={"detail": str(exc)},
    )

# Root
@app.get("/")
def root():
    return {
        "message": "🚀 StudyMate AI Backend Running Successfully"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# Register Routers
app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(upload_router)
app.include_router(summarize_router)
app.include_router(quiz_router)
app.include_router(planner_router)
app.include_router(notes_router)
app.include_router(achievements_router)
app.include_router(flashcards_router)
app.include_router(dashboard_router)
app.include_router(profile_router)
app.include_router(settings_router)
app.include_router(forgot_password_router)