# FairGig Microservices Deployment Guide

**Project:** FairGig — Gig Worker Income & Rights Platform  
**Architecture:** React SPA + 4 Node.js services + 2 FastAPI services + PostgreSQL + Redis  
**Target Platforms:** Vercel (frontend) · Render (Node + DB) · Hugging Face Spaces or Render (FastAPI) · Upstash (Redis)  
**Estimated Duration:** 2–4 hours (including account creation and testing)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Core Infrastructure (Database & Cache)](#phase-1-core-infrastructure)
3. [Phase 2: Deployment Configuration](#phase-2-deployment-configuration)
4. [Phase 3: Backend Services Deployment](#phase-3-backend-services-deployment)
5. [Phase 4: Frontend Deployment](#phase-4-frontend-deployment)
6. [Phase 5: Integration Testing](#phase-5-integration-testing)
7. [Phase 6: Monitoring & Maintenance](#phase-6-monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Accounts Required
- ✅ **GitHub** (repo hosting) — must have FairGig repo pushed
- ✅ **Render** (render.com) — free tier supports 1 DB + multiple services
- ✅ **Vercel** (vercel.com) — free tier for frontend
- ✅ **Supabase** (supabase.com) **OR** Render Postgres — database + object storage (recommended Supabase)
- ✅ **Upstash** (upstash.com) — free Redis tier for cache/queue
- ⚠️ **Hugging Face Spaces** (huggingface.co) — optional, for FastAPI cold-start tolerance

### Local Tools
```powershell
# Verify installed
node --version       # v18+
npm --version        # 8+
python --version     # 3.11+
git --version        # Any recent
```

### GitHub Repository State
```bash
cd E:\FairGig\fastapi_backend
git status           # Must be clean (no uncommitted changes)
git log --oneline -5 # Verify recent commits
```

---

## Phase 1: Core Infrastructure

### Step 1.1: Create PostgreSQL Database (Supabase — Recommended)

**Why Supabase?** Includes Postgres, object storage (for screenshots), and a dashboard in one place.

1. Go to **https://supabase.com** → Sign up
2. Create new project:
   - **Project name:** `fairgig-prod`
   - **Database password:** Generate strong password (save it!)
   - **Region:** Closest to your users (e.g., `Asia Pacific - Singapore`)
   - Click **Create new project**
3. Wait 1–2 minutes for provisioning
4. Once ready, navigate to **Settings** → **Database** → copy:
   - **Connection string (URI):** Should look like:
     ```
     postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     ```
   - Convert to async connection for Python:
     ```
     postgresql+asyncpg://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     ```
   - Save this in a secure password manager or `.env` file (DO NOT commit)

5. Create four schemas in Supabase SQL editor:
   ```sql
   CREATE SCHEMA auth;
   CREATE SCHEMA earnings;
   CREATE SCHEMA grievance;
   CREATE SCHEMA analytics_views;
   CREATE SCHEMA audit;
   
   -- Create analytics_reader role (read-only for analytics service)
   CREATE ROLE analytics_reader WITH LOGIN PASSWORD '[generate-new-strong-pw]';
   GRANT USAGE ON SCHEMA earnings, grievance, analytics_views TO analytics_reader;
   GRANT SELECT ON ALL TABLES IN SCHEMA earnings, grievance, analytics_views TO analytics_reader;
   ```

6. **Object Storage** (for shift screenshots):
   - In Supabase dashboard, go to **Storage**
   - Create new bucket: `fairgig-screenshots`
   - Visibility: **Private**
   - Click **Create bucket**

### Step 1.2: Create Redis Cache (Upstash)

1. Go to **https://upstash.com** → Sign up
2. Create new Redis database:
   - **Name:** `fairgig-redis`
   - **Region:** Match your Supabase region
   - **Plan:** Free tier is fine for MVP
   - Click **Create**
3. Copy credentials from dashboard:
   - **UPSTASH_REDIS_REST_URL:** `https://...`
   - **UPSTASH_REDIS_REST_TOKEN:** (secret token)
   - Alternative: Copy **Connection string (redis://)** if using direct TCP

### Step 1.3: Create `.env` Files (Do Not Commit)

Create one `.env` file **per service** in the workspace root. Example for auth-service:

**`apps/auth-service/.env`**
```bash
# Database
DATABASE_URL="postgresql://postgres:YOUR_SUPABASE_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# JWT
JWT_SECRET="generate-a-strong-random-string-at-least-32-chars"
REFRESH_TOKEN_SECRET="different-strong-random-string-32-chars"

# Auth URLs
AUTH_SERVICE_URL="https://fairgig-auth.onrender.com"  # Will update after deploy
FRONTEND_URL="https://fairgig.vercel.app"             # Will update after deploy

# Email (for password resets)
SMTP_HOST="smtp.ethereal.email"      # Use Ethereal for dev
SMTP_PORT="587"
SMTP_USER="your-ethereal-email@ethereal.email"
SMTP_PASS="ethereal-password"
SMTP_FROM="noreply@fairgig.app"

# Environment
ENVIRONMENT="production"
NODE_ENV="production"
PORT="8080"

# CORS
CORS_ALLOW_ORIGINS="https://fairgig.vercel.app"
```

**`apps/anomaly-service/.env`**
```bash
# JWT
JWT_SECRET="same-as-auth-service-JWT_SECRET"
JUDGE_API_KEY="softec_judge_2026"

# Database (not used by anomaly service, but keep for consistency)
DATABASE_URL="postgresql+asyncpg://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# Environment
ENVIRONMENT="production"
PORT="8000"

# CORS
CORS_ALLOW_ORIGINS="https://fairgig.vercel.app"

# Sentry (optional, for error tracking)
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
```

**`apps/analytics-service/.env`**
```bash
# JWT
JWT_SECRET="same-as-auth-service"
JUDGE_API_KEY="softec_judge_2026"

# Database (async connection)
DATABASE_URL="postgresql+asyncpg://analytics_reader:ANALYTICS_READER_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# Redis Cache
REDIS_HOST="xxxx.upstash.io"
REDIS_PORT="6379"
REDIS_PASSWORD="UPSTASH_PASSWORD"

# Environment
ENVIRONMENT="production"
PORT="8000"
```

**`apps/web/.env.production`**
```bash
VITE_API_BASE_URL="https://fairgig-auth.onrender.com"  # Auth service as gateway
VITE_ANOMALY_URL="https://fairgig-anomaly.hf.space"    # or Render URL
VITE_ANALYTICS_URL="https://fairgig-analytics.onrender.com"
```

---

## Phase 2: Deployment Configuration

### Step 2.1: Update Service Dockerfiles & package.json

Ensure each service has:

**For Node.js services** — verify `package.json` has a `start` script:
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc",
    "test": "vitest"
  }
}
```

**For FastAPI services** — create `Dockerfile` if missing:

**`apps/anomaly-service/Dockerfile`**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app/ ./app/

# Expose port
EXPOSE 8000

# Start server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**`apps/analytics-service/Dockerfile`**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Step 2.2: Create Render Configuration Files

Each service needs a `render.yaml` or manual Render setup. **Easier approach: use Render dashboard GUI.**

---

## Phase 3: Backend Services Deployment

### Step 3.1: Deploy Auth Service to Render

1. Go to **https://dashboard.render.com** → New → **Web Service**
2. Connect GitHub repo:
   - Select your FairGig repository
   - Click **Connect**
3. Configure service:
   - **Name:** `fairgig-auth`
   - **Region:** Match Supabase region
   - **Branch:** `main`
   - **Root Directory:** `apps/auth-service`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free (if available) or Starter
4. Add environment variables (paste from your `.env` file):
   - Click **Advanced** → **Add Environment Variable**
   - Copy all vars from `apps/auth-service/.env`
   - **DO NOT** paste `.env` file directly into the web form — enter each variable manually or via bulk upload
5. Click **Create Web Service**
6. Wait for deployment (2–5 min). Once live, copy the service URL (e.g., `https://fairgig-auth.onrender.com`)

### Step 3.2: Deploy Earnings Service to Render

Repeat Step 3.1 for `apps/earnings-service`:
- **Name:** `fairgig-earnings`
- **Root Directory:** `apps/earnings-service`
- **Environment variables:** Copy from `.env`
- After deployment, update `.env` files in other services with:
  - `EARNINGS_SERVICE_URL="https://fairgig-earnings.onrender.com"`

### Step 3.3: Deploy Certificate Service to Render

- **Name:** `fairgig-certificate`
- **Root Directory:** `apps/certificate-service`
- Same process as earnings

### Step 3.4: Deploy Grievance Service to Render

- **Name:** `fairgig-grievance`
- **Root Directory:** `apps/grievance-service`
- Same process

### Step 3.5: Deploy Anomaly Service (FastAPI) to Render or Hugging Face

**Option A: Render (Recommended for consistency)**

1. Render → New → **Web Service**
2. Connect GitHub, same repo
3. Configure:
   - **Name:** `fairgig-anomaly`
   - **Root Directory:** `apps/anomaly-service`
   - **Runtime:** `Docker`
   - **Build Command:** Leave blank (Render auto-detects Dockerfile)
   - **Start Command:** Leave blank
4. Add env vars from `apps/anomaly-service/.env`
5. Create

**Option B: Hugging Face Spaces (lower cold-start latency for judges)**

1. Go to **huggingface.co** → New Space
2. **Space name:** `fairgig-anomaly`
3. **License:** MIT
4. **Space SDK:** Docker
5. Upload `Dockerfile` and `requirements.txt` from `apps/anomaly-service/`
6. In Space settings, add secrets (env vars)
7. Space auto-deploys

### Step 3.6: Deploy Analytics Service (FastAPI) to Render

- **Name:** `fairgig-analytics`
- **Runtime:** Docker
- **Root Directory:** `apps/analytics-service`
- Same process as anomaly

### Step 3.7: Update Service-to-Service URLs

Once all services are live, update their env vars to point to each other:

**For auth-service:**
- `EARNINGS_SERVICE_URL="https://fairgig-earnings.onrender.com"`
- `CERTIFICATE_SERVICE_URL="https://fairgig-certificate.onrender.com"`
- `GRIEVANCE_SERVICE_URL="https://fairgig-grievance.onrender.com"`
- `ANALYTICS_SERVICE_URL="https://fairgig-analytics.onrender.com"`

Redeploy each service after updating (Render watches GitHub; push changes or manually trigger redeploy from dashboard).

---

## Phase 4: Frontend Deployment

### Step 4.1: Update Frontend Environment Variables

**`apps/web/.env.production`**
```bash
VITE_API_BASE_URL="https://fairgig-auth.onrender.com"
VITE_ANOMALY_URL="https://fairgig-anomaly.onrender.com"  # or HF space
VITE_ANALYTICS_URL="https://fairgig-analytics.onrender.com"
VITE_JUDGE_API_KEY="softec_judge_2026"  # For demo purposes
```

### Step 4.2: Deploy to Vercel

1. Go to **https://vercel.com** → **Import Project**
2. Select GitHub repo (`FairGig/fastapi_backend`)
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variables:
   - Copy all from `.env.production`
5. Click **Deploy**
6. Wait for build & deployment (1–3 min)
7. Once live, copy the production URL (e.g., `https://fairgig.vercel.app`)

### Step 4.3: Update CORS in All Backend Services

Update each backend service's `.env` with:
```bash
CORS_ALLOW_ORIGINS="https://fairgig.vercel.app"
```

Redeploy each service.

---

## Phase 5: Integration Testing

### Step 5.1: Health Check All Services

In a terminal:
```bash
# Test each service /health endpoint
curl https://fairgig-auth.onrender.com/health
curl https://fairgig-earnings.onrender.com/health
curl https://fairgig-anomaly.onrender.com/health
curl https://fairgig-analytics.onrender.com/health

# Expected response: {"status":"ok"}
```

### Step 5.2: Test Auth Flow

```bash
# Register a user
curl -X POST https://fairgig-auth.onrender.com/auth/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@fairgig.app",
    "password": "TestPassword123!",
    "role": "worker"
  }'

# Expected: {access_token, refresh_token, user}
```

### Step 5.3: Test Anomaly Endpoint (Judge Bypass)

```bash
curl -X POST https://fairgig-anomaly.onrender.com/detect \
  -H "Content-Type: application/json" \
  -H "X-API-Key: softec_judge_2026" \
  -d '{
    "worker_id": "TEST-001",
    "shifts": [
      {"date":"2026-01-01","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800}
    ]
  }'

# Expected: {status:"clean", anomalies:[]}
```

### Step 5.4: Test Frontend

1. Open **https://fairgig.vercel.app** in browser
2. **Landing page** should load with Three.js hero animation
3. Click **Sign Up**
4. Register a test account
5. Verify redirect to dashboard
6. Check browser console for errors (F12)

### Step 5.5: Test Analytics Dashboard

```bash
# Get summary (requires JWT or API key from previous auth)
curl https://fairgig-analytics.onrender.com/worker/summary \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Expected: {this_week_earnings, this_month_earnings, ...}
```

---

## Phase 6: Monitoring & Maintenance

### Step 6.1: Set Up Render Logs

1. In Render dashboard, click each service → **Logs**
2. Monitor for errors in real-time
3. Each service logs to stdout (visible in Render dashboard)

### Step 6.2: Set Up Uptime Monitoring

Create a simple health check script:

**`scripts/health-check.sh`**
```bash
#!/bin/bash

SERVICES=(
  "https://fairgig-auth.onrender.com/health"
  "https://fairgig-earnings.onrender.com/health"
  "https://fairgig-anomaly.onrender.com/health"
  "https://fairgig-analytics.onrender.com/health"
)

for service in "${SERVICES[@]}"; do
  response=$(curl -s -o /dev/null -w "%{http_code}" "$service")
  if [ "$response" != "200" ]; then
    echo "⚠️ $service returned $response"
  else
    echo "✅ $service is up"
  fi
done
```

### Step 6.3: Database Backups

**Supabase:** Automatic daily backups (free tier). Access via Supabase dashboard → Backups.

**Render Postgres** (if used instead): Enable automatic backups in Render settings.

### Step 6.4: Environment Variable Updates

To update env vars without re-pushing code:

1. **Render:** Dashboard → Service → **Environment** → Edit
2. Update variable, click **Save**
3. Service auto-redeploys with new env vars

---

## Troubleshooting

### Issue: Service stuck in "Deploy In Progress"

**Solution:** 
```bash
# Check Render logs for build errors
# Common causes: missing dependencies, syntax errors
# Fix the issue locally, commit, push
git add .
git commit -m "Fix deployment issue"
git push origin main
# Render will auto-redeploy on push
```

### Issue: "Failed to connect to database"

**Solution:**
1. Verify DATABASE_URL in service env vars (check connection string format)
2. Test connection locally:
   ```bash
   psql postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres
   ```
3. Ensure Supabase firewall allows Render IPs (usually auto-allowed)

### Issue: "CORS error in browser"

**Solution:**
1. Check CORS_ALLOW_ORIGINS in each backend service env var
2. Verify it matches your frontend URL exactly (https, no trailing slash)
3. Redeploy service
4. Clear browser cache (Ctrl+Shift+Del)

### Issue: Anomaly service is slow (> 2s response time)

**Solution:**
1. If on Hugging Face Spaces free tier, it may cold-start
2. Keep it warm with a periodic `/health` ping from frontend
3. Or migrate to Render paid tier for guaranteed availability

### Issue: Analytics queries timeout

**Solution:**
1. Check Redis connection (if using caching)
2. Verify REDIS_HOST and REDIS_PASSWORD in analytics `.env`
3. Simplify queries (reduce time windows)
4. Enable query caching with @with_cache decorator

### Issue: Screenshots not uploading

**Solution:**
1. Verify Supabase Storage bucket exists and is private
2. Check SUPABASE_URL and SUPABASE_ANON_KEY in earnings-service env
3. Ensure presign URL generation is working (test via Swagger UI)
4. Check browser Network tab for 403/404 errors

---

## Production Checklist

Before going live to judges/users:

- ✅ All `/health` endpoints return 200
- ✅ Auth flow (register → login → dashboard) works end-to-end
- ✅ Anomaly endpoint returns correct response for test payload
- ✅ Analytics endpoints return non-empty data
- ✅ Screenshots upload and retrieve successfully
- ✅ CORS headers are correct
- ✅ Environment variables are NOT hardcoded
- ✅ Database has been seeded with platforms, zones, test workers
- ✅ All services have error logging configured
- ✅ Frontend environment variables point to production URLs
- ✅ SSL certificates are valid (Render/Vercel auto-handle this)
- ✅ Rate limiting is enabled on auth endpoints
- ✅ Database backups are configured
- ✅ `JUDGE_API_KEY` is set in anomaly and analytics services

---

## Quick Reference: Service Ports (Local Dev)

```
Frontend:           http://localhost:5173 (Vite dev server)
Auth:               http://localhost:3001
Earnings:           http://localhost:3002
Certificate:        http://localhost:3003
Grievance:          http://localhost:3004
Anomaly:            http://localhost:8001
Analytics:          http://localhost:8002
PostgreSQL:         localhost:5432
Redis:              localhost:6379
```

---

## Quick Reference: Production URLs (After Deployment)

```
Frontend:           https://fairgig.vercel.app
Auth:               https://fairgig-auth.onrender.com
Earnings:           https://fairgig-earnings.onrender.com
Certificate:        https://fairgig-certificate.onrender.com
Grievance:          https://fairgig-grievance.onrender.com
Anomaly:            https://fairgig-anomaly.onrender.com (or HF Space)
Analytics:          https://fairgig-analytics.onrender.com
Database:           db.xxxxx.supabase.co (private, no public URL)
Redis:              xxxx.upstash.io (private, no public URL)
```

---

## Support & Next Steps

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **FastAPI Deployment:** https://fastapi.tiangingladmin.tiangit/deployment/

For issues, check service logs in the Render dashboard or reach out to the platform support.

---

**Last Updated:** April 2026  
**Status:** Production-ready
