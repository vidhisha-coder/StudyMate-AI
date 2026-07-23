from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user, hash_password, verify_password
from app.models import User
from app.schemas import UserResponse, ProfileUpdateRequest, ChangePasswordRequest

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/", response_model=UserResponse)
def get_profile(db: Session = Depends(get_db), email: str = Depends(get_current_user)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/", response_model=UserResponse)
def update_profile(
    data: ProfileUpdateRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.name:
        user.name = data.name

    db.commit()
    db.refresh(user)
    return user


@router.put("/change-password")
def change_password(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    email: str = Depends(get_current_user),
):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(data.current_password, user.password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    user.password = hash_password(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}