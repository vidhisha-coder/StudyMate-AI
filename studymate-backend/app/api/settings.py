from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models import UserSettings
from app.schemas import SettingsUpdateRequest, SettingsResponse

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


def _get_or_create_settings(db: Session, email: str) -> UserSettings:
    settings = db.query(UserSettings).filter(UserSettings.user_email == email).first()
    if not settings:
        settings = UserSettings(user_email=email)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.get("/", response_model=SettingsResponse)
def get_settings(
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    return _get_or_create_settings(db, email)


@router.put("/", response_model=SettingsResponse)
def update_settings(
    data: SettingsUpdateRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    settings = _get_or_create_settings(db, email)

    if data.theme is not None:
        settings.theme = data.theme
    if data.notifications_enabled is not None:
        settings.notifications_enabled = data.notifications_enabled

    db.commit()
    db.refresh(settings)

    return settings