from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# =========================================================
# AUTH
# =========================================================

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    name: Optional[str] = None
    email: EmailStr

    class Config:
        from_attributes = True


# =========================================================
# PROFILE
# =========================================================

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)


# =========================================================
# NOTES / SUMMARIZATION
# =========================================================

class NoteHistoryResponse(BaseModel):
    id: int
    title: str
    original_text: str
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# FLASHCARDS
# =========================================================

class FlashcardGenerateRequest(BaseModel):
    text: str
    topic: str = "General"
    count: int = Field(default=5, ge=1, le=20)


class FlashcardResponse(BaseModel):
    id: int
    topic: str
    question: str
    answer: str
    created_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# QUIZ
# =========================================================

class QuizGenerateRequest(BaseModel):
    text: str


class QuizSubmitRequest(BaseModel):
    topic: str = "General"
    score: int
    total_questions: int


class QuizResultResponse(BaseModel):
    id: int
    topic: str
    score: int
    total_questions: int
    created_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# STUDY PLANNER
# Updated to support both legacy and modern UI fields
# =========================================================

class TaskCreate(BaseModel):
    title: Optional[str] = None
    task: Optional[str] = None
    subject: Optional[str] = "General"
    date: Optional[str] = None
    due_date: Optional[str] = None
    start_time: Optional[str] = "18:00"
    end_time: Optional[str] = "19:30"
    priority: Optional[str] = "Medium"
    completed: Optional[bool] = False


class TaskResponse(BaseModel):
    id: int
    title: Optional[str] = None
    task: Optional[str] = None
    subject: Optional[str] = "General"
    date: Optional[str] = None
    due_date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    priority: Optional[str] = None
    completed: bool = False
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# =========================================================
# ACHIEVEMENTS
# =========================================================

class AchievementResponse(BaseModel):
    id: int
    code: str
    title: str
    description: str
    earned_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# CHAT / AI ASSISTANT
# =========================================================

class ChatRequest(BaseModel):
    prompt: str


class ChatHistoryResponse(BaseModel):
    id: int
    prompt: str
    response: str
    created_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# SETTINGS
# Added SettingsUpdate alias to fix settings router import error
# =========================================================

class SettingsUpdateRequest(BaseModel):
    theme: Optional[str] = None                  # "light" or "dark"
    notifications_enabled: Optional[bool] = None


# Alias for compatibility with app/api/settings.py import
class SettingsUpdate(SettingsUpdateRequest):
    pass


class SettingsResponse(BaseModel):
    theme: str
    notifications_enabled: bool

    class Config:
        from_attributes = True


# =========================================================
# FORGOT / RESET PASSWORD
# =========================================================

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=6)