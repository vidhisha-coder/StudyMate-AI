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


class NoteHistoryResponse(BaseModel):
    id: int
    title: str
    original_text: str
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True


class FlashcardGenerateRequest(BaseModel):
    notes: str
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


class QuizSubmitRequest(BaseModel):
    topic: Optional[str] = "General"
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


class StudyTaskCreate(BaseModel):
    subject: str
    task: str
    due_date: str


class StudyTaskUpdate(BaseModel):
    subject: Optional[str] = None
    task: Optional[str] = None
    due_date: Optional[str] = None
    completed: Optional[bool] = None


class StudyTaskResponse(BaseModel):
    id: int
    subject: str
    task: str
    due_date: str
    completed: bool

    class Config:
        from_attributes = True


class AchievementResponse(BaseModel):
    id: int
    code: str
    title: str
    description: str
    earned_at: datetime

    class Config:
        from_attributes = True