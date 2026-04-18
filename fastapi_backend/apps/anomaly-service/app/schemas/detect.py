from pydantic import BaseModel, Field
from typing import List
from datetime import date
from enum import Enum

class Shift(BaseModel):
    date: date
    platform: str
    hours_worked: float
    gross_earned: float
    platform_deductions: float
    net_received: float

class DetectOptions(BaseModel):
    z_threshold: float = 2.5
    mom_drop_pct: float = 20.0

class DetectRequest(BaseModel):
    worker_id: str
    currency: str = "PKR"
    shifts: List[Shift]
    options: DetectOptions = Field(default_factory=DetectOptions)

class AnomalyKind(str, Enum):
    deduction_spike = "deduction_spike"
    hourly_rate_drop = "hourly_rate_drop"
    income_drop_mom = "income_drop_mom"

class AnomalySeverity(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Summary(BaseModel):
    shifts_analysed: int
    windows: List[str] = ["weekly", "monthly"]

class Anomaly(BaseModel):
    kind: AnomalyKind
    severity: AnomalySeverity
    window: str
    metric: str
    observed: float
    baseline_mean: float
    baseline_std: float
    z: float
    explanation: str

class DetectResponse(BaseModel):
    summary: Summary
    anomalies: List[Anomaly]
