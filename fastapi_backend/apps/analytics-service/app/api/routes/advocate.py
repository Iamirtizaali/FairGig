"""
Advocate Analytics API — Sprint 3
Endpoints: AA1 commission-trends, AA2 income-distribution, AA3 top-complaints
           + admin trigger for vulnerability job + AA4 vulnerability read
"""
import datetime
import statistics
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import pandas as pd

from app.schemas.advocate import (
    CommissionTrendsResponse, PlatformWeekPoint,
    IncomeDistributionResponse, IncomePercentiles,
    TopComplaintsResponse, ComplaintCategory,
    VulnerabilityResponse, VulnerableWorker,
)
from app.api.deps import verify_jwt
from app.repositories.database import get_db, Shift, Complaint, VulnerabilityFlag
from app.core.cache import with_cache
from app.core.jobs import run_vulnerability_job

router = APIRouter()

ADVOCATE_TTL = 300  # 5 minutes — advocate KPIs change slowly

# ─────────────────────────────────────────────────────────────────────────────
# AA1 — GET /advocate/commission-trends
# ─────────────────────────────────────────────────────────────────────────────

@router.get(
    "/commission-trends",
    response_model=CommissionTrendsResponse,
    summary="AA1 — Platform commission trend (line chart, 12 weeks)",
    dependencies=[Depends(verify_jwt)],
)
@with_cache(ttl=ADVOCATE_TTL)
async def get_commission_trends(db: AsyncSession = Depends(get_db)):
    """
    Computes per-platform average deduction % per week over the last 12 weeks.
    K-anonymity: cells with fewer than 5 distinct workers get avg_deduction_pct=null.
    Response includes cohort_size per point so the frontend can show confidence.
    """
    twelve_weeks_ago = datetime.date.today() - datetime.timedelta(weeks=12)

    stmt = select(
        Shift.platform,
        Shift.date,
        Shift.worker_id,
        (Shift.platform_deductions / Shift.gross_earned * 100).label("deduction_pct"),
    ).where(Shift.date >= twelve_weeks_ago, Shift.gross_earned > 0)

    rows = (await db.execute(stmt)).all()
    if not rows:
        return CommissionTrendsResponse(platforms={})

    df = pd.DataFrame(rows, columns=["platform", "date", "worker_id", "deduction_pct"])
    df["date"] = pd.to_datetime(df["date"])
    df["week"] = df["date"].dt.to_period("W").astype(str)

    platforms: dict = {}
    for platform, grp in df.groupby("platform"):
        series = []
        for week, week_grp in grp.groupby("week"):
            cohort_size = week_grp["worker_id"].nunique()
            avg_pct = round(float(week_grp["deduction_pct"].mean()), 2) if cohort_size >= 5 else None
            series.append(PlatformWeekPoint(week=week, avg_deduction_pct=avg_pct, cohort_size=cohort_size))
        series.sort(key=lambda p: p.week)
        platforms[platform] = series

    return CommissionTrendsResponse(platforms=platforms)


# ─────────────────────────────────────────────────────────────────────────────
# AA2 — GET /advocate/income-distribution
# ─────────────────────────────────────────────────────────────────────────────

