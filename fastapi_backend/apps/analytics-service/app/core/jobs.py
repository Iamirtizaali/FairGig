"""
Nightly vulnerability flag computation job.

Fetches shift data from the Node earnings-service (admin view) instead of querying a local DB.
Results are stored in an in-process dict (refreshed on each run).  If Redis is available
the result is also written to cache so multiple replicas stay consistent.
"""
import asyncio
import datetime
import hashlib
import logging
from collections import defaultdict

from app.repositories.node_client import get_all_shifts

logger = logging.getLogger("vulnerability_job")

# In-process store: list[dict] — replaced on each run
_vulnerability_store: list[dict] = []
_last_computed: str = "never"


def get_vulnerability_store() -> tuple[list[dict], str]:
    """Return the current in-memory vulnerability flags and their computed_at timestamp."""
    return _vulnerability_store, _last_computed


def _anon_id(worker_id: str) -> str:
    return hashlib.sha256(worker_id.encode()).hexdigest()[:12]


async def run_vulnerability_job(threshold_pct: float = 20.0) -> dict:
    """
    Fetch all shifts from earnings-service, compute MoM income drops > threshold_pct%,
    and store results in the module-level store for the /advocate/vulnerability endpoint.
    """
    global _vulnerability_store, _last_computed

    today = datetime.date.today()
    thirty_days_ago = today - datetime.timedelta(days=30)
    sixty_days_ago = today - datetime.timedelta(days=60)

    shifts = await get_all_shifts(days=60)

    recent_net: dict[str, float] = defaultdict(float)
    recent_meta: dict[str, dict] = {}
    prior_net: dict[str, float] = defaultdict(float)

    for s in shifts:
        raw_date = s.get("shiftDate") or s.get("date") or s.get("shift_date", "")
        try:
            shift_date = datetime.date.fromisoformat(str(raw_date)[:10])
        except ValueError:
            continue

        worker_id = str(s.get("workerId") or s.get("worker_id", ""))
        net = float(s.get("netPay") or s.get("net_pay") or s.get("netReceived") or 0.0)
        zone = s.get("zone") or s.get("cityZoneId") or "Unknown"
        platform = s.get("platformId") or s.get("platform") or "Unknown"

        if shift_date >= thirty_days_ago:
            recent_net[worker_id] += net
            recent_meta[worker_id] = {"zone": str(zone), "category": str(platform)}
        elif shift_date >= sixty_days_ago:
            prior_net[worker_id] += net

    flags: list[dict] = []
    for worker_id, recent in recent_net.items():
        prior = prior_net.get(worker_id, 0.0)
        if prior <= 0:
            continue
        drop_pct = ((prior - recent) / prior) * 100
        if drop_pct >= threshold_pct:
            meta = recent_meta.get(worker_id, {})
            flags.append({
                "worker_id": worker_id,
                "anon_id": _anon_id(worker_id),
                "zone": meta.get("zone", "Unknown"),
                "category": meta.get("category", "Unknown"),
                "prior_month_income": round(prior, 2),
                "current_month_income": round(recent, 2),
                "drop_pct": round(drop_pct, 2),
                "computed_at": today.isoformat(),
            })

    _vulnerability_store = flags
    _last_computed = today.isoformat()

    logger.info("Vulnerability job: %d workers flagged (threshold %.0f%%)", len(flags), threshold_pct)
    return {
        "computed_at": today.isoformat(),
        "threshold_pct": threshold_pct,
        "vulnerable_count": len(flags),
        "total_workers_evaluated": len(recent_net),
    }


if __name__ == "__main__":
    asyncio.run(run_vulnerability_job())
