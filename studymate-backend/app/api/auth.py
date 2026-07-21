from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

from app.schemas import (
    UserCreate,
    Token
)

from app.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)



# ==========================
# SIGNUP
# ==========================

@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()


    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )


    db.add(new_user)
    db.commit()
    db.refresh(new_user)


    return {
        "message": "User created successfully"
    }




# ==========================
# LOGIN (OAuth2 Compatible)
# ==========================

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # Swagger sends email as username
    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()


    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    # Check password
    if not verify_password(
        form_data.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )


    # Create JWT Token
    token = create_access_token(
        {
            "sub": db_user.email
        }
    )


    return {

        "access_token": token,
        "token_type": "bearer"

    }




# ==========================
# PROTECTED ROUTE
# ==========================

@router.get("/me")
def get_profile(
    email: str = Depends(get_current_user)
):

    return {

        "email": email,
        "message": "Protected route accessed successfully"

    }