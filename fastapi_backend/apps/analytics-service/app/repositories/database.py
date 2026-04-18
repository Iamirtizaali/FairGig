import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer, String, Float, select
from app.config import settings

# This file retains the old SQlite configurations for local testing backward-compatibility
# although the prompt specifies we set up SQLalchemy async engine for PostgreSQL.
# We will point it to the DB defined in config.

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

async def get_db():
    async with AsyncSessionLocal() as db:
        yield db

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Check if empty
        result = await session.execute(select(WorkerShiftAggr).limit(1))
        if not result.scalars().first():
            # Seed test data
            mocks = [
                WorkerShiftAggr(worker_id="W1", category="Bike Rider", zone="Downtown", week_no=1, net_earnings=10000, hours_worked=40, platform_deduction_pct=10),
            ]
            session.add_all(mocks)
            await session.commit()
