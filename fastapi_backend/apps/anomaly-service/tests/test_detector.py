import pytest
import datetime
from hypothesis import given, strategies as st
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

client = TestClient(app)

def create_shift_payload(days: int, defect_day: int = -1, defect_type: str = ""):
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(days):
        gross = 1000.0
        deduction = 100.0
        net = 900.0
        hours = 8.0
        
        if i == defect_day:
            if defect_type == "deduction":
                deduction = 400.0
                net = 600.0
            elif defect_type == "income_drop":
                gross = 500.0
                deduction = 50.0
                net = 450.0
                
        shifts.append({
            "date": (base_date + datetime.timedelta(days=i)).isoformat(),
            "platform": "Uber",
            "hours_worked": hours,
            "gross_earned": gross,
            "platform_deductions": deduction,
            "net_received": net
        })
    return shifts

def test_happy_path_no_anomalies():
    shifts = create_shift_payload(65)
    payload = {
        "worker_id": "W1",
        "shifts": shifts,
        "options": {"z_threshold": 2.5, "mom_drop_pct": 20.0}
    }
    
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["anomalies"]) == 0

def test_deduction_spike():
    shifts = create_shift_payload(65, defect_day=63, defect_type="deduction")
    payload = {
        "worker_id": "W1", 
        "shifts": shifts,
        "options": {"z_threshold": 1.0, "mom_drop_pct": 20.0}
    }
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data["anomalies"]) > 0
    
    kinds = [a["kind"] for a in data["anomalies"]]
    assert "deduction_spike" in kinds

def test_income_drop():
    # Month 1 = normal, Month 2 = half normal
    shifts1 = create_shift_payload(30)
    shifts2 = create_shift_payload(30, defect_day=0, defect_type="")
    # Manually drop the whole month's earnings
    for s in shifts2:
        s["gross_earned"] /= 2
        s["platform_deductions"] /= 2
        s["net_received"] /= 2
        s["date"] = (datetime.date.fromisoformat(s["date"]) + datetime.timedelta(days=30)).isoformat()
    
    payload = {"worker_id": "W1", "shifts": shifts1 + shifts2}
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    
    has_mom_drop = False
    for a in data["anomalies"]:
        if a["kind"] == "income_drop_mom":
            has_mom_drop = True
            break
    assert has_mom_drop

def test_empty_input():
    payload = {"worker_id": "W2", "shifts": []}
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 200
    assert len(response.json()["anomalies"]) == 0

def test_malformed_input():
    payload = {"worker_id": "W3", "shifts": [{"bad_field": 123}]}
    headers = {"X-API-Key": settings.JUDGE_API_KEY}
    response = client.post("/detect", json=payload, headers=headers)
    assert response.status_code == 422 # Pydantic rejects

# Hypothesis property-based testing
from app.schemas.detect import Shift, DetectRequest
from app.services.detector import detect

@given(st.lists(
    st.builds(
        Shift,
        date=st.dates(min_value=datetime.date(2025, 1, 1), max_value=datetime.date(2027, 1, 1)),
        platform=st.just("Uber"),
        hours_worked=st.floats(min_value=0.1, max_value=24.0),
        gross_earned=st.floats(min_value=0.0, max_value=10000.0),
        platform_deductions=st.floats(min_value=0.0, max_value=5000.0),
        net_received=st.floats(min_value=-1000.0, max_value=10000.0)
    ), max_size=100
))
def test_no_nan_values_in_any_response(shifts):
    # Pass arbitrary generated shifts ensuring no NaN issues are surfaced mathematically
    anomalies = detect(shifts)
    
    for anomaly in anomalies:
        assert str(anomaly.observed) != "nan"
        assert str(anomaly.baseline_mean) != "nan"
        assert str(anomaly.baseline_std) != "nan"
        assert str(anomaly.z) != "nan"
