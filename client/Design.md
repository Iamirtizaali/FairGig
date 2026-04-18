# 🎨 FairGig — Design System & Screen Specifications

> **Platform:** FairGig — Gig Worker Income & Rights Platform (Pakistan)  
> **Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 + Shadcn/ui + Framer Motion + GSAP  
> **Version:** v1.0 — April 2026

---

## 1. Design Philosophy

FairGig serves Pakistani gig workers (Uber/Careem drivers, Foodpanda couriers, Bykea riders) who need to log earnings, get income verified, and fight unfair platform practices. Every design decision must answer:

- **Trust** — workers must feel this is official, safe, and credible
- **Clarity** — the UI must work for users with varying literacy levels
- **Speed** — mobile-first; most users are on low-end Android devices on PTCL/Jazz 4G
- **Dignity** — the design should feel premium, not charity-ware

---

## 2. Color Palette

```css
:root {
  /* Backgrounds */
  --fg-bg-deep:    #0A0E1A;   /* near-black navy — app background */
  --fg-bg-surface: #111827;   /* dark panel — sidebars, cards */
  --fg-bg-card:    #1A2236;   /* elevated card surface */
  --fg-bg-glass:   rgba(255,255,255,0.04); /* glassmorphism fill */
  --fg-border:     #1E293B;   /* 1px subtle borders */

  /* Accents */
  --fg-cyan:         #00D4FF;              /* Primary — trust, clarity, CTA */
  --fg-cyan-dim:     rgba(0,212,255,0.15); /* Muted cyan fills */
  --fg-emerald:      #6EE7B7;              /* Verified / success */
  --fg-emerald-dim:  rgba(110,231,183,0.15);
  --fg-amber:        #F59E0B;              /* Warning / self-attested / pending */
  --fg-amber-dim:    rgba(245,158,11,0.15);
  --fg-red:          #F87171;              /* Danger / flagged / anomaly */
  --fg-red-dim:      rgba(248,113,113,0.15);
  --fg-purple:       #A78BFA;              /* Advocate role actions */
  --fg-purple-dim:   rgba(167,139,250,0.15);

  /* Text */
  --fg-text-primary:   #F1F5F9; /* near-white — headings, important content */
  --fg-text-secondary: #94A3B8; /* slate-400 — body, descriptions */
  --fg-text-muted:     #475569; /* slate-600 — placeholders, metadata */
}
```

> **Tailwind Usage:** Register these as CSS variables in `index.css` under `@theme inline` and reference as `text-[var(--fg-cyan)]` or set up custom Tailwind colors.

---

## 3. Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headings | **Syne** | 700–800 | Page titles, hero copy, certificate headings |
| Body / UI | **DM Sans** | 400–500 | All body text, labels, descriptions |
| Monospace / Data | **JetBrains Mono** | 400–500 | PKR amounts, IDs, shift numbers, code |
| Urdu RTL | **Noto Nastaliq Urdu** | 400 | Secondary language (RTL support) |

```html
<!-- Google Fonts import in index.html or index.css -->
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Noto+Nastaliq+Urdu&display=swap');
```

**Rules:**
- All PKR amounts → `font-mono` (JetBrains Mono), right-aligned, prefixed with `₨`
- Page H1 headings → Syne 800, tight letter-spacing (`tracking-tight`)
- Urdu text → `dir="rtl"`, Noto Nastaliq Urdu, **never** mix with LTR inline

---

## 4. Spacing Scale

Base unit: **8px**

