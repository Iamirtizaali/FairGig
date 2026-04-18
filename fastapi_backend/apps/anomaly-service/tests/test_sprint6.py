"""
Sprint 6 — Final Edge Cases and Coverage for Anomaly Service
- Worker with varying weekly patterns (not an anomaly)
- Worker with very few shifts (< 5 baseline)
- Worker with one extreme outlier
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

client = TestClient(app)

def auth():
    return {"X-API-Key": settings.JUDGE_API_KEY}

def base_shift(date_str, ded_pct=0.10, hours=8.0, gross=2000.0):
    ded = gross * ded_pct
    return {"date": date_str, "platform": "Uber",
            "hours_worked": hours, "gross_earned": gross,
            "platform_deductions": ded, "net_received": gross - ded}

def test_varying_weekly_patterns_no_anomaly():
    """A worker whose earnings naturally fluctuate week-to-week should not trigger false positives if it's within expected variance."""
    shifts = []
    # Week 1: High
    shifts += [base_shift(f"2026-01-{i:02d}", gross=2500) for i in range(1, 8)]
    # Week 2: Low
    shifts += [base_shift(f"2026-01-{i:02d}", gross=1500) for i in range(8, 15)]
    # Week 3: High
    shifts += [base_shift(f"2026-01-{i:02d}", gross=2500) for i in range(15, 22)]
    # Week 4: Low
    shifts += [base_shift(f"2026-01-{i:02d}", gross=1500) for i in range(22, 29)]
    # Repeated
    shifts += [base_shift(f"2026-02-{i:02d}", gross=2500) for i in range(1, 8)]
    shifts += [base_shift(f"2026-02-{i:02d}", gross=1500) for i in range(8, 15)]

    resp = client.post("/detect", json={"worker_id": "VARY", "shifts": shifts}, headers=auth())
    assert resp.status_code == 200
    # Should be clean, natural variance
    assert resp.json()["status"] == "clean"

def test_very_few_shifts():
    """Service gracefully handles workers with extremely small shift histories (< 5 total days)."""
    shifts = [
        base_shift("2026-01-01"),
        base_shift("2026-01-05"),
        base_shift("2026-01-10"),
    ]
    resp = client.post("/detect", json={"worker_id": "FEW", "shifts": shifts}, headers=auth())
    assert resp.status_code == 200
    assert "anomalies" in resp.json()
    # Currently, fewer than 5 days might just return clean because not enough baseline
    assert type(resp.json()["anomalies"]) is list

def test_one_extreme_outlier():
    """A single massive outlier shift (extreme deduction) should trigger a deduction spike immediately."""
    shifts = [base_shift(f"2026-01-{i:02d}") for i in range(1, 31)] # 30 normal days
    # Massive outlier on day 31: 95% deduction
    shifts.append(base_shift("2026-01-31", ded_pct=0.95))
    
    resp = client.post("/detect", json={"worker_id": "OUTLIER", "shifts": shifts, "options": {"z_threshold": 2.0}}, headers=auth())
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "issues_found"
    kinds = [a["kind"] for a in data["anomalies"]]
    assert "deduction_spike" in kinds
    
    spike = next(a for a in data["anomalies"] if a["kind"] == "deduction_spike")
    assert spike["severity"] == "high"
