# FairGig — Complete Project Flow (All User Perspectives)

> **Platform:** FairGig — Gig Worker Income & Rights Platform  
> **Stack:** React · Node.js/Express · Python/FastAPI · PostgreSQL  
> **Deployment:** Vercel (Frontend) · Render (4 Node services) · Hugging Face Spaces (2 FastAPI services)

---

## 🌐 System Overview

FairGig solves a critical problem: millions of gig workers in Pakistan (Careem, Uber, foodpanda, inDrive, Bykea) have **no unified income record, no payslip, and no recourse** when platforms silently change commission rates.

### Four User Roles

| Role | Primary Purpose |
|---|---|
| **Worker** | Log earnings, upload screenshots, get income verified, generate certificate |
| **Verifier** | Review screenshot evidence, confirm or flag shifts |
| **Advocate** | Monitor systemic data (commission trends, vulnerabilities, grievances) |
| **Admin** | Manage platform config, users, roles, audit logs |

---

## 🏠 Entry Point — Landing Page (`/`)

```
Anyone visits fairgig.org
    ↓
Landing Page (public)
  ├── Three.js hero animation (globe / earnings visualization)
  ├── How-it-works section (3 steps, Framer Motion animations)  
  ├── "For advocates" section
  └── CTAs: Sign Up / Sign In / View Sample Certificate
```

---

## 🔐 Authentication Flow (All Users)

### Registration

```
/auth/sign-up
    ↓
Fill form: name · email · password · role (default: Worker)
    ↓
POST /auth/v1/register
    ↓
Auth Service → bcrypt hash → user created in DB
    ↓
Access token (15min) + Refresh token cookie (7d) returned
    ↓
Role Router reads role from JWT → redirect to correct dashboard
```

### Login

```
/auth/sign-in
    ↓
POST /auth/v1/login
    ↓ [rate limited: 10 attempts/min]
Verify password hash → issue new JWT pair
    ↓
Role Router
  ├── Worker → /worker/dashboard
  ├── Verifier → /verify/queue
  ├── Advocate → /advocate/overview
  └── Admin → /admin/overview
```

### Token Lifecycle

```
Access Token (15 min)     ← sent in Authorization header
Refresh Token (7 days)    ← HttpOnly Secure cookie only
    ↓
On expiry, frontend auto-calls POST /auth/v1/refresh
    ↓
Old token revoked (rotation), new pair issued
If refresh fails → redirect to /auth/sign-in
```

### Password Reset Flow

```
/auth/forgot-password
    ↓ email submitted
POST /auth/v1/forgot → reset token (UUID) hashed + stored (1hr expiry)
    ↓ email with link sent via nodemailer
/auth/reset-password/:token
    ↓ new password submitted
Old JWT revoked → force fresh login
```

---

## 👷 Worker Flow — The Core User

Workers are typically ride-hailing drivers, food couriers, or gig workers who need income proof.

### 1. Onboarding

```
Sign Up (role = Worker)
    ↓
Select categories: rider / courier / freelancer
    ↓
Select city zone (Lahore / Karachi / Islamabad + district)
    ↓
Short explainer: "How verification works"
    ↓
/worker/dashboard
```

### 2. Logging a Shift

```
/worker/shifts/new
    ↓
ShiftForm (React Hook Form + Zod validation):
  - Platform (dropdown from GET /earnings/v1/platforms, cached 5 min)
  - Date (≤ today)
  - Hours Worked (> 0, ≤ 24)
  - Gross Earned
  - Platform Deductions (auto-validated: gross = deductions + net)
  - Net Received (auto-computed live as user types)
    ↓
POST /earnings/v1/shifts
  ↓ Validation: financial integrity (gross == deductions + net)
  ↓ Shift created with status = SELF_ATTESTED
  ↓ [Background] Earnings service calls Anomaly service with last 90 days of shifts
  ↓ Anomaly flags persisted in anomaly_flags table
    ↓
Redirect → /worker/shifts (new shift appears in list)
```

### 3. Bulk CSV Import

