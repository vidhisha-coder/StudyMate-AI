from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.quiz import router as quiz_router

# Database
from app.database import Base, engine

# Models (tables create karne ke liye)
import app.models

# Routers
from app.api.auth import router as auth_router
from app.api.ai import router as ai_router
from app.api.upload import router as upload_router
from app.api.summarize import router as summarize_router
from app.api.planner import router as planner_router # 👈 1. Planner Router Import Kia

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

# Authentication Routes
app.include_router(auth_router)

# AI Routes
app.include_router(ai_router)

# Upload Routes
app.include_router(upload_router)

# PDF Summarization Routes
app.include_router(summarize_router)

# Quiz Routes
app.include_router(quiz_router)

# Planner Routes
app.include_router(planner_router) # 👈 2. Planner Router Register Kia