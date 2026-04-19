"""
Advocate Analytics API
Endpoints: AA1 commission-trends, AA2 income-distribution, AA3 top-complaints, AA4 vulnerability
All data is fetched from Node backend APIs — no direct DB access.
"""
import datetime
import statistics
from collections import defaultdict
from typing import Optional

import pandas as pd
from fastapi import APIRouter, Depends, Query

from app.schemas.advocate import (
    CommissionTrendsResponse, PlatformWeekPoint,
    IncomeDistributionResponse, IncomePercentiles,
    TopComplaintsResponse, ComplaintCategory,
    VulnerabilityResponse, VulnerableWorker,
)
from app.api.deps import verify_jwt, require_roles
from app.core.cache import with_cache
from app.core.jobs import run_vulnerability_job, get_vulnerability_store
from app.core.obs import observe
from app.repositories.node_client import get_all_shifts, get_all_complaints

router = APIRouter()

ADVOCATE_TTL = 300
VULN_TTL = 900
K_MIN = 5


def _parse_date(s: dict) -> datetime.date | None:
    raw = s.get("shiftDate") or s.get("date") or s.get("shift_date") or s.get("createdAt") or ""
    try:
        return datetime.date.fromisoformat(str(raw)[:10])
    except (ValueError, TypeError):
        return None


# ─── AA1 — commission-trends ────────────────────────────────────────────────

@router.get("/commission-trends", response_model=CommissionTrendsResponse,
            summary="AA1 — Platform commission trend (line chart, 12 weeks)",
            dependencies=[Depends(verify_jwt)])
@observe("advocate.commission_trends")
@with_cache(ttl=ADVOCATE_TTL)
async def get_commission_trends():
    twelve_weeks_ago = datetime.date.today() - datetime.timedelta(weeks=12)
    shifts = await get_all_shifts(days=84)

    rows = []
    for s in shifts:
        d = _parse_date(s)
        if not d or d < twelve_weeks_ago:
            continue
        gross = float(s.get("grossPay") or s.get("grossEarned") or 0.0)
        deduct = float(s.get("deductions") or s.get("platformDeductions") or 0.0)
        if gross <= 0:
            continue
        rows.append({
            "platform": str(s.get("platformId") or s.get("platform") or "Unknown"),
            "date": d,
            "worker_id": str(s.get("workerId") or s.get("worker_id") or ""),
            "deduction_pct": deduct / gross * 100,
        })

    if not rows:
        return CommissionTrendsResponse(platforms={})

    df = pd.DataFrame(rows)
    df["date"] = pd.to_datetime(df["date"])
    df["week"] = df["date"].dt.to_period("W").astype(str)

    platforms: dict = {}
    for platform, grp in df.groupby("platform"):
        series = []
        for week, wg in grp.groupby("week"):
            cohort_size = wg["worker_id"].nunique()
            avg_pct = round(float(wg["deduction_pct"].mean()), 2) if cohort_size >= K_MIN else None
            series.append(PlatformWeekPoint(week=week, avg_deduction_pct=avg_pct, cohort_size=cohort_size))
        series.sort(key=lambda p: p.week)
        platforms[platform] = series

    return CommissionTrendsResponse(platforms=platforms)


# ─── AA2 — income-distribution ──────────────────────────────────────────────

@router.get("/income-distribution", response_model=IncomeDistributionResponse,
            summary="AA2 — Income distribution by city zone",
            dependencies=[Depends(verify_jwt)])
