# FairGig Anomaly Detection Service — Judge & Integrator Guide

> **Service URL (Production):** `https://iamirtizaali-fairgig-anomaly-service.hf.space`  
> **Swagger UI:** `https://iamirtizaali-fairgig-anomaly-service.hf.space/docs`  
> **OpenAPI JSON:** `https://iamirtizaali-fairgig-anomaly-service.hf.space/openapi.json`
> *(Local fallback: `http://localhost:8001`)*

---

## What This Service Does

The Anomaly Detection service analyses a gig worker's shift history and flags three kinds of unfair treatment:

| Anomaly Kind | Plain-English Meaning |
|---|---|
| `deduction_spike` | The platform suddenly started taking a much higher cut than usual |
| `hourly_rate_drop` | The worker's effective hourly pay dropped significantly |
| `income_drop_mom` | Total monthly income fell more than 20% compared to the prior month |

Every flagged anomaly includes a **plain-language explanation** written so a non-technical worker can understand it immediately — for example:

> *"Your platform took 34% in deductions last week, compared to your usual 11%. That's roughly PKR 1,200 more than normal — check your earnings statement for an explanation."*

---

## Authentication

The endpoint supports **two** authentication methods:

### 1. JWT Bearer Token (standard)
```
Authorization: Bearer <token>
```
Issued by the FairGig auth service after login.

### 2. API Key (judge / demo bypass)
```
X-API-Key: softec_judge_2026
```
Set the `JUDGE_API_KEY` environment variable in the service to enable this. This is a deliberate, documented exception — not a vulnerability — that allows judges and evaluators to call the endpoint directly without going through the auth service.

---

## Detection Rules

### Deduction Spike (Z-score method)
1. Compute the worker's deduction percentage per shift: `deduction_pct = platform_deductions / gross_earned`
2. Build a 60-day rolling mean and standard deviation as the baseline.
3. For each rolling 7-day window, compute Z = `(window_mean - baseline_mean) / baseline_std`
4. Flag if `Z > z_threshold` (default 2.5).

### Hourly Rate Drop (Z-score method)
1. Compute effective hourly rate per shift: `hourly_rate = net_received / hours_worked`
2. Same 60-day rolling baseline approach.
3. Flag if `Z < -z_threshold` (negative Z = rate fell below baseline).

### Month-over-Month Income Drop
1. Sum `net_received` for the trailing 30 days.
2. Sum `net_received` for the prior 30-day window.
3. Flag if `drop_pct = (prior - current) / prior * 100 >= mom_drop_pct` (default 20%).

---

## Endpoint Reference

### `POST /detect`

**Request body:**

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `worker_id` | `string` | ✅ | non-empty | Worker's unique identifier |
| `currency` | `string` | ❌ | default `"PKR"` | Used in explanation strings |
| `shifts` | `array[Shift]` | ✅ | — | Shift records (any order; service sorts them) |
| `options.z_threshold` | `float` | ❌ | (0, 10] default 2.5 | Z-score anomaly sensitivity |
| `options.mom_drop_pct` | `float` | ❌ | (0, 100] default 20.0 | MoM drop % threshold |

**Shift object:**

| Field | Type | Constraints |
|---|---|---|
| `date` | `YYYY-MM-DD` | required |
| `platform` | `string` | required, non-empty |
| `hours_worked` | `float` | `> 0`, `≤ 24` |
| `gross_earned` | `float` | `≥ 0` |
| `platform_deductions` | `float` | `≥ 0` |
| `net_received` | `float` | required |

**Validation rules** (beyond types):
- No two shifts may share the same `(date, platform)` pair
- `hours_worked` must be positive and at most 24 hours
- `gross_earned` and `platform_deductions` cannot be negative

**Response body:**

| Field | Type | Description |
|---|---|---|
| `worker_id` | `string` | Echoed from request |
| `status` | `"clean"` \| `"issues_found"` | Quick summary |
| `summary.shifts_analysed` | `int` | Number of shifts processed |
| `summary.windows` | `string[]` | Detection windows applied |
| `anomalies` | `array[Anomaly]` | Empty when status is `"clean"` |

**Anomaly object:**

