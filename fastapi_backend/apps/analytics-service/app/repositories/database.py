import os
import random
import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer, String, Float, Boolean, Date, DateTime, select, text
from app.config import settings

engine = create_async_engine(
    settings.DATABASE_URL, 
    # Uncomment next line if using sqlite instead of postgres
    # connect_args={"check_same_thread": False} 
)

AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

class WorkerShiftAggr(Base):
    __tablename__ = "worker_shifts_aggr"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(String, index=True)
    category = Column(String, index=True) 
    zone = Column(String, index=True)
    week_no = Column(Integer)
    net_earnings = Column(Float)
    hours_worked = Column(Float)
    platform_deduction_pct = Column(Float)
    income_drop_mom_pct = Column(Float, nullable=True)

class Shift(Base):
    __tablename__ = "shifts"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(String, index=True)
    date = Column(Date, index=True)
    platform = Column(String, index=True)
    category = Column(String, index=True)
    zone = Column(String, index=True)
    hours_worked = Column(Float)
    gross_earned = Column(Float)
    platform_deductions = Column(Float)
    net_received = Column(Float)
    is_verified = Column(Boolean, default=True, index=True)

class Complaint(Base):
    """
    Simulates grievance.complaints from Person B's schema.
    In production, the analytics_reader role has read-only cross-schema access.
    Locally we seed this table to test the top-complaints endpoint.
    """
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(String, index=True)
    category = Column(String, index=True)   # e.g. 'Deduction Dispute', 'Late Payment'
    created_at = Column(Date, index=True)
    zone = Column(String)

class VulnerabilityFlag(Base):
    """
    Materialised view equivalent — written by the nightly vulnerability job.
    """
    __tablename__ = "vulnerability_flags"

    worker_id = Column(String, primary_key=True)
    zone = Column(String)
    category = Column(String)
    prior_month_income = Column(Float)
    current_month_income = Column(Float)
    drop_pct = Column(Float)
    computed_at = Column(Date)

async def get_db():
    async with AsyncSessionLocal() as db:
        yield db

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Check if empty
        result = await session.execute(select(Shift).limit(1))
        if not result.scalars().first():
            # Seed test data: 100 workers, 90 days
            workers = []
            zones = ["Downtown", "Northside", "Westend"]
            categories = ["Bike Rider", "Delivery", "Cleaner"]
            platforms = ["Uber", "Careem", "Foodpanda"]
            
            for i in range(1, 101):
                workers.append({
                    "id": f"W-{i}",
                    "zone": random.choice(zones),
                    "category": random.choice(categories),
                    "base_platform": random.choice(platforms)
                })

            shifts = []
            base_date = datetime.date.today() - datetime.timedelta(days=120)
            
            # Create a 90 day block for each worker ending recently
            for worker in workers:
                # Add synthetic variance around deductions (10% to 25%)
                base_comm = random.uniform(0.10, 0.25)
                start_offset = random.randint(0, 30) # Distribute start dates
                
                for day_idx in range(90):
                    shift_date = base_date + datetime.timedelta(days=start_offset + day_idx)
                    hours = random.uniform(4.0, 10.0)
                    hourly_gross = random.uniform(400.0, 800.0)
                    gross = hours * hourly_gross
                    
                    # Occasionally shift the deduction algorithm for 'trends' tests
                    comm_pct = base_comm
                    if day_idx > 60: # Last 30 days platform bumps commission
                        comm_pct += random.uniform(-0.02, 0.05)
                        
                    deductions = gross * comm_pct
                    net = gross - deductions
                    
                    # 90% verified shifting
                    is_verified = random.random() < 0.90
                    
                    shifts.append(
                        Shift(
                            worker_id=worker["id"],
                            date=shift_date,
                            platform=worker["base_platform"],
                            category=worker["category"],
                            zone=worker["zone"],
                            hours_worked=round(hours, 2),
                            gross_earned=round(gross, 2),
                            platform_deductions=round(deductions, 2),
                            net_received=round(net, 2),
                            is_verified=is_verified
                        )
                    )
            
            # Batch add the 9,000 shifts incrementally
            session.add_all(shifts)
            await session.commit()

    async with AsyncSessionLocal() as session:
        # Seed complaints if empty (simulates grievance.complaints cross-schema data)
        complaint_check = await session.execute(select(Complaint).limit(1))
        if not complaint_check.scalars().first():
            complaint_categories = [
                "Deduction Dispute", "Late Payment", "App Glitch",
                "Unfair Rating", "Missing Bonus", "Incorrect Hours"
            ]
            zones = ["Downtown", "Northside", "Westend"]
            complaints = []
            base_date = datetime.date.today() - datetime.timedelta(days=30)
            for i in range(1, 101):
                # Each worker files 1–4 complaints over the last 30 days
                for _ in range(random.randint(1, 4)):
                    complaints.append(Complaint(
                        worker_id=f"W-{i}",
                        category=random.choice(complaint_categories),
                        created_at=base_date + datetime.timedelta(days=random.randint(0, 29)),
                        zone=random.choice(zones)
                    ))
            session.add_all(complaints)
            await session.commit()
