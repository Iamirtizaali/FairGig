# Environment Variables Templates

Copy these templates to `.env` files in each service directory. Replace `<YOUR_VALUE>` with actual credentials from Render, Supabase, Upstash, and Vercel.

---

## `/apps/auth-service/.env`

Production environment variables for Auth Service on Render.

```bash
# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://<SUPABASE_USERNAME>:<SUPABASE_PASSWORD>@<SUPABASE_HOST>:<PORT>/postgres?schema=auth

# JWT Configuration
JWT_SECRET=<GENERATE_32_CHAR_RANDOM_SECRET_HS256_KEY>
JWT_EXPIRES_IN=15m

# Refresh Token Configuration
REFRESH_TOKEN_SECRET=<GENERATE_32_CHAR_RANDOM_SECRET_DIFFERENT_FROM_JWT>
REFRESH_TOKEN_EXPIRES_IN=7d

# Service URLs (for redirects and internal calls)
AUTH_SERVICE_URL=https://fairgig-auth.onrender.com
FRONTEND_URL=https://fairgig.vercel.app
EARNINGS_SERVICE_URL=https://fairgig-earnings.onrender.com
CERTIFICATE_SERVICE_URL=https://fairgig-certificate.onrender.com
GRIEVANCE_SERVICE_URL=https://fairgig-grievance.onrender.com

# CORS Configuration
CORS_ALLOW_ORIGINS=https://fairgig.vercel.app,http://localhost:5173

# Email Service (Ethereal for dev, Resend for prod)
EMAIL_PROVIDER=ethereal
ETHEREAL_USER=<ETHEREAL_EMAIL>
ETHEREAL_PASS=<ETHEREAL_PASSWORD>

# Environment Flags
ENVIRONMENT=production
NODE_ENV=production
DEBUG=false

# Optional: Error Tracking
SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
```

---

## `/apps/earnings-service/.env`

Production environment variables for Earnings Service on Render.

```bash
# Database (Supabase PostgreSQL, full user with all permissions)
DATABASE_URL=postgresql://<SUPABASE_USERNAME>:<SUPABASE_PASSWORD>@<SUPABASE_HOST>:<PORT>/postgres?schema=earnings

# JWT Configuration (shared across all services)
JWT_SECRET=<SAME_SECRET_AS_AUTH_SERVICE>

# Service URLs (for service-to-service HTTP calls)
AUTH_SERVICE_URL=https://fairgig-auth.onrender.com
ANOMALY_SERVICE_URL=https://fairgig-anomaly.onrender.com
ANALYTICS_SERVICE_URL=https://fairgig-analytics.onrender.com
CERTIFICATE_SERVICE_URL=https://fairgig-certificate.onrender.com
GRIEVANCE_SERVICE_URL=https://fairgig-grievance.onrender.com

# Supabase (for presigned URLs to screenshot bucket)
SUPABASE_URL=https://<SUPABASE_PROJECT_ID>.supabase.co
SUPABASE_SERVICE_KEY=<SUPABASE_SERVICE_ROLE_KEY>
SUPABASE_BUCKET_NAME=fairgig-screenshots
SUPABASE_BUCKET_REGION=auto

# Redis (Upstash for BullMQ and caching)
UPSTASH_REDIS_URL=<UPSTASH_REST_URL>
UPSTASH_REDIS_TOKEN=<UPSTASH_REST_TOKEN>

# CSV Import Configuration
MAX_FILE_SIZE_MB=10
MAX_ROWS_PER_IMPORT=1000
CSV_QUEUE_CONCURRENCY=5

# CORS Configuration
CORS_ALLOW_ORIGINS=https://fairgig.vercel.app,http://localhost:5173

# Environment Flags
ENVIRONMENT=production
NODE_ENV=production
DEBUG=false

# Optional: Error Tracking
SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
```

---

## `/apps/certificate-service/.env`

Production environment variables for Certificate Service on Render.

