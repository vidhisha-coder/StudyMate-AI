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


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# =========================================================
# PROFILE
# =========================================================

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=6)


# =========================================================
# NOTES / SUMMARIZER
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
    count: int = 5


class FlashcardResponse(BaseModel):
    id: int
    topic: str
    question: str
    answer: str
    created_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# STUDY PLANNER
# =========================================================

class TaskCreate(BaseModel):
    # Frontend sends: title, subject, date, start_time, end_time, priority
    title: Optional[str] = None
    task: Optional[str] = None          # legacy alias, kept for backward-compat
    subject: Optional[str] = "General"
    date: Optional[str] = None
    due_date: Optional[str] = None      # legacy alias, kept for backward-compat
    start_time: Optional[str] = "18:00"
    end_time: Optional[str] = "19:30"
    priority: Optional[str] = "Medium"
    completed: Optional[bool] = False


class TaskResponse(BaseModel):
    id: int
    title: str
    subject: str
    date: str
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    priority: Optional[str] = None
    completed: bool

    class Config:
        from_attributes = True


# ---------- Settings ----------
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