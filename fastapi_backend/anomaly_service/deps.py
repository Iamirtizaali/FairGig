import os
from fastapi import Depends, HTTPException, Security, Request
from fastapi.security.api_key import APIKeyHeader
from jose import jwt, JWTError

JWT_SECRET = os.getenv("JWT_SECRET", "supersecret_fallback") 
JUDGE_API_KEY = os.getenv("JUDGE_API_KEY", "softec_judge_2026")

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

def verify_jwt(request: Request, x_api_key: str = Security(api_key_header)):
    # 1. Check for Judge API Key Bypass
    if x_api_key == JUDGE_API_KEY:
        return {"user_id": "judge", "role": "judge"}

    # 2. Check for Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=401, 
            detail="Missing or invalid authentication. Provide Bearer token or X-API-Key."
        )

    token = auth_header.split(" ")[1]
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
