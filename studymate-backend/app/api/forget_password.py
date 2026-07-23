import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, PasswordResetToken
from app.auth import hash_password
from app.schemas import ForgotPasswordRequest, ResetPasswordRequest
from app.services.email_service import send_reset_email

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)

TOKEN_VALID_MINUTES = 30


@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):

    user = db.query(User).filter(User.email == data.email).first()

    generic_response = {
        "message": "If this email is registered, a reset link has been sent."
    }

    # Don't reveal whether email exists
    if user is None:
        return generic_response

    # Invalidate old unused tokens
    db.query(PasswordResetToken).filter(
        PasswordResetToken.user_email == user.email,
        PasswordResetToken.used.is_(False),
    ).update(
        {"used": True},
        synchronize_session=False,
    )

    token = secrets.token_urlsafe(32)

    expires_at = datetime.utcnow() + timedelta(
        minutes=TOKEN_VALID_MINUTES
    )

    reset_token = PasswordResetToken(
        user_email=user.email,
        token=token,
        expires_at=expires_at,
        used=False,
    )

    db.add(reset_token)
    db.commit()

    email_sent = send_reset_email(
        user.email,
        token,
    )

    if email_sent:
        return generic_response

    # Development mode
    return {
        "message": "Email service not configured.",
        "reset_token": token,
    }


@router.post("/reset-password")
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):

    token_entry = (
        db.query(PasswordResetToken)
        .filter(
            PasswordResetToken.token == data.token,
            PasswordResetToken.used.is_(False),
        )
        .first()
    )

    if token_entry is None:
        raise HTTPException(
            status_code=400,
            detail="Invalid or already used reset token",
        )

    if token_entry.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=400,
            detail="Reset token has expired",
        )

    user = (
        db.query(User)
        .filter(User.email == token_entry.user_email)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    user.password = hash_password(data.new_password)

    token_entry.used = True

    db.commit()

    return {
        "message": "Password reset successfully."
    }