| Token | Value |
|-------|-------|
| `--fg-space-xs` | 4px |
| `--fg-space-sm` | 8px |
| `--fg-space-md` | 16px |
| `--fg-space-lg` | 24px |
| `--fg-space-xl` | 32px |
| `--fg-space-2xl` | 48px |
| `--fg-space-3xl` | 64px |

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--fg-radius-sm` | 6px | Badges, chips, small inputs |
| `--fg-radius-md` | 12px | Cards, buttons |
| `--fg-radius-lg` | 16px | Modals, large cards |
| `--fg-radius-xl` | 24px | Bottom sheets, Hero card |
| `--fg-radius-full` | 9999px | Pills, avatar circles, FAB |

---

## 6. Shadows & Glows

```css
--fg-shadow-card:   0 4px 24px rgba(0,0,0,0.4);
--fg-glow-cyan:     0 0 20px rgba(0,212,255,0.2);
--fg-glow-emerald:  0 0 20px rgba(110,231,183,0.2);
```

- **Card hover** → `box-shadow: var(--fg-glow-cyan)` + `translateY(-4px)`
- **Active sidebar item** → `box-shadow: inset 2px 0 0 var(--fg-cyan)`
- **Glassmorphism panel** → `backdrop-filter: blur(12px)` + `background: var(--fg-bg-glass)` + `border: 1px solid var(--fg-border)`

---

## 7. Component System

### 7.1 Status Badge System

Used on every shift, complaint, and verification item:

| Status | Color | Icon | Tailwind Classes |
|--------|-------|------|------------------|
| `VERIFIED` | Emerald pill | Shield ✓ | `bg-emerald-500/15 text-emerald-400 border border-emerald-500/30` |
| `SELF_ATTESTED` | Amber pill | Clock ⏱ | `bg-amber-500/15 text-amber-400 border border-amber-500/30` |
| `DISCREPANCY_FLAGGED` | Red pill | Warning ⚠ | `bg-red-500/15 text-red-400 border border-red-500/30` |
| `UNVERIFIABLE` | Slate pill | ? | `bg-slate-500/15 text-slate-400 border border-slate-500/30` |
| `PENDING` | Cyan pill | Spinner | `bg-cyan-500/15 text-cyan-400 border border-cyan-500/30` |

### 7.2 Buttons

```
Primary:    bg-[var(--fg-cyan)] text-[#0A0E1A] font-semibold hover:brightness-110
Secondary:  bg-transparent border border-[var(--fg-cyan)] text-[var(--fg-cyan)] hover:bg-[var(--fg-cyan-dim)]
Ghost:      bg-transparent text-[var(--fg-text-secondary)] hover:text-[var(--fg-text-primary)]
Danger:     bg-transparent border border-[var(--fg-red)] text-[var(--fg-red)]
```

**States:** Loading → spinner inside button + text changes. Disabled → `opacity-40 cursor-not-allowed`.

### 7.3 Inputs

- Background: `#0F172A` (darker than card)
- Border: `1px solid var(--fg-border)`, focus → `1px solid var(--fg-cyan)`
- Focus ring: `ring-2 ring-[var(--fg-cyan)]/30`
- Floating labels: animate up on focus/value-filled
- Error: border → `var(--fg-red)` + shake animation

### 7.4 Cards

```css
.fg-card {
  background: var(--fg-bg-card);
  border: 1px solid var(--fg-border);
  border-radius: var(--fg-radius-lg);
  box-shadow: var(--fg-shadow-card);
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.fg-card:hover {
  transform: translateY(-4px) scale(1.005);
  box-shadow: var(--fg-glow-cyan);
}
```

### 7.5 Charts (Recharts)

- Background: `var(--fg-bg-surface)` / transparent
- Grid lines: `var(--fg-border)` (very subtle)
- Primary data: `var(--fg-cyan)` — area charts use gradient fade to transparent
- Secondary data: `var(--fg-emerald)` (verified), `var(--fg-amber)` (comparison)
- Tooltip: glassmorphism dark popup
- Data points: glowing dots on hover
- **All numbers on axes** → JetBrains Mono
- **Animation:** draw-in from left on mount (800ms)

### 7.6 Navigation

**Desktop Sidebar (240px fixed):**
- Background: `var(--fg-bg-surface)`
- Border-right: `1px solid var(--fg-border)`
- Item active: left border `3px solid var(--fg-cyan)` + `bg-[var(--fg-cyan-dim)]`
- Item hover: `bg-[var(--fg-bg-glass)]`

**Mobile Bottom Tab Bar:**
- Height: 64px min
- Background: glassmorphism + `backdrop-blur-md`
- Active icon: `var(--fg-cyan)` + bold label
- Center FAB: 64px cyan circle elevated above bar

### 7.7 Skeleton Loading

```css
.fg-skeleton {
  background: linear-gradient(90deg, var(--fg-bg-card) 25%, var(--fg-border) 50%, var(--fg-bg-card) 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```
Crossfades to real content (400ms) when data arrives.

---

## 8. Layout System

| Context | Layout |
|---------|--------|
| Desktop | Fixed left sidebar (240px) + scrollable main content area |
| Tablet | Collapsible sidebar (icon-only) + content |
| Mobile | No sidebar — bottom tab bar + full-width content |
| Max content width | `1280px` centered |
| Card grid | 3-col desktop → 2-col tablet → 1-col mobile |

---

## 9. Animation Specification

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Page entry | Staggered fade-up (50ms delay between items) | 600ms total |
| KPI counter | Count-up from 0 on viewport enter | 1.2s ease-out |
| Chart draw | Left-to-right stroke/bar grow | 800ms |
| Sidebar (mobile) | Slide-in from left | 300ms spring |
| Card hover | `scale(1.02)` + glow | 200ms ease |
| Skeleton → content | Crossfade | 400ms |
| Status badge change | Pop scale + color flash | 250ms |
| Button hover | `scale(1.02)` + slight brightness | 150ms |
| Modal open | Backdrop blur fade-in + modal scale-up from 0.95 | 300ms spring |
| Success checkmark | SVG stroke-dashoffset → 0 | 1.5s |
| Toast entry | Slide up from bottom-right | 350ms spring |
| Step transitions (forms) | Current slides-left, next slides-in-right | 400ms |
| Number change (live) | Smooth transition | 150ms ease |

**Framer Motion variants to standardize:**
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } })
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
}
```

---

## 10. Branding

- **Logo:** "FairGig" in Syne 800 + small `ShieldCheck` icon in `var(--fg-cyan)`
- **Tagline:** _"Your earnings. Your proof. Your rights."_
- **Context:** Pakistan — PKR (₨) currency, cities: Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad
- **Platforms referenced:** Careem (green), Uber (black/gray), Bykea (orange), Foodpanda (red), inDrive (blue)

---

## 11. Role System & Color Coding

| Role | Badge Color | Sidebar Accent |
|------|-------------|----------------|
| Worker | Cyan | `var(--fg-cyan)` |
| Verifier | Purple | `var(--fg-purple)` |
| Advocate | Purple gradient | `var(--fg-purple)` |
| Admin | Gold/Orange | `#F59E0B` |

