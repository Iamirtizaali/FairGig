import os
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer, String, Float, Boolean, select

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sql_app.db")
SQLALCHEMY_DATABASE_URL = f"sqlite+aiosqlite:///{DB_FILE}"

engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
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

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Check if empty
        result = await session.execute(select(WorkerShiftAggr).limit(1))
        if not result.scalars().first():
            # Seed test data for 5+ workers in 'Downtown' -> 'Bike Rider' to pass k-anonymity
            mocks = [
                WorkerShiftAggr(worker_id="W1", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=10000, hours_worked=40, platform_deduction_pct=10),
                WorkerShiftAggr(worker_id="W2", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=11000, hours_worked=45, platform_deduction_pct=11),
                WorkerShiftAggr(worker_id="W3", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=9500, hours_worked=38, platform_deduction_pct=10),
                WorkerShiftAggr(worker_id="W4", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=10500, hours_worked=42, platform_deduction_pct=12),
                WorkerShiftAggr(worker_id="W5", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=12000, hours_worked=50, platform_deduction_pct=10),
                WorkerShiftAggr(worker_id="W6", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=8000, hours_worked=30, platform_deduction_pct=10, income_drop_mom_pct=25), # vulnerable
                WorkerShiftAggr(worker_id="W7", category="Car Driver", zone="Northside", week_no=1, net_earnings=20000, hours_worked=40, platform_deduction_pct=15),
            ]
            session.add_all(mocks)
            await session.commit()
