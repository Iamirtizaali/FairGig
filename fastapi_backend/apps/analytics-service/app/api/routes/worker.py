from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case, text, String
import datetime
import statistics
import pandas as pd

from app.schemas.worker import SummaryResponse, TrendResponse, CommissionTrackerResponse, MedianCompareResponse, SummaryPoint
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
    Returns this-week earnings, this-month earnings, average hourly rate, and verification percentage.
    """
    # Assuming JWT parsing extracts standard 'sub' claims, fallback to seed mock temporarily
    worker_id = user.get("sub", "W-1") 
    
    today = datetime.date.today()
    start_of_week = today - datetime.timedelta(days=today.weekday())
    start_of_month = today.replace(day=1)
    six_months_ago = today - datetime.timedelta(days=180)
    thirty_days_ago = today - datetime.timedelta(days=30)
    
    stmt = select(Shift.date, Shift.net_received, Shift.hours_worked, Shift.is_verified).where(
        Shift.worker_id == worker_id,
        Shift.date >= six_months_ago,
    )

    rows = (await db.execute(stmt)).all()
    if not rows:
        return SummaryResponse(
            this_week_earnings=0.0,
            this_month_earnings=0.0,
            average_hourly_rate=0.0,
            verification_percentage=0.0,
            total_earned=0.0,
            total_hours=0.0,
            verified_ratio=0.0,
        )

    six_mo_net = sum(float(row.net_received or 0.0) for row in rows)
    six_mo_hours = sum(float(row.hours_worked or 0.0) for row in rows)
    week_earned = sum(float(row.net_received or 0.0) for row in rows if row.date >= start_of_week)
    month_earned = sum(float(row.net_received or 0.0) for row in rows if row.date >= start_of_month)
    month_total = sum(1 for row in rows if row.date >= thirty_days_ago)
    month_verified = sum(1 for row in rows if row.date >= thirty_days_ago and row.is_verified)

    hr_rate = float(six_mo_net) / float(six_mo_hours) if six_mo_hours > 0 else 0.0
    verified_ratio = float(month_verified) / float(month_total) if month_total else 0.0
    
    return SummaryResponse(
        this_week_earnings=float(week_earned),
        this_month_earnings=float(month_earned),
        average_hourly_rate=hr_rate,
        verification_percentage=verified_ratio * 100.0,
        total_earned=float(week_earned),
        total_hours=hr_rate,
        verified_ratio=verified_ratio,
    )

@router.get("/trend", response_model=TrendResponse, summary="Worker Earnings Trends")
@router.get("/trends", response_model=TrendResponse, summary="Worker Earnings Trends (legacy alias)")
@with_cache(ttl=60)
async def get_trends(granularity: str = Query("week"), user: dict = Depends(verify_jwt), db: AsyncSession = Depends(get_db)):
    """Returns a 12-period time series for charting. Supports week or month granularity."""
    worker_id = user.get("sub", "W-1")
    today = datetime.date.today()
    if granularity == "month":
        start_date = today - datetime.timedelta(days=365)
        group_col = func.strftime("%Y-%m", Shift.date) if engine.name == "sqlite" else func.to_char(Shift.date, "YYYY-MM")
    else:
        start_date = today - datetime.timedelta(weeks=12)
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
        granularity=granularity,
        periods=[str(r.period) for r in rows],
        earnings=[float(r.earnings) for r in rows],
        series=[SummaryPoint(label=str(r.period), earnings=float(r.earnings)) for r in rows],
        weeks=[str(r.period) for r in rows],
    )

@router.get("/commission-tracker", response_model=CommissionTrackerResponse, summary="Worker Commission Tracker")
@with_cache(ttl=60)
async def get_commission_tracker(platform: str = Query("Uber"), user: dict = Depends(verify_jwt), db: AsyncSession = Depends(get_db)):
    """Returns the requested platform's average commission plus a full 12-week per-platform series."""
    worker_id = user.get("sub", "W-1")
    twelve_weeks_ago = datetime.date.today() - datetime.timedelta(weeks=12)
    
    stmt = select(
        Shift.platform,
        Shift.date,
        (Shift.platform_deductions / Shift.gross_earned * 100).label("avg_pct")
    ).where(
        Shift.worker_id == worker_id,
        Shift.date >= twelve_weeks_ago,
        Shift.gross_earned > 0
    )
    
    rows = (await db.execute(stmt)).all()
    platform_series: dict[str, list[tuple[str, float]]] = {}
    for row in rows:
        week_label = str((row.date - datetime.timedelta(days=row.date.weekday())).isoformat())
        platform_series.setdefault(row.platform, []).append((week_label, float(row.avg_pct)))

    structured_series = {
        name: [SummaryPoint(label=week, earnings=value) for week, value in values]
        for name, values in platform_series.items()
    }

    requested_values = [value for name, values in platform_series.items() if name == platform for _, value in values]
    avg_commission = sum(requested_values) / len(requested_values) if requested_values else 0.0
    trend_tag = "stable" if avg_commission < 20.0 else "concerning"

    return CommissionTrackerResponse(
        platform=platform,
        average_commission=avg_commission,
        trend=trend_tag,
        platform_series=structured_series,
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
        return MedianCompareResponse(
            cohort_too_small=True,
            worker_median=None,
            city_median=None,
            difference_pct=None,
            category=category,
            zone=zone,
            sample_size=worker_count,
        )
        
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
        difference_pct=diff_pct,
        category=category,
        zone=zone,
        sample_size=worker_count,
    )
