import pytest
from fastapi.testclient import TestClient
import datetime
from app.main import app
from app.config import settings

client = TestClient(app)

def test_detect_endpoint_no_anomalies():
    # Construct a valid payload
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(6):
        shifts.append({
            "date": (base_date + datetime.timedelta(days=i)).isoformat(),
            "hours_worked": 8.0,
            "gross_earned": 1000.0,
            "platform_deductions": 100.0,
            "net_received": 900.0
        })
        
    payload = {
        "worker_id": "API-1",
        "shifts": shifts
    }
    
    # We need authorization because the endpoint relies on verify_jwt
    # We use the Judge API key bypass that we set up
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["worker_id"] == "API-1"
    assert data["status"] == "clean"
    assert len(data["anomalies"]) == 0

def test_detect_endpoint_with_anomaly():
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(5):
        shifts.append({
            "date": (base_date + datetime.timedelta(days=i)).isoformat(),
            "hours_worked": 8.0,
            "gross_earned": 1000.0,
            "platform_deductions": 100.0,
            "net_received": 900.0
        })
    # Deduction spike
    shifts.append({
        "date": (base_date + datetime.timedelta(days=5)).isoformat(),
        "hours_worked": 8.0,
        "gross_earned": 1000.0,
        "platform_deductions": 400.0,
        "net_received": 600.0
    })
        
    payload = {
        "worker_id": "API-2",
        "shifts": shifts
    }
    
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["worker_id"] == "API-2"
    assert data["status"] == "issues_found"
    assert len(data["anomalies"]) > 0

def test_detect_endpoint_unauthorized():
    # Valid payload structurally
    payload = {"worker_id": "API-3", "shifts": []}
    
    # Attempting to query with no headers mapping API key or Bearer token
    response = client.post("/detect", json=payload)
    assert response.status_code == 401
    assert "detail" in response.json()
    assert "Missing or invalid authentication" in response.json()["detail"]
