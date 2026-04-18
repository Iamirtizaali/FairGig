from pydantic import BaseModel
from typing import Dict, List

class CityMedianResponse(BaseModel):
    cohort_too_small: bool
    worker_count: int
    category: str
    zone: str
    median_hourly_rate: float

class AdvocateKpisResponse(BaseModel):
    commission_trends: Dict[str, float]
    income_distribution_percentiles: Dict[str, Dict[str, float]]
    vulnerable_workers_flagged: List[str]
