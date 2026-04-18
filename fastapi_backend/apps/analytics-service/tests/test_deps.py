import pytest
from jose import jwt
from app.config import settings

def test_jwt_verification_token_generation():
    payload = {"user_id": "test_user", "role": "advocate"}
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
    
    decoded = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
    assert decoded["user_id"] == "test_user"
    assert decoded["role"] == "advocate"
