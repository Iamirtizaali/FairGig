from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any

# ─── Commission Trends (AA1) ───────────────────────────────────────────────────

class PlatformWeekPoint(BaseModel):
    week: str = Field(..., description="ISO week period string e.g. '2026-W10'")
    avg_deduction_pct: Optional[float] = Field(None, description="Avg deduction %. Null if cohort < 5 (k-anonymity)")
    cohort_size: int = Field(..., description="Distinct workers in this platform-week cell")

class CommissionTrendsResponse(BaseModel):
    platforms: Dict[str, List[PlatformWeekPoint]] = Field(
        ..., description="AA1: one time-series per platform over last 12 weeks"
    )

# ─── Income Distribution (AA2) ─────────────────────────────────────────────────

class IncomePercentiles(BaseModel):
    p10: float = Field(..., description="10th percentile monthly net income")
    p25: float = Field(..., description="25th percentile monthly net income")
    p50: float = Field(..., description="Median monthly net income")
    p75: float = Field(..., description="75th percentile monthly net income")
    p90: float = Field(..., description="90th percentile monthly net income")

class IncomeDistributionResponse(BaseModel):
    cohort_too_small: bool
    zone: Optional[str] = Field(None, description="Filtered zone, or null for city-wide")
    worker_count: int
    percentiles: Optional[IncomePercentiles] = None

# ─── Top Complaints (AA3) ──────────────────────────────────────────────────────

class ComplaintCategory(BaseModel):
    category: str
    count: int
    percentage: float = Field(..., description="% of total complaints in the window")

class TopComplaintsResponse(BaseModel):
    window: str = Field(..., description="Time window used e.g. '7d'")
    total_complaints: int
    top_categories: List[ComplaintCategory]

# ─── Vulnerability Flags (AA4) ─────────────────────────────────────────────────

class VulnerableWorker(BaseModel):
    anon_id: str = Field(..., description="One-way hash of worker_id (SHA-256 prefix) — raw ID never exposed")
    zone: str
    category: str
    prior_month_income: float
    current_month_income: float
    drop_pct: float

class VulnerabilityResponse(BaseModel):
    computed_at: str
    threshold_pct: float = Field(20.0, description="MoM drop threshold used")
    vulnerable_count: int
    cohort_too_small: bool = Field(False, description="True if cohort < 5 (k-anonymity protection)")
    workers: List[VulnerableWorker]
