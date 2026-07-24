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

## 🌐 User Experience

- 📱 Fully Responsive Interface
- ⚡ Fast & Modern UI
- 🎨 Clean and Intuitive Design

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Axios

### Backend

- FastAPI
- Python

### AI

- Google Gemini API

### Database

- SQLite

### Deployment

- Docker
- Docker Compose
- AWS EC2

---

## 🚀 Live Deployment

The application is deployed on **AWS EC2** using **Docker Compose**.

### 🌐 Live Application

**Frontend:**  
http://43.204.211.86:5173

**Backend API (Swagger Docs):**  
http://43.204.211.86:8000/docs

**Note:** The application is hosted on an AWS EC2 instance for demonstration purposes. Availability depends on the running state of the EC2 instance.

---

## ⚙️ Deployment Architecture

```text
                User
                  │
                  ▼
      React + Vite Frontend
                  │
        HTTP REST API Calls
                  │
                  ▼
       FastAPI Backend (Docker)
                  │
      Google Gemini API Integration
                  │
                  ▼
             SQLite Database
```

---

## 🐳 Running with Docker

```bash
docker compose up --build
```

---

## 👩‍💻 Team

**Project Name:** StudyMate AI

Developed as part of the **AICTE IBM SkillsBuild Gen AI & Cloud Computing Internship**.