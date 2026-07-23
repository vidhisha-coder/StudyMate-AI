import os
import smtplib
from email.mime.text import MIMEText

SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))


def send_reset_email(to_email: str, reset_token: str) -> bool:
    """
    Password reset email bhejta hai.
    Agar SMTP configure nahi hai (.env mein SMTP_EMAIL/SMTP_PASSWORD missing),
    toh False return karta hai — router us case mein token seedha response
    mein bhej dega (sirf development/testing ke liye, taaki bina email setup
    ke bhi feature test ho sake).
    """
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        return False

    reset_link = f"http://localhost:5173/reset-password?token={reset_token}"

    body = (
        f"Hi,\n\n"
        f"We received a request to reset your StudyMate AI password.\n"
        f"Click the link below to set a new password (valid for 30 minutes):\n\n"
        f"{reset_link}\n\n"
        f"If you didn't request this, you can safely ignore this email."
    )

    message = MIMEText(body)
    message["Subject"] = "Reset your StudyMate AI password"
    message["From"] = SMTP_EMAIL
    message["To"] = to_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.sendmail(SMTP_EMAIL, to_email, message.as_string())
        return True
    except Exception:
        return False