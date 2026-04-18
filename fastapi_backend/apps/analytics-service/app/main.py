from fastapi import FastAPI
from app.api.routes import kpis
from app.repositories.database import init_db

app = FastAPI(
    title="FairGig Analytics Service",
    description="k-Anonymized macro analytics and worker dashboards.",
    version="1.0.0"
)

@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(kpis.router, tags=["analytics"])

@app.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "service": "analytics-service"}
