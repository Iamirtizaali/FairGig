# FairGig Production Architecture

Visual reference and service communication map for deployed microservices.

---

## System Architecture Diagram

```
                          ┌─────────────────────────────────────────┐
                          │         Vercel CDN (Global)             │
                          │      https://fairgig.vercel.app         │
                          │                                         │
                          │    React SPA (Vite + TypeScript)        │
                          │    - Landing page                       │
                          │    - Auth flows                         │
                          │    - Worker dashboard                   │
                          │    - Verification interface             │
                          │    - Advocate KPI dashboards            │
                          │    - Admin panels                        │
                          └──────────────┬──────────────────────────┘
                                         │ HTTPS
                                         │ (JWT in Bearer token)
                                         ▼
                    ┌────────────────────────────────────────────┐
                    │         Render Container Runtime           │
                    │                                            │
                    │  ┌──────────────────────────────────────┐  │
                    │  │  AUTH SERVICE (Port 8080)            │  │
                    │  │  https://fairgig-auth.onrender.com   │  │
                    │  │  - Register / Login                  │  │
                    │  │  - Token refresh                     │  │
                    │  │  - Role management                   │  │
                    │  └──────────────┬───────────────────────┘  │
                    │                 │                           │
                    │  ┌──────────────▼───────────────────────┐  │
                    │  │  EARNINGS SERVICE (Port 8080)        │  │
                    │  │  https://fairgig-earnings.onrender.com  │
                    │  │  - Shift CRUD                        │  │
                    │  │  - Screenshot upload (presign URLs)  │  │
                    │  │  - CSV import (BullMQ queue)         │  │
                    │  │  - Verification status tracking      │  │
                    │  └──────────────┬───────────────────────┘  │
                    │                 │                           │
                    │  ┌──────────────▼───────────────────────┐  │
                    │  │ CERTIFICATE SERVICE (Port 8080)      │  │
                    │  │ https://fairgig-certificate.onrender.│  │
                    │  │  - Build income certificates         │  │
                    │  │  - Share via signed URL              │  │
                    │  │  - Render HTML for print             │  │
                    │  └──────────────┬───────────────────────┘  │
                    │                 │                           │
                    │  ┌──────────────▼───────────────────────┐  │
                    │  │ GRIEVANCE SERVICE (Port 8080)        │  │
                    │  │ https://fairgig-grievance.onrender.  │  │
                    │  │  - Complaints CRUD                   │  │
                    │  │  - Tagging & clustering              │  │
                    │  │  - Escalation workflow               │  │
                    │  │  - Public bulletin board             │  │
                    │  └──────────────┬───────────────────────┘  │
                    │                 │                           │
                    └─────────────────┼───────────────────────────┘
                                      │
                    ┌─────────────────┴──────────────────┐
                    │                                    │
        ┌───────────▼────────────────┐    ┌──────────────▼──────────────┐
        │  Render / Hugging Face     │    │      Render / HF Spaces     │
        │                            │    │                             │
        │  ANOMALY SERVICE           │    │  ANALYTICS SERVICE          │
        │  Port 8000                 │    │  Port 8000                  │
        │  (Docker)                  │    │  (Docker)                   │
        │                            │    │                             │
        │ https://fairgig-anomaly    │    │ https://fairgig-analytics   │
        │  .onrender.com             │    │  .onrender.com              │
        │  (or HF Spaces)            │    │                             │
        │                            │    │ • Worker KPIs              │
        │ • Deduction spike detect   │    │ • Advocate analytics       │
        │ • Hourly rate drop detect  │    │ • Commission trends        │
        │ • MoM income drop detect   │    │ • Income distribution      │
        │ • Judge-callable endpoint  │    │ • Top complaints           │
        │                            │    │ • Vulnerability flags      │
        │ Auth: JWT + API Key        │    │ • Cross-schema reads       │
        │ Docs: /docs (Swagger)      │    │                             │
        │                            │    │ Auth: JWT only             │
        └────────────┬───────────────┘    │ Docs: /docs (Swagger)      │
                     │                    │                             │
                     │                    └──────────────┬──────────────┘
                     │                                   │
                     └───────────────────┬───────────────┘
                                         │
                         ┌───────────────┼───────────────┐
                         │               │               │
          ┌──────────────▼──────────┐    │      ┌────────▼────────┐
          │  Supabase PostgreSQL    │    │      │ Upstash Redis   │
          │  (Cloud Database)       │    │      │ (Cache/Queue)   │
          │                         │    │      │                 │
          │ • auth schema           │    │      │ • BullMQ jobs   │
          │ • earnings schema       │    │      │ • Cache layer   │
          │ • grievance schema      │    │      │ • Pub/Sub       │
          │ • analytics_views       │    │      │ • Sessions      │
          │ • audit schema          │    │      │                 │
          │                         │    │      └─────────────────┘
          │ • screenshots storage   │    │
          │   (fairgig-screenshots  │    │
          │    bucket, private)     │    │
          │                         │    │
          └─────────────────────────┘    │
                                         │
                     ┌───────────────────┘
                     │ Async HTTP calls
                     │ (earnings → anomaly)
                     │ (earnings → analytics)
                     │ (earnings → analytics)
                     │ (internal jobs)
```

