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
    return (
        db.query(StudyTask)
        .filter(StudyTask.user_email == email)
        .order_by(StudyTask.date, StudyTask.start_time)
        .all()
    )


@router.post("/create", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    new_task = StudyTask(user_email=email, **task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


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