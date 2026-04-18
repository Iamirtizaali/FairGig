# FairGig Deployment Checklist

Quick reference to track deployment progress. Check off each item as you complete it.

---

## Pre-Deployment Prep

### Code & Git
- [ ] Clone repo to local machine: `git clone https://github.com/YOUR_ORG/fairgig.git`
- [ ] Navigate to workspace: `cd apps/fastapi_backend` (or appropriate path)
- [ ] Verify clean git state: `git status` (should show "working tree clean")
- [ ] Verify all services have their dependencies installed locally:
  - [ ] `npm install` in each Node service
  - [ ] `pip install -r requirements.txt` in each Python service
- [ ] Run local tests to ensure everything builds:
  - [ ] Node services: `npm run build` in each
  - [ ] Python services: `pytest -q` in each

### Accounts Created
- [ ] GitHub account with repo access
- [ ] Render account (render.com)
- [ ] Vercel account (vercel.com)
- [ ] Supabase account (supabase.com)
- [ ] Upstash account (upstash.com)
- [ ] (Optional) Hugging Face account for anomaly service

### Credentials Saved (Secure Vault)
- [ ] Supabase password (database)
- [ ] Supabase connection strings (all 3: postgres, asyncpg, analytics_reader)
- [ ] Supabase API keys (ANON + SERVICE_ROLE)
- [ ] Upstash Redis connection strings
- [ ] JWT_SECRET (generate at least 32 random chars)
- [ ] JUDGE_API_KEY (for anomaly service)

---

## Phase 1: Infrastructure Setup

