from sqlalchemy.orm import Session
from app.models import UserStats, Achievement


def add_xp(db: Session, email: str, points: int):
    # 1. User stats fetch karo ya nayi row create karo
    stats = db.query(UserStats).filter(UserStats.user_email == email).first()

    if not stats:
        stats = UserStats(user_email=email)
        db.add(stats)

    # 2. XP update karo
    stats.xp += points

    # 3. Level recalculate (Har 100 XP pe Level Up)
    stats.level = (stats.xp // 100) + 1

    db.commit()
    db.refresh(stats)
    return stats


def check_and_award_achievements(db: Session, email: str):
    # Stats get karo
    stats = db.query(UserStats).filter(UserStats.user_email == email).first()
    if not stats:
        return

    # List of possible achievements & their requirements
    achievements_to_check = [
        {
            "code": "first_note",
            "title": "First Step 📝",
            "description": "Generated your first note summary",
            "condition": stats.total_notes >= 1,
        },
        {
            "code": "flashcard_master",
            "title": "Memory Champ 🃏",
            "description": "Created 5 or more flashcards",
            "condition": stats.total_flashcards >= 5,
        },
        {
            "code": "quiz_whiz",
            "title": "Quiz Whiz 🧠",
            "description": "Completed your first quiz",
            "condition": stats.total_quizzes >= 1,
        },
        {
            "code": "level_5",
            "title": "High Achiever 🚀",
            "description": "Reached Level 5",
            "condition": stats.level >= 5,
        },
    ]

    for item in achievements_to_check:
        if item["condition"]:
            # Check karo ki kahin pehle se award toh nahi hua
            existing = (
                db.query(Achievement)
                .filter(
                    Achievement.user_email == email,
                    Achievement.code == item["code"],
                )
                .first()
            )

            if not existing:
                new_achievement = Achievement(
                    user_email=email,
                    code=item["code"],
                    title=item["title"],
                    description=item["description"],
                )
                db.add(new_achievement)

    db.commit()