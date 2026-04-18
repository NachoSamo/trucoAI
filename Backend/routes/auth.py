import os
from fastapi import APIRouter, HTTPException
from schemas.auth import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth")

VALID_EMAIL = os.getenv("EMAIL", "ignasamo2@gmail.com")
VALID_PASSWORD = os.getenv("PASSWORD", "1234")


@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest):
    if credentials.email != VALID_EMAIL or credentials.password != VALID_PASSWORD:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return LoginResponse(access_token="complice-token-mvp")
