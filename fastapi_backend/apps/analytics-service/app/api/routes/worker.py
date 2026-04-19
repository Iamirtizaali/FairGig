import datetime
import statistics

import pandas as pd
from fastapi import APIRouter, Depends, Query, Request

from app.schemas.worker import (
    CommissionTrackerResponse,
    MedianCompareResponse,
    SummaryPoint,
    SummaryResponse,
    TrendResponse,
)
from app.api.deps import verify_jwt
from app.core.cache import with_cache
from app.repositories.node_client import get_worker_shifts

router = APIRouter()


def _bearer(request: Request) -> str:
    return (request.headers.get("Authorization") or "").removeprefix("Bearer ").strip()


def _parse_shift_date(s: dict) -> datetime.date | None:
    raw = s.get("shiftDate") or s.get("date") or s.get("shift_date", "")
    try:
        return datetime.date.fromisoformat(str(raw)[:10])
    except (ValueError, TypeError):
        return None


@router.get("/summary", response_model=SummaryResponse, summary="Worker Dashboard Summary")
@with_cache(ttl=60)
async def get_summary(request: Request, user: dict = Depends(verify_jwt)):
    today = datetime.date.today()
    start_of_week = today - datetime.timedelta(days=today.weekday())
    start_of_month = today.replace(day=1)
    six_months_ago = today - datetime.timedelta(days=180)
    thirty_days_ago = today - datetime.timedelta(days=30)

    shifts = await get_worker_shifts(_bearer(request))

    rows = [s for s in shifts if (d := _parse_shift_date(s)) and d >= six_months_ago]
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

    def net(s: dict) -> float:
        return float(s.get("netPay") or s.get("net_pay") or s.get("netReceived") or 0.0)

    def hours(s: dict) -> float:
        return float(s.get("hoursWorked") or s.get("hours_worked") or 0.0)

    def verified(s: dict) -> bool:
        status = s.get("verificationStatus") or s.get("verification_status") or ""
        return str(status).lower() == "verified"

    six_mo_net = sum(net(s) for s in rows)
    six_mo_hours = sum(hours(s) for s in rows)
    week_earned = sum(net(s) for s in rows if _parse_shift_date(s) >= start_of_week)
    month_earned = sum(net(s) for s in rows if _parse_shift_date(s) >= start_of_month)

    month_rows = [s for s in rows if _parse_shift_date(s) >= thirty_days_ago]
    month_verified = sum(1 for s in month_rows if verified(s))
    verified_ratio = month_verified / len(month_rows) if month_rows else 0.0
    hr_rate = six_mo_net / six_mo_hours if six_mo_hours > 0 else 0.0

    return SummaryResponse(
        this_week_earnings=week_earned,
        this_month_earnings=month_earned,
        average_hourly_rate=hr_rate,
        verification_percentage=verified_ratio * 100.0,
        total_earned=week_earned,
        total_hours=hr_rate,
        verified_ratio=verified_ratio,
    )


@router.get("/trend", response_model=TrendResponse, summary="Worker Earnings Trends")
@router.get("/trends", response_model=TrendResponse, summary="Worker Earnings Trends (legacy alias)")
@with_cache(ttl=60)
async def get_trends(
    request: Request,
    granularity: str = Query("week"),
    user: dict = Depends(verify_jwt),
):
    today = datetime.date.today()
    if granularity == "month":
        start_date = today - datetime.timedelta(days=365)
    else:
        start_date = today - datetime.timedelta(weeks=12)

    shifts = await get_worker_shifts(_bearer(request))
    rows = [
        {"date": _parse_shift_date(s), "net": float(s.get("netPay") or s.get("netReceived") or 0.0)}
        for s in shifts
        if (d := _parse_shift_date(s)) and d >= start_date
    ]

    if not rows:
        return TrendResponse(granularity=granularity, periods=[], earnings=[], series=[], weeks=[])

    df = pd.DataFrame(rows)
    df["date"] = pd.to_datetime(df["date"])
    if granularity == "month":
        df["period"] = df["date"].dt.to_period("M").astype(str)
    else:
        df["period"] = df["date"].dt.to_period("W").astype(str)

    agg = df.groupby("period")["net"].sum().sort_index()
    periods = list(agg.index.astype(str))
    earnings = [round(float(v), 2) for v in agg.values]

    return TrendResponse(
        granularity=granularity,
        periods=periods,
        earnings=earnings,
        series=[SummaryPoint(label=p, earnings=e) for p, e in zip(periods, earnings)],
        weeks=periods,
    )


