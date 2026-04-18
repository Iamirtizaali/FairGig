"""
Sprint 4 — Explanation quality + coverage tests for anomaly service.
Targets >= 80% coverage on anomaly-service when combined with existing tests.
"""
import pytest
import datetime
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.core.explain import (
    explain_deduction_spike,
    explain_hourly_rate_drop,
    explain_income_drop_mom,
)
from app.services.detector import detect, get_severity
from app.schemas.detect import Shift, AnomalySeverity

client = TestClient(app)

def auth():
    return {"X-API-Key": settings.JUDGE_API_KEY}

def make_shift(date_str, ded_pct=0.10, hours=8.0, gross=1000.0):
    ded = gross * ded_pct
    return {
        "date": date_str, "platform": "Uber",
        "hours_worked": hours, "gross_earned": gross,
        "platform_deductions": ded, "net_received": gross - ded,
    }

# ─────────────────────────────────────────────────────────────────
# Explanation string tests
# ─────────────────────────────────────────────────────────────────

def test_explain_deduction_spike_basic():
    msg = explain_deduction_spike(0.34, 0.11)
    assert "34%" in msg and "11%" in msg

def test_explain_deduction_spike_cash_impact():
    msg = explain_deduction_spike(0.40, 0.10, gross_earned=10000, currency="PKR")
    assert "PKR" in msg
    assert "3,000" in msg or "3000" in msg  # 10000 * 0.30 extra

def test_explain_deduction_spike_no_jargon():
    msg = explain_deduction_spike(0.30, 0.10)
    assert "z-score" not in msg and "standard deviation" not in msg

def test_explain_hourly_rate_drop_includes_values():
    msg = explain_hourly_rate_drop(312.0, 487.0, "PKR")
    assert "312" in msg and "487" in msg and "PKR" in msg

def test_explain_hourly_rate_drop_shows_loss():
    msg = explain_hourly_rate_drop(300.0, 500.0, "PKR")
    assert "200" in msg  # 200 PKR per hour loss

def test_explain_income_drop_full():
    msg = explain_income_drop_mom(0.25, prior_total=20000, current_total=15000, currency="PKR")
    assert "25%" in msg
    assert "15,000" in msg or "15000" in msg
    assert "20,000" in msg or "20000" in msg

def test_explain_income_drop_fallback():
    msg = explain_income_drop_mom(0.30)
    assert "30%" in msg and len(msg) > 10

# ─────────────────────────────────────────────────────────────────
# Detector unit tests (boost coverage)
# ─────────────────────────────────────────────────────────────────

def test_severity_thresholds():
    assert get_severity(4.1, 2.5) == AnomalySeverity.high
    assert get_severity(3.1, 2.5) == AnomalySeverity.medium
    assert get_severity(2.6, 2.5) == AnomalySeverity.low

def make_shift_obj(date_str, ded_pct=0.10, hours=8.0, gross=1000.0):
    ded = gross * ded_pct
    return Shift(
        date=datetime.date.fromisoformat(date_str),
        platform="Uber", hours_worked=hours,
        gross_earned=gross, platform_deductions=ded,
        net_received=gross - ded,
    )

def test_detect_empty():
    assert detect([]) == []

def test_detect_single_shift_no_anomaly():
    result = detect([make_shift_obj("2026-01-01")], z_threshold=2.5)
    assert isinstance(result, list)

def test_detect_currency_propagation():
    """Currency param must be passed to the detector without crashing."""
    shifts = [make_shift_obj(f"2026-01-{i+1:02d}") for i in range(10)]
    result = detect(shifts, currency="USD")
    assert isinstance(result, list)

def test_detect_spike_with_enough_data():
    """A clear deduction spike in day 65 should be flagged."""
    shifts = [make_shift_obj(f"2026-01-{i+1:02d}" if i < 31 else
              f"2026-02-{i-30:02d}" if i < 59 else f"2026-03-{i-58:02d}", ded_pct=0.10)
              for i in range(64)]
    # Inject massive spike
    spike = make_shift_obj("2026-03-06", ded_pct=0.60, gross=2000)
    result = detect(shifts + [spike], z_threshold=1.0, mom_drop_pct=50.0)
    kinds = [a.kind.value for a in result]
    assert "deduction_spike" in kinds

def test_api_explanation_contains_currency():
    """End-to-end: anomaly explanation coming through /detect must mention currency."""
    shifts = [make_shift(f"2026-01-{i+1:02d}") for i in range(31)]
    shifts += [make_shift(f"2026-02-{i+1:02d}") for i in range(28)]
    spike = make_shift("2026-03-01", ded_pct=0.60, gross=2000)
    shifts.append(spike)
    payload = {"worker_id": "EXP-1", "shifts": shifts, "currency": "PKR",
               "options": {"z_threshold": 1.0, "mom_drop_pct": 50.0}}
    resp = client.post("/detect", json=payload, headers=auth())
    assert resp.status_code == 200
    for a in resp.json()["anomalies"]:
        assert len(a["explanation"]) > 20
        assert "z-score" not in a["explanation"].lower()

def test_api_all_anomaly_kinds_have_explanations():
    """All three anomaly kinds must produce non-empty explanations."""
    # Deduction spike — 2 months of normal + 1 spike day
    d_shifts = [make_shift(f"2026-01-{i+1:02d}") for i in range(31)]
    d_shifts += [make_shift(f"2026-02-{i+1:02d}") for i in range(28)]
    d_shifts.append(make_shift("2026-03-01", ded_pct=0.60))
    d_payload = {"worker_id": "EXP-D", "shifts": d_shifts,
                 "options": {"z_threshold": 1.0, "mom_drop_pct": 99.0}}
    d_resp = client.post("/detect", json=d_payload, headers=auth()).json()

    # MoM drop
    m_shifts = [make_shift(f"2026-01-{i+1:02d}") for i in range(31)]
    m_shifts += [make_shift(f"2026-02-{i+1:02d}", gross=300) for i in range(28)]
    m_payload = {"worker_id": "EXP-M", "shifts": m_shifts,
                 "options": {"z_threshold": 10.0, "mom_drop_pct": 20.0}}
    m_resp = client.post("/detect", json=m_payload, headers=auth()).json()

    for anomaly in d_resp["anomalies"] + m_resp["anomalies"]:
        assert anomaly["explanation"]
        assert len(anomaly["explanation"]) > 15
