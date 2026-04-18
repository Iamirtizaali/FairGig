from fastapi import FastAPI
from app.api.routes import detect

app = FastAPI(
    title="FairGig Anomaly Detection Service",
    description="Statistical anomaly detection for gig worker earnings.",
    version="1.0.0"
)

app.include_router(detect.router, tags=["anomaly"])

@app.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "service": "anomaly-service"}
