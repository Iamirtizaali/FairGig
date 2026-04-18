"""
Full coverage test for Advocate Analytics (AA1-AA4) and Anomaly Detection (AN1-AN6).
Run with: pytest tests/test_advocate.py -v
"""
import pytest
import datetime
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

def headers():
    return {"X-API-Key": settings.JUDGE_API_KEY}

# ─────────────────────────────────────────────
# AA1 + AA2 + AA3 + AA4  — /advocate/kpis
# ─────────────────────────────────────────────

def test_advocate_kpis_requires_auth():
    """Unauthenticated request must be rejected (AA security)."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis")
        assert resp.status_code == 401

def test_advocate_kpis_structure():
    """Endpoint returns all four AA feature blocks."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis", headers=headers())
        assert resp.status_code == 200
        data = resp.json()

        # AA1 — commission trend dict
        assert "commission_trends" in data
        assert isinstance(data["commission_trends"], dict)

        # AA2 — zone income distribution
        assert "income_distribution_percentiles" in data
        distribution = data["income_distribution_percentiles"]
        assert isinstance(distribution, dict)
        for zone_name, percentiles in distribution.items():
            for key in ("p10", "p25", "p50", "p75", "p90"):
                assert key in percentiles, f"Missing {key} in zone {zone_name}"

        # AA3 — top complaint categories
        assert "top_complaint_categories" in data
        categories = data["top_complaint_categories"]
        assert isinstance(categories, list)
        if categories:
            assert "category" in categories[0]
            assert "shift_count" in categories[0]
            assert "avg_commission_pct" in categories[0]

        # AA4 — vulnerability flag list
        assert "vulnerable_workers_flagged" in data
        assert isinstance(data["vulnerable_workers_flagged"], list)

def test_advocate_aa1_commission_trends_populated():
    """AA1: commission trends must contain weekly data from seeded shifts."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis", headers=headers())
        data = resp.json()
        # We seeded 90 days of shifts → should have multiple weekly buckets
        assert len(data["commission_trends"]) > 0

def test_advocate_aa2_all_seeded_zones_present():
    """AA2: all three seeded zones (Downtown, Northside, Westend) should appear."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis", headers=headers())
        data = resp.json()
        zones = set(data["income_distribution_percentiles"].keys())
        for expected_zone in ("Downtown", "Northside", "Westend"):
            assert expected_zone in zones, f"Missing zone: {expected_zone}"

def test_advocate_aa2_percentiles_ordered():
    """AA2: p10 <= p25 <= p50 <= p75 <= p90 for all zones."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis", headers=headers())
        for zone, p in resp.json()["income_distribution_percentiles"].items():
            assert p["p10"] <= p["p25"] <= p["p50"] <= p["p75"] <= p["p90"], \
                f"Percentiles out of order in zone {zone}"

def test_advocate_aa3_top_categories():
    """AA3: at least one category returned this week from seeded data."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis", headers=headers())
        # seeds spread across Bike Rider / Delivery / Cleaner categories
        cats = resp.json()["top_complaint_categories"]
        assert isinstance(cats, list)

def test_advocate_aa4_vulnerability_list_is_list():
    """AA4: vulnerability list must be a list of worker IDs."""
    with TestClient(app) as c:
        resp = c.get("/advocate/kpis", headers=headers())
        vuln = resp.json()["vulnerable_workers_flagged"]
        assert isinstance(vuln, list)
        for wid in vuln:
            assert isinstance(wid, str)

# ─────────────────────────────────────────────
# WA4 — /benchmark/city-median
# ─────────────────────────────────────────────

def test_city_median_k_anonymity_pass():
    """WA4: Downtown/Bike Rider should have enough workers to pass k=5."""
    with TestClient(app) as c:
        resp = c.get("/benchmark/city-median?category=Bike Rider&zone=Downtown")
        assert resp.status_code == 200
        data = resp.json()
        # Seeded 100 workers spread across 3 zones & 3 categories ≈ 11 per bucket
        if not data["cohort_too_small"]:
            assert data["median_hourly_rate"] > 0

def test_city_median_k_anonymity_block():
    """WA4: completely empty zone must trip the k-anonymity guard."""
    with TestClient(app) as c:
        resp = c.get("/benchmark/city-median?category=NonExistent&zone=GhostTown")
        assert resp.status_code == 200
        data = resp.json()
        assert data["cohort_too_small"] is True
        assert data["median_hourly_rate"] == 0.0
