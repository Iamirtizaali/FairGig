from fastapi import APIRouter, Depends
from app.schemas.detect import DetectRequest
from app.api.deps import verify_jwt
# from app.services.detector import detect_anomalies

router = APIRouter()

@router.post("/detect", summary="Detect Statistical Anomalies", response_model=dict)
async def detect(payload: DetectRequest, user: dict = Depends(verify_jwt)):
    # The prompt explicitly asks for a stub endpoint returning an empty anomalies array for Sprint 0.
    # We leave the full implementation imported above for Sprint 1.
    return {
        "worker_id": payload.worker_id,
        "anomalies": [],
        "status": "clean"
    }