---

## Service Communication Map

### Request Flow: User Registration

```
1. React SPA (Browser)
   └─→ POST /auth/v1/register
       └─→ Auth Service (Render)
           ├─→ Validate (Zod)
           ├─→ Check unique email in PostgreSQL
           ├─→ Hash password (bcrypt)
           ├─→ Insert user
           ├─→ Create refresh token
           ├─→ Return JWT + user
           └─→ Response to browser
               ├─→ Access token (in-memory)
               ├─→ Refresh token (httpOnly cookie)
               └─→ User object → Zustand store
```

### Request Flow: Worker Logs Shift

```
1. React SPA
   └─→ POST /earnings/v1/shifts
       (Bearer token from auth)
       └─→ Earnings Service (Render)
           ├─→ Verify JWT (shared secret)
           ├─→ Validate shift data (Zod)
           ├─→ Check gross = net + deductions
           ├─→ Insert into PostgreSQL
           ├─→ [Async] Call anomaly service
           │   └─→ POST /detect (HTTP)
           │       └─→ Anomaly Service (FastAPI)
           │           ├─→ Analyze 90-day history
           │           ├─→ Return anomalies
           │           └─→ Persist in earnings.anomaly_flags
           ├─→ Publish shift.created event (Redis)
           │   └─→ Notification service consumes
           │       └─→ Create in-app notification
           └─→ Response to browser
               └─→ TanStack Query cache updated
```

### Request Flow: Worker Views Dashboard

```
1. React SPA
   └─→ GET /analytics/v1/worker/summary
       (Bearer token from auth)
       └─→ Analytics Service (FastAPI)
           ├─→ Verify JWT (shared secret)
           ├─→ Cache check (Redis)
           │   └─→ If hit: return cached result
           │   └─→ If miss: continue
           ├─→ Query PostgreSQL (analytics_reader role)
           │   ├─→ Sum earnings this week
           │   ├─→ Sum earnings this month
           │   ├─→ Calculate hourly rate
           │   ├─→ Count verified vs total
           │   └─→ [Async] Call anomaly service for alerts
           ├─→ Cache result (Redis, 60s TTL)
           ├─→ Log timing (structured JSON → Render logs)
           └─→ Return SummaryResponse (JSON)
               └─→ React queries and renders
```

### Request Flow: Judge Tests Anomaly

```
1. Judge's Machine
   └─→ POST /detect
       -H "X-API-Key: softec_judge_2026"
       └─→ Anomaly Service (Render or HF Spaces)
           ├─→ Verify API key (no database needed)
           ├─→ Parse payload (Pydantic validation)
           ├─→ Custom validators
           │   ├─→ hours ∈ (0, 24]
           │   ├─→ gross ≥ 0
           │   ├─→ no duplicate (date, platform)
           │   └─→ sort chronologically
           ├─→ Compute statistics (NumPy/Pandas)
           │   ├─→ 60-day rolling baseline
           │   ├─→ Weekly z-scores
           │   ├─→ MoM drops
           │   └─→ Generate explanations
           ├─→ Assemble DetectResponse
           ├─→ Observability: log timing + cache status
           └─→ Return JSON
               └─→ Judge reviews in Swagger UI
```

### Request Flow: Advocate Reviews Analytics

