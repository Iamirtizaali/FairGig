import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.api.routes import kpis, worker, advocate, internal
from app.repositories.database import init_db, engine

app = FastAPI(
    title="FairGig Analytics Service",
    description="k-Anonymized macro analytics and worker dashboards.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv(
        "CORS_ALLOW_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await init_db()
    async with engine.begin() as conn:
        await conn.execute(text("SELECT 1"))

app.include_router(worker.router, prefix="/worker", tags=["worker"])
app.include_router(kpis.router, tags=["analytics"])
app.include_router(advocate.router, prefix="/advocate", tags=["advocate"])
app.include_router(internal.router, prefix="/internal", tags=["internal"])

@app.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "service": "analytics-service"}