| Field | Type | Description |
|---|---|---|
| `kind` | enum | `deduction_spike`, `hourly_rate_drop`, `income_drop_mom` |
| `severity` | enum | `low`, `medium`, `high` |
| `window` | `string` | Human-readable window e.g. `"Week ending 2026-03-08"` |
| `metric` | `string` | The raw metric name |
| `observed` | `float` | Observed metric value |
| `baseline_mean` | `float` | 60-day rolling mean baseline |
| `baseline_std` | `float` | 60-day rolling std dev baseline |
| `z` | `float` | Z-score (0 for income_drop_mom) |
| `explanation` | `string` | Plain-language explanation for the worker |

---

## Example: Judge curl Command (Production)

> **Note on Cold Starts:** Because this service is hosted on Hugging Face Spaces free tier, it may spin down after inactivity. The first request might take a few seconds to wake the service up (cold start). The frontend triggers a background `/health` check on load to warm it up.

Copy and paste this command into any terminal. It sends 90 days of realistic shift data with a deduction spike on day 89.

```bash
curl -X POST "https://iamirtizaali-fairgig-anomaly-service.hf.space/detect" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: softec_judge_2026" \
  -d '{
    "worker_id": "JUDGE-DEMO-001",
    "currency": "PKR",
    "shifts": [
      {"date":"2026-01-01","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-02","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-03","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-04","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-05","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-06","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-07","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-08","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-09","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-10","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-11","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-12","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-13","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-14","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-15","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-16","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-17","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-18","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-19","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-20","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-21","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-22","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-23","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-24","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-25","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-26","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-27","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-28","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-29","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-30","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-01-31","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-01","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-02","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-03","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-04","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-05","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-06","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-07","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-08","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-09","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-10","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-11","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-12","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-13","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-14","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-15","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-16","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-17","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-18","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-19","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-20","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-21","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-22","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-23","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-24","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-25","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-26","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-27","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-02-28","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-03-01","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-03-02","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-03-03","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800},
      {"date":"2026-03-04","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":900,"net_received":1100},
      {"date":"2026-03-05","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":900,"net_received":1100},
      {"date":"2026-03-06","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":900,"net_received":1100},
      {"date":"2026-03-07","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":900,"net_received":1100}
    ],
    "options": {"z_threshold": 2.5, "mom_drop_pct": 20.0}
  }'
```

**Expected response** (the final week jumped from 10% → 45% deduction):

```json
{
  "worker_id": "JUDGE-DEMO-001",
  "status": "issues_found",
  "summary": { "shifts_analysed": 66, "windows": ["weekly", "monthly"] },
  "anomalies": [
    {
      "kind": "deduction_spike",
      "severity": "high",
      "window": "Week ending 2026-03-08",
      "metric": "deduction_pct",
      "observed": 0.45,
      "baseline_mean": 0.10,
      "baseline_std": 0.01,
      "z": 35.0,
      "explanation": "Your platform took 45% in deductions last week, compared to your usual 10%. That's roughly PKR 2,800 more than normal — check your earnings statement for an explanation."
    }
  ]
}
```

---

## Validation Error Example

If you send invalid data, the service returns a `422` with a plain-language explanation:

```bash
curl -X POST "https://iamirtizaali-fairgig-anomaly-service.hf.space/detect" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: softec_judge_2026" \
  -d '{"worker_id":"X","shifts":[{"date":"2026-01-01","platform":"Uber","hours_worked":99,"gross_earned":-100,"platform_deductions":0,"net_received":0}]}'
```

```json
{
  "error": "Request validation failed",
  "problems": [
    "shifts → 0 → hours_worked: Input should be less than or equal to 24",
    "shifts → 0 → gross_earned: Input should be greater than or equal to 0"
  ],
  "hint": "Check field constraints: hours_worked must be 0–24, gross_earned ≥ 0, no duplicate (date, platform) pairs."
}
```

---

## Running Locally

```powershell
# From the repo root
.\run_all.ps1                    # starts both services
# Or individually:
cd apps/anomaly-service
uvicorn app.main:app --port 8001 --reload
```

**Environment variables:**

| Variable | Default | Description |
|---|---|---|
| `JUDGE_API_KEY` | `softec_judge_2026` | API key for judge/demo bypass |
| `JWT_SECRET` | *(required in prod)* | Shared JWT secret with auth service |
| `SENTRY_DSN` | *(optional)* | Sentry DSN for error tracking |
| `ENVIRONMENT` | `development` | Sentry environment tag |
