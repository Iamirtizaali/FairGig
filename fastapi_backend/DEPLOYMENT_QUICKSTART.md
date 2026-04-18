# FairGig Microservices Deployment — Quick Start (30 Min Version)

**TL;DR:** Deploy FairGig to production in ~30 minutes using Render, Vercel, and Supabase.

---

## 1. Prerequisites (5 min)

```powershell
# Verify local tools
node --version          # v18+
npm --version          # 8+
python --version       # 3.11+
git --version          # Any

# Ensure git is clean
git status              # Should show "working tree clean"
```

**Create accounts (do this NOW):**
- [ ] Render.com (free tier)
- [ ] Vercel.com (free tier)
- [ ] Supabase.com (free tier)
- [ ] Upstash.com (free tier)

---

## 2. Database Setup (5 min)

### Supabase
1. Create project: `fairgig-prod`
2. Copy connection string (postgres://)
3. Create schemas:
   ```sql
   CREATE SCHEMA auth;
   CREATE SCHEMA earnings;
   CREATE SCHEMA grievance;
   CREATE SCHEMA analytics_views;
   CREATE SCHEMA audit;
   ```
4. Create storage bucket: `fairgig-screenshots` (Private)

### Upstash
1. Create Redis: `fairgig-redis`
2. Copy connection string

---

## 3. Environment Variables (5 min)

Create 7 `.env` files (one per service). **DO NOT COMMIT THESE.**

Template for each service `.env`:

```bash
# Database
DATABASE_URL="postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# Auth
JWT_SECRET="your-32-char-random-secret"

# Service URLs (update after deployment)
AUTH_SERVICE_URL="https://fairgig-auth.onrender.com"
EARNINGS_SERVICE_URL="https://fairgig-earnings.onrender.com"
ANALYTICS_SERVICE_URL="https://fairgig-analytics.onrender.com"

# Frontend
FRONTEND_URL="https://fairgig.vercel.app"

# Judge bypass (anomaly service only)
JUDGE_API_KEY="softec_judge_2026"

# Environment
ENVIRONMENT="production"
PORT="8080"

# CORS
CORS_ALLOW_ORIGINS="https://fairgig.vercel.app"
```

---

## 4. Deploy Node Services to Render (10 min)

Repeat for each service: `auth`, `earnings`, `certificate`, `grievance`

1. Render → New → Web Service
2. Connect GitHub repo
3. Configure:
   - **Name:** `fairgig-auth` (change per service)
   - **Root Directory:** `apps/auth-service`
   - **Runtime:** Node
   - **Build:** `npm install && npm run build`
   - **Start:** `npm start`
4. Add env vars from `.env` file
5. Deploy
6. Copy URL (e.g., `https://fairgig-auth.onrender.com`)
7. Repeat for earnings, certificate, grievance

**Test each service:**
```bash
curl https://fairgig-auth.onrender.com/health
# Expected: {"status":"ok"}
```

---

## 5. Deploy FastAPI Services to Render (5 min)

For `anomaly` and `analytics` services:

1. Render → New → Web Service
2. Connect GitHub repo
3. Configure:
   - **Name:** `fairgig-anomaly` (or `fairgig-analytics`)
   - **Root Directory:** `apps/anomaly-service`
   - **Runtime:** Docker
4. Add env vars
5. Deploy

---

## 6. Deploy Frontend to Vercel (5 min)

1. Vercel → Import Project
2. Select GitHub repo
3. Configure:
   - **Framework:** Vite
   - **Root Directory:** `apps/web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add env vars:
   ```bash
   VITE_API_BASE_URL="https://fairgig-auth.onrender.com"
   VITE_ANOMALY_URL="https://fairgig-anomaly.onrender.com"
   VITE_ANALYTICS_URL="https://fairgig-analytics.onrender.com"
   ```
5. Deploy
6. Copy URL (e.g., `https://fairgig.vercel.app`)

---

## 7. Final Validation (5 min)

### Test All Health Endpoints
```bash
curl https://fairgig-auth.onrender.com/health
curl https://fairgig-earnings.onrender.com/health
curl https://fairgig-anomaly.onrender.com/health
curl https://fairgig-analytics.onrender.com/health

# All should return: {"status":"ok"}
```

### Test Judge Endpoint
```bash
curl -X POST https://fairgig-anomaly.onrender.com/detect \
  -H "Content-Type: application/json" \
  -H "X-API-Key: softec_judge_2026" \
  -d '{
    "worker_id": "TEST",
    "shifts": [
      {"date":"2026-01-01","platform":"Uber","hours_worked":8,"gross_earned":2000,"platform_deductions":200,"net_received":1800}
    ]
  }'

# Expected: {"status":"clean", "anomalies":[]}
```

### Test Frontend
- Open https://fairgig.vercel.app
- Verify page loads (no errors in F12 console)

---

## 8. Update Service-to-Service URLs

After all services are deployed, update their env vars to point to each other:

1. Go to Render dashboard
2. For each service, click **Environment**
3. Update URLs (e.g., `AUTH_SERVICE_URL`, `EARNINGS_SERVICE_URL`)
4. Click **Save** (service auto-redeploys)

---

## 9. Enable CORS in All Backends

Update all backend services' `.env`:
```bash
CORS_ALLOW_ORIGINS="https://fairgig.vercel.app"
```

Redeploy each service.

---

## Done! 🎉

**Production URLs:**
```
Frontend:  https://fairgig.vercel.app
Auth:      https://fairgig-auth.onrender.com
Earnings:  https://fairgig-earnings.onrender.com
Anomaly:   https://fairgig-anomaly.onrender.com
Analytics: https://fairgig-analytics.onrender.com
Docs:      https://fairgig-anomaly.onrender.com/docs (Swagger UI for judges)
```

**Estimated time:** 25–40 minutes  
**Success metric:** All health checks pass + frontend loads without errors

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Service deploy stuck | Check Render logs; fix error; push to GitHub |
| Database connection fails | Verify DATABASE_URL format |
| CORS errors in browser | Update CORS_ALLOW_ORIGINS to frontend URL; redeploy |
| Anomaly service slow | Cold-start on HF Spaces; wait 5s first request |
| Can't connect services | Ensure each service has correct `*_SERVICE_URL` vars |

---

## Full Details

For detailed instructions, service-by-service setup, or troubleshooting:
- See `DEPLOYMENT_GUIDE.md`
- See `DEPLOYMENT_CHECKLIST.md`

For local pre-deployment validation:
```bash
.\scripts\pre-deploy.ps1 -Mode all
```

---

**Status:** Production-ready  
**Last Updated:** April 2026
