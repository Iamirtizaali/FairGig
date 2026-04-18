"""
Sprint 5 — Custom validator tests + enriched OpenAPI + auth hardening
"""
import pytest
import datetime
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

client = TestClient(app)

def auth():
    return {"X-API-Key": settings.JUDGE_API_KEY}

def base_shift(date_str, ded_pct=0.10):
    gross = 2000.0
    ded = gross * ded_pct
    return {"date": date_str, "platform": "Uber",
            "hours_worked": 8, "gross_earned": gross,
            "platform_deductions": ded, "net_received": gross - ded}

# ─────────────────────────────────────────────────────────────────
# Custom validators
# ─────────────────────────────────────────────────────────────────

def test_validator_rejects_hours_over_24():
    """hours_worked > 24 must return 422."""
    shift = base_shift("2026-01-01")
    shift["hours_worked"] = 25.0
    resp = client.post("/detect", json={"worker_id": "V1", "shifts": [shift]}, headers=auth())
    assert resp.status_code == 422

def test_validator_rejects_zero_hours():
    """hours_worked = 0 must return 422."""
    shift = base_shift("2026-01-01")
    shift["hours_worked"] = 0.0
    resp = client.post("/detect", json={"worker_id": "V2", "shifts": [shift]}, headers=auth())
    assert resp.status_code == 422

def test_validator_rejects_negative_gross():
    """gross_earned < 0 must return 422."""
    shift = base_shift("2026-01-01")
    shift["gross_earned"] = -100.0
    resp = client.post("/detect", json={"worker_id": "V3", "shifts": [shift]}, headers=auth())
    assert resp.status_code == 422

def test_validator_rejects_negative_deductions():
    """platform_deductions < 0 must return 422."""
    shift = base_shift("2026-01-01")
    shift["platform_deductions"] = -50.0
    resp = client.post("/detect", json={"worker_id": "V4", "shifts": [shift]}, headers=auth())
    assert resp.status_code == 422

def test_validator_rejects_empty_platform():
    """Empty platform string must return 422."""
    shift = base_shift("2026-01-01")
    shift["platform"] = "   "
    resp = client.post("/detect", json={"worker_id": "V5", "shifts": [shift]}, headers=auth())
    assert resp.status_code == 422

def test_validator_rejects_duplicate_date_platform():
    """Two shifts with identical (date, platform) must return 422."""
    shift = base_shift("2026-01-01")
    resp = client.post("/detect", json={"worker_id": "V6", "shifts": [shift, shift]}, headers=auth())
    assert resp.status_code == 422

def test_validator_422_body_has_problems_key():
    """The custom 422 handler must return a machine-readable 'problems' list."""
    shift = base_shift("2026-01-01")
    shift["hours_worked"] = 99
    resp = client.post("/detect", json={"worker_id": "V7", "shifts": [shift]}, headers=auth())
    assert resp.status_code == 422
    body = resp.json()
    assert "problems" in body
    assert isinstance(body["problems"], list)
    assert len(body["problems"]) > 0

def test_validator_accepts_unsorted_shifts():
    """Shifts sent in reverse-date order must be accepted (service sorts them)."""
    shifts = [base_shift("2026-01-03"), base_shift("2026-01-01"), base_shift("2026-01-02")]
    resp = client.post("/detect", json={"worker_id": "V8", "shifts": shifts}, headers=auth())
    assert resp.status_code == 200

def test_validator_same_date_different_platforms_allowed():
    """Two shifts on the same date but different platforms must be accepted."""
    s1 = base_shift("2026-01-01"); s1["platform"] = "Uber"
    s2 = base_shift("2026-01-01"); s2["platform"] = "Careem"
    resp = client.post("/detect", json={"worker_id": "V9", "shifts": [s1, s2]}, headers=auth())
    assert resp.status_code == 200

# ─────────────────────────────────────────────────────────────────
# Authentication
# ─────────────────────────────────────────────────────────────────

def test_api_key_auth_accepted():
    """X-API-Key must be accepted as a valid auth method."""
    resp = client.post("/detect",
        json={"worker_id": "AUTH-1", "shifts": []},
        headers={"X-API-Key": settings.JUDGE_API_KEY})
    assert resp.status_code == 200

def test_no_auth_rejected():
    """Request with no auth header must return 401."""
    resp = client.post("/detect", json={"worker_id": "AUTH-2", "shifts": []})
    assert resp.status_code == 401

def test_wrong_api_key_rejected():
    """Wrong API key must return 401."""
    resp = client.post("/detect",
        json={"worker_id": "AUTH-3", "shifts": []},
        headers={"X-API-Key": "wrong_key_xyz"})
    assert resp.status_code == 401

# ─────────────────────────────────────────────────────────────────
# OpenAPI docs
# ─────────────────────────────────────────────────────────────────

def test_openapi_schema_includes_detect():
    """/openapi.json must describe the /detect endpoint."""
    resp = client.get("/openapi.json")
    assert resp.status_code == 200
    schema = resp.json()
    assert "/detect" in schema["paths"]

def test_openapi_detect_has_examples():
    """The /detect POST must declare openapi examples."""
    resp = client.get("/openapi.json")
    schema = resp.json()
    post = schema["paths"]["/detect"]["post"]
    # FastAPI puts examples in requestBody or x-fields
    request_body = post.get("requestBody", {})
    content = request_body.get("content", {}).get("application/json", {})
    has_examples = "examples" in content or "example" in content or "examples" in post
    assert has_examples, "No examples found in /detect POST schema"

def test_openapi_detect_has_description():
    """The /detect POST must have a non-empty description."""
    resp = client.get("/openapi.json")
    schema = resp.json()
    desc = schema["paths"]["/detect"]["post"].get("description", "")
    assert len(desc) > 50

def test_health_endpoint_in_openapi():
    """/health endpoint must appear in the schema."""
    resp = client.get("/openapi.json")
    assert "/health" in resp.json()["paths"]

# ─────────────────────────────────────────────────────────────────
# Sentry — non-intrusive smoke test
# ─────────────────────────────────────────────────────────────────

def test_sentry_import_does_not_crash():
    """Sentry SDK must be importable. No DSN = no-op, not a crash."""
    import sentry_sdk
    assert sentry_sdk is not None

# ─────────────────────────────────────────────────────────────────
# Performance: single request under 2s (load test substitute)
# ─────────────────────────────────────────────────────────────────

import time

def test_66_day_payload_under_2s():
    """A realistic 66-day payload must respond in under 2 seconds."""
    shifts = [base_shift(f"2026-01-{i+1:02d}") for i in range(31)]
    shifts += [base_shift(f"2026-02-{i+1:02d}") for i in range(28)]
    shifts += [base_shift(f"2026-03-{i+1:02d}", ded_pct=0.45) for i in range(7)]
    t0 = time.perf_counter()
    resp = client.post("/detect", json={"worker_id": "PERF", "shifts": shifts}, headers=auth())
    elapsed = time.perf_counter() - t0
    assert resp.status_code == 200
    assert elapsed < 2.0, f"Response took {elapsed:.2f}s — exceeds 2s threshold"