---

## 12. Page Index & Routes

| # | Page | Route | Role |
|---|------|--------|------|
| 1 | Landing | `/` | Public |
| 2 | Sign In | `/auth/sign-in` | Public |
| 3 | Sign Up | `/auth/sign-up` | Public |
| 4 | Forgot / Reset Password | `/auth/forgot` + `/auth/reset/:token` | Public |
| 5 | Worker Dashboard | `/worker/dashboard` | Worker |
| 6 | Shifts List | `/worker/shifts` | Worker |
| 7 | Log / Edit Shift | `/worker/shifts/new` + `/:id` | Worker |
| 8 | CSV Import | `/worker/import` | Worker |
| 9 | Worker Analytics | `/worker/analytics` | Worker |
| 10 | Certificate Builder + Public View | `/worker/certificate` + `/certificate/public/:id` | Worker/Public |
| 11 | Grievances | `/worker/grievances` | Worker |
| 12 | Settings | `/worker/settings` | All |
| 13 | Verifier Queue | `/verify/queue` | Verifier |
| 14 | Verifier Review | `/verify/:shiftId` | Verifier |
| 15 | Verifier History | `/verify/history` | Verifier |
| 16 | Advocate Overview | `/advocate/overview` | Advocate |
| 17 | Advocate Commissions | `/advocate/commissions` | Advocate |
| 18 | Advocate Zones | `/advocate/zones` | Advocate |
| 19 | Advocate Complaints + Detail | `/advocate/complaints` + `/:id` | Advocate |
| 20 | Advocate Vulnerability | `/advocate/vulnerability` | Advocate |
| 21 | Admin Overview | `/admin/overview` | Admin |
| 22 | Admin Platforms + Zones | `/admin/platforms` + `/admin/zones` | Admin |
| 23 | Admin Users | `/admin/users` | Admin |
| 24 | Admin Audit Log | `/admin/audit` | Admin |
| 25 | Admin Seed | `/admin/seed` | Admin |
| 26 | Public Certificate | `/certificate/public/:signedId` | Public |

