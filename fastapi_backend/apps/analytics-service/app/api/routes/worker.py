from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case, text, String
import datetime
import statistics
import pandas as pd

from app.schemas.worker import SummaryResponse, TrendResponse, CommissionTrackerResponse, MedianCompareResponse
from app.api.deps import verify_jwt
from app.repositories.database import get_db, Shift, engine
from app.core.cache import with_cache

router = APIRouter()

def get_db_literal_week(col):
    """ Cross-dialect function to execute weekly aggregations """
    if engine.name == "sqlite":
        # SQLite: cast to start of week (Monday) strictly using strftime logic 
        return func.date(col, 'weekday 1', '-7 days')
    else:
        # Postgres: rely on standard date_trunc
        return func.date_trunc('week', col)

@router.get("/summary", response_model=SummaryResponse, summary="Worker Dashboard Summary")
@with_cache(ttl=60)
async def get_summary(user: dict = Depends(verify_jwt), db: AsyncSession = Depends(get_db)):
    """
    Returns this-week earnings, average 6-month hourly rate, and 30-day verification ratio.
    """
    # Assuming JWT parsing extracts standard 'sub' claims, fallback to seed mock temporarily
    worker_id = user.get("sub", "W-1") 
    
    today = datetime.date.today()
    start_of_week = today - datetime.timedelta(days=today.weekday())
    six_months_ago = today - datetime.timedelta(days=180)
    thirty_days_ago = today - datetime.timedelta(days=30)
    
    stmt = select(
        func.sum(case((Shift.date >= start_of_week, Shift.net_received), else_=0)).label("week_earned"),
        func.sum(Shift.net_received).label("six_mo_net"),
        func.sum(Shift.hours_worked).label("six_mo_hours"),
        func.count(case((Shift.date >= thirty_days_ago, 1), else_=None)).label("month_shifts_total"),
        func.count(case(((Shift.date >= thirty_days_ago) & (Shift.is_verified == True), 1), else_=None)).label("month_shifts_verified")
    ).where(
        Shift.worker_id == worker_id,
        Shift.date >= six_months_ago
    )
    
    res = await db.execute(stmt)
    row = res.first()
    
    if not row or row.six_mo_net is None:
        return SummaryResponse(total_earned=0.0, total_hours=0.0, verified_ratio=0.0)
        
    hr_rate = float(row.six_mo_net) / float(row.six_mo_hours) if row.six_mo_hours and row.six_mo_hours > 0 else 0.0
    verified_ratio = float(row.month_shifts_verified) / float(row.month_shifts_total) if row.month_shifts_total else 1.0
    
    return SummaryResponse(
        total_earned=float(row.week_earned or 0.0),
        total_hours=hr_rate,
        verified_ratio=verified_ratio
    )

@router.get("/trends", response_model=TrendResponse, summary="Worker Earnings Trends")
@with_cache(ttl=60)
async def get_trends(granularity: str = Query("week"), user: dict = Depends(verify_jwt), db: AsyncSession = Depends(get_db)):
    """ Returns a 12-week charting time series grouped cleanly mapping weekly earnings peaks. """
    worker_id = user.get("sub", "W-1")
    start_date = datetime.date.today() - datetime.timedelta(weeks=12)
    
    group_col = get_db_literal_week(Shift.date)
    
    stmt = select(
        func.cast(group_col, String).label("period"),
        func.sum(Shift.net_received).label("earnings")
    ).where(
        Shift.worker_id == worker_id,
        Shift.date >= start_date
    ).group_by(group_col).order_by(group_col)
    
    res = await db.execute(stmt)
    rows = res.all()
    
    return TrendResponse(
        weeks=[str(r.period) for r in rows],
        earnings=[float(r.earnings) for r in rows]
    )

@router.get("/commission-tracker", response_model=CommissionTrackerResponse, summary="Worker Commission Tracker")
@with_cache(ttl=60)
async def get_commission_tracker(platform: str = Query("Uber"), user: dict = Depends(verify_jwt), db: AsyncSession = Depends(get_db)):
    """ Extracts average platform deductions ensuring platform isn't stealth-adjusting algorithms. """
    worker_id = user.get("sub", "W-1")
    twelve_weeks_ago = datetime.date.today() - datetime.timedelta(weeks=12)
    
    stmt = select(
        func.avg(Shift.platform_deductions / Shift.gross_earned).label("avg_pct")
    ).where(
        Shift.worker_id == worker_id,
        Shift.platform == platform,
        Shift.date >= twelve_weeks_ago,
        Shift.gross_earned > 0
    )
    
    res = await db.execute(stmt)
    val = res.scalar()
    avg_commission = float(val) * 100 if val else 0.0
    
    trend_tag = "stable" if avg_commission < 20.0 else "concerning"
        
    return CommissionTrackerResponse(
        platform=platform,
        average_commission=avg_commission,
        trend=trend_tag
    )

@router.get("/median-compare", response_model=MedianCompareResponse, summary="Worker vs City Median Compare")
@with_cache(ttl=60)
async def get_median_compare(zone: str = Query(...), category: str = Query(...), user: dict = Depends(verify_jwt), db: AsyncSession = Depends(get_db)):
    """ 
    Safely retrieves k-anonymized median net-per-hour bounding across Verified records internally resolving 
    dialectic differences across SQLite and Postgres databases utilizing local statistics arrays.
    """
    worker_id = user.get("sub", "W-1")
    thirty_days_ago = datetime.date.today() - datetime.timedelta(days=30)
    
    # 1. Protect cohort counting (k >= 5 distinct)
    count_stmt = select(func.count(Shift.worker_id.distinct())).where(
        Shift.zone == zone,
        Shift.category == category,
        Shift.is_verified == True,
        Shift.date >= thirty_days_ago
    )
    worker_count = (await db.execute(count_stmt)).scalar()
    
    if worker_count < 5:
        return MedianCompareResponse(cohort_too_small=True, worker_median=None, city_median=None, difference_pct=None)
        
    # 2. Extract strictly relevant city bounds natively computing Python statistics arrays dodging dialect errors
    city_stmt = select(
        (Shift.net_received / Shift.hours_worked).label("hr_rate")
    ).where(
        Shift.zone == zone,
        Shift.category == category,
        Shift.is_verified == True,
        Shift.date >= thirty_days_ago,
        Shift.hours_worked > 0
    )
    
    city_rates = [float(r) for r in (await db.execute(city_stmt)).scalars().all()]
    city_median = statistics.median(city_rates) if city_rates else 0.0
    
    # 3. Target Worker distinct calculations
    worker_stmt = select(
        (Shift.net_received / Shift.hours_worked).label("hr_rate")
    ).where(
        Shift.worker_id == worker_id,
        Shift.zone == zone,
        Shift.category == category,
        Shift.is_verified == True,
        Shift.date >= thirty_days_ago,
        Shift.hours_worked > 0
    )
    
    worker_rates = [float(r) for r in (await db.execute(worker_stmt)).scalars().all()]
    worker_median = statistics.median(worker_rates) if worker_rates else 0.0
    
    diff_pct = ((worker_median - city_median) / city_median * 100) if city_median > 0 else 0.0

    return MedianCompareResponse(
        cohort_too_small=False,
        worker_median=worker_median,
        city_median=city_median,
        difference_pct=diff_pct
    )
