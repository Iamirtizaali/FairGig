"""
Pydantic schemas + custom validators for the Anomaly Detection service — Sprint 5.
Uses field_validator for bounds constraints compatible with Pydantic v2 + from __future__.
"""
from datetime import date as _date
from enum import Enum
from typing import List

from pydantic import BaseModel, Field, field_validator, model_validator


# ─────────────────────────────────────────────────────────────────────────────
# Request models
# ─────────────────────────────────────────────────────────────────────────────

class Shift(BaseModel):
    date:                _date = Field(..., description="Shift date (YYYY-MM-DD)")
    platform:            str   = Field("unknown", description="Platform name e.g. 'Uber', 'Careem'")
    hours_worked:        float = Field(..., description="Hours worked this shift")
    gross_earned:        float = Field(..., description="Total gross earnings before deductions")
    platform_deductions: float = Field(..., description="Amount deducted by the platform")
    net_received:        float = Field(..., description="Net amount received after deductions")

    @field_validator("platform")
    @classmethod
    def platform_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("platform must not be an empty string")
        return v

    @field_validator("hours_worked")
    @classmethod
    def hours_in_range(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("hours_worked must be greater than 0")
        if v > 24:
            raise ValueError("hours_worked must be at most 24 hours per shift")
        return v

    @field_validator("gross_earned", "platform_deductions")
    @classmethod
    def no_negative_amounts(cls, v: float) -> float:
        if v < 0:
            raise ValueError("Value must be greater than or equal to 0")
        return v


class DetectOptions(BaseModel):
    z_threshold:  float = Field(2.5,  description="Z-score threshold for anomaly detection", gt=0, le=10)
    mom_drop_pct: float = Field(20.0, description="Month-over-month income drop % threshold", gt=0, le=100)


EXAMPLE_REQUEST = {
    "worker_id": "W-1234",
    "currency": "PKR",
    "shifts": [
        {"date": "2026-01-01", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800},
        {"date": "2026-01-02", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800},
        {"date": "2026-03-01", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 900, "net_received": 1100},
    ],
    "options": {"z_threshold": 2.5, "mom_drop_pct": 20.0},
}

EXAMPLE_RESPONSE = {
    "worker_id": "W-1234",
    "status": "issues_found",
    "summary": {"shifts_analysed": 3, "windows": ["weekly", "monthly"]},
    "anomalies": [{
        "kind": "deduction_spike",
        "severity": "high",
        "window": "Week ending 2026-03-08",
        "metric": "deduction_pct",
        "observed": 0.45,
        "baseline_mean": 0.10,
        "baseline_std": 0.01,
        "z": 35.0,
        "explanation": "Your platform took 45% in deductions last week, compared to your usual 10%. That's roughly PKR 700 more than normal — check your earnings statement for an explanation.",
    }],
}


class DetectRequest(BaseModel):
    """Earnings payload sent by the worker app."""
    worker_id: str          = Field(..., description="Unique worker identifier", min_length=1)
    currency:  str          = Field("PKR", description="ISO currency code for explanation strings")
    shifts:    List[Shift]  = Field(..., description="List of individual shift records")
    options:   DetectOptions = Field(default_factory=DetectOptions)

    @model_validator(mode="after")
    def validate_shifts(self):
        shifts = self.shifts
        if not shifts:
            return self

        # No duplicate (date, platform) pairs
        seen: set = set()
        for s in shifts:
            key = (s.date, s.platform.strip().lower())
            if key in seen:
                raise ValueError(
                    f"Duplicate shift: date={s.date}, platform='{s.platform}'. "
                    "Each (date, platform) combination must appear at most once."
                )
            seen.add(key)

        # Sort chronologically so detector receives ordered data
        self.shifts = sorted(shifts, key=lambda s: s.date)
        return self

    model_config = {"json_schema_extra": {"examples": [EXAMPLE_REQUEST]}}


# ─────────────────────────────────────────────────────────────────────────────
# Response models
# ─────────────────────────────────────────────────────────────────────────────

class AnomalyKind(str, Enum):
    deduction_spike  = "deduction_spike"
    hourly_rate_drop = "hourly_rate_drop"
    income_drop_mom  = "income_drop_mom"


class AnomalySeverity(str, Enum):
    low    = "low"
    medium = "medium"
    high   = "high"


class Summary(BaseModel):
    shifts_analysed: int       = Field(..., description="Total number of shifts analysed")
    windows:         List[str] = Field(["weekly", "monthly"], description="Detection windows applied")


class Anomaly(BaseModel):
    kind:          AnomalyKind      = Field(..., description="Type of anomaly detected")
    severity:      AnomalySeverity  = Field(..., description="Severity: low / medium / high")
    window:        str              = Field(..., description="Human-readable time window")
    metric:        str              = Field(..., description="Data metric that triggered this anomaly")
    observed:      float            = Field(..., description="Observed value in this window")
    baseline_mean: float            = Field(..., description="60-day rolling mean baseline")
    baseline_std:  float            = Field(..., description="60-day rolling std dev")
    z:             float            = Field(..., description="Z-score (0 for income_drop_mom)")
    explanation:   str              = Field(..., description="Plain-language explanation for the worker")


class DetectResponse(BaseModel):
    worker_id: str
    status:    str           = Field(..., description="'clean' or 'issues_found'")
    summary:   Summary
    anomalies: List[Anomaly]

    model_config = {"json_schema_extra": {"examples": [EXAMPLE_RESPONSE]}}
