from dotenv import load_dotenv
import os

load_dotenv()


class Settings:

    PROJECT_NAME = "StudyMate AI"

    VERSION = "1.0.0"

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///./studymate.db"
    )

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")


settings = Settings()