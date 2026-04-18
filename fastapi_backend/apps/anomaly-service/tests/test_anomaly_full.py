"""
Full coverage test for Anomaly Detection Service (AN1-AN6).
Run with: pytest tests/test_anomaly_full.py -v
"""
import pytest
import datetime
import time
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

def headers():
    return {"X-API-Key": settings.JUDGE_API_KEY}

def make_shifts(n: int, spike_day: int = -1, currency: str = "PKR"):
    base = datetime.date(2026, 1, 1)
    shifts = []
    for i in range(n):
        gross = 1000.0
        ded = 100.0
        net = 900.0
        if i == spike_day:
            ded = 450.0  # 45% deduction spike
            net = 550.0
        shifts.append({
            "date": (base + datetime.timedelta(days=i)).isoformat(),
            "platform": "Uber",
            "hours_worked": 8.0,
            "gross_earned": gross,
            "platform_deductions": ded,
            "net_received": net
        })
    return shifts

client = TestClient(app)

# AN1 — POST /detect accepts earnings payload
def test_an1_detect_accepts_payload():
    """AN1: endpoint accepts a well-formed payload and returns 200."""
    payload = {"worker_id": "AN1-test", "shifts": make_shifts(10)}
    resp = client.post("/detect", json=payload, headers=headers())
    assert resp.status_code == 200
    data = resp.json()
    assert "summary" in data
    assert "anomalies" in data
    assert data["summary"]["shifts_analysed"] == 10

# AN2 — Z-score on deductions and hourly rate
def test_an2_deduction_spike_detected():
    """AN2: deduction spike in final week triggers a deduction_spike anomaly."""
    payload = {
        "worker_id": "AN2-test",
        "shifts": make_shifts(65, spike_day=64),
        "options": {"z_threshold": 1.0, "mom_drop_pct": 50.0}
    }
    resp = client.post("/detect", json=payload, headers=headers())
    assert resp.status_code == 200
    kinds = [a["kind"] for a in resp.json()["anomalies"]]
    assert "deduction_spike" in kinds

def test_an2_anomaly_contains_z_score():
    """AN2: each anomaly carries a non-NaN z-score and numeric metrics."""
    payload = {
        "worker_id": "AN2-zscore",
        "shifts": make_shifts(65, spike_day=64),
        "options": {"z_threshold": 1.0, "mom_drop_pct": 50.0}
    }
    resp = client.post("/detect", json=payload, headers=headers())
    for a in resp.json()["anomalies"]:
        assert str(a["z"]) != "nan"
        assert isinstance(a["observed"], float)
        assert isinstance(a["baseline_mean"], float)

# AN3 — MoM drop detection
def test_an3_mom_drop_flagged():
    """AN3: month with halved earnings triggers income_drop_mom anomaly."""
    shifts1 = make_shifts(30)
    shifts2 = []
    base = datetime.date(2026, 2, 1)
    for i in range(30):
        shifts2.append({
            "date": (base + datetime.timedelta(days=i)).isoformat(),
            "platform": "Uber",
            "hours_worked": 8.0,
            "gross_earned": 500.0,  # 50% of normal
            "platform_deductions": 50.0,
            "net_received": 450.0
        })
    payload = {
        "worker_id": "AN3-test",
        "shifts": shifts1 + shifts2,
        "options": {"z_threshold": 2.5, "mom_drop_pct": 20.0}
    }
    resp = client.post("/detect", json=payload, headers=headers())
    kinds = [a["kind"] for a in resp.json()["anomalies"]]
    assert "income_drop_mom" in kinds

# AN4 — Plain-language explanation
def test_an4_plain_language_explanation():
    """AN4: every anomaly includes a non-empty human-readable explanation string."""
    payload = {
        "worker_id": "AN4-test",
        "shifts": make_shifts(65, spike_day=64),
        "options": {"z_threshold": 1.0, "mom_drop_pct": 50.0}
    }
    resp = client.post("/detect", json=payload, headers=headers())
    for a in resp.json()["anomalies"]:
        assert isinstance(a["explanation"], str)
        assert len(a["explanation"]) > 10

# AN5 — Health endpoint
def test_an5_health_endpoint():
    """AN5: /health returns status ok for uptime monitoring."""
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"
    assert resp.json()["service"] == "anomaly-service"

# AN6 — OpenAPI docs at /docs
def test_an6_openapi_schema_accessible():
    """AN6: /openapi.json is publicly accessible and describes /detect."""
    resp = client.get("/openapi.json")
    assert resp.status_code == 200
    schema = resp.json()
    assert "/detect" in schema["paths"]
    assert "post" in schema["paths"]["/detect"]

def test_an6_docs_ui_accessible():
    """AN6: /docs Swagger UI returns 200."""
    resp = client.get("/docs")
    assert resp.status_code == 200

# Edge cases
def test_empty_shifts_returns_no_anomalies():
    """Edge: empty input never crashes — returns zero anomalies."""
    payload = {"worker_id": "EDGE-empty", "shifts": []}
    resp = client.post("/detect", json=payload, headers=headers())
    assert resp.status_code == 200
    assert resp.json()["anomalies"] == []

def test_malformed_input_rejected_422():
    """Edge: structurally invalid payload returns 422 before reaching logic."""
    payload = {"worker_id": "EDGE-bad", "shifts": [{"garbage": True}]}
    resp = client.post("/detect", json=payload, headers=headers())
    assert resp.status_code == 422

def test_unauthorized_returns_401():
    """Security: no auth header → 401."""
    payload = {"worker_id": "X", "shifts": make_shifts(5)}
    resp = client.post("/detect", json=payload)
    assert resp.status_code == 401

def test_response_time_90_day_payload_under_2s():
    """Performance: 90-day payload must respond within 2 seconds locally."""
    payload = {
        "worker_id": "PERF-test",
        "shifts": make_shifts(90, spike_day=88)
    }
    t0 = time.time()
    resp = client.post("/detect", json=payload, headers=headers())
    elapsed = time.time() - t0
    assert resp.status_code == 200
    assert elapsed < 2.0, f"Response took {elapsed:.2f}s — too slow"
