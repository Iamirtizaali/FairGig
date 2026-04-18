"""
Sprint 3 — Advocate Analytics endpoint tests (AA1-AA4)
Run with: pytest tests/test_sprint3.py -v
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

def auth():
    return {"X-API-Key": settings.JUDGE_API_KEY}

# ─────────────────────────────────────────────────────────────────
# Authentication guard on all advocate endpoints
# ─────────────────────────────────────────────────────────────────

def test_advocate_endpoints_require_auth():
    with TestClient(app) as c:
        for path in [
            "/advocate/commission-trends",
            "/advocate/income-distribution",
            "/advocate/top-complaints",
            "/advocate/vulnerability",
        ]:
            resp = c.get(path)
            assert resp.status_code == 401, f"{path} should require auth"

# ─────────────────────────────────────────────────────────────────
# AA1 — commission-trends
# ─────────────────────────────────────────────────────────────────

def test_aa1_commission_trends_structure():
    """AA1: response has one time-series per platform."""
    with TestClient(app) as c:
        resp = c.get("/advocate/commission-trends", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert "platforms" in data
        platforms = data["platforms"]
        assert isinstance(platforms, dict)
        assert len(platforms) > 0  # seeded 3 platforms

        # Check each point has required fields
        for platform_name, series in platforms.items():
            assert isinstance(series, list)
            for point in series:
                assert "week" in point
                assert "cohort_size" in point
                # avg_deduction_pct may be null (k-anonymity) or float
                assert "avg_deduction_pct" in point

def test_aa1_all_three_platforms_present():
    """AA1: seeded platforms Uber, Careem, Foodpanda must all appear."""
    with TestClient(app) as c:
        data = c.get("/advocate/commission-trends", headers=auth()).json()
        present = set(data["platforms"].keys())
        for p in ("Uber", "Careem", "Foodpanda"):
            assert p in present, f"Platform {p} missing from commission trends"

def test_aa1_k_anonymity_null_cells():
    """AA1: cells where cohort_size < 5 must return avg_deduction_pct=null."""
    with TestClient(app) as c:
        data = c.get("/advocate/commission-trends", headers=auth()).json()
        for platform_name, series in data["platforms"].items():
            for point in series:
                if point["cohort_size"] < 5:
                    assert point["avg_deduction_pct"] is None, \
                        f"k-anonymity violated at {platform_name} week {point['week']}"

def test_aa1_weeks_are_sorted():
    """AA1: each platform series must be chronologically ordered."""
    with TestClient(app) as c:
        data = c.get("/advocate/commission-trends", headers=auth()).json()
        for platform_name, series in data["platforms"].items():
            weeks = [p["week"] for p in series]
            assert weeks == sorted(weeks), f"{platform_name} weeks out of order"

# ─────────────────────────────────────────────────────────────────
# AA2 — income-distribution
# ─────────────────────────────────────────────────────────────────

def test_aa2_city_wide_distribution():
    """AA2: city-wide (no zone filter) returns p10-p90 percentiles."""
    with TestClient(app) as c:
        resp = c.get("/advocate/income-distribution", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        if not data["cohort_too_small"]:
            p = data["percentiles"]
            assert p["p10"] <= p["p25"] <= p["p50"] <= p["p75"] <= p["p90"]
            assert p["p50"] > 0

def test_aa2_zone_filter_downtown():
    """AA2: Downtown zone (well-populated) returns valid distribution."""
    with TestClient(app) as c:
        resp = c.get("/advocate/income-distribution?zone=Downtown", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert data["zone"] == "Downtown"
        if not data["cohort_too_small"]:
            assert data["percentiles"] is not None

def test_aa2_k_anonymity_empty_zone():
    """AA2: unknown zone must return cohort_too_small=True."""
    with TestClient(app) as c:
        resp = c.get("/advocate/income-distribution?zone=GhostTown", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert data["cohort_too_small"] is True
        assert data["percentiles"] is None

# ─────────────────────────────────────────────────────────────────
# AA3 — top-complaints (cross-schema grievance read)
# ─────────────────────────────────────────────────────────────────

def test_aa3_top_complaints_7d():
    """AA3: 7-day window returns top complaint categories with counts."""
    with TestClient(app) as c:
        resp = c.get("/advocate/top-complaints?window=7d", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert data["window"] == "7d"
        assert isinstance(data["total_complaints"], int)
        assert isinstance(data["top_categories"], list)
        assert len(data["top_categories"]) <= 5

def test_aa3_top_complaints_category_structure():
    """AA3: every category has count > 0 and percentage <= 100."""
    with TestClient(app) as c:
        data = c.get("/advocate/top-complaints?window=30d", headers=auth()).json()
        for cat in data["top_categories"]:
            assert "category" in cat
            assert cat["count"] > 0
            assert 0 < cat["percentage"] <= 100

def test_aa3_percentages_sum_to_at_most_100():
    """AA3: top-5 percentages can be < 100 (others exist) but never > 100."""
    with TestClient(app) as c:
        data = c.get("/advocate/top-complaints?window=30d", headers=auth()).json()
        total_pct = sum(c["percentage"] for c in data["top_categories"])
        assert total_pct <= 100.0 + 1e-6  # float tolerance

def test_aa3_categories_are_known_types():
    """AA3: returned categories come from the seeded complaint types."""
    known = {"Deduction Dispute", "Late Payment", "App Glitch",
             "Unfair Rating", "Missing Bonus", "Incorrect Hours"}
    with TestClient(app) as c:
        data = c.get("/advocate/top-complaints?window=30d", headers=auth()).json()
        for cat in data["top_categories"]:
            assert cat["category"] in known

# ─────────────────────────────────────────────────────────────────
# AA4 — vulnerability (job + read)
# ─────────────────────────────────────────────────────────────────

def test_aa4_trigger_vulnerability_job():
    """AA4: admin can trigger the job and receives a summary."""
    with TestClient(app) as c:
        resp = c.post("/advocate/admin/run-vulnerability-job", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert "computed_at" in data
        assert "vulnerable_count" in data
        assert isinstance(data["vulnerable_count"], int)

def test_aa4_vulnerability_read_after_job():
    """AA4: GET /advocate/vulnerability reflects the job's output."""
    with TestClient(app) as c:
        # Run job first to populate the materialized view
        c.post("/advocate/admin/run-vulnerability-job", headers=auth())
        resp = c.get("/advocate/vulnerability", headers=auth())
        assert resp.status_code == 200
        data = resp.json()
        assert "vulnerable_count" in data
        assert data["threshold_pct"] == 20.0
        for w in data["workers"]:
            assert w["drop_pct"] >= 20.0
            assert w["prior_month_income"] > 0
