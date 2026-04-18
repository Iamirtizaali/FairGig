from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.kpis import CityMedianResponse, AdvocateKpisResponse
from app.api.deps import verify_jwt
from app.repositories.database import get_db

router = APIRouter()

@router.get("/benchmark/city-median", summary="Get City Median Benchmark", response_model=CityMedianResponse)
async def get_city_median(category: str, zone: str, db: AsyncSession = Depends(get_db)):
    # Stub endpoint per instructions
    return {
        "cohort_too_small": False,
        "worker_count": 0,
        "category": category,
        "zone": zone,
        "median_hourly_rate": 0.0
    }

@router.get("/advocate/kpis", summary="Get Advocate KPIs", response_model=AdvocateKpisResponse, dependencies=[Depends(verify_jwt)])
async def get_advocate_kpis(db: AsyncSession = Depends(get_db)):
    # Stub endpoint per instructions
    return {
        "commission_trends": {},
        "income_distribution_percentiles": {},
        "vulnerable_workers_flagged": []
    }
