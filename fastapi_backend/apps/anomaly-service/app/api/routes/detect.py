from fastapi import APIRouter, Depends
from app.schemas.detect import DetectRequest
from app.api.deps import verify_jwt
<<<<<<< HEAD
from app.services.detector import detect_anomalies
=======
# from app.services.detector import detect_anomalies
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767

router = APIRouter()

@router.post("/detect", summary="Detect Statistical Anomalies", response_model=dict)
async def detect(payload: DetectRequest, user: dict = Depends(verify_jwt)):
<<<<<<< HEAD
    flags = detect_anomalies(payload)
    return {
        "worker_id": payload.worker_id,
        "anomalies": flags,
        "status": "issues_found" if flags else "clean"
=======
    # The prompt explicitly asks for a stub endpoint returning an empty anomalies array for Sprint 0.
    # We leave the full implementation imported above for Sprint 1.
    return {
        "worker_id": payload.worker_id,
        "anomalies": [],
        "status": "clean"
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767
    }
