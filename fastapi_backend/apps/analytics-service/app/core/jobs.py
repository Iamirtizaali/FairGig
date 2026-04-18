"""
Nightly vulnerability flag computation job (Sprint 3).

This module is designed to be invoked:
  - By Render's scheduled jobs (cron: "0 2 * * *") in production
  - Manually via: POST /advocate/admin/run-vulnerability-job  (judge/admin only)
  - During pytest via direct call to run_vulnerability_job()

It computes which workers had a monthly net income drop > 20% MoM,
then writes results to the vulnerability_flags table (our SQLite-safe
materialized view equivalent).
"""
import datetime
import asyncio
import logging
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.database import AsyncSessionLocal, Shift, VulnerabilityFlag

logger = logging.getLogger("vulnerability_job")

async def run_vulnerability_job(threshold_pct: float = 20.0) -> dict:
    """
    Identify workers whose net income in the most recent complete 30-day
    window dropped > threshold_pct% versus the prior 30-day window.
    Writes results to vulnerability_flags (truncate-and-replace pattern).
    Returns a summary dict for observability.
    """
    today = datetime.date.today()
    thirty_days_ago = today - datetime.timedelta(days=30)
    sixty_days_ago = today - datetime.timedelta(days=60)

    async with AsyncSessionLocal() as session:
        # ── Aggregate current 30-day income per worker ──────────────────────
        recent_stmt = (
            select(Shift.worker_id, Shift.zone, Shift.category,
                   func.sum(Shift.net_received).label("recent_net"))
            .where(Shift.date >= thirty_days_ago)
            .group_by(Shift.worker_id, Shift.zone, Shift.category)
        )
        recent_rows = (await session.execute(recent_stmt)).all()
        recent_map = {
            r.worker_id: {"recent_net": float(r.recent_net), "zone": r.zone, "category": r.category}
            for r in recent_rows
        }

        # ── Aggregate prior 30-day income per worker ─────────────────────────
        prior_stmt = (
            select(Shift.worker_id, func.sum(Shift.net_received).label("prior_net"))
            .where(Shift.date >= sixty_days_ago, Shift.date < thirty_days_ago)
            .group_by(Shift.worker_id)
        )
        prior_map = {r.worker_id: float(r.prior_net) for r in (await session.execute(prior_stmt)).all()}

        # ── Compute drops ────────────────────────────────────────────────────
        flags = []
        for worker_id, data in recent_map.items():
            prior = prior_map.get(worker_id, 0.0)
            if prior <= 0:
                continue
            drop_pct = ((prior - data["recent_net"]) / prior) * 100
            if drop_pct >= threshold_pct:
                flags.append(VulnerabilityFlag(
                    worker_id=worker_id,
                    zone=data["zone"],
                    category=data["category"],
                    prior_month_income=round(prior, 2),
                    current_month_income=round(data["recent_net"], 2),
                    drop_pct=round(drop_pct, 2),
                    computed_at=today
                ))

        # ── Truncate and replace (materialised view pattern) ─────────────────
        await session.execute(delete(VulnerabilityFlag))
        session.add_all(flags)
        await session.commit()

        logger.info("Vulnerability job: %d workers flagged (threshold %.0f%%)", len(flags), threshold_pct)
        return {
            "computed_at": today.isoformat(),
            "threshold_pct": threshold_pct,
            "vulnerable_count": len(flags),
            "total_workers_evaluated": len(recent_map)
        }


if __name__ == "__main__":
    # Allow running directly: python -m app.core.jobs
    asyncio.run(run_vulnerability_job())