---

## 13. Page Specifications

---

### PAGE 1 — Landing Page (`/`)

**Purpose:** Conversion page — convince gig workers to sign up.

**Sections:**
1. **Navbar** (sticky, glassmorphism)
   - Logo (left) · Nav links center · Language toggle (EN|اردو) + Sign In ghost + Get Started cyan (right)
   - On scroll: `backdrop-blur-md` + `border-b border-[var(--fg-border)]`
   - Mobile: hamburger → full-screen slide-in menu

2. **Hero** (asymmetric — text left, visual right)
   - Headline: _"Your earnings. Your proof. Your rights."_ — Syne 800, 72px
   - Sub-copy + two CTAs: `Start Free →` (filled cyan) · `See a Sample Certificate` (ghost)
   - Background: dark mesh gradient + floating abstract grid lines
   - Right: floating certificate mockup card, slightly rotated, glowing emerald `VERIFIED` badge
   - Animation: text stagger fade-up; certificate gentle float keyframe

3. **Stat Banner** — `10,000+ Workers Logged` | `₨4.2B Earnings Tracked` | `92% Verification Rate`
   - Count-up on scroll-into-view; dark strip with subtle cyan gradient border

4. **How It Works** (3 steps with dotted animated connecting line)
   - Step 1: Log Shifts · Step 2: Get Verified · Step 3: Get Proof
   - Large numbered chip (cyan outline), icon, heading, description

5. **For Workers** (4 feature cards, glass panels, hover glow)
   - Track Every Rupee · Spot Commission Cuts · Income Certificate · Report Unfairness

6. **For Advocates** (dark panel, purple accent)
   - 3 cards with mock chart thumbnails showing commission trends, income by zone, vulnerability alerts

7. **Sample Certificate Preview** (full-width, blurred worker name, formal document style)
   - CTA: `Generate yours in 5 minutes →`

8. **Testimonials Carousel** (auto-slide 4s, illustrated anonymous avatars, star ratings)

9. **Footer** (3-col: Brand | Links | Language · dark `#0A0E1A`, subtle top border)

---

### PAGE 2 — Sign In (`/auth/sign-in`)

**Layout:** Split screen — 45% dark illustration left, 55% form right.

**Left Panel:** Mesh background + Pakistani delivery rider flat-vector illustration + quote + 3 trust badges  
**Right Panel:** `Welcome back` heading + email/password form + show/hide toggle + forgot password link

**States:**
- Loading: spinner inside button, text → "Signing in…"
- Error: red banner + input shake animation + rate-limit countdown timer

---

### PAGE 3 — Sign Up (`/auth/sign-up`)

**Layout:** Same split screen. Right panel = 3-step multi-step form.

**Step Progress:** `1 Account → 2 About You → 3 Ready!`
- Active: filled cyan circle · Completed: emerald checkmark · Upcoming: slate

| Step | Fields |
|------|--------|
| 1 Account | Full Name, Email, Phone (+92 prefix), Password (strength meter), Confirm Password |
| 2 About You | Work category pills, City dropdown, Zone dropdown, Platform multi-select |
| 3 Ready! | Shield SVG draw animation, summary card, "Go to Dashboard →" |

**Animation:** Step transitions slide left/right; Step 3 confetti burst (cyan/emerald/amber, 20 particles); shield SVG stroke-dashoffset → 0

---

### PAGE 4 — Forgot / Reset Password

**Forgot:** Centered card (480px) — envelope+lock icon → email input → Send link button  
**Sent state:** Checkmark, "Check your inbox", circular countdown ring "Resend in 45s"

**Reset:** New password + confirm + strength meter  
**Expired state:** Red banner "This link has expired. Request a new one →"  
**Success state:** Emerald checkmark + progress bar redirect

---

### PAGE 5 — Worker Dashboard (`/worker/dashboard`)

**Layout:** Fixed sidebar (240px) + scrollable main

**Sidebar nav:** Dashboard · My Shifts · Import CSV · Analytics · Certificate · Grievances · Settings  
Active: `border-l-2 border-[var(--fg-cyan)] bg-[var(--fg-cyan-dim)]`

**Main sections:**