```
/worker/import
    ↓
Step 1: Download CSV template (GET /earnings/v1/imports/template)
Step 2: Fill template (matches exact same schema as manual form)
Step 3: Drop CSV on upload zone
    ↓
Client-side preview via PapaParse (first 10 rows shown)
    ↓
POST /earnings/v1/imports/csv (multipart)
  ↓ Returns jobId immediately (BullMQ queue)
  ↓ Worker stays on page, polls GET /earnings/v1/imports/:jobId every 2s
    ↓
Background job processes rows in batches of 500:
  - Row-level Zod validation
  - Platform name check (must exist in platforms table)
  - Valid rows inserted via Prisma createMany
  - Invalid rows collected into error report CSV
    ↓
Job complete → show summary: X imported, Y failed
  ↓ If failures → offer download of error-report.csv
```

### 4. Uploading Screenshot Evidence

```
/worker/shifts/:id
    ↓
ScreenshotUploader (FileDropzone)
  ↓ Accepts: jpg / png / webp, max 5MB
    ↓
3-Step Upload Dance:
  1. POST /earnings/v1/shifts/:id/screenshot/presign
       → Returns presigned Supabase PUT URL (5 min TTL)
  2. Browser PUTs file directly to Supabase Storage
       → Private bucket: screenshots/{workerId}/{shiftId}/{uuid}.ext
  3. POST /earnings/v1/shifts/:id/screenshot (confirm upload)
       → Screenshot row created in DB
       → Shift status transitions: SELF_ATTESTED → PENDING_REVIEW
    ↓
Framer Motion progress arc animation during upload
    ↓
Shift now in verifier queue
```

### 5. Monitoring Shift Status

After upload, shift passes through the verification pipeline:

```
SELF_ATTESTED         → worker logged manually, no screenshot
    ↓ (screenshot uploaded)
PENDING_REVIEW        → queued for a verifier
    ↓ (verifier acts)
VERIFIED              → earnings count toward median & certificate
DISCREPANCY_FLAGGED   → verifier found a mismatch
UNVERIFIABLE          → screenshot too unclear to confirm
```

Worker sees status update on `/worker/dashboard` + receives in-app notification.

### 6. Analytics Dashboard

```
/worker/analytics
    ↓
Calls GET /analytics/v1/worker/* endpoints:
  ┌─────────────────────────────────────────────────────┐
  │ Summary: this-week earnings, this-month, hourly avg, │
  │ verification percentage                             │
  │ (GET /analytics/v1/worker/summary)                  │
  ├─────────────────────────────────────────────────────┤
  │ Trend Chart: 12-week/month income line chart        │
  │ (GET /analytics/v1/worker/trend?granularity=week)   │
  ├─────────────────────────────────────────────────────┤
  │ Commission Tracker: deduction % per platform, 12wks │
  │ (GET /analytics/v1/worker/commission-tracker)       │
  ├─────────────────────────────────────────────────────┤
  │ City Median Compare: "Am I earning fairly?"         │
  │ My net/hr vs median for my zone + category          │
  │ GET /analytics/v1/worker/median-compare?zone&cat   │
  │ k-anonymity: only shown if cohort ≥ 5 workers      │
  └─────────────────────────────────────────────────────┘
  ↓
Anomaly alerts feed (from anomaly_flags table)
  - Each alert shows: type, severity, window, explanation
  - Example: "Your platform took 34% last week vs usual 22%"
```

### 7. Generating an Income Certificate

```
/worker/certificate
    ↓
Date range picker (e.g. Oct 1 – Dec 31)
    ↓
GET /certificate/v1/build?from=...&to=...
  ↓ Queries ONLY shifts with status = VERIFIED in the range
  ↓ Computes: total net earned, per-platform breakdown, 
              monthly subtotals, average hourly rate
    ↓
CertificatePreview renders:
  - Worker name + national ID (masked)
  - Date range
  - Totals table (platform · hours · net earned)
  - Verification statement
  - QR code linking to public verify URL
    ↓
"Print" → window.print() (CSS @media print — no nav/chrome)
    ↓
"Share" → dialog asks for expiry duration (default 14 days)
  POST /certificate/v1/share
  ↓ Returns signed UUID URL
  ↓ Copy link → share with bank / landlord / anyone
    ↓
Anyone with URL visits: /certificate/public/:signedId
  GET /certificate/v1/public/:signedId (no auth required)
  ↓ Checks: not expired, not revoked
  ↓ Renders same CertificatePreview in print-friendly layout
```

### 8. Posting a Grievance

