import datetime
import logging
import random
from typing import Any

import httpx
from sqlalchemy import Boolean, Column, Date, Float, Integer, String, delete, select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import settings

logger = logging.getLogger("analytics.db")

engine = create_async_engine(settings.DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()


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
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(String, index=True)
    category = Column(String, index=True)
    created_at = Column(Date, index=True)
    zone = Column(String)


class VulnerabilityFlag(Base):
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


def _parse_date(value: Any) -> datetime.date:
    if isinstance(value, datetime.date):
        return value
    if isinstance(value, str):
        return datetime.date.fromisoformat(value[:10])
    raise ValueError(f"Unsupported date value: {value!r}")


async def _seed_sqlite_demo_data(session: AsyncSession):
    zones = ["Downtown", "Northside", "Westend"]
    categories = ["Bike Rider", "Delivery", "Cleaner"]
    platforms = ["Uber", "Careem", "Foodpanda"]

    workers = [
        {
            "id": f"W-{i}",
            "zone": random.choice(zones),
            "category": random.choice(categories),
            "base_platform": random.choice(platforms),
        }
        for i in range(1, 101)
    ]

    base_date = datetime.date.today() - datetime.timedelta(days=120)
    shifts: list[Shift] = []
    for worker in workers:
        base_comm = random.uniform(0.10, 0.25)
        start_offset = random.randint(0, 30)
        for day_idx in range(90):
            shift_date = base_date + datetime.timedelta(days=start_offset + day_idx)
            hours = random.uniform(4.0, 10.0)
            hourly_gross = random.uniform(400.0, 800.0)
            gross = hours * hourly_gross
            comm_pct = base_comm
            if day_idx > 60:
                comm_pct += random.uniform(-0.02, 0.05)
            deductions = gross * comm_pct
            net = gross - deductions
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
                    is_verified=random.random() < 0.90,
                )
            )

    session.add_all(shifts)
    await session.commit()

    complaint_categories = [
        "Deduction Dispute",
        "Late Payment",
        "App Glitch",
        "Unfair Rating",
        "Missing Bonus",
        "Incorrect Hours",
    ]
    c_base = datetime.date.today() - datetime.timedelta(days=30)
    complaints: list[Complaint] = []
    for i in range(1, 101):
        for _ in range(random.randint(1, 4)):
            complaints.append(
                Complaint(
                    worker_id=f"W-{i}",
                    category=random.choice(complaint_categories),
                    created_at=c_base + datetime.timedelta(days=random.randint(0, 29)),
                    zone=random.choice(zones),
                )
            )
    session.add_all(complaints)
    await session.commit()


async def _fetch_supabase_rows(table_name: str) -> list[dict[str, Any]]:
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
        return []

    url = f"{settings.SUPABASE_URL.rstrip('/')}/rest/v1/{table_name}"
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.get(url, headers=headers, params={"select": "*", "limit": 10000})
        response.raise_for_status()
        payload = response.json()
        return payload if isinstance(payload, list) else []


async def _sync_from_supabase(session: AsyncSession):
    shifts_rows = await _fetch_supabase_rows("shifts")
    complaints_rows = await _fetch_supabase_rows("complaints")
    vulnerability_rows = await _fetch_supabase_rows("vulnerability_flags")

    if not shifts_rows:
        raise RuntimeError("Supabase sync returned no shift rows")

    await session.execute(delete(Shift))
    await session.execute(delete(Complaint))
    await session.execute(delete(VulnerabilityFlag))

    session.add_all(
        Shift(
            id=int(row["id"]),
            worker_id=str(row["worker_id"]),
            date=_parse_date(row["date"]),
            platform=row.get("platform", "Unknown"),
            category=row.get("category", "Unknown"),
            zone=row.get("zone", "Unknown"),
            hours_worked=float(row.get("hours_worked", 0.0)),
            gross_earned=float(row.get("gross_earned", 0.0)),
            platform_deductions=float(row.get("platform_deductions", 0.0)),
            net_received=float(row.get("net_received", 0.0)),
            is_verified=bool(row.get("is_verified", True)),
        )
        for row in shifts_rows
    )

    session.add_all(
        Complaint(
            id=int(row["id"]),
            worker_id=str(row["worker_id"]),
            category=row.get("category", "Unknown"),
            created_at=_parse_date(row["created_at"]),
            zone=row.get("zone", "Unknown"),
        )
        for row in complaints_rows
    )

    session.add_all(
        VulnerabilityFlag(
            worker_id=str(row["worker_id"]),
            zone=row.get("zone", "Unknown"),
            category=row.get("category", "Unknown"),
            prior_month_income=float(row.get("prior_month_income", 0.0)),
            current_month_income=float(row.get("current_month_income", 0.0)),
            drop_pct=float(row.get("drop_pct", 0.0)),
            computed_at=_parse_date(row["computed_at"]),
        )
        for row in vulnerability_rows
    )

    await session.commit()
    logger.info(
        "Supabase sync complete: shifts=%s complaints=%s vulnerability=%s",
        len(shifts_rows),
        len(complaints_rows),
        len(vulnerability_rows),
    )


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        if settings.SYNC_FROM_SUPABASE and settings.SUPABASE_URL and settings.SUPABASE_SERVICE_ROLE_KEY:
            try:
                await _sync_from_supabase(session)
            except Exception as exc:  # noqa: BLE001
                logger.warning("Supabase sync failed; falling back to local seed: %s", exc)
                await session.execute(delete(Shift))
                await session.execute(delete(Complaint))
                await session.execute(delete(VulnerabilityFlag))
                await session.commit()
                if not (await session.execute(select(Shift).limit(1))).scalars().first():
                    await _seed_sqlite_demo_data(session)
        else:
            existing = await session.execute(select(Shift).limit(1))
            if not existing.scalars().first():
                await _seed_sqlite_demo_data(session)

    from app.core.jobs import run_vulnerability_job

    try:
        await run_vulnerability_job()
    except Exception as exc:  # noqa: BLE001
        logger.warning("Vulnerability job failed during init: %s", exc)