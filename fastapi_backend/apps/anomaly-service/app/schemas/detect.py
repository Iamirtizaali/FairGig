from pydantic import BaseModel
from typing import List
import datetime

class ShiftEntry(BaseModel):
    date: datetime.date
    hours_worked: float
    gross_earned: float
    platform_deductions: float
    net_received: float

class DetectRequest(BaseModel):
    worker_id: str
    shifts: List[ShiftEntry]
