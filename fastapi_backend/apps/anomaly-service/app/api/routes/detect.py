from fastapi import APIRouter, Depends
from app.schemas.detect import DetectRequest, DetectResponse, Summary
from app.api.deps import verify_jwt
from app.services import detector

router = APIRouter()

@router.post("/detect", response_model=DetectResponse, summary="Detect Statistical Anomalies")
async def detect(payload: DetectRequest, user: dict = Depends(verify_jwt)):
    """
    Detect anomalies in a worker's recent earnings.
    
    Statistical methods used:
    - Z-score on deduction percentage versus 60-day rolling baseline
    - Standard deviation drop on weekly hourly rate
    - Month-over-month income drop above configurable threshold
    """
    anomalies = detector.detect(
        shifts=payload.shifts,
        z_threshold=payload.options.z_threshold,
        mom_drop_pct=payload.options.mom_drop_pct,
        currency=payload.currency
    )
    return DetectResponse(
        summary=Summary(shifts_analysed=len(payload.shifts), windows=["weekly", "monthly"]),
        anomalies=anomalies
    )