@router.get("/commission-tracker", response_model=CommissionTrackerResponse, summary="Worker Commission Tracker")
@with_cache(ttl=60)
async def get_commission_tracker(
    request: Request,
    platform: str = Query("Uber"),
    user: dict = Depends(verify_jwt),
):
    twelve_weeks_ago = datetime.date.today() - datetime.timedelta(weeks=12)
    shifts = await get_worker_shifts(_bearer(request))

    rows = []
    for s in shifts:
        d = _parse_shift_date(s)
        if not d or d < twelve_weeks_ago:
            continue
        gross = float(s.get("grossPay") or s.get("gross_pay") or s.get("grossEarned") or 0.0)
        deduct = float(s.get("deductions") or s.get("platform_deductions") or 0.0)
        if gross <= 0:
            continue
        week_label = str((d - datetime.timedelta(days=d.weekday())).isoformat())
        plat = str(s.get("platformId") or s.get("platform") or "Unknown")
        rows.append({"platform": plat, "week": week_label, "pct": deduct / gross * 100})

    platform_series: dict[str, list[tuple[str, float]]] = {}
    for row in rows:
        platform_series.setdefault(row["platform"], []).append((row["week"], row["pct"]))

    structured_series = {
        name: [SummaryPoint(label=w, earnings=v) for w, v in values]
        for name, values in platform_series.items()
    }
    req_values = [v for n, vals in platform_series.items() if n == platform for _, v in vals]
    avg_commission = sum(req_values) / len(req_values) if req_values else 0.0
    trend_tag = "stable" if avg_commission < 20.0 else "concerning"

    return CommissionTrackerResponse(
        platform=platform,
        average_commission=avg_commission,
        trend=trend_tag,
        platform_series=structured_series,
    )


@router.get("/median-compare", response_model=MedianCompareResponse, summary="Worker vs City Median Compare")
@with_cache(ttl=60)
async def get_median_compare(
    request: Request,
    zone: str = Query(...),
    category: str = Query(...),
    user: dict = Depends(verify_jwt),
):
    from app.repositories.node_client import get_all_shifts

    thirty_days_ago = datetime.date.today() - datetime.timedelta(days=30)
    worker_id = user.get("sub", "")

    all_shifts = await get_all_shifts(days=30)

    def hr_rate(s: dict) -> float | None:
        net = float(s.get("netPay") or s.get("netReceived") or 0.0)
        hrs = float(s.get("hoursWorked") or 0.0)
        return net / hrs if hrs > 0 else None

    cohort = [
        s for s in all_shifts
        if (d := _parse_shift_date(s)) and d >= thirty_days_ago
        and str(s.get("zone") or s.get("cityZoneId") or "") == zone
        and str(s.get("platformId") or s.get("platform") or s.get("category") or "") == category
        and str(s.get("verificationStatus") or "").lower() == "verified"
    ]
    distinct_workers = len({s.get("workerId") or s.get("worker_id") for s in cohort})

    if distinct_workers < 5:
        return MedianCompareResponse(
            cohort_too_small=True, worker_median=None, city_median=None,
            difference_pct=None, category=category, zone=zone, sample_size=distinct_workers,
        )

    city_rates = [r for s in cohort if (r := hr_rate(s)) is not None]
    city_median = statistics.median(city_rates) if city_rates else 0.0

    worker_shifts = [s for s in cohort if str(s.get("workerId") or s.get("worker_id") or "") == worker_id]
    worker_rates = [r for s in worker_shifts if (r := hr_rate(s)) is not None]
    worker_median = statistics.median(worker_rates) if worker_rates else 0.0

    diff_pct = ((worker_median - city_median) / city_median * 100) if city_median > 0 else 0.0

    return MedianCompareResponse(
        cohort_too_small=False, worker_median=worker_median, city_median=city_median,
        difference_pct=diff_pct, category=category, zone=zone, sample_size=distinct_workers,
    )
