import os
import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.starlette import StarletteIntegration

from app.api.routes import detect

# ── Sentry (no-op when DSN is absent — safe in CI/local dev) ────────────────
sentry_dsn = os.getenv("SENTRY_DSN", "")
if sentry_dsn:
    sentry_sdk.init(
        dsn=sentry_dsn,
        integrations=[StarletteIntegration(), FastApiIntegration()],
        traces_sample_rate=0.2,
        environment=os.getenv("ENVIRONMENT", "development"),
        release=os.getenv("GIT_SHA", "local"),
    )

app = FastAPI(
    title="FairGig Anomaly Detection Service",
    description="""
Statistical anomaly detection for gig-economy workers.

**Authentication** — supply **one** of:
- `Authorization: Bearer <JWT>` — issued by the auth service
- `X-API-Key: <key>` — set `JUDGE_API_KEY` in environment (documented judge/demo bypass)

**Detection algorithms**
| Method | Window | Trigger |
|---|---|---|
| Z-score on deduction % | 7-day rolling vs 60-day baseline | Z > `z_threshold` (default 2.5) |
| Z-score on hourly rate | 7-day rolling vs 60-day baseline | Z < -`z_threshold` |
| Month-over-month income | Last 30 days vs prior 30 days | Drop > `mom_drop_pct`% (default 20%) |
""",
    version="1.0.0",
    contact={"name": "FairGig FastAPI Team", "url": "https://github.com/Iamirtizaali/FairGig"},
    license_info={"name": "MIT"},
)

# ── Human-readable 422 handler ───────────────────────────────────────────────
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    errors = []
    if hasattr(exc, "errors"):
        for e in exc.errors():
            loc = " → ".join(str(l) for l in e.get("loc", []))
            msg = e.get("msg", "Invalid value")
            errors.append(f"{loc}: {msg}")
    return JSONResponse(
        status_code=422,
        content={
            "error": "Request validation failed",
            "problems": errors,
            "hint": "Check field constraints: hours_worked must be 0–24, gross_earned ≥ 0, no duplicate (date, platform) pairs.",
        },
    )

app.include_router(detect.router, tags=["anomaly"])

@app.get("/health", summary="Health Check", tags=["ops"])
async def health_check():
    """Uptime probe. Returns 200 when the service is accepting requests."""
    return {"status": "ok", "service": "anomaly-service", "version": "1.0.0"}
