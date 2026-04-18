from pydantic import BaseModel, Field
from typing import List, Optional

class SummaryResponse(BaseModel):
    total_earned: float = Field(..., description="Sum of net_received for the current week")
    total_hours: float = Field(..., description="Average hourly rate computed from trailing 6 months")
    verified_ratio: float = Field(..., description="Ratio of VERIFIED shifts vs total within the last 30 days")

class TrendResponse(BaseModel):
    weeks: List[str] = Field(..., description="Array of time periods logically grouped")
    earnings: List[float] = Field(..., description="Array of corresponding total net_received sums per period")

class CommissionTrackerResponse(BaseModel):
    platform: str = Field(..., description="The queried platform identifier")
    average_commission: float = Field(..., description="Average deduction percentage taken by the platform")
    trend: str = Field(..., description="Plain-language description of recent deduction bounds")

class MedianCompareResponse(BaseModel):
    cohort_too_small: bool = Field(..., description="Flag protecting K-Anonymity privacy blocks")
    worker_median: Optional[float] = Field(None, description="Worker's personal median. Null if cohort_too_small=true")
    city_median: Optional[float] = Field(None, description="Overall city-wide median. Null if cohort_too_small=true")
    difference_pct: Optional[float] = Field(None, description="Worker percentage delta against the city median")
