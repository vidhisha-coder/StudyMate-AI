from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database & Models
from app.database import Base, engine
import app.models

# Routers (Sabhi API Routers Import kiye hain)
from app.api.auth import router as auth_router
from app.api.ai import router as ai_router
from app.api.upload import router as upload_router
from app.api.summarize import router as summarize_router
from app.api.quiz import router as quiz_router
from app.api.planner import router as planner_router
from app.api.notes import router as notes_router          # 👈 Notes Router
from app.api.achievements import router as achievements_router  # 👈 Achievements & Stats Router
from app.api.flashcards import router as flashcards_router
from app.api.dashboard import router as dashboard_router
from app.api.profile import router as profile_router

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(
    title="StudyMate AI Backend",
    description="AI-powered Study Assistant Backend",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Route
@app.get("/")
def root():
    return {
        "message": "🚀 StudyMate AI Backend Running Successfully"
    }

# Health Check
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# Register All API Routers
app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(upload_router)
app.include_router(summarize_router)
app.include_router(quiz_router)
app.include_router(planner_router)
app.include_router(notes_router)         # 👈 Added
app.include_router(achievements_router)  # 👈 Added
app.include_router(flashcards_router)
app.include_router(dashboard_router)
app.include_router(profile_router)