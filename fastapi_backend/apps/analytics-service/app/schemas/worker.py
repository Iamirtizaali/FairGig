from pydantic import BaseModel, Field
from typing import Dict, List, Optional

class SummaryPoint(BaseModel):
    label: str = Field(..., description="Period label, e.g. 2026-W14 or 2026-04")
    earnings: float = Field(..., description="Net earnings for that period")

class SummaryResponse(BaseModel):
    this_week_earnings: float = Field(..., description="Net earnings earned in the current week")
    this_month_earnings: float = Field(..., description="Net earnings earned in the current month")
    average_hourly_rate: float = Field(..., description="Net earnings divided by hours worked over the trailing 6 months")
    verification_percentage: float = Field(..., description="VERIFIED shifts as a percentage of all shifts in the last 30 days")
    total_earned: float = Field(..., description="Legacy alias for this_week_earnings")
    total_hours: float = Field(..., description="Legacy alias for average_hourly_rate")
    verified_ratio: float = Field(..., description="Legacy alias for verification_percentage as a 0-1 ratio")

class TrendResponse(BaseModel):
    granularity: str = Field(..., description="Requested granularity: week or month")
    periods: List[str] = Field(..., description="Array of time periods logically grouped")
    earnings: List[float] = Field(..., description="Array of corresponding total net_received sums per period")
    series: List[SummaryPoint] = Field(default_factory=list, description="Structured trend data for charting")
    weeks: List[str] = Field(default_factory=list, description="Legacy alias for periods")

class CommissionTrackerResponse(BaseModel):
    platform: str = Field(..., description="The queried platform identifier")
    average_commission: float = Field(..., description="Average deduction percentage taken by the platform")
    trend: str = Field(..., description="Plain-language description of recent deduction bounds")
    platform_series: Dict[str, List[SummaryPoint]] = Field(default_factory=dict, description="One series per platform over the last 12 weeks")

class MedianCompareResponse(BaseModel):
    cohort_too_small: bool = Field(..., description="Flag protecting K-Anonymity privacy blocks")
    worker_median: Optional[float] = Field(None, description="Worker's personal median. Null if cohort_too_small=true")
    city_median: Optional[float] = Field(None, description="Overall city-wide median. Null if cohort_too_small=true")
    difference_pct: Optional[float] = Field(None, description="Worker percentage delta against the city median")
    category: Optional[str] = Field(None, description="Queried worker category")
    zone: Optional[str] = Field(None, description="Queried city zone")
    sample_size: int = Field(0, description="Number of verified workers in the cohort")
