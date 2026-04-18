from pydantic import BaseModel, Field
from typing import Dict, List, Optional

class CityMedianResponse(BaseModel):
    cohort_too_small: bool
    worker_count: int
    category: str
    zone: str
    median_hourly_rate: float

class ZoneDistribution(BaseModel):
    p10: float = Field(..., description="10th percentile earnings")
    p25: float = Field(..., description="25th percentile earnings")
    p50: float = Field(..., description="Median earnings")
    p75: float = Field(..., description="75th percentile earnings")
    p90: float = Field(..., description="90th percentile earnings")

class AdvocateKpisResponse(BaseModel):
    commission_trends: Dict[str, float] = Field(..., description="AA1: avg platform deduction % per week (line chart data)")
    income_distribution_percentiles: Dict[str, ZoneDistribution] = Field(..., description="AA2: income distribution by city zone (box/violin chart data)")
    vulnerable_workers_flagged: List[str] = Field(..., description="AA4: worker IDs with MoM income drop > 20%")
    top_complaint_categories: List[Dict] = Field(..., description="AA3: top anomaly types flagged this week")
