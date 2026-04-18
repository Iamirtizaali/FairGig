# FairGig — Postman Setup

## Files

| File | Purpose |
|---|---|
| `FairGig.postman_collection.json` | All requests, grouped by service |
| `FairGig.postman_environment.json` | Environment variables for local dev |

## Import

1. Open Postman → **Import** → drag both JSON files in.
2. Select **FairGig — Development** in the environment dropdown (top-right).

## Services & Ports

| Service | Base URL variable | Default port |
|---|---|---|
| auth-service | `{{AUTH_URL}}` | 3001 |
| earnings-service | `{{EARNINGS_URL}}` | 3002 |
| certificate-service | `{{CERTIFICATE_URL}}` | 3003 |
| grievance-service | `{{GRIEVANCE_URL}}` | 3004 |

## Authentication Flow

1. Run **Auth / Login (worker)** — the test script saves `ACCESS_TOKEN` to the environment automatically.
2. All protected requests use `Bearer {{ACCESS_TOKEN}}` in the Authorization header.
3. For admin-only endpoints, run **Auth / Login (admin)** first (update `ADMIN_EMAIL` / `ADMIN_PASSWORD` in the environment).

### Auto-save script (paste in the Login request → Tests tab)

```javascript
const token = pm.response.json()?.data?.accessToken;
if (token) pm.environment.set('ACCESS_TOKEN', token);
```

## Rate Limits

| Endpoint group | Limit |
|---|---|
| Default (global) | 60 rpm per IP |
| Auth (login, register) | 10 rpm per IP |
| Password reset / forgot | 5 rpm per IP |
| Upload presign | 30 rpm per IP |

Exceeding a limit returns HTTP **429** with `{ "error": { "code": "RATE_LIMIT_EXCEEDED" } }`.

## Common Variables

| Variable | Set by |
|---|---|
| `ACCESS_TOKEN` | Login test script |
| `SHIFT_ID` | Create Shift test script |
| `PLATFORM_ID` | List Platforms test script |
| `CITY_ZONE_ID` | List City Zones test script |
| `CERTIFICATE_SHARE_TOKEN` | Share Certificate test script |
| `COMPLAINT_ID` | Create Complaint test script |
| `ROLE_REQUEST_ID` | Create Role Request test script |

## Running the full collection

Use **Collection Runner** or Newman:

```bash
npx newman run FairGig.postman_collection.json \
  --environment FairGig.postman_environment.json \
  --reporters cli,htmlextra
```

Install the HTML reporter: `npm install -g newman-reporter-htmlextra`