```
1. Advocate (Browser)
   └─→ GET /advocate/commission-trends
       (Bearer token with role=advocate)
       └─→ Analytics Service
           ├─→ Verify JWT + role
           ├─→ Check Redis cache (5 min TTL)
           ├─→ Query PostgreSQL
           │   ├─→ Cross-service read
           │   │   (analytics_reader reads earnings schema)
           │   ├─→ Group by platform + week
           │   ├─→ Apply k-anonymity
           │   │   (if cohort < 5: return null)
           │   └─→ Aggregate deduction %
           ├─→ Cache result (Redis)
           ├─→ Log with @observe decorator
           └─→ Return CommissionTrendsResponse
               └─→ React renders line chart
```

---

## Data Flow: Asynchronous Events

### Shift Verification Decision → Notification

```
Verifier (Browser)
└─→ POST /earnings/v1/shifts/:id/verify
    (decision: CONFIRMED)
    └─→ Earnings Service
        ├─→ Insert verification record
        ├─→ Update shift.verification_status
        ├─→ Write audit log entry
        ├─→ Publish shift.verified event to Redis
        │   └─→ Notification Handler (consumer)
        │       ├─→ Create in-app notification
        │       ├─→ Send email via Ethereal/Resend
        │       └─→ Mark notification as sent
        └─→ Worker's next /dashboard request
            └─→ Shows notification banner
```

### Nightly Vulnerability Job

```
Render Scheduled Job (2 AM daily)
└─→ Run compute_vulnerability_flags()
    └─→ Analytics Service
        ├─→ Query PostgreSQL (previous 30 days vs prior 30)
        ├─→ Identify workers with drop > 20%
        ├─→ Anonymise IDs (SHA-256 hash)
        ├─→ Truncate + insert into vulnerability_flags
        └─→ Log result
            └─→ Advocate's next /advocate/vulnerability request
                └─→ Shows anonymised list
```

---

## Environment Variables by Service

### Auth Service
```
DATABASE_URL                (PostgreSQL connection)
JWT_SECRET                  (shared across all services)
REFRESH_TOKEN_SECRET        (auth-service specific)
AUTH_SERVICE_URL            (self URL for redirects)
FRONTEND_URL                (allowed redirect)
EARNINGS_SERVICE_URL        (for service-to-service calls)
CORS_ALLOW_ORIGINS          (frontend URL)
ENVIRONMENT                 (production)
NODE_ENV                    (production)
```

### Earnings Service
```
DATABASE_URL                (PostgreSQL)
JWT_SECRET                  (for token verification)
AUTH_SERVICE_URL            (for user lookups)
ANOMALY_SERVICE_URL         (fire-and-forget calls)
ANALYTICS_SERVICE_URL       (fire-and-forget calls)
SUPABASE_URL                (for presigned URLs)
SUPABASE_SERVICE_KEY        (for storage access)
UPSTASH_REDIS_URL           (for BullMQ)
CORS_ALLOW_ORIGINS          (frontend)
```

### Anomaly Service
```
JWT_SECRET                  (for token verification)
JUDGE_API_KEY               (softec_judge_2026)
CORS_ALLOW_ORIGINS          (frontend)
SENTRY_DSN                  (optional, error tracking)
ENVIRONMENT                 (production)
```

### Analytics Service
```
DATABASE_URL                (PostgreSQL + asyncpg, analytics_reader role)
JWT_SECRET                  (for token verification)
JUDGE_API_KEY               (for admin operations)
REDIS_HOST                  (Upstash)
REDIS_PASSWORD              (Upstash password)
CORS_ALLOW_ORIGINS          (frontend)
SENTRY_DSN                  (optional)
```

### Frontend (Vercel)
```
VITE_API_BASE_URL           (auth service URL)
VITE_ANOMALY_URL            (anomaly service URL)
VITE_ANALYTICS_URL          (analytics service URL)
VITE_JUDGE_API_KEY          (softec_judge_2026 for demo)
```

---

## Database Schema Map

### PostgreSQL (Supabase)