```
/worker/grievances
    ↓
Tab 1: My Complaints
Tab 2: Public Board (anonymised)
    ↓
"New complaint" button → compose dialog:
  Step 1: Select platform (Uber / Careem / etc.)
  Step 2: Select category (commission change / ban / delay / other)
  Step 3: Write title + description
  Step 4: Choose visibility (public anonymous or internal only)
    ↓
POST /grievance/v1/complaints
    ↓
Complaint appears on board with:
  - Platform badge, category, anonymous author handle
  - Status: OPEN → (advocate tags) → ESCALATED / RESOLVED
  - Comment thread, report button
```

### 9. Role Upgrade Request

```
/worker/settings → "Request role upgrade"
    ↓
POST /auth/v1/role-request { role: "verifier", reason: "..." }
    ↓
Goes to Admin queue for approval
    ↓ (Admin approves)
User's refresh token revoked → forced re-login
New JWT contains upgraded role
```

---

## 🔍 Verifier Flow

Verifiers are trained volunteers who review screenshot evidence.

```
Sign In → /verify/queue
    ↓
Verification Queue Page
  GET /earnings/v1/verification/queue
  - Pending shifts ordered oldest first
  - Filters: platform, age
  - Each row: worker display name, zone, platform, date, gross/net, thumbnail
    ↓
Click "Open" → /verify/:shiftId
    ↓
Side-by-side layout:
  LEFT:  Screenshot viewer (signed Supabase URL, click-to-zoom)
  RIGHT: Worker's logged values (each number on its own line)
         ↓
         Decision Panel:
           [✅ CONFIRM]    [⚠️ FLAG DISCREPANCY]    [❌ UNVERIFIABLE]
    ↓
Click decision → modal opens:
  - "Confirm": note is optional
  - "Flag": note required + describe what doesn't match
  - "Unverifiable": note required (blurry / missing / not screenshot)
    ↓
POST /earnings/v1/shifts/:id/verify
  ↓ Shift status updated
  ↓ Verification row created (verifier ID, decision, note)
  ↓ Audit log entry written
  ↓ Worker notified (in-app + email)
    ↓
Framer Motion slide transition → next pending shift loads
```

### Verifier History

```
/verify/history
    ↓
GET /earnings/v1/verifications/mine
  - My past decisions (date, shift ID, platform, decision)
  - Statistics: total decisions, confirmation rate
```

---

## 📊 Advocate Flow

Advocates are labour rights analysts, NGOs, or organisation representatives watching systemic patterns.

```
Sign In → /advocate/overview
    ↓
Overview Page — 4 KPI Tiles:

  1. Commission Trend Tile (sparkline)
     → Click → /advocate/commissions
     → Multi-line Recharts chart (1 line per platform, 12 weeks)
     → Deduction % per platform per week
     → Cohort size shown on hover (k-anonymity enforced)

  2. Income Distribution Tile (zone overview)
     → Click → /advocate/zones
     → Box plot / percentile bars per city zone
     → GET /analytics/v1/advocate/income-distribution?zone

  3. Top Complaints Tile (this week's categories)
     → Click → /advocate/complaints
     → Full grievance management board
     → Complaint cards with tag, cluster, escalate controls

  4. Vulnerability Flag Tile (count)
     → Click → /advocate/vulnerability
     → List of anon worker IDs with >20% month-on-month income drop
     → GET /analytics/v1/advocate/vulnerability
```

### Complaint Management (Advocate)

```
/advocate/complaints
    ↓
See all complaints (with real author names, not anonymous)
    ↓
Actions per complaint:
  [Tag]      → Add taxonomy label (e.g. "commission-cut-Oct-2023")
  [Cluster]  → AI-suggested similar complaints via TF-IDF cosine similarity
               GET /grievance/v1/clusters/suggestions?seedId=...
               Select from top 5 suggestions → POST /grievance/v1/clusters
  [Escalate] → Mark as escalated (triggers notification)
  [Resolve]  → Mark as resolved (closes loop)
  [Hide]     → Moderate abusive posts
    ↓
All actions create audit log entries
```

### Vulnerability Monitor

```
/advocate/vulnerability
    ↓
GET /analytics/v1/advocate/vulnerability
  ↓ Reads nightly-computed materialised view
  ↓ Returns: anon_id, drop_pct, prior_month_total, current_month_total, city_zone
  ↓ If cohort < 5 workers → "cohort_too_small" shown instead
    ↓
Advocate can identify at-risk zones/cohorts for intervention
```

