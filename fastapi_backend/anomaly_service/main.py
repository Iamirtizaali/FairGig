from fastapi import FastAPI, Depends
from .deps import verify_jwt
from .logic import detect_anomalies, DetectRequest

app = FastAPI(
    title="FairGig Anomaly Detection Service",
    description="Statistical anomaly detection for gig worker earnings.",
    version="1.0.0"
)

@app.post("/detect", summary="Detect Statistical Anomalies", response_model=dict)
async def detect(payload: DetectRequest, user: dict = Depends(verify_jwt)):
    flags = detect_anomalies(payload)
    return {
        "worker_id": payload.worker_id,
        "anomalies": flags,
        "status": "issues_found" if flags else "clean"
    }

@app.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "service": "anomaly-service"}
