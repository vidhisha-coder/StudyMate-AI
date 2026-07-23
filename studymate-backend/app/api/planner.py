from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import StudyTask
from app.schemas import TaskCreate, TaskResponse
from app.api.achievements import check_and_award_achievements

router = APIRouter(prefix="/planner", tags=["Planner"])


@router.get("", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    db_tasks = db.query(StudyTask).filter(StudyTask.user_email == email).order_by(StudyTask.id.desc()).all()
    
    # Frontend keys (title, date) ko DB keys (task, due_date) se map karke bhejna
    formatted_tasks = []
    for t in db_tasks:
        formatted_tasks.append({
            "id": t.id,
            "title": t.task or "Study Session",
            "task": t.task,
            "subject": t.subject or "General",
            "date": t.due_date or "2026-07-24",
            "due_date": t.due_date,
            "start_time": "18:00",
            "end_time": "19:30",
            "priority": "Medium",
            "completed": t.completed or False
        })
    return formatted_tasks


@router.post("/create", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    task_text = task.title or task.task or "Study Task"
    due_date_text = task.date or task.due_date or "2026-07-24"

    new_task = StudyTask(
        user_email=email,
        subject=task.subject or "General",
        task=task_text,
        due_date=due_date_text,
        completed=task.completed or False
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    # Return structure matching frontend expectations
    return {
        "id": new_task.id,
        "title": new_task.task,
        "task": new_task.task,
        "subject": new_task.subject,
        "date": new_task.due_date,
        "due_date": new_task.due_date,
        "start_time": task.start_time or "18:00",
        "end_time": task.end_time or "19:30",
        "priority": task.priority or "Medium",
        "completed": new_task.completed
    }


@router.patch("/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    task = db.query(StudyTask).filter(StudyTask.id == task_id, StudyTask.user_email == email).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = not task.completed
    db.commit()

    check_and_award_achievements(db, email)

    return {"message": "Status updated", "completed": task.completed}


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    task = db.query(StudyTask).filter(StudyTask.id == task_id, StudyTask.user_email == email).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}