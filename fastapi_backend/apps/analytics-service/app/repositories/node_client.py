"""
HTTP client for fetching data from Node backend APIs.

Worker endpoints: forward the caller's JWT → earnings-service returns only that worker's shifts.
Advocate / admin endpoints: use INTERNAL_SERVICE_TOKEN (admin role) → returns all workers' data.
"""
import logging
from typing import Any

import httpx

from app.config import settings

logger = logging.getLogger("analytics.node_client")

_TIMEOUT = httpx.Timeout(30.0)


def _auth_header(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def _service_header() -> dict[str, str]:
    return {"Authorization": f"Bearer {settings.INTERNAL_SERVICE_TOKEN}"}


async def _fetch_all_pages(url: str, headers: dict, params: dict) -> list[dict]:
    """Paginate through a Node API endpoint and return all rows."""
    rows: list[dict] = []
    page = 1
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        while True:
            resp = await client.get(url, headers=headers, params={**params, "page": page, "limit": 100})
            resp.raise_for_status()
            body = resp.json()
            data = body.get("data", {})
            # support both {data: {shifts: []}} and {data: {complaints: []}}
            items: list = []
            for key in ("shifts", "complaints", "items"):
                if isinstance(data.get(key), list):
                    items = data[key]
                    break
            rows.extend(items)
            meta = body.get("meta", {})
            total = meta.get("total", len(rows))
            if len(rows) >= total or not items:
                break
            page += 1
    return rows


async def get_worker_shifts(worker_token: str, days: int = 180) -> list[dict]:
    """Fetch the authenticated worker's own shifts from earnings-service."""
    url = f"{settings.EARNINGS_SERVICE_URL}/earnings/v1/shifts"
    return await _fetch_all_pages(url, _auth_header(worker_token), {"limit": 100})


async def get_all_shifts(days: int = 90) -> list[dict]:
    """Fetch ALL shifts (admin view) from earnings-service using internal service token."""
    if not settings.INTERNAL_SERVICE_TOKEN:
        logger.warning("INTERNAL_SERVICE_TOKEN not set — advocate aggregations will return empty data")
        return []
    url = f"{settings.EARNINGS_SERVICE_URL}/earnings/v1/shifts"
    return await _fetch_all_pages(url, _service_header(), {"limit": 100})


async def get_all_complaints(days: int = 90) -> list[dict]:
    """Fetch ALL complaints from grievance-service using internal service token."""
    if not settings.INTERNAL_SERVICE_TOKEN:
        logger.warning("INTERNAL_SERVICE_TOKEN not set — complaint aggregations will return empty data")
        return []
    url = f"{settings.GRIEVANCE_SERVICE_URL}/grievance/v1/complaints"
    return await _fetch_all_pages(url, _service_header(), {"limit": 100})