```bash
# Database (Supabase PostgreSQL, query earnings and auth schemas)
DATABASE_URL=postgresql://<SUPABASE_USERNAME>:<SUPABASE_PASSWORD>@<SUPABASE_HOST>:<PORT>/postgres

# JWT Configuration (shared)
JWT_SECRET=<SAME_SECRET_AS_AUTH_SERVICE>

# Service URLs
AUTH_SERVICE_URL=https://fairgig-auth.onrender.com
EARNINGS_SERVICE_URL=https://fairgig-earnings.onrender.com

# Supabase (for presigned URLs to certificate bucket)
SUPABASE_URL=https://<SUPABASE_PROJECT_ID>.supabase.co
SUPABASE_SERVICE_KEY=<SUPABASE_SERVICE_ROLE_KEY>
SUPABASE_BUCKET_NAME=fairgig-certificates
SUPABASE_BUCKET_REGION=auto

# PDF Rendering (Puppeteer/headless Chrome)
CHROME_PATH=/usr/bin/chromium-browser

# CORS Configuration
CORS_ALLOW_ORIGINS=https://fairgig.vercel.app,http://localhost:5173

# Certificate Branding
CERTIFICATE_ISSUER=FairGig Platform
CERTIFICATE_ISSUE_DATE_FORMAT=MM/DD/YYYY

# Environment Flags
ENVIRONMENT=production
NODE_ENV=production
DEBUG=false

# Optional: Error Tracking
SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
```

---

## `/apps/grievance-service/.env`

Production environment variables for Grievance Service on Render.

```bash
# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://<SUPABASE_USERNAME>:<SUPABASE_PASSWORD>@<SUPABASE_HOST>:<PORT>/postgres?schema=grievance

# JWT Configuration (shared)
JWT_SECRET=<SAME_SECRET_AS_AUTH_SERVICE>

# Service URLs
AUTH_SERVICE_URL=https://fairgig-auth.onrender.com
ANALYTICS_SERVICE_URL=https://fairgig-analytics.onrender.com

# Redis (Upstash for pub/sub and events)
UPSTASH_REDIS_URL=<UPSTASH_REST_URL>
UPSTASH_REDIS_TOKEN=<UPSTASH_REST_TOKEN>

# Complaint Visibility Rules
PUBLIC_ANON_THRESHOLD=5
INTERNAL_ONLY_CATEGORIES=FRAUD,SECURITY_BREACH
AUTO_ESCALATE_AFTER_DAYS=7

# CORS Configuration
CORS_ALLOW_ORIGINS=https://fairgig.vercel.app,http://localhost:5173

# Email Notifications
EMAIL_PROVIDER=ethereal
ETHEREAL_USER=<ETHEREAL_EMAIL>
ETHEREAL_PASS=<ETHEREAL_PASSWORD>

# Environment Flags
ENVIRONMENT=production
NODE_ENV=production
DEBUG=false

# Optional: Error Tracking
SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
```

---

## `/apps/anomaly-service/.env`

Production environment variables for Anomaly FastAPI Service on Render.

```bash
# Authentication
JWT_SECRET=<SAME_SECRET_AS_AUTH_SERVICE>
JUDGE_API_KEY=softec_judge_2026

# CORS Configuration
CORS_ALLOW_ORIGINS=https://fairgig.vercel.app,http://localhost:5173

# Anomaly Detection Configuration
DEDUCTION_SPIKE_Z_SCORE_THRESHOLD=2.5
MOM_INCOME_DROP_THRESHOLD=0.20
BASELINE_WINDOW_DAYS=60

# Environment Flags
ENVIRONMENT=production
SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
```

---

## `/apps/analytics-service/.env`

Production environment variables for Analytics FastAPI Service on Render.

```bash
# Database (Supabase PostgreSQL with asyncpg driver and analytics_reader role)
# Connection string format: postgresql+asyncpg://analytics_reader:PASSWORD@HOST:5432/postgres
DATABASE_URL=postgresql+asyncpg://<ANALYTICS_READER_USER>:<ANALYTICS_READER_PASSWORD>@<SUPABASE_HOST>:5432/postgres

# Authentication (JWT only, no API key bypass)
JWT_SECRET=<SAME_SECRET_AS_AUTH_SERVICE>

# Redis Configuration (Upstash for cache layer)
REDIS_HOST=<UPSTASH_REDIS_HOST>
REDIS_PORT=6379
REDIS_PASSWORD=<UPSTASH_REDIS_PASSWORD>
REDIS_SSL=true

# Cache TTL Configuration
CACHE_TTL_WORKER_ENDPOINTS=60
CACHE_TTL_ADVOCATE_ENDPOINTS=300
CACHE_TTL_VULNERABILITY=900

# K-Anonymity Threshold
MIN_COHORT_SIZE=5

# CORS Configuration
CORS_ALLOW_ORIGINS=https://fairgig.vercel.app,http://localhost:5173

# Vulnerability Flag Computation
VULNERABILITY_DROP_THRESHOLD=0.20
VULNERABILITY_JOB_ENABLED=true
VULNERABILITY_JOB_SCHEDULE=0 2 * * *

# Observability
OBSERVABILITY_ENABLED=true
STRUCTURED_LOGGING=true

# Environment Flags
ENVIRONMENT=production
SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
```

