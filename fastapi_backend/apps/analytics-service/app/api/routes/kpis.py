from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
<<<<<<< HEAD
from sqlalchemy import select, func
import pandas as pd
from app.schemas.kpis import CityMedianResponse, AdvocateKpisResponse
from app.api.deps import verify_jwt
from app.repositories.database import get_db, WorkerShiftAggr
=======
from app.schemas.kpis import CityMedianResponse, AdvocateKpisResponse
from app.api.deps import verify_jwt
from app.repositories.database import get_db
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767

router = APIRouter()

@router.get("/benchmark/city-median", summary="Get City Median Benchmark", response_model=CityMedianResponse)
async def get_city_median(category: str, zone: str, db: AsyncSession = Depends(get_db)):
<<<<<<< HEAD
    # k-Anonymity Guard (k=5)
    count_stmt = select(func.count(WorkerShiftAggr.worker_id.distinct())).where(
        WorkerShiftAggr.category == category,
        WorkerShiftAggr.zone == zone
    )
    result = await db.execute(count_stmt)
    worker_count = result.scalar()
    
    if worker_count < 5:
        return {"cohort_too_small": True, "worker_count": worker_count, "category": category, "zone": zone, "median_hourly_rate": 0.0}
        
    stmt = select(WorkerShiftAggr.net_earnings, WorkerShiftAggr.hours_worked).where(
        WorkerShiftAggr.category == category,
        WorkerShiftAggr.zone == zone,
        WorkerShiftAggr.hours_worked > 0
    )
    res = await db.execute(stmt)
    records = res.all()
    
    if not records:
        return {"cohort_too_small": True, "worker_count": worker_count, "category": category, "zone": zone, "median_hourly_rate": 0.0}

    df = pd.DataFrame(records, columns=['net_earnings', 'hours_worked'])
    df['hourly_rate'] = df['net_earnings'] / df['hours_worked']
    median_rate = float(df['hourly_rate'].median())
    
    return {
        "cohort_too_small": False,
        "worker_count": worker_count,
        "category": category,
        "zone": zone,
        "median_hourly_rate": median_rate
=======
    # Stub endpoint per instructions
    return {
        "cohort_too_small": False,
        "worker_count": 0,
        "category": category,
        "zone": zone,
        "median_hourly_rate": 0.0
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767
    }

@router.get("/advocate/kpis", summary="Get Advocate KPIs", response_model=AdvocateKpisResponse, dependencies=[Depends(verify_jwt)])
async def get_advocate_kpis(db: AsyncSession = Depends(get_db)):
<<<<<<< HEAD
    vuln_stmt = select(WorkerShiftAggr.worker_id).where(WorkerShiftAggr.income_drop_mom_pct > 20)
    vuln_res = await db.execute(vuln_stmt)
    vulnerable_ids = [row[0] for row in vuln_res.all()]
    
    data_stmt = select(WorkerShiftAggr.week_no, WorkerShiftAggr.platform_deduction_pct)
    data_res = await db.execute(data_stmt)
    df_trends = pd.DataFrame(data_res.all(), columns=["week_no", "commission_pct"])
    
    trend_dict = {}
    if not df_trends.empty:
        agg = df_trends.groupby("week_no")["commission_pct"].mean().to_dict()
        trend_dict = {str(k): float(v) for k,v in agg.items()}
        
    zone_stmt = select(WorkerShiftAggr.zone, WorkerShiftAggr.net_earnings)
    zone_res = await db.execute(zone_stmt)
    df_zones = pd.DataFrame(zone_res.all(), columns=["zone", "earnings"])
    
    distribution = {}
    if not df_zones.empty:
        grouped = df_zones.groupby("zone")["earnings"]
        for zone, group in grouped:
            distribution[zone] = {
                "10th": float(group.quantile(0.10)),
                "25th": float(group.quantile(0.25)),
                "50th": float(group.quantile(0.50)),
                "75th": float(group.quantile(0.75)),
                "90th": float(group.quantile(0.90)),
            }

    return {
        "commission_trends": trend_dict,
        "income_distribution_percentiles": distribution,
        "vulnerable_workers_flagged": vulnerable_ids
=======
    # Stub endpoint per instructions
    return {
        "commission_trends": {},
        "income_distribution_percentiles": {},
        "vulnerable_workers_flagged": []
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767
    }
