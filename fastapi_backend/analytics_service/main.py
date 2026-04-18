from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import pandas as pd

from .database import AsyncSessionLocal, init_db, WorkerShiftAggr
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
try:
    from anomaly_service.deps import verify_jwt
except ImportError:
    async def verify_jwt():
        return {"user_id": "mock", "role": "advocate"}

app = FastAPI(
    title="FairGig Analytics Service",
    description="k-Anonymized macro analytics and worker dashboards.",
    version="1.0.0"
)

@app.on_event("startup")
async def on_startup():
    await init_db()

async def get_db():
    async with AsyncSessionLocal() as db:
        yield db

@app.get("/benchmark/city-median")
async def get_city_median(category: str, zone: str, db: AsyncSession = Depends(get_db)):
    # k-Anonymity Guard (k=5)
    count_stmt = select(func.count(WorkerShiftAggr.worker_id.distinct())).where(
        WorkerShiftAggr.category == category,
        WorkerShiftAggr.zone == zone
    )
    result = await db.execute(count_stmt)
    worker_count = result.scalar()
    
    if worker_count < 5:
        return {"cohort_too_small": True, "count": worker_count}
        
    stmt = select(WorkerShiftAggr.net_earnings, WorkerShiftAggr.hours_worked).where(
        WorkerShiftAggr.category == category,
        WorkerShiftAggr.zone == zone,
        WorkerShiftAggr.hours_worked > 0
    )
    res = await db.execute(stmt)
    records = res.all()
    
    if not records:
        return {"cohort_too_small": True, "count": worker_count}

    df = pd.DataFrame(records, columns=['net_earnings', 'hours_worked'])
    df['hourly_rate'] = df['net_earnings'] / df['hours_worked']
    median_rate = float(df['hourly_rate'].median())
    
    return {
        "cohort_too_small": False,
        "worker_count": worker_count,
        "category": category,
        "zone": zone,
        "median_hourly_rate": median_rate
    }

@app.get("/advocate/kpis", dependencies=[Depends(verify_jwt)])
async def get_advocate_kpis(db: AsyncSession = Depends(get_db)):
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
    }
