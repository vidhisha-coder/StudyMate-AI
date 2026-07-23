from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    prompt = Column(Text)
    response = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class NoteHistory(Base):
    __tablename__ = "note_history"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    title = Column(String, default="Untitled Notes")
    original_text = Column(Text)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    topic = Column(String, default="General")
    question = Column(Text)
    answer = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    topic = Column(String, default="General")
    score = Column(Integer)
    total_questions = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)


# StudyTask - Study Planner ke real fields ke saath (title, date, start/end time, priority)
class StudyTask(Base):
    __tablename__ = "study_tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    title = Column(String)
    subject = Column(String, default="General")
    date = Column(String)        # "YYYY-MM-DD"
    start_time = Column(String)  # "HH:MM"
    end_time = Column(String)    # "HH:MM"
    priority = Column(String, default="Medium")
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    code = Column(String)
    title = Column(String)
    description = Column(String)
    earned_at = Column(DateTime, default=datetime.utcnow)