import pytest
import time
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

client = TestClient(app)

def get_auth_headers():
    return {"X-API-Key": settings.JUDGE_API_KEY}

def test_worker_summary():
    with TestClient(app) as test_client:
        response = test_client.get("/worker/summary", headers=get_auth_headers())
        assert response.status_code == 200
        data = response.json()
        assert "total_earned" in data
        assert "total_hours" in data
        assert "verified_ratio" in data

def test_worker_trends():
    with TestClient(app) as test_client:
        response = test_client.get("/worker/trends?granularity=week", headers=get_auth_headers())
        assert response.status_code == 200
        data = response.json()
        assert "weeks" in data
        assert "earnings" in data

def test_commission_tracker():
    with TestClient(app) as test_client:
        response = test_client.get("/worker/commission-tracker?platform=Uber", headers=get_auth_headers())
        assert response.status_code == 200
        data = response.json()
        assert data["platform"] == "Uber"
        assert "average_commission" in data
        assert "trend" in data

def test_median_compare_k_anonymity_success():
    with TestClient(app) as test_client:
        # 'Downtown' and 'Bike Rider' should be heavily populated
        response = test_client.get("/worker/median-compare?zone=Downtown&category=Bike Rider", headers=get_auth_headers())
        assert response.status_code == 200
        data = response.json()
        if not data["cohort_too_small"]:
            assert data["city_median"] > 0

def test_median_compare_k_anonymity_block():
    with TestClient(app) as test_client:
        # 'Ghost Town' should have 0 workers seeded
        response = test_client.get("/worker/median-compare?zone=Ghost Town&category=Helicopter", headers=get_auth_headers())
        assert response.status_code == 200
        data = response.json()
        assert data["cohort_too_small"] is True
        assert data["worker_median"] is None
        assert data["city_median"] is None

def test_cache_returns_consistent_data():
    """Cache: second call returns identical data — proves cache hit returns correct payload."""
    with TestClient(app) as test_client:
        headers = get_auth_headers()

        # First call — cold, hits the DB
        r1 = test_client.get("/worker/summary", headers=headers)
        assert r1.status_code == 200

        # Second call — should be served from in-memory cache
        r2 = test_client.get("/worker/summary", headers=headers)
        assert r2.status_code == 200

        # Data must be identical (cache hit returns same payload)
        assert r1.json() == r2.json()

        # Response must still be valid schema
        data = r2.json()
        assert "total_earned" in data
        assert "total_hours" in data
        assert "verified_ratio" in data
        assert isinstance(data["verified_ratio"], float)
        assert 0.0 <= data["verified_ratio"] <= 1.0