---

## Frontend (Vercel) — Environment Variables in Vercel Dashboard

Add these in **Vercel Project Settings → Environment Variables**.

```bash
# API Service URLs (pointing to Render deployed services)
VITE_AUTH_URL=https://fairgig-auth.onrender.com
VITE_EARNINGS_URL=https://fairgig-earnings.onrender.com
VITE_ANOMALY_URL=https://fairgig-anomaly.onrender.com
VITE_ANALYTICS_URL=https://fairgig-analytics.onrender.com
VITE_CERTIFICATE_URL=https://fairgig-certificate.onrender.com
VITE_GRIEVANCE_URL=https://fairgig-grievance.onrender.com

# Judge Credentials (for demo judge endpoint calls)
VITE_JUDGE_API_KEY=softec_judge_2026

# Feature Flags
VITE_ENABLE_ANOMALY_DEMO=true
VITE_ENABLE_ADMIN_PANEL=true

# Analytics / Monitoring
VITE_SENTRY_DSN=<OPTIONAL_SENTRY_DSN>
VITE_ENVIRONMENT=production
```

---

## Local Development Template

For local development (use in `.env.local` in each service):

```bash
# .env.local (all services)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fairgig_dev
JWT_SECRET=dev_secret_key_not_production_grade_12345678
JUDGE_API_KEY=softec_judge_2026

# Point to localhost services
AUTH_SERVICE_URL=http://localhost:3001
EARNINGS_SERVICE_URL=http://localhost:3002
ANOMALY_SERVICE_URL=http://localhost:8000
ANALYTICS_SERVICE_URL=http://localhost:8001

# Redis (local Docker: docker run -p 6379:6379 redis:latest)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_SSL=false

# Supabase (use local docker-compose for Supabase local dev)
SUPABASE_URL=http://localhost:54321
SUPABASE_SERVICE_KEY=<LOCAL_SUPABASE_ANON_KEY>

# CORS for localhost
CORS_ALLOW_ORIGINS=http://localhost:5173,http://localhost:3000

ENVIRONMENT=development
NODE_ENV=development
DEBUG=true
```

---

## Secrets Generation Guide

### Generate JWT_SECRET (HS256, 32+ characters)

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Using Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Using OpenSSL:**
```bash
openssl rand -hex 32
```

---

## Secret Management Best Practices

1. **Never commit .env files** — Add to `.gitignore`
   ```
   .env
   .env.local
   .env.*.local
   ```

2. **Use Render Secrets** — For production, always set via Render dashboard, not in code
   - Navigate to Service → Environment
   - Add each variable individually
   - Use "Add Variable" button, not pasting entire `.env`

3. **Rotate Secrets Quarterly**
   - Generate new JWT_SECRET
   - Update all services simultaneously
   - Revoke old tokens if needed

4. **Separate Auth Secrets**
   - `JWT_SECRET` — Shared across all services (verify tokens)
   - `REFRESH_TOKEN_SECRET` — Auth service only (rotate separately)
   - `JUDGE_API_KEY` — Anomaly service only (shared with judges)

5. **Supabase Service Key** — Never expose to frontend
   - Use only in backend services (`apps/`-level services)
   - Frontend uses JWT token instead

6. **Database Read-Only Role** — Analytics service only
   - Create role `analytics_reader` in Supabase
   - Grant `SELECT` only on earnings, grievance, analytics_views schemas
   - Revoke `INSERT`, `UPDATE`, `DELETE`, `DROP`

---

## Verification Checklist

After setting all environment variables, verify with:

```bash
# Auth Service
curl https://fairgig-auth.onrender.com/health

# Earnings Service
curl https://fairgig-earnings.onrender.com/health

# Anomaly Service
curl https://fairgig-anomaly.onrender.com/health

# Analytics Service
curl https://fairgig-analytics.onrender.com/health

# Frontend (should load HTML, not error)
curl https://fairgig.vercel.app
```

All should respond with `{"status": "ok"}` or serve HTML successfully.

---

**Last Updated:** April 2026  
**Audience:** DevOps, Backend Engineers, Frontend Engineers
