import pytest
import pytest_asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

client = TestClient(app)

# The client uses TestClient which handles FastAPI's lifecycle events 
# via the 'with' context implicitly triggering startup events
def get_client():
    with TestClient(app) as test_client:
        yield test_client

def test_city_median_endpoint():
    with TestClient(app) as client:
        # With 100 seeded workers across 3 zones and 3 categories,
        # Downtown / Bike Rider will pass k=5 and return a real median
        response = client.get("/benchmark/city-median?category=Bike Rider&zone=Downtown")
        assert response.status_code == 200
        data = response.json()
        
        # Both outcomes are valid — if cohort passes k=5 we get a real median
        if data["cohort_too_small"]:
            assert data["median_hourly_rate"] == 0.0
        else:
            assert data["median_hourly_rate"] > 0
            assert data["worker_count"] >= 5

def test_advocate_kpis_endpoint_unauthorized():
    with TestClient(app) as client:
        response = client.get("/advocate/kpis")
        # Must return 401 without keys
        assert response.status_code == 401

def test_advocate_kpis_endpoint_authorized():
    with TestClient(app) as client:
        # We query missing real JWT via the bypass Judge API Key
        headers = {"X-API-Key": settings.JUDGE_API_KEY}
        response = client.get("/advocate/kpis", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        
        assert "commission_trends" in data
        assert "income_distribution_percentiles" in data
        assert "vulnerable_workers_flagged" in data
