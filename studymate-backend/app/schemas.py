from typing import Optional
from pydantic import BaseModel


# ---------- Settings ----------
class SettingsUpdateRequest(BaseModel):
    theme: Optional[str] = None                  # "light" or "dark"
    notifications_enabled: Optional[bool] = None


class SettingsResponse(BaseModel):
    theme: str
    notifications_enabled: bool

    class Config:
        from_attributes = True


# ---------- Forgot Password ----------
class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str