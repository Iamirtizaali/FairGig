from fastapi import APIRouter, Depends
from app.schemas.worker import SummaryResponse, TrendResponse, CommissionTrackerResponse, MedianCompareResponse
from app.api.deps import verify_jwt

router = APIRouter()

@router.get("/summary", response_model=SummaryResponse, summary="Worker Dashboard Summary")
async def get_summary(user: dict = Depends(verify_jwt)):
    return SummaryResponse(total_earned=0.0, total_hours=0.0, verified_ratio=0.0)

@router.get("/trends", response_model=TrendResponse, summary="Worker Earnings Trends")
async def get_trends(user: dict = Depends(verify_jwt)):
    return TrendResponse(weeks=[], earnings=[])

@router.get("/commission-tracker", response_model=CommissionTrackerResponse, summary="Worker Commission Tracker")
async def get_commission_tracker(user: dict = Depends(verify_jwt)):
    return CommissionTrackerResponse(average_commission=0.0, trend="neutral")

@router.get("/median-compare", response_model=MedianCompareResponse, summary="Worker vs City Median Compare")
async def get_median_compare(user: dict = Depends(verify_jwt)):
    return MedianCompareResponse(worker_median=0.0, city_median=0.0, difference_pct=0.0)