@observe("advocate.income_distribution")
@with_cache(ttl=ADVOCATE_TTL)
async def get_income_distribution(
    zone: Optional[str] = Query(None, description="Filter to a specific zone. Omit for city-wide."),
):
    thirty_days_ago = datetime.date.today() - datetime.timedelta(days=30)
    shifts = await get_all_shifts(days=30)

    worker_income: dict[str, float] = defaultdict(float)
    for s in shifts:
        d = _parse_date(s)
        if not d or d < thirty_days_ago:
            continue
        if zone and str(s.get("zone") or s.get("cityZoneId") or "") != zone:
            continue
        worker_id = str(s.get("workerId") or s.get("worker_id") or "")
        worker_income[worker_id] += float(s.get("netPay") or s.get("netReceived") or 0.0)

    worker_count = len(worker_income)
    if worker_count < K_MIN:
        return IncomeDistributionResponse(cohort_too_small=True, zone=zone, worker_count=worker_count)

    incomes = sorted(worker_income.values())

    def pct(p: float) -> float:
        idx = (len(incomes) - 1) * p
        lo, hi = int(idx), min(int(idx) + 1, len(incomes) - 1)
        return round(incomes[lo] + (incomes[hi] - incomes[lo]) * (idx - lo), 2)

    return IncomeDistributionResponse(
        cohort_too_small=False, zone=zone, worker_count=worker_count,
        percentiles=IncomePercentiles(
            p10=pct(0.10), p25=pct(0.25), p50=pct(0.50), p75=pct(0.75), p90=pct(0.90),
        ),
    )


# ─── AA3 — top-complaints ───────────────────────────────────────────────────

WINDOW_DAYS = {"7d": 7, "30d": 30, "90d": 90}


@router.get("/top-complaints", response_model=TopComplaintsResponse,
            summary="AA3 — Top complaint categories",
            dependencies=[Depends(verify_jwt)])
@observe("advocate.top_complaints")
@with_cache(ttl=ADVOCATE_TTL)
async def get_top_complaints(
    window: str = Query("7d", description="Time window: 7d, 30d, or 90d"),
):
    days = WINDOW_DAYS.get(window, 7)
    since = datetime.date.today() - datetime.timedelta(days=days)

    complaints = await get_all_complaints(days=days)
    in_window = [c for c in complaints if (d := _parse_date(c)) and d >= since]

    counts: dict[str, int] = defaultdict(int)
    for c in in_window:
        cat = str(c.get("category") or "Unknown")
        counts[cat] += 1

    total = sum(counts.values())
    top5 = sorted(counts.items(), key=lambda x: x[1], reverse=True)[:5]

    return TopComplaintsResponse(
        window=window,
        total_complaints=total,
        top_categories=[
            ComplaintCategory(
                category=cat,
                count=cnt,
                percentage=round(cnt / total * 100, 1) if total else 0.0,
            )
            for cat, cnt in top5
        ],
    )


# ─── AA4 — vulnerability ────────────────────────────────────────────────────

@router.get("/vulnerability", response_model=VulnerabilityResponse,
            summary="AA4 — Vulnerability flag list (anonymised, MoM income drop > 20%)",
            dependencies=[Depends(verify_jwt)])
@observe("advocate.vulnerability")
@with_cache(ttl=VULN_TTL)
async def get_vulnerability():
    flags, computed_at = get_vulnerability_store()

    if len(flags) < K_MIN:
        return VulnerabilityResponse(
            computed_at=computed_at,
            threshold_pct=20.0,
            vulnerable_count=len(flags),
            cohort_too_small=True,
            workers=[],
        )

    return VulnerabilityResponse(
        computed_at=computed_at,
        threshold_pct=20.0,
        vulnerable_count=len(flags),
        cohort_too_small=False,
        workers=[
            VulnerableWorker(
                anon_id=f["anon_id"],
                zone=f["zone"],
                category=f["category"],
                prior_month_income=f["prior_month_income"],
                current_month_income=f["current_month_income"],
                drop_pct=f["drop_pct"],
            )
            for f in flags
        ],
    )


# ─── Internal: refresh-vulnerability ────────────────────────────────────────

@router.post("/internal/refresh-vulnerability",
             summary="Force-refresh the vulnerability materialised view (admin/judge only)")
async def refresh_vulnerability(user: dict = Depends(require_roles("admin", "judge"))):
    return await run_vulnerability_job()


@router.post("/admin/run-vulnerability-job",
             summary="Alias: trigger nightly vulnerability job",
             dependencies=[Depends(require_roles("admin", "judge"))],
             include_in_schema=False)
async def trigger_vulnerability_job_compat():
    return await run_vulnerability_job()