1. **Greeting Bar** — "Good morning, Ahmed 👋" + "Log New Shift +" CTA (time-aware)
2. **KPI Tiles** (4-up grid) — count-up animation
   - This Week's Earnings (₨12,450 ↑8%)
   - Effective Hourly Rate (₨285/hr ↓3%)
   - Verified Shifts (24/31 — 77%)
   - vs City Median (+12% above)
3. **Anomaly Alert Feed** — amber left-border cards, empty state = green checkmark
4. **Recent Shifts Table** (5 rows) — Date | Platform | Hours | Gross | Net | Status | Actions
5. **Earnings Trend Mini Chart** — 7-day bar chart, cyan bars, amber last-week overlay
6. **Verification Status Card** — progress ring (77% emerald) + SLA timer
7. **Quick Actions Bar** — Log Shift | Import CSV | Post Grievance | Generate Certificate

**Mobile:** Bottom tab bar · 2-col KPI grid · Horizontal scroll chart · FAB (+) bottom-right

---

### PAGE 6 — Shifts List (`/worker/shifts`)

**Filter bar** (sticky, glassmorphism): Date range picker · Platform multi-select · Status filter (All/Verified/Self-Attested/Flagged/Pending) · Clear Filters ×

**Table columns:** Date | Platform | Hours | Gross (₨) | Deductions (₨) | Net (₨) | Screenshot | Status | Actions  
- Platform: colored pill · Amounts: JetBrains Mono right-aligned · Screenshot: 📷 or dashed "Upload" · 3-dot action menu
- Bulk select → top action bar slides in with bulk actions
- Mobile: card layout (not table)

---

### PAGE 7 — Log / Edit Shift (`/worker/shifts/new` + `/:id`)

**Design goal:** Simple enough for low-literacy users. Big inputs, icon-led.

**Form sections** (glass card, max 620px centered):
1. **When?** — large date picker + "Today" quick-select
2. **Platform** — large icon-button grid (3-col), selected = glow + checkmark
3. **Earnings** — Hours (stepper +/-), Gross ₨ (JetBrains Mono), Deductions, Net (auto-computed emerald), commission fairness bar (amber→red as rate rises)
4. **Screenshot** — drop zone with preview, SELF_ATTESTED badge if no screenshot
5. **Notes** — optional textarea

**Edit mode:** STATUS BANNER at top (VERIFIED=emerald glass, SELF_ATTESTED=amber, DISCREPANCY=red)  
Verified shifts are read-only; shows Verification History Timeline below

---

### PAGE 8 — CSV Import (`/worker/import`)

**4-step wizard:**
1. Download template (amber callout card with CSV header preview)
2. Upload drop zone → file preview table (first 5 rows)
3. Processing progress bar (live row counter, job ID)
4. Success (emerald + error download) / Error table / Full failure (red panel)

**Drop zone animation:** dashed border dash-animation; drag-over → `scale(1.02)` + cyan tint

---

### PAGE 9 — Worker Analytics (`/worker/analytics`)

**Period tabs:** 7 Days | 30 Days | 90 Days | Custom

**Sections:**
1. **Earnings Trend** — Recharts area chart; cyan area gradient; daily/weekly toggle
2. **Effective Hourly Rate** — amber line chart; city median reference dashed line; red zone when below
3. **Commission Tracker** — grouped multi-line per platform; spike annotations (flag markers)
4. **City Median Compare** — horizontal comparison bars (worker vs city); k-anonymity notice
5. **Verification Ratio** — donut chart (Verified/Self-Attested/Flagged/Pending); "Upload screenshots for X shifts →"
6. **Anomaly Feed** — amber left-border cards, plain-language explanations, expandable "How calculated?" tooltip

---

### PAGE 10 — Income Certificate (`/worker/certificate` + `/certificate/public/:id`)

**Builder (left/top panel):**
- Date range picker (quick presets)
- Earnings filter toggle (Verified only vs include Self-Attested + disclaimer notice)
- Live earnings preview summary
- Preview / PDF / Share link buttons

**Share Link panel:** Monospace URL + Copy button (morph animation) + "Expires in 30 days" + Revoke

