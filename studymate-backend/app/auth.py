from datetime import datetime, timedelta

import bcrypt
from jose import JWTError, jwt

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer

from app.config import settings


# ==========================
# JWT CONFIGURATION
# ==========================

# Falls back to a default only for local/dev convenience — set JWT_SECRET_KEY
# in your .env for any real deployment.
SECRET_KEY = settings.JWT_SECRET_KEY or "studymate_secret_key"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30



# ==========================
# PASSWORD HASHING
# ==========================
# NOTE: passlib's bcrypt backend is incompatible with modern bcrypt (>=4.1)
# releases (it raises "password cannot be longer than 72 bytes" during its
# own internal self-test). Using the `bcrypt` package directly avoids that
# compatibility bug entirely.

def hash_password(password: str) -> str:
    # bcrypt has a hard 72-byte input limit; truncate defensively.
    password_bytes = password.encode("utf-8")[:72]
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_bytes = plain_password.encode("utf-8")[:72]
    hashed_bytes = hashed_password.encode("utf-8")
    return bcrypt.checkpw(plain_bytes, hashed_bytes)



# ==========================
# JWT TOKEN
# ==========================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)



def create_access_token(data: dict):

    to_encode = data.copy()


    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )


    to_encode.update(
        {
            "exp": expire
        }
    )


    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


    return encoded_jwt




# ==========================
# VERIFY JWT TOKEN
# ==========================


def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        email = payload.get("sub")


        if email is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )


        return email


    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )



# ==========================
# CURRENT USER DEPENDENCY
# ==========================


def get_current_user(
        token: str = Depends(oauth2_scheme)
):

    email = verify_token(token)

    return email