---

## 🛡️ Admin Flow

Admins manage the platform infrastructure and moderate the ecosystem.

```
Sign In → /admin/overview
  - System health bar (API uptime, DB load, verification lag)
  - KPI tiles: total users, pending verifiers, fraud detections, active advocates
  - Role escalation request queue
  - Recent audit log feed
```

### Platform & Zone CRUD

```
/admin/platforms
    ↓
Table of platforms (Uber, Careem, Bykea, foodpanda, inDrive...)
  - Commission rate configuration (used in anomaly detection baseline)
  - Add / Edit / Suspend platform
  - GET/POST/PATCH /earnings/v1/admin/platforms

/admin/zones
    ↓
Table of city zones (Korangi, Saddar, DHA, Gulshan, Lyari...)
  - Base rate thresholds (used for median comparison)
  - Polygon boundary metadata
  - GET/POST/PATCH /earnings/v1/admin/zones
```

### User Management

```
/admin/users
    ↓
Search users by name / worker ID
    ↓
Per user actions:
  [Freeze]    → PATCH /auth/v1/admin/users/:id/status → all sessions revoked
  [Unfreeze]  → Restore access
  [View Role Request] → Approve or deny pending role upgrades
    POST /auth/v1/role-requests/:id/approve
    POST /auth/v1/role-requests/:id/reject
    ↓ On approval: user's JWT revoked → forced re-login with new role
```

### Audit Log

```
/admin/audit
    ↓
GET /auth/v1/admin/audit (with filters: date range, action type, actor)
    ↓
Terminal-style log viewer showing:
  - TIMESTAMP | ACTOR | ACTION | TARGET | PAYLOAD (JSON)
  ↓
Every logged action:
  - Role changes
  - Verification decisions
  - Complaint escalations/resolutions
  - Platform/zone edits
  - Account freezes
    ↓
Export as CSV for external reporting
```

### Database Seed (Dev/Demo)

```
/admin/seed
    ↓
"Demo Network Seed" button:
  - Generates 15,000+ mock shifts
  - 28,000+ users across 5 platforms
  - 6 months of historical ML anomaly-ready data
    ↓
Progress console shows task steps with live log output
    ↓
"Nuclear Reset" button → TRUNCATE all tables (with confirmation)
```

---

## 🤖 Anomaly Detection Flow (Background + Judge-Callable)

This runs automatically in the background and is also directly callable by judges.

```
BACKGROUND TRIGGER:
Worker logs a new shift
    ↓
Earnings Service [Node] → fires HTTP call to Anomaly Service [FastAPI]
POST /detect with last 90 days of worker's shifts
    ↓
ANOMALY SERVICE:
  Builds pandas DataFrame from shifts
    ↓
  Detection Methods:
  ┌─────────────────────────────────────────────────────────┐
  │ 1. Deduction Spike                                     │
  │    - Compute deduction_pct per week                    │
  │    - Rolling 60-day mean & std                         │
  │    - Z-score each week's deduction against baseline    │
  │    - If |z| > threshold (default 2.5) → flag          │
  ├─────────────────────────────────────────────────────────┤
  │ 2. Hourly Rate Drop                                    │
  │    - Compute net/hour per week                         │
  │    - Flag weeks 2+ std deviations below worker's mean │
  ├─────────────────────────────────────────────────────────┤
  │ 3. Month-over-Month Income Drop                        │
  │    - Compare most recent full month vs prior month     │
  │    - Flag if drop > threshold (default 20%)           │
  └─────────────────────────────────────────────────────────┘
    ↓
  Each anomaly returns:
    kind | severity | window | metric | observed | baseline_mean
    baseline_std | z-score | explanation (plain language, PKR amounts)
    
  Example: 
  "Your platform took 34% in deductions last week vs your usual 22%.
   That's about Rs. 1,200 more per week than typical."
    ↓
Anomaly flags persisted in anomaly_flags table
    ↓
Appear in worker's dashboard "Anomaly Alerts" feed


DIRECT API CALL (Judges / External):
  POST /detect (with API key in X-Api-Key header OR JWT)
  Payload: { worker_id, currency, shifts: [...], options: { z_threshold, mom_drop_pct } }
  Response: { summary, anomalies: [...] }
  → Full OpenAPI docs at /docs
  → curl example in docs/ANOMALY_API.md
```

