from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/planner", tags=["Planner"])

# Pydantic Models for Request/Response
class TaskCreate(BaseModel):
    title: str
    subject: Optional[str] = "General"
    date: str  # YYYY-MM-DD format
    start_time: str
    end_time: str
    priority: str = "Medium"

class TaskResponse(TaskCreate):
    id: int
    completed: bool = False

# Temporary In-Memory Database (Jab tak real Database connect na ho)
db_tasks = [
    {"id": 1, "title": "DBMS", "subject": "Database", "date": "2026-07-24", "start_time": "18:00", "end_time": "19:30", "priority": "High", "completed": False},
    {"id": 2, "title": "DSA", "subject": "Algorithms", "date": "2026-07-24", "start_time": "14:00", "end_time": "15:30", "priority": "High", "completed": True},
    {"id": 3, "title": "Java", "subject": "Programming", "date": "2026-07-24", "start_time": "20:00", "end_time": "21:00", "priority": "Medium", "completed": False},
    {"id": 4, "title": "Revision", "subject": "General", "date": "2026-07-24", "start_time": "21:30", "end_time": "22:30", "priority": "Low", "completed": False},
]

# 1. GET ALL TASKS
@router.get("", response_model=List[TaskResponse])
def get_tasks():
    return db_tasks

# 2. CREATE TASK
@router.post("/create", response_model=TaskResponse)
def create_task(task: TaskCreate):
    new_id = len(db_tasks) + 1 if db_tasks else 1
    new_task = {
        "id": new_id,
        "completed": False,
        **task.dict()
    }
    db_tasks.append(new_task)
    return new_task

# 3. TOGGLE COMPLETE TASK
@router.patch("/{task_id}/complete")
def complete_task(task_id: int):
    for t in db_tasks:
        if t["id"] == task_id:
            t["completed"] = not t["completed"]
            return {"message": "Status updated", "task": t}
    raise HTTPException(status_code=404, detail="Task not found")

# 4. DELETE TASK
@router.delete("/{task_id}")
def delete_task(task_id: int):
    global db_tasks
    db_tasks = [t for t in db_tasks if t["id"] != task_id]
    return {"message": "Task deleted successfully"}