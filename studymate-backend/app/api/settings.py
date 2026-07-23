from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import User
from app.schemas import SettingsUpdateRequest
router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


@router.get("/")
def get_settings(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):

    user = db.query(User).filter(User.email == email).first()

    return {
        "name": user.name,
        "email": user.email,
        "dark_mode": user.dark_mode,
        "notifications": user.notifications,
    }


@router.put("/")
def update_settings(
    data: SettingsUpdateRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):

    user = db.query(User).filter(User.email == email).first()

    user.name = data.name
    user.dark_mode = data.dark_mode
    user.notifications = data.notifications

    db.commit()

    return {
        "message": "Settings updated successfully"
    }