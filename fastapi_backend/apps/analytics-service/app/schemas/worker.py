from pydantic import BaseModel
from typing import Dict, List

class SummaryResponse(BaseModel):
    total_earned: float
    total_hours: float
    verified_ratio: float

class TrendResponse(BaseModel):
    weeks: List[str]
    earnings: List[float]

class CommissionTrackerResponse(BaseModel):
    average_commission: float
    trend: str

class MedianCompareResponse(BaseModel):
    worker_median: float
    city_median: float
    difference_pct: float
