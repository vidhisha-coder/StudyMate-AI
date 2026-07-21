from datetime import datetime, timedelta

from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer


# ==========================
# JWT CONFIGURATION
# ==========================

SECRET_KEY = "studymate_secret_key"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30



# ==========================
# PASSWORD HASHING
# ==========================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



def hash_password(password: str):

    return pwd_context.hash(password)



def verify_password(
        plain_password: str,
        hashed_password: str
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )



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