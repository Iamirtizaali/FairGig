import datetime
import statistics
from collections import defaultdict

import pandas as pd
from fastapi import APIRouter, Depends

from app.schemas.kpis import CityMedianResponse, AdvocateKpisResponse, ZoneDistribution
from app.api.deps import verify_jwt
from app.repositories.node_client import get_all_shifts, get_all_complaints

router = APIRouter()


def _parse_date(s: dict) -> datetime.date | None:
    raw = s.get("shiftDate") or s.get("date") or s.get("shift_date") or s.get("createdAt") or ""
    try:
        return datetime.date.fromisoformat(str(raw)[:10])
    except (ValueError, TypeError):
        return None


@router.get("/benchmark/city-median", summary="Get City Median Benchmark (WA4)", response_model=CityMedianResponse)
async def get_city_median(category: str, zone: str):
    shifts = await get_all_shifts(days=180)

    cohort = [
        s for s in shifts
        if str(s.get("verificationStatus") or "").lower() == "verified"
        and str(s.get("zone") or s.get("cityZoneId") or "") == zone
        and str(s.get("platformId") or s.get("platform") or s.get("category") or "") == category
    ]

    distinct_workers = len({s.get("workerId") or s.get("worker_id") for s in cohort})
    if distinct_workers < 5:
        return CityMedianResponse(
            cohort_too_small=True, worker_count=distinct_workers,
            category=category, zone=zone, median_hourly_rate=0.0,
        )

    rates = []
    for s in cohort:
        net = float(s.get("netPay") or s.get("netReceived") or 0.0)
        hrs = float(s.get("hoursWorked") or 0.0)
        if hrs > 0:
            rates.append(net / hrs)

    return CityMedianResponse(
        cohort_too_small=False, worker_count=distinct_workers,
        category=category, zone=zone,
        median_hourly_rate=round(statistics.median(rates), 2) if rates else 0.0,
    )


@router.get("/advocate/kpis", summary="Advocate KPI Dashboard (AA1-AA4)",
            response_model=AdvocateKpisResponse, dependencies=[Depends(verify_jwt)])
async def get_advocate_kpis():
    today = datetime.date.today()
    twelve_weeks_ago = today - datetime.timedelta(weeks=12)
    thirty_days_ago = today - datetime.timedelta(days=30)
    sixty_days_ago = today - datetime.timedelta(days=60)
    start_of_week = today - datetime.timedelta(days=today.weekday())

    shifts = await get_all_shifts(days=90)
    complaints = await get_all_complaints(days=7)

    # --- AA1: commission trend per week ---
    comm_rows = []
    for s in shifts:
        d = _parse_date(s)
        if not d or d < twelve_weeks_ago:
            continue
        gross = float(s.get("grossPay") or s.get("grossEarned") or 0.0)
        deduct = float(s.get("deductions") or s.get("platformDeductions") or 0.0)
        if gross > 0:
            comm_rows.append({"date": d, "pct": deduct / gross * 100})

    trend_dict: dict[str, float] = {}
    if comm_rows:
        df = pd.DataFrame(comm_rows)
        df["date"] = pd.to_datetime(df["date"])
        df["week"] = df["date"].dt.to_period("W").astype(str)
        agg = df.groupby("week")["pct"].mean()
        trend_dict = {str(k): round(float(v), 2) for k, v in agg.items()}

    # --- AA2: income distribution by zone ---
    zone_income: dict[str, list[float]] = defaultdict(list)
    for s in shifts:
        d = _parse_date(s)
        if not d or d < thirty_days_ago:
            continue
        zone = str(s.get("zone") or s.get("cityZoneId") or "Unknown")
        net = float(s.get("netPay") or s.get("netReceived") or 0.0)
        zone_income[zone].append(net)

    distribution: dict[str, ZoneDistribution] = {}
    for zone, vals in zone_income.items():
        if not vals:
            continue
        s = pd.Series(vals)
        distribution[zone] = ZoneDistribution(
            p10=round(float(s.quantile(0.10)), 2),
            p25=round(float(s.quantile(0.25)), 2),
            p50=round(float(s.quantile(0.50)), 2),
            p75=round(float(s.quantile(0.75)), 2),
            p90=round(float(s.quantile(0.90)), 2),
        )

    # --- AA3: top complaint categories this week ---
    week_complaints = [
        c for c in complaints
        if (d := _parse_date(c)) and d >= start_of_week
    ]
    cat_counts: dict[str, int] = defaultdict(int)
    for c in week_complaints:
        cat_counts[str(c.get("category") or "Unknown")] += 1

    top_categories = [
        {"category": cat, "count": cnt, "avg_commission_pct": 0.0}
        for cat, cnt in sorted(cat_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    ]

    # --- AA4: vulnerability (MoM drop > 20%) ---
    recent_net: dict[str, float] = defaultdict(float)
    prior_net: dict[str, float] = defaultdict(float)
    for s in shifts:
        d = _parse_date(s)
        if not d:
            continue
        wid = str(s.get("workerId") or s.get("worker_id") or "")
        net = float(s.get("netPay") or s.get("netReceived") or 0.0)
        if d >= thirty_days_ago:
            recent_net[wid] += net
        elif d >= sixty_days_ago:
            prior_net[wid] += net

    vulnerable_ids = [
        wid for wid, recent in recent_net.items()
        if (prior := prior_net.get(wid, 0)) > 0
        and ((prior - recent) / prior * 100) >= 20.0
    ]

    return AdvocateKpisResponse(
        commission_trends=trend_dict,
        income_distribution_percentiles=distribution,
        vulnerable_workers_flagged=vulnerable_ids,
        top_complaint_categories=top_categories,
    )