@router.get(
    "/income-distribution",
    response_model=IncomeDistributionResponse,
    summary="AA2 — Income distribution by city zone (box/violin data)",
    dependencies=[Depends(verify_jwt)],
)
@with_cache(ttl=ADVOCATE_TTL)
async def get_income_distribution(
    zone: Optional[str] = Query(None, description="Filter to a specific zone. Omit for city-wide."),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns percentile distribution (p10/p25/p50/p75/p90) of monthly net income
    per worker in the requested zone (or city-wide if zone is omitted).
    K-anonymity: if cohort < 5 distinct workers, returns cohort_too_small=True.
    """
    thirty_days_ago = datetime.date.today() - datetime.timedelta(days=30)

    # Count distinct workers first
    count_stmt = select(func.count(Shift.worker_id.distinct())).where(Shift.date >= thirty_days_ago)
    if zone:
        count_stmt = count_stmt.where(Shift.zone == zone)
    worker_count = (await db.execute(count_stmt)).scalar() or 0

    if worker_count < 5:
        return IncomeDistributionResponse(
            cohort_too_small=True, zone=zone, worker_count=worker_count
        )

    # Monthly income per worker
    income_stmt = (
        select(Shift.worker_id, func.sum(Shift.net_received).label("monthly_income"))
        .where(Shift.date >= thirty_days_ago)
        .group_by(Shift.worker_id)
    )
    if zone:
        income_stmt = income_stmt.where(Shift.zone == zone)

    incomes = [float(r.monthly_income) for r in (await db.execute(income_stmt)).all()]
    incomes.sort()

    def pct(p: float):
        idx = (len(incomes) - 1) * p
        lo, hi = int(idx), min(int(idx) + 1, len(incomes) - 1)
        return round(incomes[lo] + (incomes[hi] - incomes[lo]) * (idx - lo), 2)

    return IncomeDistributionResponse(
        cohort_too_small=False,
        zone=zone,
        worker_count=worker_count,
        percentiles=IncomePercentiles(
            p10=pct(0.10), p25=pct(0.25), p50=pct(0.50),
            p75=pct(0.75), p90=pct(0.90),
        ),
    )


# ─────────────────────────────────────────────────────────────────────────────
# AA3 — GET /advocate/top-complaints
# ─────────────────────────────────────────────────────────────────────────────

WINDOW_DAYS = {"7d": 7, "30d": 30, "90d": 90}

@router.get(
    "/top-complaints",
    response_model=TopComplaintsResponse,
    summary="AA3 — Top complaint categories (cross-schema grievance read)",
    dependencies=[Depends(verify_jwt)],
)
@with_cache(ttl=ADVOCATE_TTL)
async def get_top_complaints(
    window: str = Query("7d", description="Time window: 7d, 30d, or 90d"),
    db: AsyncSession = Depends(get_db),
):
    """
    Reads from grievance.complaints (simulated locally as the complaints table).
    In production, analytics_reader has cross-schema SELECT on grievance.complaints.
    Groups by category within the time window and returns top 5 with counts.
    """
    days = WINDOW_DAYS.get(window, 7)
    since = datetime.date.today() - datetime.timedelta(days=days)

    stmt = (
        select(Complaint.category, func.count(Complaint.id).label("cnt"))
        .where(Complaint.created_at >= since)
        .group_by(Complaint.category)
        .order_by(func.count(Complaint.id).desc())
        .limit(5)
    )
    rows = (await db.execute(stmt)).all()

    total_stmt = select(func.count(Complaint.id)).where(Complaint.created_at >= since)
    total = (await db.execute(total_stmt)).scalar() or 0

    categories = [
        ComplaintCategory(
            category=r.category,
            count=r.cnt,
            percentage=round(r.cnt / total * 100, 1) if total else 0.0
        )
        for r in rows
    ]

    return TopComplaintsResponse(window=window, total_complaints=total, top_categories=categories)


# ─────────────────────────────────────────────────────────────────────────────
# AA4 — GET /advocate/vulnerability  (reads from materialized view)
# ─────────────────────────────────────────────────────────────────────────────

@router.get(
    "/vulnerability",
    response_model=VulnerabilityResponse,
    summary="AA4 — Vulnerability flag list (MoM income drop > 20%)",
    dependencies=[Depends(verify_jwt)],
)
async def get_vulnerability(db: AsyncSession = Depends(get_db)):
    """
    Reads from the vulnerability_flags materialized view populated by the
    nightly scheduled job. Returns workers with > 20% MoM income drop.
    """
    rows = (await db.execute(select(VulnerabilityFlag))).scalars().all()
    computed_at = rows[0].computed_at.isoformat() if rows else "never"

    return VulnerabilityResponse(
        computed_at=computed_at,
        threshold_pct=20.0,
        vulnerable_count=len(rows),
        workers=[
            VulnerableWorker(
                worker_id=r.worker_id,
                zone=r.zone,
                category=r.category,
                prior_month_income=r.prior_month_income,
                current_month_income=r.current_month_income,
                drop_pct=r.drop_pct,
            )
            for r in rows
        ],
    )


# ─────────────────────────────────────────────────────────────────────────────
# Admin — POST /advocate/admin/run-vulnerability-job
# ─────────────────────────────────────────────────────────────────────────────

@router.post(
    "/admin/run-vulnerability-job",
    summary="Manually trigger the nightly vulnerability flag job (admin/judge only)",
    dependencies=[Depends(verify_jwt)],
)
async def trigger_vulnerability_job():
    """
    In production this runs nightly via Render scheduled jobs.
    Judges and admins can trigger it manually for testing.
    """
    result = await run_vulnerability_job()
    return result
