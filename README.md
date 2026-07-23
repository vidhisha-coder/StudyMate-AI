# 📚 StudyMate AI

> An AI-powered personalized learning platform that helps students study smarter through intelligent note summarization, quiz generation, flashcards, study planning, and an interactive AI chatbot.

---

## 🌟 Project Overview

StudyMate AI is a full-stack AI-powered learning assistant developed to make studying more efficient, interactive, and personalized.

The platform utilizes Large Language Models (LLMs) to generate study materials such as summaries, quizzes, flashcards, and personalized study plans from uploaded notes while providing an AI chatbot to answer academic queries.

This project was developed as part of an internship group project, focusing on AI-powered learning assistance and modern full-stack web development.

---

## 🎯 Key Highlights

- 🤖 AI-powered personalized learning assistant
- 📚 Interactive study planner and flashcards
- 💬 Intelligent chatbot for concept clarification
- 📄 PDF-based note summarization
- ❓ Automatic quiz generation
- 🔐 Secure authentication with JWT
- 📊 Personalized dashboard with progress tracking

---

## ✨ Features

### 🤖 AI Features

- 💬 AI Study Chatbot
- 📝 AI Notes Summarizer
- ❓ AI Quiz Generator
- 🧠 AI Flashcards Generator
- 📅 AI Study Planner
- 📖 AI Concept Explanation

### 📚 Learning Management

- 📄 PDF Upload
- 📂 Notes Management
- 📈 Progress Tracking
- 📊 Dashboard Analytics

### 👤 User Features

- 🔐 Secure Authentication
- 👤 User Profile
- 🏆 Achievements
- ⚙️ Settings

---

### 🌐 User Experience

- 📱 Fully Responsive Interface
- ⚡ Fast & Modern UI
- 🎨 Clean and Intuitive Design

---

## 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Axios

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

## Database

- SQLite (Development)
- SQLAlchemy ORM

## AI Integration

- Groq API / OpenAI Compatible LLM

---

## 📖 API Documentation

Once the backend is running, access the interactive API documentation:

Swagger UI

http://localhost:8000/docs

ReDoc

http://localhost:8000/redoc

# 🏗 System Architecture

```
                React + Vite
                      │
                      │ REST API
                      ▼
                 FastAPI Backend
               ┌────────┴────────┐
               │                 │
               ▼                 ▼
          SQLite Database     AI Services
                                   │
                                   ▼
                            Groq / OpenAI
```

---

# 📂 Project Structure

```
StudyMate-AI/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/vidhisha-coder/StudyMate-AI.git

cd StudyMate-AI
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=sqlite:///./studymate.db
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---


# 🔒 Authentication

- JWT Authentication
- Secure Password Storage
- Protected Routes
- Session Management

---

# 📡 Core Modules

- Authentication
- Dashboard
- AI Chatbot
- Notes Summarization
- Quiz Generator
- Flashcards
- Study Planner
- PDF Upload
- Achievements
- User Profile
- Settings

---

## 👨‍💻 Project Team

**Group Name:** AI Innovators

| Name | Role |
|------|------|
| **Vidhisha Shinde** | Team Leader |
| **Rudra Umra** | Team Member |

---

## 📂 GitHub Repository

🔗 https://github.com/vidhisha-coder/StudyMate-AI

---

# 📄 License

This project was developed for educational purposes as part of a College Level Design (CLD) group project.

---

# ⭐ Acknowledgement

We sincerely thank our project guide, faculty members, and our institution for their guidance and support throughout the development of this project.
