"""
Analytics Data Layer — dual-mode (shared Postgres OR local SQLite).

When DATABASE_URL points at Postgres, we read Node-owned tables:
  - earnings.shifts (workerId, shiftDate, platformId, cityZoneId, hoursWorked,
                     grossPay, deductions, netPay, verificationStatus)
  - earnings.platforms, earnings.city_zones
  - grievance.complaints (authorId, category, platform, createdAt)
  - auth.users (id, categories[], city_zone_id)

On startup we create `analytics_views.shifts_flat` and `analytics_views.complaints_flat`
views that flatten these into the simple column shape the routes already expect
(worker_id, date, platform, category, zone, hours_worked, gross_earned,
 platform_deductions, net_received, is_verified). This keeps all query code
dialect-agnostic and avoids touching the Node Prisma schemas.

On SQLite (judge/demo/dev) we seed the same flat shape directly.
"""
import datetime
import logging
import random

from sqlalchemy import (
    Boolean, Column, Date, Float, Integer, String, select, text,
)
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import settings

logger = logging.getLogger("analytics.db")

engine = create_async_engine(settings.DATABASE_URL, future=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

IS_POSTGRES = engine.url.get_backend_name().startswith("postgres")

# When backed by real Postgres, the flattened views live under analytics_views.
# When backed by SQLite, the same table names live in the default schema.
FLAT_SCHEMA = "analytics_views" if IS_POSTGRES else None


def _table_args(schema):
    return ({"schema": schema},) if schema else ()


class Shift(Base):
    """
    Flat shift row.
    - On Postgres this is the `analytics_views.shifts_flat` view over earnings.shifts.
    - On SQLite it's a real seeded table.
    """
    __tablename__ = "shifts_flat" if IS_POSTGRES else "shifts"
    __table_args__ = _table_args(FLAT_SCHEMA)

    id = Column(String, primary_key=True, index=True) if IS_POSTGRES else Column(Integer, primary_key=True, index=True)
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
    Flat complaint row.
    - On Postgres this is `analytics_views.complaints_flat` over grievance.complaints.
    - On SQLite it's seeded directly.
    """
    __tablename__ = "complaints_flat" if IS_POSTGRES else "complaints"
    __table_args__ = _table_args(FLAT_SCHEMA)

    id = Column(String, primary_key=True, index=True) if IS_POSTGRES else Column(Integer, primary_key=True, index=True)
    worker_id = Column(String, index=True)
    category = Column(String, index=True)
    created_at = Column(Date, index=True)
    zone = Column(String)


class VulnerabilityFlag(Base):
    """
    Our owned materialised-view-like table, written nightly by
    app.core.jobs.run_vulnerability_job (MoM income drop > threshold).
    """
    __tablename__ = "vulnerability_flags"
    __table_args__ = _table_args(FLAT_SCHEMA)

    worker_id = Column(String, primary_key=True)
    zone = Column(String)
    category = Column(String)
    prior_month_income = Column(Float)
    current_month_income = Column(Float)
    drop_pct = Column(Float)
    computed_at = Column(Date)


# ─── Session helper ──────────────────────────────────────────────────────────

async def get_db():
    async with AsyncSessionLocal() as db:
        yield db


# ─── Postgres view DDL ───────────────────────────────────────────────────────

_SHIFTS_FLAT_VIEW_SQL = """
CREATE OR REPLACE VIEW analytics_views.shifts_flat AS
SELECT
    s."id"                                             AS id,
    s."workerId"                                       AS worker_id,
    s."shiftDate"                                      AS date,
    p."slug"                                           AS platform,
    COALESCE(
        (SELECT c FROM unnest(u."categories") AS c LIMIT 1),
        'Unknown'
    )                                                  AS category,
    COALESCE(cz."zone", 'Unknown')                     AS zone,
    s."hoursWorked"::float                             AS hours_worked,
    s."grossPay"::float                                AS gross_earned,
    s."deductions"::float                              AS platform_deductions,
    s."netPay"::float                                  AS net_received,
    (s."verificationStatus"::text = 'verified')        AS is_verified
FROM earnings."shifts" s
LEFT JOIN earnings."platforms"    p  ON p."id"  = s."platformId"
LEFT JOIN earnings."city_zones"   cz ON cz."id" = s."cityZoneId"
LEFT JOIN auth."users"            u  ON u."id"::text = s."workerId"
WHERE s."deletedAt" IS NULL;
"""

_COMPLAINTS_FLAT_VIEW_SQL = """
CREATE OR REPLACE VIEW analytics_views.complaints_flat AS
SELECT
    c."id"                             AS id,
    c."authorId"                       AS worker_id,
    c."category"                       AS category,
    c."createdAt"::date                AS created_at,
    COALESCE(cz."zone", 'Unknown')     AS zone
FROM grievance."complaints" c
LEFT JOIN auth."users"          u  ON u."id"::text = c."authorId"
LEFT JOIN earnings."city_zones" cz ON cz."id"      = u."city_zone_id"
WHERE c."deletedAt" IS NULL;
"""


async def init_db():
    """
    Dialect-aware init:
    - Postgres: ensure analytics_views schema + vulnerability_flags table +
      flattening views exist. Do NOT touch Node's tables.
    - SQLite: create all tables and seed demo data.
    """
    if IS_POSTGRES:
        async with engine.begin() as conn:
            await conn.execute(text("CREATE SCHEMA IF NOT EXISTS analytics_views"))
            # Create only our owned materialised-view-like table
            await conn.run_sync(
                lambda sc: VulnerabilityFlag.__table__.create(sc, checkfirst=True)
            )
            # Create the flattening views. These require Node-owned tables to
            # exist. If Node hasn't migrated yet, log and keep running — the
            # views will be retried on next startup.
            try:
                await conn.execute(text(_SHIFTS_FLAT_VIEW_SQL))
                await conn.execute(text(_COMPLAINTS_FLAT_VIEW_SQL))
            except Exception as exc:  # noqa: BLE001
                logger.warning(
                    "analytics_views flattening views not created yet "
                    "(Node schemas may not exist yet): %s", exc,
                )
        return

    # ── SQLite path: create flat tables and seed demo data ──────────────────
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        existing = await session.execute(select(Shift).limit(1))
        if not existing.scalars().first():
            await _seed_sqlite_demo_data(session)


async def _seed_sqlite_demo_data(session: AsyncSession):
    """Seed 100 workers × 90 shifts + a few complaints for local demos."""
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
    shifts = []
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
        "Deduction Dispute", "Late Payment", "App Glitch",
        "Unfair Rating", "Missing Bonus", "Incorrect Hours",
    ]
    c_base = datetime.date.today() - datetime.timedelta(days=30)
    complaints = []
    for i in range(1, 101):
        for _ in range(random.randint(1, 4)):
            complaints.append(Complaint(
                worker_id=f"W-{i}",
                category=random.choice(complaint_categories),
                created_at=c_base + datetime.timedelta(days=random.randint(0, 29)),
                zone=random.choice(zones),
            ))
    session.add_all(complaints)
    await session.commit()
