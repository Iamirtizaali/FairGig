"""
Anomaly Detection route — Sprint 5
Enriched with rich OpenAPI documentation, pre-filled examples, and Sentry integration.
Auth: JWT or X-API-Key (judge bypass).
"""
from fastapi import APIRouter, Depends
from app.schemas.detect import DetectRequest, DetectResponse, Summary, EXAMPLE_REQUEST, EXAMPLE_RESPONSE
from app.api.deps import verify_jwt
from app.services import detector

router = APIRouter()

_OPENAPI_EXAMPLES = {
    "90-day shift history with deduction spike": {
        "summary": "90-day shift history — triggers a deduction_spike",
        "description": (
            "A worker with 60 normal days (10% commission) followed by a week "
            "where the platform raised its cut to 45%. "
            "Expect a `deduction_spike` anomaly with severity `high`."
        ),
        "value": EXAMPLE_REQUEST,
    },
    "Empty shifts list — clean result": {
        "summary": "Empty shifts — always returns clean",
        "description": "Sending zero shifts is valid; the service returns an empty anomalies list.",
        "value": {
            "worker_id": "W-DEMO",
            "currency": "PKR",
            "shifts": [],
            "options": {"z_threshold": 2.5, "mom_drop_pct": 20.0},
        },
    },
}


@router.post(
    "/detect",
    response_model=DetectResponse,
    summary="Detect statistical anomalies in a worker's earnings",
    description="""
Analyses a worker's shift history and flags three types of anomaly:

| Kind | What it detects |
|---|---|
| `deduction_spike` | Platform commission % is unusually high vs the worker's 60-day baseline |
| `hourly_rate_drop` | Effective hourly pay dropped significantly vs the 60-day baseline |
| `income_drop_mom` | Total net income this 30-day window is > `mom_drop_pct`% lower than the prior 30 days |

**Authentication** — supply **one** of:
- `Authorization: Bearer <JWT>` — issued by the auth service
- `X-API-Key: <key>` — set `JUDGE_API_KEY` in environment (documented judge/demo bypass)

**Custom validation rules** enforced beyond Pydantic types:
- `hours_worked` must be > 0 and ≤ 24 per shift
- `gross_earned` and `platform_deductions` must be ≥ 0
- No two shifts may share the same `(date, platform)` pair
- Shifts are sorted chronologically by the service regardless of submission order
""",
    responses={
        200: {
            "description": "Analysis complete — `anomalies` is empty when earnings look normal",
            "content": {"application/json": {"example": EXAMPLE_RESPONSE}},
        },
        401: {"description": "Missing or invalid authentication (JWT or X-API-Key)"},
        422: {
            "description": "Request failed custom validation",
            "content": {"application/json": {"example": {
                "error": "Request validation failed",
                "problems": ["shifts → 0 → hours_worked: must be at most 24 hours per shift"],
                "hint": "Check field constraints: hours_worked must be 0–24, gross_earned ≥ 0, no duplicate (date, platform) pairs."
            }}},
        },
    },
    openapi_extra={
        "requestBody": {
            "content": {
                "application/json": {"examples": _OPENAPI_EXAMPLES}
            }
        }
    },
)
async def detect_endpoint(payload: DetectRequest, user: dict = Depends(verify_jwt)):
    anomalies = detector.detect(
        shifts=payload.shifts,
        z_threshold=payload.options.z_threshold,
        mom_drop_pct=payload.options.mom_drop_pct,
        currency=payload.currency,
    )
    status = "issues_found" if anomalies else "clean"
    return DetectResponse(
        worker_id=payload.worker_id,
        status=status,
        summary=Summary(shifts_analysed=len(payload.shifts), windows=["weekly", "monthly"]),
        anomalies=anomalies,
    )
