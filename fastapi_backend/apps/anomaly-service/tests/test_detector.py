import pytest
import datetime
from app.schemas.detect import DetectRequest, ShiftEntry
from app.services.detector import detect_anomalies

def test_no_anomalies():
    # 6 shifts of consistent earnings
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(6):
        shifts.append(ShiftEntry(
            date=base_date + datetime.timedelta(days=i),
            hours_worked=8.0,
            gross_earned=1000.0,
            platform_deductions=100.0, # 10%
            net_received=900.0
        ))
    
    payload = DetectRequest(worker_id="T1", shifts=shifts)
    flags = detect_anomalies(payload)
    assert len(flags) == 0

def test_deduction_spike():
    # 5 standard shifts, 1 high deduction shift
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(5):
        shifts.append(ShiftEntry(
            date=base_date + datetime.timedelta(days=i),
            hours_worked=8.0,
            gross_earned=1000.0,
            platform_deductions=100.0, # 10%
            net_received=900.0
        ))
    # Spike on day 6: 40% deduction
    shifts.append(ShiftEntry(
        date=base_date + datetime.timedelta(days=5),
        hours_worked=8.0,
        gross_earned=1000.0,
        platform_deductions=400.0,
        net_received=600.0
    ))
    
    payload = DetectRequest(worker_id="T2", shifts=shifts)
    flags = detect_anomalies(payload)
    
    assert len(flags) > 0
    assert any("deductions recently vs your usual" in f for f in flags)

def test_hourly_rate_drop():
    # 5 normal shifts, 1 very low payout shift for same hours
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(5):
        shifts.append(ShiftEntry(
            date=base_date + datetime.timedelta(days=i),
            hours_worked=8.0,
            gross_earned=1000.0,
            platform_deductions=100.0,
            net_received=900.0
        ))
    shifts.append(ShiftEntry(
        date=base_date + datetime.timedelta(days=5),
        hours_worked=8.0,
        gross_earned=300.0,
        platform_deductions=50.0,
        net_received=250.0
    ))
    
    payload = DetectRequest(worker_id="T3", shifts=shifts)
    flags = detect_anomalies(payload)
    
    assert len(flags) > 0
    assert any("effective hourly rate dropped" in f for f in flags)

def test_mom_income_drop():
    # Month 1: 30 days of standard shifts
    shifts = []
    base_date = datetime.date(2026, 1, 1)
    for i in range(30):
        shifts.append(ShiftEntry(
            date=base_date + datetime.timedelta(days=i),
            hours_worked=8.0,
            gross_earned=1000.0,
            platform_deductions=100.0,
            net_received=900.0
        )) # Total Month 1 = 27000
        
    # Month 2: Income drops by 30%
    month2_start = base_date + datetime.timedelta(days=30)
    for i in range(30):
        shifts.append(ShiftEntry(
            date=month2_start + datetime.timedelta(days=i),
            hours_worked=6.0,
            gross_earned=600.0,
            platform_deductions=60.0,
            net_received=540.0
        )) # Total Month 2 = 16200
        
    payload = DetectRequest(worker_id="T4", shifts=shifts)
    flags = detect_anomalies(payload)
    
    assert len(flags) > 0
    assert any("income dropped by" in f and "compared to the previous 30-day period" in f for f in flags)