### Database (Supabase)
- [ ] Create Supabase project: `fairgig-prod`
- [ ] Wait for provisioning (1–2 min)
- [ ] Copy connection string (postgres:// format)
- [ ] Create async connection string (postgresql+asyncpg://)
- [ ] Run SQL to create schemas:
  ```sql
  CREATE SCHEMA auth;
  CREATE SCHEMA earnings;
  CREATE SCHEMA grievance;
  CREATE SCHEMA analytics_views;
  CREATE SCHEMA audit;
  ```
- [ ] Create analytics_reader role with READ-only permissions
- [ ] Create Storage bucket: `fairgig-screenshots` (Private)

### Cache (Upstash Redis)
- [ ] Create Redis database: `fairgig-redis`
- [ ] Copy REDIS connection string (redis:// or REST URL)
- [ ] Test connection (optional): `redis-cli ping`

### Environment Variables (.env files)
- [ ] Create `apps/auth-service/.env` with all variables
- [ ] Create `apps/earnings-service/.env` with all variables
- [ ] Create `apps/certificate-service/.env` with all variables
- [ ] Create `apps/grievance-service/.env` with all variables
- [ ] Create `apps/anomaly-service/.env` with all variables
- [ ] Create `apps/analytics-service/.env` with all variables
- [ ] Create `apps/web/.env.production` with frontend URLs
- [ ] Verify NO .env files are committed to git (check `.gitignore`)

---

## Phase 2: Backend Services Deployment (Render)

### Auth Service
- [ ] Go to Render dashboard → New → Web Service
- [ ] Connect GitHub repo
- [ ] Name: `fairgig-auth`
- [ ] Root Directory: `apps/auth-service`
- [ ] Runtime: Node
- [ ] Build: `npm install && npm run build`
- [ ] Start: `npm start`
- [ ] Add all env vars from `.env`
- [ ] Deploy
- [ ] Wait for build (2–5 min)
- [ ] Copy deployed URL: `https://fairgig-auth.onrender.com`
- [ ] Test: `curl https://fairgig-auth.onrender.com/health`
- [ ] Expected: `{"status":"ok"}`

### Earnings Service
- [ ] Create service on Render: `fairgig-earnings`
- [ ] Root Directory: `apps/earnings-service`
- [ ] Add env vars (include `AUTH_SERVICE_URL` = auth service URL)
- [ ] Deploy
- [ ] Copy URL: `https://fairgig-earnings.onrender.com`
- [ ] Test `/health` endpoint

### Certificate Service
- [ ] Create service: `fairgig-certificate`
- [ ] Root Directory: `apps/certificate-service`
- [ ] Deploy
- [ ] Copy URL: `https://fairgig-certificate.onrender.com`
- [ ] Test `/health`

### Grievance Service
- [ ] Create service: `fairgig-grievance`
- [ ] Root Directory: `apps/grievance-service`
- [ ] Deploy
- [ ] Copy URL: `https://fairgig-grievance.onrender.com`
- [ ] Test `/health`

### Anomaly Service (FastAPI)
- [ ] **Option A (Render):**
  - [ ] Create service: `fairgig-anomaly`
  - [ ] Runtime: Docker
  - [ ] Root Directory: `apps/anomaly-service`
  - [ ] Deploy
  - [ ] Copy URL: `https://fairgig-anomaly.onrender.com`
- [ ] **Option B (Hugging Face Spaces):**
  - [ ] Create Space: `fairgig-anomaly`
  - [ ] SDK: Docker
  - [ ] Upload Dockerfile + requirements.txt
  - [ ] Add secrets (env vars)
  - [ ] Copy URL: `https://huggingface.co/spaces/YOUR_ORG/fairgig-anomaly`
- [ ] Test `/health` endpoint
- [ ] Test `/detect` endpoint with judge API key

### Analytics Service (FastAPI)
- [ ] Create service: `fairgig-analytics`
- [ ] Runtime: Docker
- [ ] Root Directory: `apps/analytics-service`
- [ ] Add env vars (include REDIS_HOST, REDIS_PASSWORD, DATABASE_URL)
- [ ] Deploy
- [ ] Copy URL: `https://fairgig-analytics.onrender.com`
- [ ] Test `/health` endpoint

### Service-to-Service URLs
- [ ] Update auth-service env vars:
  - [ ] `EARNINGS_SERVICE_URL`
  - [ ] `CERTIFICATE_SERVICE_URL`
  - [ ] `GRIEVANCE_SERVICE_URL`
  - [ ] `ANALYTICS_SERVICE_URL`
- [ ] Redeploy auth-service (trigger from Render dashboard)
- [ ] Verify services can reach each other (check logs)

---

## Phase 3: Frontend Deployment (Vercel)

### Build & Deploy
- [ ] Update `apps/web/.env.production` with all service URLs
- [ ] Go to Vercel → Import Project
- [ ] Select GitHub repo
- [ ] Framework: Vite
- [ ] Root Directory: `apps/web`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Add environment variables from `.env.production`
- [ ] Deploy
- [ ] Wait for build (1–3 min)
- [ ] Copy production URL: `https://fairgig.vercel.app` (or custom domain)
- [ ] Open in browser and verify landing page loads

### Update Backend CORS
- [ ] Update each backend service's env var: `CORS_ALLOW_ORIGINS="https://fairgig.vercel.app"`
- [ ] Redeploy all backend services (5 total)
- [ ] Verify browser no longer shows CORS errors

---

## Phase 4: Integration Testing

### Health Checks
```bash
curl https://fairgig-auth.onrender.com/health
curl https://fairgig-earnings.onrender.com/health
curl https://fairgig-certificate.onrender.com/health
curl https://fairgig-grievance.onrender.com/health
curl https://fairgig-anomaly.onrender.com/health
curl https://fairgig-analytics.onrender.com/health
```
- [ ] All return `{"status":"ok"}` (200)

### Auth Flow
- [ ] Open frontend: https://fairgig.vercel.app
- [ ] Click "Sign Up"
- [ ] Register with test email
- [ ] Verify JWT token returned in response
- [ ] Verify redirect to dashboard
- [ ] Login with same credentials
- [ ] Verify refresh token works (close/reopen page)

### Anomaly Service (Judge Test)
- [ ] Construct test curl from DEPLOYMENT_GUIDE.md
- [ ] Send 66-day payload with deduction spike
- [ ] Verify response includes `"status":"issues_found"`
- [ ] Verify anomaly explanation is plain-English (no jargon)

### Analytics Service
- [ ] Get JWT token from auth flow
- [ ] Call `GET /worker/summary` with token
- [ ] Verify non-null response with KPI fields
- [ ] Call `GET /advocate/commission-trends`
- [ ] Verify response includes platform data

### Screenshot Upload (if earnings service has this)
- [ ] Navigate to worker dashboard
- [ ] Upload screenshot for a shift
- [ ] Verify upload succeeds
- [ ] Verify screenshot appears in shift detail

---

## Phase 5: Pre-Launch Verification

### Code Quality
- [ ] No console errors in browser (F12)
- [ ] No error logs in Render dashboards
- [ ] All services responding < 2s (except cold starts)

### Data Integrity
- [ ] Database schemas created correctly
- [ ] Test data seeded (platforms, zones, sample workers)
- [ ] No stray hardcoded credentials in code

### Security
- [ ] `JWT_SECRET` is NOT in repo
- [ ] All `.env` files are in `.gitignore`
- [ ] CORS is restricted to frontend domain only
- [ ] Rate limiting is enabled on auth endpoints
- [ ] Supabase Storage bucket is PRIVATE (not public)

### Documentation
- [ ] `DEPLOYMENT_GUIDE.md` is accurate
- [ ] All service URLs are up-to-date
- [ ] Judge can access `/docs` Swagger UI on anomaly service

---

## Phase 6: Go Live

### Final Checks
- [ ] All health checks passing
- [ ] Smoke tests successful (auth, anomaly, analytics)
- [ ] Frontend loads and is responsive
- [ ] No security warnings in browser

### Notify Stakeholders
- [ ] Frontend URL: https://fairgig.vercel.app
- [ ] Judge endpoint: https://fairgig-anomaly.onrender.com/docs
- [ ] Provide JUDGE_API_KEY = `softec_judge_2026`

### Monitoring
- [ ] Monitor Render logs for errors (first hour)
- [ ] Monitor analytics dashboard for traffic
- [ ] Have rollback plan ready (just redeploy from GitHub)

---

## Post-Launch Maintenance

### Daily (First Week)
- [ ] Check service logs for errors
- [ ] Verify `/health` endpoints responding
- [ ] Monitor response times

### Weekly
- [ ] Review database growth (Supabase console)
- [ ] Check Redis cache hit ratio (if logged)
- [ ] Verify backups are running (Supabase)

### Monthly
- [ ] Review analytics dashboards
- [ ] Plan scaling (if needed)
- [ ] Update dependencies (npm/pip)

---

## Rollback Plan

If something breaks after deploy:

**Option 1: Revert Git commit**
```bash
git revert HEAD              # Undo last commit
git push origin main         # Push to GitHub
# Services redeploy automatically from Render/Vercel
```

**Option 2: Redeploy from Render**
- Go to Render dashboard
- Click service
- Click "Manual Deploy"
- Select branch: `main`
- Click "Deploy"

**Option 3: Update env vars**
- If issue is an env var, edit directly in Render dashboard
- Service auto-redeploys
- No code push needed

---

## Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Service stuck deploying | Check Render logs; fix error; push commit |
| Database connection error | Verify DATABASE_URL format; test with psql |
| CORS error in browser | Update CORS_ALLOW_ORIGINS; redeploy backend |
| Anomaly service slow | May be HF cold-start; ping /health to warm up |
| Uploads failing | Check Supabase bucket is private; verify presign URL |
| JWT verification fails | Ensure same JWT_SECRET across all services |
| Analytics queries timeout | Enable Redis caching; reduce query window |

---

**Estimated Total Time:** 2–4 hours  
**Success Criteria:** All health checks pass + Judge can call anomaly endpoint + Frontend loads  
**Contact Support:** Render, Vercel, or Supabase docs for platform-specific issues

Last updated: April 2026
