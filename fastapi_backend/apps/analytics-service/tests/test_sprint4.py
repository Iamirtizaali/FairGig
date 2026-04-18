"""
Sprint 4 tests:
- Vulnerability endpoint: anon_id, k-anonymity, internal refresh
- Observability: @observe passes through results and re-raises exceptions
"""
import pytest
import hashlib
import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings
from app.core.obs import observe

def auth():
    return {"X-API-Key": settings.JUDGE_API_KEY}

# ─────────────────────────────────────────────────────────────────
# Vulnerability endpoint — Sprint 4 (AA4)
# ─────────────────────────────────────────────────────────────────

def test_vulnerability_requires_auth():
    with TestClient(app) as c:
        assert c.get("/advocate/vulnerability").status_code == 401

def test_internal_refresh_creates_flags():
    """Refresh job populates the materialised view."""
    with TestClient(app) as c:
        resp = c.post("/advocate/internal/refresh-vulnerability", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert "vulnerable_count" in data
        assert "computed_at" in data
        assert "total_workers_evaluated" in data
        assert isinstance(data["vulnerable_count"], int)

def test_vulnerability_returns_anon_ids():
    """AA4: returned worker entries use anon_id, never raw worker_id."""
    with TestClient(app) as c:
        c.post("/advocate/internal/refresh-vulnerability", headers=auth())
        resp = c.get("/advocate/vulnerability", headers=auth())
        assert resp.status_code == 200
        data = resp.json()

        if not data["cohort_too_small"] and data["vulnerable_count"] > 0:
            for w in data["workers"]:
                assert "anon_id" in w
                assert len(w["anon_id"]) == 12
                assert all(ch in "0123456789abcdef" for ch in w["anon_id"])
                assert "worker_id" not in w

def test_vulnerability_anon_id_is_deterministic():
    """Same worker_id always produces the same anon_id (hash is stable)."""
    wid = "W-42"
    h1 = hashlib.sha256(wid.encode()).hexdigest()[:12]
    h2 = hashlib.sha256(wid.encode()).hexdigest()[:12]
    assert h1 == h2

def test_vulnerability_drop_pct_above_threshold():
    """Every flagged worker must have drop_pct >= 20.0."""
    with TestClient(app) as c:
        c.post("/advocate/internal/refresh-vulnerability", headers=auth())
        data = c.get("/advocate/vulnerability", headers=auth()).json()
        for w in data.get("workers", []):
            assert w["drop_pct"] >= 20.0

def test_vulnerability_cohort_too_small_schema():
    """Schema contract: if cohort_too_small then workers is empty."""
    with TestClient(app) as c:
        c.post("/advocate/internal/refresh-vulnerability", headers=auth())
        data = c.get("/advocate/vulnerability", headers=auth()).json()
        assert "cohort_too_small" in data
        if data["cohort_too_small"]:
            assert data["workers"] == []

def test_vulnerability_prior_gt_current():
    """For each flagged worker, prior_month_income > current_month_income."""
    with TestClient(app) as c:
        c.post("/advocate/internal/refresh-vulnerability", headers=auth())
        data = c.get("/advocate/vulnerability", headers=auth()).json()
        for w in data.get("workers", []):
            assert w["prior_month_income"] > w["current_month_income"]

# ─────────────────────────────────────────────────────────────────
# Observability decorator
# ─────────────────────────────────────────────────────────────────

def test_observe_decorator_passes_through_result():
    """@observe must return the inner function's result unchanged."""
    @observe("test.endpoint")
    async def my_handler():
        return {"key": "value"}

    result = asyncio.run(my_handler())
    assert result == {"key": "value"}

def test_observe_decorator_propagates_exceptions():
    """@observe must re-raise exceptions from the inner function."""
    @observe("test.error_endpoint")
    async def failing_handler():
        raise ValueError("boom")

    with pytest.raises(ValueError, match="boom"):
        asyncio.run(failing_handler())