---

## 📜 Public Certificate Verification

```
Anyone (no account needed) visits:
/certificate/public/:signedId
    ↓
GET /certificate/v1/public/:signedId
  ↓ Checks: token not expired, not revoked
  ↓ Fetches worker VERIFIED shifts in the saved date range
  ↓ Computes totals (same as /build endpoint)
    ↓
Renders: CertificatePreview (light mode, print-friendly)
  - Worker name (masked national ID)
  - Date range
  - Platform breakdown table
  - Net hourly average
  - "Verified by FairGig Framework" stamp
  - QR code for further verification
  - Document hash (for cryptographic verification)
    ↓
Print button → browser print dialog → only certificate content visible
Download PDF → browser print-to-PDF
```

---

## 🔔 Notification Flow

```
Events that trigger notifications:
┌─────────────────────────────────────────────────────────────┐
│ Event                        │ Who is notified │ Channel    │
├─────────────────────────────────────────────────────────────┤
│ Shift VERIFIED/FLAGGED       │ Worker          │ In-app + Email│
│ Anomaly detected             │ Worker          │ In-app     │
│ Complaint tagged/escalated   │ Worker          │ In-app     │
│ Role upgrade approved        │ Worker          │ In-app + Email│
│ Account frozen               │ User            │ Email      │
└─────────────────────────────────────────────────────────────┘
In-app: notification bell in top bar (all authed layouts)
Email: nodemailer via Resend/Postmark
```

---

## 🔁 Complete Data Flow Diagram

```
User Action (Browser)
        ↓
React Frontend (Vercel)
  - TanStack Query manages server state + caching
  - Zustand holds auth state & JWT
  - Zod validates forms before sending
        ↓
axios with JWT in Authorization header
        ↓
Node.js Services (Render) — one of:
  auth-service    :3001
  earnings-service:3002
  certificate-service:3003
  grievance-service:3004
        ↓
Each service:
  requestId → logging → CORS → Helmet → rate-limit → JWT verify → RBAC → Zod → controller → service → repository → Prisma
        ↓
PostgreSQL (Render / Supabase)
  schema: auth | earnings | certificate | grievance | audit
        ↓
[Analytics/Anomaly calls] → FastAPI Services (Hugging Face Spaces)
  anomaly-service :8001   → statistical detection
  analytics-service:8002  → SQLAlchemy aggregations
        ↓
Response: { data, meta, error } envelope
        ↓
React TanStack Query updates cache → UI re-renders
File uploads → Supabase Storage (signed URLs)
Events → Redis pub/sub → BullMQ workers → async jobs
```

---

## 🔐 Security Boundaries

| Concern | Implementation |
|---|---|
| JWT short-lived | Access tokens expire in 15 minutes |
| Refresh token rotation | Old token revoked on every rotation |
| RBAC everywhere | Each service enforces role checks — not just at gateway |
| Screenshot privacy | Signed URLs with TTL; private Supabase bucket |
| k-Anonymity | Analytics queries reject results if cohort < 5 workers |
| Audit logs | Every sensitive action (role change, verification, escalation) logged |
| Financial integrity | `gross = deductions + net` enforced at app layer AND database level |
| Rate limiting | Auth: 10/min; Upload presign: 30/min; Anomaly: 30/min; Reset: 5/min |

---

## 📦 Services Summary

| Service | Language | Port | Key Responsibilities |
|---|---|---|---|
| `auth-service` | Node/Express | 3001 | Register, login, refresh, role management |
| `earnings-service` | Node/Express | 3002 | Shifts CRUD, screenshots, CSV import, verifications |
| `certificate-service` | Node/Express | 3003 | Build + share income certificates |
| `grievance-service` | Node/Express | 3004 | Complaints, clustering, moderation |
| `anomaly-service` | Python/FastAPI | 8001 | Statistical anomaly detection on earnings |
| `analytics-service` | Python/FastAPI | 8002 | Aggregate KPIs for workers and advocates |

---

*Generated from `FairGig_Blueprint.md` + `FairGig_Sprint_Plan.md`*