```
┌─ auth schema ─────────────────────────────────┐
│  users                                         │
│  ├─ id (UUID primary)                          │
│  ├─ email (citext unique)                      │
│  ├─ password_hash (bcrypt)                     │
│  ├─ role (enum: worker/verifier/advocate)      │
│  └─ ...                                        │
│  refresh_tokens                                │
│  ├─ id (UUID primary)                          │
│  ├─ user_id (FK → users)                       │
│  ├─ token_hash                                 │
│  ├─ expires_at                                 │
│  └─ revoked_at                                 │
└─────────────────────────────────────────────────┘

┌─ earnings schema ──────────────────────────────┐
│  shifts                                        │
│  ├─ id (UUID primary)                          │
│  ├─ worker_id (FK → auth.users)                │
│  ├─ date (date index)                          │
│  ├─ gross_earned (numeric)                     │
│  ├─ platform_deductions (numeric)              │
│  ├─ net_received (numeric)                     │
│  ├─ verification_status (enum)                 │
│  └─ CHECK (gross = deductions + net)           │
│  anomaly_flags                                 │
│  ├─ id (UUID)                                  │
│  ├─ worker_id (FK)                             │
│  ├─ kind (enum: deduction_spike, ...)          │
│  └─ explanation (text)                         │
└─────────────────────────────────────────────────┘

┌─ grievance schema ─────────────────────────────┐
│  complaints                                    │
│  ├─ id (UUID)                                  │
│  ├─ author_id (FK → auth.users)                │
│  ├─ category (enum)                            │
│  ├─ status (enum: open/escalated/resolved)     │
│  ├─ visibility (enum: public_anon/internal)    │
│  └─ created_at (timestamptz)                   │
└─────────────────────────────────────────────────┘

┌─ analytics_views schema ───────────────────────┐
│  vulnerability_flags                           │
│  ├─ worker_id (string, indexed)                │
│  ├─ drop_pct (float)                           │
│  ├─ prior_month_income (float)                 │
│  ├─ current_month_income (float)               │
│  └─ computed_at (date)                         │
└─────────────────────────────────────────────────┘

┌─ audit schema ─────────────────────────────────┐
│  events                                        │
│  ├─ id (UUID)                                  │
│  ├─ actor_id (FK → auth.users)                 │
│  ├─ action (text: register/login/verify/...)   │
│  ├─ entity (text: shift/complaint/...)         │
│  ├─ entity_id (UUID)                           │
│  ├─ diff (jsonb)                               │
│  └─ created_at (timestamptz)                   │
└─────────────────────────────────────────────────┘
```

---

## Redis Key Patterns

```
fairgig:analytics.worker.summary:{user_id}:{params_hash}
  → TTL: 60s (worker dashboard cache)

fairgig:analytics.advocate.commission_trends:{params_hash}
  → TTL: 300s (advocate KPI cache)

fairgig:anomaly.detect:{params_hash}
  → (optional, if anomaly caching added)

fairgig:queue:csv_import
  → BullMQ job queue for CSV import

fairgig:session:{session_id}
  → (if session store uses Redis)
```

---

## Monitoring & Observability

### Logs Destination
- **Render:** Logs tab per service (stdout/stderr auto-captured)
- **Vercel:** Deployments & Function Logs tabs
- **Supabase:** Logs & Query Stats tabs
- **Upstash:** Metrics & Logs tabs

### Key Metrics to Monitor
```
• API response times (p50, p95, p99)
• Error rates per service
• Database query time
• Cache hit ratio (Redis)
• JWT verification failures
• BullMQ job queue depth
• Shift ingestion rate
```

### Critical Alerting
- Service health check fails (any service)
- Database connection errors
- 5xx errors exceed 1% of requests
- High latency (p95 > 2s for anomaly)

---

## Security Boundaries

```
┌─ Public Endpoints ────────────────────┐
│ • /health (all services)              │
│ • /docs (Swagger UI)                  │
│ • /openapi.json                       │
└───────────────────────────────────────┘

┌─ JWT-Protected (All Roles) ───────────┐
│ • Most endpoints (except register)     │
│ • Verified on every request            │
│ • Shared secret: JWT_SECRET            │
└───────────────────────────────────────┘

┌─ JWT + Role-Gated ────────────────────┐
│ • Advocate endpoints (role=advocate)   │
│ • Admin endpoints (role=admin)         │
└───────────────────────────────────────┘

┌─ API Key (Anomaly Service Only) ──────┐
│ • X-API-Key: softec_judge_2026         │
│ • For judges to call directly          │
│ • Bypasses JWT requirement             │
└───────────────────────────────────────┘

┌─ No Auth (Frontend Static) ───────────┐
│ • Landing page assets                 │
│ • Public certificate (via signed URL) │
└───────────────────────────────────────┘
```

---

**Last Updated:** April 2026  
**Audience:** DevOps, Site Reliability Engineers, System Architects
