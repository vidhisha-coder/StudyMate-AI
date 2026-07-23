from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# ---------- Settings ----------
class SettingsUpdateRequest(BaseModel):
    theme: Optional[str] = None                  # "light" or "dark"
    notifications_enabled: Optional[bool] = None


# Alias for compatibility with app/api/settings.py import
class SettingsUpdate(SettingsUpdateRequest):
    pass


class SettingsResponse(BaseModel):
    theme: str
    notifications_enabled: bool

    class Config:
        from_attributes = True


# =========================================================
# FORGOT / RESET PASSWORD
# =========================================================

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(min_length=6)