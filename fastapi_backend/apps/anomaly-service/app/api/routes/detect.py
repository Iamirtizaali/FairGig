from fastapi import APIRouter, Depends
from app.schemas.detect import DetectRequest
from app.api.deps import verify_jwt
from app.services.detector import detect_anomalies

router = APIRouter()

@router.post("/detect", summary="Detect Statistical Anomalies", response_model=dict)
async def detect(payload: DetectRequest, user: dict = Depends(verify_jwt)):
    flags = detect_anomalies(payload)
    return {
        "worker_id": payload.worker_id,
        "anomalies": flags,
        "status": "issues_found" if flags else "clean"
    }
