from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    name = Column(
        String
    )


    email = Column(
        String,
        unique=True,
        index=True
    )


    password = Column(
        String
    )



class ChatHistory(Base):

    __tablename__ = "chat_history"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_email = Column(
        String
    )


    prompt = Column(
        String
    )


    response = Column(
        String
    )