**Certificate view (right panel / public page):**
- Light mode only (`#FAFAFA` background — the only light-mode element in the app)
- Formal document: FairGig logo + "INCOME CERTIFICATE" centered heading, decorative border frame
- Worker info section, earnings table (VERIFIED rows = emerald tint, SELF_ATTESTED = amber)
- Verification stamp + QR code bottom-right
- Fine print + Document ID in JetBrains Mono
- **Expired state:** lock icon + "This link has expired" message

**Print CSS:** hides all chrome; certificate is print-clean

---

### PAGE 11 — Grievances (`/worker/grievances`)

**Tabs:** My Complaints | Community Board (anonymous)

**My Complaints:** Cards with category icon, platform chip, status badge (Open/Escalated purple/Resolved emerald/Withdrawn)  
Escalated: purple left border + "An advocate is reviewing this"

**Community Board:** Anonymous handles (Worker #4F2A), anonymous posts, advocate responses (indented, purple border)

**Compose Modal:** Platform select + category + description textarea (min 50 chars) + anonymous toggle (ON by default) + privacy notice

---

### PAGE 12 — Settings (`/worker/settings`)

**Secondary sidebar sections:** Profile · Language & Display · Notifications · Security · Data & Privacy · Delete Account

| Section | Key Elements |
|---------|-------------|
| Profile | Avatar upload, editable fields, amber dot on dirty fields, "Save Changes" appears on change |
| Language | Large EN/اردو cards (cyan border = selected), RTL preview notice |
| Notifications | Custom toggle switches (dark track, cyan thumb), notification types |
| Security | Change password form, active sessions list with Revoke, 2FA "Coming soon" |
| Data & Privacy | Export JSON, revoke shared certificate links, k-anonymity explanation |
| Delete Account | Red danger zone card, multi-step confirmation, type "DELETE" to confirm |

---

### PAGE 13 — Verifier Queue (`/verify/queue`)

**Stats bar:** Pending: 47 | Verified Today: 12 | Avg Wait: 2.3 days | Your Total: 284

**Queue list items:**
- Platform logo chip + Worker (anonymized ID) + shift date + amount claimed + wait time (amber at 2d, red at 4d+)
- Screenshot thumbnail (blurred preview) + "Review →" cyan button
- Priority indicator: red left border on oldest items
- "Claimed by me" → "In Review" badge (prevents double work)

**Empty state:** Emerald illustration + confetti animation 🎉

---

### PAGE 14 — Verifier Review (`/verify/:shiftId`)

**Layout:** Full-focus wide two-panel (no sidebar)

**Left (55%):** Screenshot viewer — zoom, pan, full-size link, red overlay highlight option  
**Right (45%):** Logged values card (anonymized worker ID, all shift data), comparison helper tip, anomaly service result

**Decision form:** 3 large radio-button cards:
- ✅ CONFIRM (emerald) · ⚠️ DISCREPANCY (amber) · ❓ UNVERIFIABLE (slate)
- Note field required for DISCREPANCY/UNVERIFIABLE (min 10 chars)
- Submit button color matches verdict
- Confirmation modal before final submit

**Submitted state:** Verdict banner + "Next in Queue →" auto-appears + audit trail entry

---

### PAGE 15 — Verifier History (`/verify/history`)

Stats + performance line chart (verification count over 30 days)

**History table:** Date | Worker (anon) | Platform | Amount | Decision | Notes | Timestamp  
**Streak badge:** "🔥 7-day verification streak" with emerald animated border

---

### PAGE 16 — Advocate Overview (`/advocate/overview`)

**Role badge:** "Advocate" (purple gradient, sidebar)  
**Sidebar nav:** Overview · Commissions · Zones · Complaints · Vulnerability · Settings

**k-anonymity notice banner** (persistent amber, dismissible): "All data represents aggregates of 5+ workers."

**4 KPI Tiles:**
1. Commission Trend — avg %, sparkline, drill-in link
2. Income by Zone — mini Pakistan map thumbnail + highest zone
3. Top Complaint Category — mini-bar breakdown
4. Vulnerability Flag — red counter with urgency pulse animation, "View →" red CTA

**Charts:** Commission multi-line (6 months) · Income by Zone horizontal bars · Complaint categories donut

---

### PAGE 17 — Advocate Commissions (`/advocate/commissions`)

**Platform selector:** Toggleable chips (Careem/Uber/Bykea/Foodpanda/inDrive/All) — multi-select, brand colors  
**Time range tabs:** 1M | 3M | 6M | 1Y | Custom

**Main chart (400px height):** Multi-line, platform brand colors, annotation flag markers on spikes  
**Change log table:** Date | Platform | Previous % | New % | Change | Workers Affected | Status  
**Benchmark card:** Ranked list with color bars per platform

---

### PAGE 18 — Advocate Zones (`/advocate/zones`)

**City tabs:** All Cities | Karachi | Lahore | Islamabad | Rawalpindi | Faisalabad | Other

**Heat map / Choropleth:** SVG Pakistan city district map — amber (low) → emerald (high) gradient  
Zone hover: tooltip with zone name + median ₨/hr + worker count  
k-anonymity: zones < 5 workers → "Insufficient data" slate

**Income bars (right panel):** Horizontal bars sorted by median, national median dashed line  
**Trend over time:** Select zone → 6-month line chart, compare up to 3 zones

---

### PAGE 19 — Advocate Complaints (`/advocate/complaints` + `/:id`)

**Stats row:** Total: 1,247 | Open: 342 | Escalated: 89 | Resolved: 816

**Cards grid (2-col):** Inline tag/cluster/escalate/resolve/moderate actions  
**Clusters sidebar:** Active cluster panel + "Create New Cluster +"

**Detail page (2-col):**
- Left: full complaint text + metadata
- Right: add tags (autocomplete), cluster linker, status stepper (Open→Escalated→Resolved), internal note, public response toggle
- Comment thread (advocates only internal + external worker-visible)
- Related complaints list (same cluster, 5 snippets)

---

### PAGE 20 — Advocate Vulnerability (`/advocate/vulnerability`)

**Urgency indicator:** "⚡ 47 workers flagged this month" (red chip + pulse animation)

**Trend chart:** 12-month line; spike annotations; threshold line "50 workers — auto-escalation"

**Vulnerability table:** Anon ID | Platform | Zone | Prev Month ₨ | Current Month ₨ | Drop% | Status  
Row expand → mini income trend chart (no PII)  
**Status colors:** New Flag (red) | Ongoing (amber) | Improved (emerald) | Resolved (slate)

**Platform breakdown donut:** by vulnerability rate per platform

---

### PAGE 21 — Admin Overview (`/admin/overview`)

**Role badge:** "Admin" (gold/orange — distinct from all other roles)  
**Sidebar nav:** Overview · Platforms · Zones · Users · Audit Log · Seed Data

**System health bar:** Live service status dots (Auth/Earnings/Analytics/Anomaly/Grievance)  
**6 KPI tiles:** Total Workers, Verifiers, Advocates, Pending Role Requests, Shifts Today, Pending Verification

**Pending role requests table:** Worker Name | Requested Role | Reason | Date | Approve/Reject  
**Recent audit events timeline:** Last 10 events, color-coded by type  
**Quick links:** Add Platform · Add Zone · Freeze User · Run Seed

---

### PAGE 22 — Admin Platforms & Zones (`/admin/platforms` + `/admin/zones`)

**Platforms table:** Logo | Name | Slug | Category | Active toggle | Created | Edit/Deactivate/Delete  
**Add/Edit modal:** Name + category select + color picker + active toggle

**Zones table:** Zone Name | City | Province | Active | Workers | Actions  
**Delete confirmation:** "Deleting this zone affects 142 workers" impact count

**Pre-seeded Pakistan platforms:** Careem · Uber · Bykea · Foodpanda · inDrive · Fiverr · Upwork · Other

---

### PAGE 23 — Admin Users (`/admin/users`)

**Search + filter:** Name/email (debounced) · Role filter · Status filter · Sort

**Table:** Avatar+Name | Email | Role | Status | Joined | Last Active | Actions dropdown  
**Avatar color by role:** Cyan = Worker, Purple = Verifier/Advocate, Gold = Admin

**Freeze modal:** Reason required + duration (indefinite/7d/30d) + type reason to confirm + all actions audited  
**Role approval panel (tab):** Self-written reason + Approve/Reject with rejection reason sent to worker

---

### PAGE 24 — Admin Audit Log (`/admin/audit`)

**Filter:** Date range · Actor user search · Action type · Target type (user/shift/complaint/certificate)

**Timeline entries:** Colored dot + exact datetime (JetBrains Mono) + action description + actor + target + IP  
Expand → full JSON payload

**Action type colors:** role_change=purple · verification=emerald · escalation=amber · freeze=red · login=slate · screenshot_view=orange

**Screenshot view events:** Special orange border card + "This access is logged" warning  
**Export:** Filtered CSV download · Live polling indicator (green pulse dot)

---

### PAGE 25 — Admin Seed (`/admin/seed`)

**Warning banner:** "⚠️ Development and demo environments only."

**Seed option cards:** Platforms · City Zones · Workers (slider 10/50/100) · Verifiers · Advocates · Complaints · Full Reset (danger red card)

**Run progress modal:** Live terminal-style log (dark bg, green mono text, typewriter reveal)

---

### PAGE 26 — Public Certificate (`/certificate/public/:signedId`)

**Top bar (dark, thin):** FairGig logo + "Income Verification Certificate" + Verify link + Print 🖨️

**Certificate document (780px, white `#FAFAFA` — only light element):**
- Formal heading "INCOME CERTIFICATE" (Syne 700, centered)
- Decorative border frame + watermark grid pattern
- Worker name (large Syne 800) + occupation chip + city/zone + worker ID (monospace)
- Earnings summary table (JetBrains Mono amounts; VERIFIED=emerald tint rows)
- Total row bold
- Verification statement + "VERIFIED" subtle watermark in table background
- Left: QR code ("Scan to verify online") · Center: shield logo · Right: expiry date
- Fine print + Document ID `#FG-2026-XXXXX`

**Expired state:** Lock icon + "This certificate has expired or been revoked" + FairGig logo

**Print CSS:** Hides all UI chrome; certificate is clean black-on-white, QR code prints correctly

---

## 14. Bonus Components

### Notification Panel (Bell dropdown)

- Slide-down from top-right (350ms spring), 380px wide
- Full height slide-out on mobile
- Types: VERIFICATION (emerald border) · ANOMALY (amber) · COMPLAINT UPDATE (purple) · ROLE UPDATE (cyan)
- Unread: brighter background · Read: muted
- "Mark all read" link · Empty state: "You're all caught up! 🎉"
- Badge pop animation on new notification

### Mobile-Specific

**Bottom tab bar:** 5 tabs with center FAB (64px cyan circle, elevated)  
**FAB expansion:** Fan animation — "Log Shift | Import CSV | Post Complaint"  
**Shift log (mobile):** Swipeable platform carousel, step-by-step full-screen flow, sticky "Continue →" bottom bar  
**Charts:** Horizontal scroll + pinch zoom + tap → bottom sheet (not tooltip)  
**Bottom sheet:** Drag handle, swipe-down to close, `backdrop-blur`, 24px top radius  
**Pull to refresh:** FairGig shield icon rotates as loading indicator

---

## 15. Tailwind Configuration Notes

```ts
// In vite.config.ts — Tailwind v4 plugin
import tailwindcss from '@tailwindcss/vite'
plugins: [react(), tailwindcss()]
```

```css
/* In index.css — register FairGig design tokens */
@theme inline {
  --color-fg-cyan:    #00D4FF;
  --color-fg-emerald: #6EE7B7;
  --color-fg-amber:   #F59E0B;
  --color-fg-red:     #F87171;
  --color-fg-purple:  #A78BFA;
  --color-fg-bg-deep: #0A0E1A;
  --color-fg-surface: #111827;
  --color-fg-card:    #1A2236;
  --color-fg-border:  #1E293B;
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

This enables classes like `text-fg-cyan`, `bg-fg-surface`, `font-display`, `font-mono` in Tailwind v4.

---

## 16. Accessibility Rules

- Minimum touch target: **48px** on mobile
- Color is **never the only** indicator of state — always paired with icon + text
- All form inputs have associated `<label>` elements
- All interactive elements have `:focus-visible` ring in `var(--fg-cyan)`
- PKR amounts: always include `₨` prefix, never abbreviated without context
- Language toggle changes `dir` attribute on root `<html>` for Urdu RTL
- Skeleton loaders use `aria-busy="true"` and `aria-label`
- Status transitions announced via `aria-live="polite"` regions
