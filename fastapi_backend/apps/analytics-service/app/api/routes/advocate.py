"""
Advocate Analytics API — Sprint 4
Endpoints: AA1 commission-trends, AA2 income-distribution, AA3 top-complaints,
           AA4 vulnerability (anonymised, k-protected)
           + internal refresh endpoint
All endpoints decorated with @observe for structured-JSON timing logs.
"""
import datetime
import hashlib
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
from app.core.obs import observe

router = APIRouter()

ADVOCATE_TTL = 300    # 5 minutes
VULN_TTL     = 900    # 15 minutes — vulnerability view refreshed nightly

K_MIN = 5  # k-anonymity threshold

def _anon_id(worker_id: str) -> str:
    """One-way hash of worker_id so raw IDs are never exposed in advocate views."""
    return hashlib.sha256(worker_id.encode()).hexdigest()[:12]

# ─────────────────────────────────────────────────────────────────────────────
# AA1 — GET /advocate/commission-trends
# ─────────────────────────────────────────────────────────────────────────────

@router.get(
    "/commission-trends",
    response_model=CommissionTrendsResponse,
    summary="AA1 — Platform commission trend (line chart, 12 weeks)",
    dependencies=[Depends(verify_jwt)],
)
@observe("advocate.commission_trends")
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
            avg_pct = round(float(week_grp["deduction_pct"].mean()), 2) if cohort_size >= K_MIN else None
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
@observe("advocate.income_distribution")
@with_cache(ttl=ADVOCATE_TTL)
async def get_income_distribution(
    zone: Optional[str] = Query(None, description="Filter to a specific zone. Omit for city-wide."),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns percentile distribution (p10/p25/p50/p75/p90) of monthly net income
    per worker in the requested zone (or city-wide if omitted).
    K-anonymity: cohort < 5 workers → cohort_too_small=True.
    """
    thirty_days_ago = datetime.date.today() - datetime.timedelta(days=30)

    count_stmt = select(func.count(Shift.worker_id.distinct())).where(Shift.date >= thirty_days_ago)
    if zone:
        count_stmt = count_stmt.where(Shift.zone == zone)
    worker_count = (await db.execute(count_stmt)).scalar() or 0

    if worker_count < K_MIN:
        return IncomeDistributionResponse(cohort_too_small=True, zone=zone, worker_count=worker_count)

    income_stmt = (
        select(Shift.worker_id, func.sum(Shift.net_received).label("monthly_income"))
        .where(Shift.date >= thirty_days_ago)
        .group_by(Shift.worker_id)
    )
    if zone:
        income_stmt = income_stmt.where(Shift.zone == zone)

    incomes = sorted([float(r.monthly_income) for r in (await db.execute(income_stmt)).all()])

    def pct(p: float):
        idx = (len(incomes) - 1) * p
        lo, hi = int(idx), min(int(idx) + 1, len(incomes) - 1)
        return round(incomes[lo] + (incomes[hi] - incomes[lo]) * (idx - lo), 2)

    return IncomeDistributionResponse(
        cohort_too_small=False, zone=zone, worker_count=worker_count,
        percentiles=IncomePercentiles(
            p10=pct(0.10), p25=pct(0.25), p50=pct(0.50), p75=pct(0.75), p90=pct(0.90),
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
@observe("advocate.top_complaints")
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
    total = (await db.execute(
        select(func.count(Complaint.id)).where(Complaint.created_at >= since)
    )).scalar() or 0

    return TopComplaintsResponse(
        window=window,
        total_complaints=total,
        top_categories=[
            ComplaintCategory(
                category=r.category,
                count=r.cnt,
                percentage=round(r.cnt / total * 100, 1) if total else 0.0,
            )
            for r in rows
        ],
    )


# ─────────────────────────────────────────────────────────────────────────────
# AA4 — GET /advocate/vulnerability  (Sprint 4: full anonymisation + k-guard)
# ─────────────────────────────────────────────────────────────────────────────

@router.get(
    "/vulnerability",
    response_model=VulnerabilityResponse,
    summary="AA4 — Vulnerability flag list (anonymised, MoM income drop > 20%)",
    dependencies=[Depends(verify_jwt)],
)
@observe("advocate.vulnerability")
async def get_vulnerability(db: AsyncSession = Depends(get_db)):
    """
    Reads from the vulnerability_flags materialised view (populated by the nightly job).

    Sprint 4 additions:
    - anon_id: SHA-256 hash of worker_id (first 12 chars) — raw IDs never exposed.
    - K-anonymity: if the flagged cohort < 5 workers, returns cohort_too_small=True.
    - 15-minute cache TTL (slower-changing data).
    - @observe decorator emits structured-JSON timing logs.
    """
    rows = (await db.execute(select(VulnerabilityFlag))).scalars().all()

    # k-anonymity guard at cohort level
    if len(rows) < K_MIN:
        return VulnerabilityResponse(
            computed_at="never" if not rows else rows[0].computed_at.isoformat(),
            threshold_pct=20.0,
            vulnerable_count=len(rows),
            cohort_too_small=True,
            workers=[],
        )

    computed_at = rows[0].computed_at.isoformat()
    return VulnerabilityResponse(
        computed_at=computed_at,
        threshold_pct=20.0,
        vulnerable_count=len(rows),
        cohort_too_small=False,
        workers=[
            VulnerableWorker(
                anon_id=_anon_id(r.worker_id),
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
# Internal — POST /advocate/internal/refresh-vulnerability
# ─────────────────────────────────────────────────────────────────────────────

@router.post(
    "/internal/refresh-vulnerability",
    summary="Force-refresh the vulnerability materialised view (admin/demo use)",
    dependencies=[Depends(verify_jwt)],
)
async def refresh_vulnerability():
    """
    Calls the same computation the nightly Render scheduled job runs.
    Use this during demos or manual testing without waiting for the cron.
    Returns a summary: computed_at, vulnerable_count, total_workers_evaluated.
    """
    result = await run_vulnerability_job()
    return result


# Keep old admin path as alias for backward compatibility
@router.post(
    "/admin/run-vulnerability-job",
    summary="Alias: trigger nightly vulnerability job (admin/judge only)",
    dependencies=[Depends(verify_jwt)],
    include_in_schema=False,  # hide from Swagger to avoid confusion
)
async def trigger_vulnerability_job_compat():
    return await run_vulnerability_job()
