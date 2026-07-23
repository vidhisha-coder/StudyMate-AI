from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


# ---------- Notes History ----------
class NoteHistoryResponse(BaseModel):
    id: int
    title: str
    original_text: str
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Flashcards ----------
class FlashcardGenerateRequest(BaseModel):
    text: str
    topic: Optional[str] = "General"
    count: Optional[int] = 8


class FlashcardResponse(BaseModel):
    id: int
    topic: str
    question: str
    answer: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Study Planner ----------
class TaskCreate(BaseModel):
    title: str
    subject: Optional[str] = "General"
    date: str
    start_time: str
    end_time: str
    priority: str = "Medium"


class TaskResponse(TaskCreate):
    id: int
    completed: bool = False

    class Config:
        from_attributes = True


# ---------- Achievements ----------
class AchievementResponse(BaseModel):
    id: int
    code: str
    title: str
    description: str
    earned_at: datetime

    class Config:
        from_attributes = True


# ---------- Profile ----------
class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str