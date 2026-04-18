# 🎨 FairGig — Complete Stitch Design Prompts
> **Platform:** FairGig — Gig Worker Income & Rights Platform (Pakistan)
> **Use these prompts in Stitch one page at a time. Copy each section as a full prompt.**

---

## 🎨 DESIGN SYSTEM — Read Before Everything Else
> Include this context at the START of every Stitch prompt session.

```
DESIGN SYSTEM CONTEXT (Always include this):

App: FairGig — a trust-first gig worker income & rights platform for Pakistan (Uber, Careem, Bykea, Foodpanda workers).

COLOR PALETTE:
- Background Deep: #0A0E1A  (near-black navy)
- Background Surface: #111827  (dark panel)
- Background Card: #1A2236  (elevated card)
- Primary Accent: #00D4FF  (electric cyan — trust, clarity)
- Secondary Accent: #6EE7B7  (emerald mint — verified/success)
- Warning: #F59E0B  (amber — self-attested / pending)
- Danger: #F87171  (soft red — flagged / anomaly)
- Purple Highlight: #A78BFA  (advocate actions)
- Text Primary: #F1F5F9  (near-white)
- Text Secondary: #94A3B8  (slate-400)
- Border: #1E293B  (subtle border)
- Glass: rgba(255,255,255,0.04) with backdrop-filter blur(12px)

TYPOGRAPHY:
- Display / Headings: "Syne" (Google Font) — weight 700-800, tracking tight
- Body / UI: "DM Sans" — weight 400-500
- Monospace / Data: "JetBrains Mono" — for numbers, IDs, amounts in PKR
- Urdu RTL: "Noto Nastaliq Urdu" (secondary language support)

STATUS BADGE SYSTEM (used everywhere):
- VERIFIED → emerald green pill + shield checkmark icon
- SELF_ATTESTED → amber pill + clock icon
- DISCREPANCY_FLAGGED → red pill + warning icon
- UNVERIFIABLE → slate pill + question icon
- PENDING → blue pill + spinner icon

COMPONENT AESTHETIC:
- Cards: dark glass panels with 1px border (#1E293B), subtle inner glow on hover
- Buttons: Primary = filled cyan with dark text; Secondary = glass with cyan border
- Inputs: Dark fill (#0F172A), cyan focus ring, floating labels
- Charts: Recharts with cyan/emerald/amber — dark grid lines, glowing data points
- Skeletons: Dark pulse animation on card surfaces
- Toasts: Bottom-right, frosted glass, icon-led
- Navigation: Dark sidebar with icon + label, active = cyan left border + light background
- PKR amounts: Always use JetBrains Mono, right-aligned, ₨ prefix
- Mobile: min touch target 48px, bottom navigation bar on mobile

ANIMATION STYLE:
- Page entry: staggered fade-up (50ms delay between items)
- Number counters: count-up animation on KPI tiles (1.2s ease-out)
- Charts: draw-in animation left to right (800ms)
- Sidebar: slide-in on mobile (300ms spring)
- Cards: scale(1.02) + glow on hover (200ms ease)
- Skeletons → content: crossfade (400ms)
- Status badge change: pop scale + color flash

LAYOUT SYSTEM:
- Desktop: Fixed left sidebar (240px) + main content area
- Mobile: Bottom tab bar + full-width content
- Max content width: 1280px centered
- Card grid: 3-col desktop, 2-col tablet, 1-col mobile
- Spacing: 8px base unit (8/16/24/32/48/64px scale)

BRANDING:
- Logo: "FairGig" in Syne 800, with a small shield-checkmark icon in cyan
- Tagline: "Your earnings. Your proof. Your rights."
- Pakistan context: PKR currency, cities like Karachi/Lahore/Islamabad, platforms like Careem/Bykea
```

---

## 📄 PAGE 1 — Landing Page (`/`)

```
Design a stunning dark-mode landing page for FairGig — a platform that helps Pakistani gig workers (Uber/Careem drivers, Foodpanda couriers) log earnings, get income verified, and fight unfair platform practices.

[Apply the FairGig design system above]

SECTIONS TO BUILD:

1. NAVBAR (sticky, glassmorphism)
   - Left: FairGig logo (shield icon + Syne font)
   - Center: Links — How It Works, For Workers, For Advocates
   - Right: Language toggle (EN | اردو), "Sign In" ghost button, "Get Started" filled cyan button
   - On scroll: adds backdrop blur + dark border
   - Mobile: hamburger → full-screen menu slide-in

2. HERO SECTION
   - Large asymmetric layout — text left, visual right
   - Headline: "Your earnings. Your proof. Your rights." in Syne 800, 72px
   - Sub: "Log your gig work, get it verified, and generate income certificates banks and landlords actually accept."
   - Two CTAs: "Start Free →" (filled cyan), "See a Sample Certificate" (ghost)
   - Background: dark mesh gradient with floating abstract grid lines
   - Right side: floating mock of the income certificate card (preview), slightly rotated, with glowing emerald "VERIFIED" badge on top
   - Animated: hero text fades up on load; certificate card floats gently (CSS keyframe)

3. STAT BANNER (3 stats horizontal)
   - "10,000+ Workers Logged" | "₨4.2B Earnings Tracked" | "92% Verification Rate"
   - Count-up animation when scrolled into view
   - Dark card strip with subtle cyan gradient border

4. HOW IT WORKS (3 steps, icon-led)
   - Step 1: Log Your Shifts — "Manual form or bulk CSV upload"
   - Step 2: Get Verified — "Upload a screenshot. Our verifiers confirm within 72 hours."
   - Step 3: Get Proof — "Download or share your income certificate anywhere."
   - Each step: large numbered chip (cyan outline), icon, heading, description
   - Connected by a dotted animated line

5. FOR WORKERS section
   - Grid of 4 feature cards (glass panels):
     * 📊 Track Every Rupee — weekly/monthly charts
     * 🔍 Spot Commission Cuts — anomaly detection
     * 📄 Income Certificate — for banks, landlords
     * 🗣️ Report Unfairness — anonymous grievance board
   - Each card: icon in colored circle, headline, short description, hover = glow effect

6. FOR ADVOCATES section
   - Dark panel with purple accent
   - Text: "Powering Labour Rights Research"
   - 3 cards: Commission trend charts across platforms | Income distribution by city zone | Vulnerability alerts
   - Mock chart thumbnail in each card

7. SAMPLE CERTIFICATE PREVIEW
   - Full-width section: "This is what a FairGig certificate looks like"
   - Large centered certificate mockup (styled like a formal document)
   - Blurred worker name, shows: total earnings, date range, verified badge, QR code corner
   - CTA: "Generate yours in 5 minutes →"

8. TESTIMONIALS CAROUSEL
   - 3 worker testimonials (auto-sliding, 4s)
   - Worker avatar (illustrated, not photo — privacy), first name only, city, platform
   - Quote in DM Sans italic
   - Star rating in amber

9. FOOTER
   - 3-column: Brand (logo + tagline + social icons) | Links (About, Privacy, Terms, API Docs) | Language
   - Bottom bar: "© 2026 FairGig. Built for Pakistan's gig workers."
   - Dark #0A0E1A background, subtle top border

ANIMATIONS:
- Hero: staggered fade-up (title → subtitle → CTAs → stat strip)
- Certificate float: subtle up-down CSS keyframe
- How It Works: scroll-triggered line draw animation
- Stats: count-up on scroll into view
- Testimonials: smooth horizontal slide
```

---

## 📄 PAGE 2 — Sign In (`/auth/sign-in`)

```
Design a premium dark authentication page for FairGig sign-in.

[Apply the FairGig design system above]

LAYOUT: Split screen desktop — Left panel 45% dark illustration, Right panel 55% form

LEFT PANEL:
- Dark #0A0E1A with abstract mesh background
- FairGig logo centered top
- Large illustration: a Pakistani delivery rider on a motorbike, flat vector art, cyan + emerald tones
- Quote below: "Log once. Prove everywhere." in Syne italic
- 3 trust badges at bottom: "🔒 JWT Secured" | "✅ Role Protected" | "🇵🇰 Made for Pakistan"

RIGHT PANEL (form area):
- Background: #111827 panel, centered content max-width 420px
- Heading: "Welcome back" in Syne 700, 36px
- Sub: "Sign in to your FairGig account"
- Language toggle pills (EN | اردو) top-right of panel

FORM FIELDS:
- Email — dark input, cyan focus ring, animated floating label
- Password — with show/hide eye toggle icon
- "Forgot password?" link (right-aligned, cyan, small)
- "Remember me" checkbox (custom styled — cyan checkmark)

SUBMIT BUTTON:
- Full width, filled cyan, "Sign In →" text
- Loading state: spinner animation inside button, text changes to "Signing in…"

ERROR STATE:
- Red banner above form: "Invalid email or password. Please try again." with X dismiss
- Input border turns red, shakes animation (150ms keyframe)
- Rate limit error: "Too many attempts. Try again in 2 minutes." with countdown timer

DIVIDER:
- "— or —" separator

SOCIAL / SECONDARY:
- "Don't have an account? Sign up →" (cyan link)
- "Apply as a Verifier or Advocate →" (small secondary link)

MOBILE: Single column, full screen, logo top, form below, illustration hidden

ANIMATIONS:
- Panel slide-in from right (400ms spring)
- Form fields stagger fade-up (50ms delay each)
- Button hover: scale(1.02) + slight glow
- Error state: input shake + banner fade-in
```

---

## 📄 PAGE 3 — Sign Up (`/auth/sign-up`)

```
Design a modern multi-step registration page for FairGig.

[Apply the FairGig design system above]

LAYOUT: Same split screen as sign-in. Left = illustration. Right = multi-step form.

STEP INDICATOR (top of right panel):
- 3-step progress bar with labels: "1 Account → 2 About You → 3 Ready!"
- Active step: filled cyan circle; completed: emerald checkmark; upcoming: slate
- Animated progress line between steps

STEP 1 — Account:
- Full Name input
- Email input
- Phone Number input (with +92 Pakistan flag prefix dropdown)
- Password input (strength meter below — 4 bars, fills as user types)
- Confirm Password
- Role info callout: "Starting as a Worker — you can request Verifier/Advocate status later" (info amber box)

STEP 2 — About You:
- "I work as:" — multi-select pill buttons (icons included):
  * 🛵 Delivery Rider | 🚗 Ride-Hailing Driver | 🍕 Food Courier | 💻 Freelancer | 🏠 Domestic Worker
  * Active pill: cyan filled, dark text
- "My city:" — searchable dropdown with Pakistan cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad…)
- "My zone/area:" — secondary dropdown filtered by city
- "Main platforms I use:" — multi-select chip (Uber, Careem, Bykea, Foodpanda, inDrive, other)

STEP 3 — Ready!
- Big success animation: shield icon draws itself in emerald (SVG stroke animation)
- "Your FairGig account is ready!"
- Summary card: Name, Role, City, Categories (review)
- Short explainer: "How verification works" — 3 tiny steps in a row
- CTA button: "Go to my Dashboard →" (full width cyan)

NAVIGATION:
- "Back" ghost button left, "Continue →" filled button right
- Button disabled state if required fields empty
- Validation triggers on blur (not on type)

MOBILE: Vertical stepper, full screen, each step scrollable

ANIMATIONS:
- Step transition: slide-left → new step slides-in-right (400ms)
- Step 3 completion: confetti burst (subtle, 20 particles, cyan/emerald/amber)
- Shield draw animation: SVG stroke-dashoffset animates to 0 (1.5s)
- Password strength bar: width transition (300ms ease)
```

---

## 📄 PAGE 4 — Forgot Password (`/auth/forgot`) & Reset (`/auth/reset/:token`)

```
Design a clean, reassuring password recovery flow for FairGig.

[Apply the FairGig design system above]

FORGOT PASSWORD PAGE:
- Centered card, max-width 480px, dark glass panel
- Icon top center: envelope with lock in cyan
- Heading: "Reset your password"
- Sub: "Enter your email and we'll send a reset link."
- Email input (full width)
- "Send Reset Link →" button (full width cyan)
- SENT STATE: icon changes to checkmark, text changes to "Check your inbox — link sent to email@example.com", countdown "Resend in 45s" with circular progress ring
- "← Back to Sign In" link

RESET PASSWORD PAGE:
- Same centered card layout
- Heading: "Set new password"
- New Password input with strength meter
- Confirm Password input
- "Update Password →" button
- EXPIRED TOKEN STATE: Red banner "This link has expired. Request a new one →" with redirect link
- SUCCESS STATE: Emerald checkmark animation, "Password updated! Redirecting…" with progress bar

ANIMATIONS:
- Icon: gentle pulse animation
- Success checkmark: SVG draw animation
- Sent state: email icon → checkmark morph (300ms)
```

---

## 📄 PAGE 5 — Worker Dashboard (`/worker/dashboard`)

```
Design the main worker dashboard for FairGig — the home screen a delivery rider sees after login.

[Apply the FairGig design system above]

LAYOUT:
- Left: Fixed sidebar 240px (dark #111827)
- Right: Scrollable main content

SIDEBAR:
- FairGig logo + "Worker" role badge (cyan)
- Navigation items with icons:
  * 🏠 Dashboard (active state: left cyan border + light bg)
  * 📋 My Shifts
  * 📤 Import CSV
  * 📊 Analytics
  * 📄 Certificate
  * 🗣️ Grievances
  * ⚙️ Settings
- Bottom: User avatar + name + "Sign Out" link
- Notification bell icon at top with unread count badge

TOP BAR:
- Breadcrumb: "Dashboard"
- Right side: Language toggle (EN|UR) + Notification bell + Avatar menu

MAIN CONTENT SECTIONS:

1. GREETING BAR:
   - "Good morning, Ahmed 👋" — personalized, time-aware
   - Sub: "Here's your earnings overview for this week"
   - Right: "Log New Shift +" button (cyan filled)

2. KPI TILES (4-up grid):
   Each tile: dark glass card, icon in colored circle, label, large number (JetBrains Mono), trend arrow + percentage
   - 💰 This Week's Earnings — ₨12,450 — ↑ 8% vs last week (emerald)
   - ⏱️ Effective Hourly Rate — ₨285/hr — ↓ 3% (amber)
   - ✅ Verified Shifts — 24/31 — 77% verified (emerald badge)
   - 📊 vs City Median — You earn 12% above median (emerald) 
   COUNT-UP ANIMATION: numbers animate from 0 on load (1.2s ease-out)
   HOVER: card lifts (translateY(-4px)) + soft glow

3. ANOMALY ALERT FEED:
   - Section header: "⚠️ Anomaly Alerts" with "View All" link
   - Alert cards (amber left border, dark fill):
     * "Commission rate on Careem increased from 20% → 25% on April 14" — with explanation
     * "Your earnings dropped 28% vs previous week — unusual pattern detected"
   - If no alerts: empty state with green checkmark "No anomalies detected this week 🎉"

4. RECENT SHIFTS TABLE:
   - Header: "Recent Shifts" + "View All Shifts →" link
   - Table columns: Date | Platform | Hours | Gross | Net | Status | Actions
   - Platform: logo chip (Careem green, Bykea orange, Uber black, etc.)
   - Status: badge component (VERIFIED=emerald, SELF_ATTESTED=amber, FLAGGED=red)
   - Row hover: subtle highlight
   - Actions: 👁 View | ✏️ Edit | 📷 Upload Screenshot
   - Show 5 most recent rows
   - "No shifts yet" empty state: illustration + "Log Your First Shift →" CTA

5. EARNINGS TREND MINI CHART:
   - 7-day bar chart using Recharts
   - Dark background, cyan bars, amber line overlay (last week comparison)
   - "Tap chart bars to see daily breakdown" tooltip hint
   - "View Full Analytics →" link below

6. VERIFICATION STATUS CARD:
   - Progress ring: 77% filled (emerald)
   - "24 of 31 shifts verified"
   - "7 shifts awaiting verifier review (est. 48-72 hours)"
   - SLA timer for oldest pending verification

7. QUICK ACTIONS BAR (bottom of content on mobile, inline on desktop):
   - Log Shift | Import CSV | Post Grievance | Generate Certificate
   - Pill button style, icon + label

MOBILE LAYOUT:
- Bottom tab bar: Dashboard | Shifts | Analytics | Certificate | More
- KPI tiles: 2-col grid
- Chart: horizontal scroll container
- FAB (floating action button): "+" for Log Shift, positioned bottom-right

ANIMATIONS:
- Page load: sidebar fades in (left), content stagger-fades-up (top to bottom, 50ms delay)
- KPI numbers: count-up (1.2s)
- Chart bars: grow from bottom (800ms, staggered)
- Alert cards: slide-in from right
- Skeleton → content: crossfade (400ms)
```

---

## 📄 PAGE 6 — Shifts List (`/worker/shifts`)

```
Design a shifts list/history page for a gig worker on FairGig.

[Apply the FairGig design system above]

LAYOUT: Same sidebar + main content structure.

PAGE HEADER:
- Heading: "My Shifts"
- Subtext: "31 shifts logged • 24 verified"
- Right: "Log New Shift +" button (cyan)

FILTER BAR (sticky below header):
- Date Range picker (from/to with calendar popup, dark styled)
- Platform multi-select (Careem, Uber, Bykea, Foodpanda — each with color chip)
- Status filter: All | Verified | Self-Attested | Flagged | Pending
- Clear Filters × button (appears when any filter active)
- Filter bar has glass morphism style, 1px border

SHIFTS TABLE:
Columns: Date | Platform | Hours | Gross (₨) | Deductions (₨) | Net (₨) | Screenshot | Status | Actions
- Date: formatted "Mon, Apr 14" 
- Platform: colored pill logo chip
- Amounts: JetBrains Mono, right-aligned
- Screenshot: 📷 icon if uploaded, dashed outline if missing ("Upload")
- Status: badge component
- Actions: 3-dot menu → Edit / View / Delete / Upload Screenshot
- Row click → navigates to shift detail
- Alternating very-subtle row shading
- Pagination: "← Prev | Page 1 of 4 | Next →" dark styled

EMPTY STATES:
- No shifts: illustration of empty clipboard + "Log your first shift to start tracking" + CTA
- Filtered empty: "No shifts match your filters" + "Clear Filters" button

BULK SELECT:
- Checkbox per row
- When selected: top action bar slides in → "Generate Certificate for Selected" | "Delete Selected"

MOBILE:
- Each shift = card (not table row)
- Card: Platform logo + date top row | Amounts grid | Status badge | Arrow →
- Horizontal scroll for actions

ANIMATIONS:
- Filter apply: table fades out → fades in with results (300ms)
- Row hover: slide-right by 2px + highlight
- Bulk select bar: slides down from top (spring animation)
- Delete: row collapses with height animation (400ms)
```

---

## 📄 PAGE 7 — Log New Shift (`/worker/shifts/new`) & Shift Detail (`/worker/shifts/:id`)

```
Design a shift logging form page for FairGig. This is the most-used screen by workers.

[Apply the FairGig design system above]

DESIGN GOAL: Must be simple enough for a low-literacy delivery rider. Big inputs, clear labels, icon-led.

PAGE HEADER:
- Back arrow + breadcrumb: "Shifts / New Shift"
- Heading: "Log a Shift" (Syne 700, 32px)
- Sub: "Add your earnings for one work session"

FORM CARD (centered, max-width 620px, glass panel):

SECTION 1 — When?
- Date picker: large calendar popup, selected date shown in big readable format
- "Today" quick-select button (most common case)

SECTION 2 — Platform:
- Large icon-button grid (3-col) for each platform:
  * Careem (green background), Uber (black), Bykea (orange), Foodpanda (red), inDrive (blue), Other (slate)
  * Selected: glowing border + checkmark overlay
  * Big enough to tap with thumb

SECTION 3 — Earnings (most important):
- Hours Worked: numeric input with +/- stepper buttons (big tap targets)
- Gross Earned (₨): large number input, JetBrains Mono font
- Platform Deductions (₨): input + auto-calculate helper "= Gross × Commission %"
- Net Received (₨): auto-computed, displayed in emerald, read-only + edit override
- Fairness indicator: horizontal bar showing "Commission rate: 23%" — color shifts amber→red as rate increases
- "Auto-detect commission" toggle (calls anomaly API if enabled)

SECTION 4 — Screenshot (optional but recommended):
- Drop zone: dashed border card, icon + "Drop screenshot here or tap to upload"
- Accepted: JPG/PNG/WEBP, max 5MB
- Upload preview: thumbnail with remove × button
- Status: "Adding a screenshot allows a verifier to confirm your earnings and strengthen your certificate"
- SELF_ATTESTED badge shown if no screenshot

SECTION 5 — Notes (optional):
- Multiline textarea, placeholder: "Any extra notes about this shift…"

SUBMIT ACTIONS:
- "Save Shift" primary button (full width, cyan)
- "Save & Log Another" secondary button
- Cancel link (left)
- Save state: button turns to spinner + "Saving…" then success toast

SHIFT DETAIL PAGE (edit mode):
- Same form, pre-filled with existing values
- STATUS BANNER at top:
  * VERIFIED: emerald glass banner "✅ This shift was verified by a FairGig verifier on Apr 12"
  * SELF_ATTESTED: amber banner "⏱ Pending verification — submitted Apr 10"
  * DISCREPANCY: red banner "⚠️ Discrepancy flagged — note from verifier: 'Amount doesn't match screenshot'"
- Verified shifts: form is read-only, "Create Correction" link instead of edit
- VERIFICATION HISTORY TIMELINE (below form):
  * Timeline component: dot + connector + date + event text
  * "Apr 10: Shift logged by you" | "Apr 10: Screenshot uploaded" | "Apr 12: Verified by Verifier #V-042"
- SCREENSHOT VIEWER: expandable image with signed URL, zoom capability

MOBILE:
- Single column, full width inputs
- Platform picker: 2-col grid
- Stepper buttons extra large (56px touch target)
- Sticky "Save Shift" button at bottom

ANIMATIONS:
- Net Received: real-time calculation with smooth number change (150ms)
- Commission bar: width animates as deduction changes
- Screenshot drop zone: border pulses on hover/drag-over
- Section-by-section reveal: fade-up as user scrolls
- Submit success: form fades → success animation (checkmark draw) → auto-redirect
```

---

## 📄 PAGE 8 — CSV Import (`/worker/import`)

```
Design a CSV bulk import page for FairGig workers who want to upload many shifts at once.

[Apply the FairGig design system above]

LAYOUT: Centered content, max-width 800px

PAGE HEADER:
- Heading: "Bulk Import Shifts"
- Sub: "Upload a CSV file with up to 5,000 shifts at once"

STEP 1 — DOWNLOAD TEMPLATE:
- Callout card (amber, glass):
  * "📋 Use our CSV template to avoid errors"
  * "Download Template" button (secondary, with download icon)
  * Small preview of CSV headers: platform, date, hours_worked, gross_earned, platform_deductions, net_received
  * Schema docs link

STEP 2 — UPLOAD:
- Large drop zone card (dashed border, dark glass)
- Center: cloud upload icon (animated bounce on idle)
- "Drop your CSV here or click to browse"
- Accepted: .csv only, max 10MB
- Drag-over state: border turns cyan + background tint changes + icon scales up

FILE PREVIEW (after file selected):
- File info bar: filename + file size + row count detected
- First 5 rows preview table (truncated columns)
- "Looks good? Start Import →" button (cyan, large)
- "Choose different file" ghost button

STEP 3 — PROCESSING:
- Progress state:
  * "Processing 847 rows…" with animated progress bar (cyan fill)
  * Live row counter: "324 / 847 processed"
  * Spinner + "This may take up to 30 seconds"
  * Job ID shown: "Job #abc-123" (for status polling)
- Cannot navigate away warning banner

STEP 4A — SUCCESS:
- Emerald panel:
  * Large checkmark animation
  * "✅ 832 shifts imported successfully!"
  * "15 rows had errors — download error report to fix them"
- Error report download button (if any errors)
- "View My Shifts →" CTA button

STEP 4B — ERROR STATE:
- Error CSV download button: "Download Error Report (15 rows)"
- Error preview table: Row # | Error Reason | Your Data
  * "Row 4: gross_earned must be a number — got 'N/A'"
  * "Row 17: date format invalid — use YYYY-MM-DD"
- "Fix and Re-upload" CTA

STEP 4C — FULL FAILURE:
- Red panel: "❌ Import failed — no valid rows found"
- Common mistakes checklist
- "Try Again" button

ANIMATIONS:
- Drop zone: dotted border dash-animation (CSS animation) on idle
- Drag over: scale(1.02) + color transition
- Progress bar: smooth fill with counter
- Success: emerald checkmark SVG draw animation + confetti

MOBILE: Full width, vertical stack, touch-friendly file picker
```

---

## 📄 PAGE 9 — Worker Analytics (`/worker/analytics`)

```
Design a deep analytics page for gig workers on FairGig. This is their personal financial intelligence dashboard.

[Apply the FairGig design system above]

PAGE HEADER:
- Heading: "My Analytics"
- Period selector tabs: "7 Days | 30 Days | 90 Days | Custom"
- Active tab: cyan underline + light bg
- Right: "Download Report" ghost button

SECTION 1 — EARNINGS TREND CHART:
- Full-width area chart (Recharts)
- Dark background, cyan area fill with gradient (solid → transparent)
- X-axis: dates, Y-axis: ₨ amounts (JetBrains Mono)
- Tooltip on hover: dark glass popup showing date + gross + net + commission
- Toggle: "Weekly" | "Daily" view
- If weekly: bars instead of area
- Heading: "Earnings Over Time"
- Stat above chart: "₨47,250 total this month — ↑ 12% vs last month"

SECTION 2 — EFFECTIVE HOURLY RATE:
- Line chart (amber line on dark bg)
- Shows ₨/hour over time
- Horizontal reference line: "City Median: ₨263/hr" (dashed, slate color)
- If worker line drops below median: red zone shading
- Heading: "Hourly Rate vs City Median"
- Call-out text: "Your effective rate this month: ₨285/hr — 8% above city median for Ride-Hailing workers in Lahore"
- Emerald callout box when above, amber when below

SECTION 3 — COMMISSION TRACKER:
- Grouped bar chart or multi-line (per platform)
- X-axis: weeks/months, Y-axis: commission %
- Each platform: different color series
- Heading: "Platform Commission Rates Over Time"
- Alert badge if any platform shows commission spike: "⚠️ Careem commission increased 3% in Week 14"
- Legend: platform chips with color dots
- Tooltip: shows exact % + amount in ₨

SECTION 4 — CITY MEDIAN COMPARE CARD:
- Horizontal comparison widget
- Worker bar (cyan) vs City Median bar (slate dashed)
- Breakdown by:
  * Category (Ride-Hailing / Food Delivery / Freelance)
  * Time of day
  * Platform
- "Based on verified data from 847 workers in Lahore"
- k-anonymity notice: small text "Anonymised — individual workers not identifiable"
- Emerald/amber color coding: above = emerald, below = amber

SECTION 5 — VERIFICATION RATIO:
- Donut chart: Verified (emerald) | Self-Attested (amber) | Flagged (red) | Pending (slate)
- Center: "77% Verified" in large JetBrains Mono
- "Your certificate can include ₨41,200 in verified earnings"
- "Upload screenshots for 7 pending shifts to increase your verified amount →"

SECTION 6 — ANOMALY FEED:
- List of flagged anomalies (from FastAPI anomaly service)
- Each: amber left-border card, plain-language explanation
  * "Your commission on Bykea food delivery was 28% this week vs your historical 21%"
  * "Earnings dropped 35% week-over-week — this exceeds the 20% threshold"
- "How is this calculated?" expandable tooltip

MOBILE:
- All charts full-width, horizontal scroll if needed
- Period selector: horizontal scroll pill tabs

ANIMATIONS:
- Chart sections: scroll-triggered draw animation
- Commission spike detection: pulsing amber ring on data point
- Numbers: count-up on section enter viewport
```

---

## 📄 PAGE 10 — Income Certificate (`/worker/certificate`)

```
Design the Income Certificate builder page AND the public certificate view for FairGig.

[Apply the FairGig design system above]

BUILDER SIDE (left/top panel):

HEADING: "Generate Income Certificate"
Sub: "Create a verifiable proof of income for banks, landlords, and more."

STEP 1 — DATE RANGE:
- Calendar range picker (two calendars side by side, dark styled)
- Quick presets: "Last 30 days | Last 3 months | Last 6 months | This year"
- Selected range highlighted in cyan with range fill

STEP 2 — EARNINGS FILTER:
- Toggle buttons:
  * "Verified only" (recommended, emerald) — default ON
  * "Include self-attested" (amber)
- Notice when self-attested included: "Certificate will show a disclaimer that some earnings are self-reported"
- Live preview of earnings to be included:
  * "₨1,24,500 in verified earnings from Apr 1 – Jun 30"
  * "32 verified shifts | 5 self-attested shifts excluded"

STEP 3 — PREVIEW + ACTIONS:
- "Preview Certificate" button → shows certificate preview panel
- "Print / Save as PDF" button (uses browser print with CSS media query)
- "Create Share Link →" button → generates signed URL

SHARE LINK PANEL:
- Generated URL displayed in monospace input
- Copy button (copies + shows "Copied! ✓")
- "Link expires in 30 days" info
- Revoke link button (danger ghost)

---

CERTIFICATE VIEW (right panel / public page `/certificate/public/:signedId`):

DESIGN: Should look like an official document — print-friendly, clean, formal BUT with FairGig branding.

CERTIFICATE LAYOUT:
- White / very-light paper background (#FAFAFA) — the ONLY light-mode element
- FairGig logo top left + "Income Certificate" heading center (Syne 700)
- Issue date top right
- Decorative: subtle watermark grid pattern in background

WORKER INFO SECTION:
- "This certifies that:" label
- Worker full name (large, Syne)
- Role/Category: "Ride-Hailing Driver" chip
- City zone: "Lahore — Gulberg Zone"

EARNINGS TABLE:
- Date Range | Platform | Gross (₨) | Deductions (₨) | Net (₨) | Status
- Totals row at bottom (bold, larger)
- VERIFIED rows: emerald row tint
- SELF_ATTESTED rows: amber tint (if included, with footnote)
- JetBrains Mono for all numbers
- Currency: ₨ (PKR)

VERIFICATION STAMP:
- Right side: official-looking stamp/badge
- "✅ Verified by FairGig Platform"
- "X of Y shifts verified by human reviewers"
- Verification date

QR CODE SECTION:
- Bottom right: QR code box
- "Scan to verify this certificate online"
- Signed URL text below QR

FOOTER OF CERTIFICATE:
- "This certificate is generated by FairGig. Self-attested earnings (if any) are not independently verified."
- Document ID: #FG-2026-XXXXX in monospace

EXPIRED STATE (for invalid/expired URLs):
- Centered card: lock icon, "This certificate link has expired or been revoked"
- "Contact the worker to request a new link" message
- FairGig branding still visible

ANIMATIONS (builder only, not print):
- Preview panel: slide in from right
- Certificate: scale-in reveal (400ms)
- Copy button: icon morph animation
```

---

## 📄 PAGE 11 — Grievances (`/worker/grievances`)

```
Design the grievance/complaint page for FairGig workers — where they report unfair treatment by platforms.

[Apply the FairGig design system above]

LAYOUT: Full width with sidebar

PAGE HEADER:
- Heading: "Grievances"
- Sub: "Report unfair platform behavior or read community reports"

TABS:
- "📋 My Complaints" | "📢 Community Board"
- Active tab: cyan underline

--- TAB 1: MY COMPLAINTS ---

COMPOSE BUTTON:
- "+ Post New Complaint" cyan button (top right)
- Opens modal (see below)

MY COMPLAINTS LIST:
Each complaint card (dark glass):
- Left: category icon (💰 Commission | ⛔ Deactivation | 🔇 Unfair Rating | 📦 Order Issues | ⚡ Other)
- Platform chip (colored)
- Short description (truncated 2 lines)
- Status badge: Open | Escalated (purple) | Resolved (emerald) | Withdrawn
- Date posted
- Tags: chips added by advocate
- "View Details →" link
- If escalated: purple left border + "An advocate is reviewing this"

EMPTY STATE:
- Illustration: megaphone with speech bubble
- "No complaints yet — post when something feels unfair"

--- TAB 2: COMMUNITY BOARD (anonymous) ---

NOTICE BANNER:
- "Posts are anonymous. Never share your full name, ID, or contact info."

FILTER BAR:
- Platform filter | Category filter | Sort: Latest / Most Reported

COMMUNITY POSTS:
Each post card:
- Anonymous handle: "Worker #4F2A" (anonymized)
- Platform chip + category icon
- Post text
- "Report 🚩" action (small)
- Posted date
- Read count
- Advocate response (if any): indented reply with purple border

--- COMPOSE COMPLAINT MODAL ---
- Dark overlay + centered modal (max-width 560px)
- Heading: "Report an Issue"
- Platform select (dropdown with logos)
- Category select: icons + labels
- Description: large textarea (min 50 chars), character counter
- "Post anonymously to Community Board" toggle (default ON)
- "Submit" button → loading state → success toast
- Privacy note: "Your identity is never shown publicly"

ANIMATIONS:
- Tabs: content cross-fade on switch (300ms)
- Card hover: lift + glow
- New complaint submission: card slides into list from top
- Modal: backdrop blur fade-in + modal scale-up (300ms spring)
```

---

## 📄 PAGE 12 — Settings (`/worker/settings`)

```
Design a settings and profile page for FairGig workers.

[Apply the FairGig design system above]

LAYOUT: Sidebar navigation within the settings page (secondary nav)

SETTINGS SIDEBAR SECTIONS:
- 👤 Profile
- 🌐 Language & Display
- 🔔 Notifications
- 🔐 Security
- 📊 Data & Privacy
- ❌ Delete Account

--- PROFILE SECTION ---
- Avatar: circular, with upload button overlay (camera icon)
- Full Name (editable)
- Email (read-only, with "Change email" link)
- Phone (with +92 prefix)
- City + Zone dropdowns
- Work Categories (multi-select pills)
- "Save Changes" button (appears when any field is dirty)
- Change indicator: subtle amber dot on edited fields

--- LANGUAGE & DISPLAY ---
- Language toggle: large cards — EN (English) | اردو (Urdu)
  * Each card has country-relevant icon, selected = cyan border
- RTL preview notice when Urdu selected
- Date format preference: DD/MM/YYYY or MM/DD/YYYY
- Currency display: PKR (₨) — default, locked

--- NOTIFICATIONS ---
- Toggle switches (custom styled — dark track, cyan thumb when ON):
  * Verification decisions (email + in-app)
  * Anomaly detected (in-app)
  * Complaint updates (email + in-app)
  * Weekly earnings digest (email)
- Email notifications: confirmed email display

--- SECURITY ---
- Change Password form (current → new → confirm)
- Active sessions list: device name | location | last active | "Revoke" link
- "Sign out all other devices" danger ghost button
- Two-factor auth: "Coming soon" badge

--- DATA & PRIVACY ---
- "Export My Data" button → downloads JSON of all your data
- "Delete my data from certificates I've shared" — list of shared links with revoke
- k-anonymity explanation callout

--- DELETE ACCOUNT ---
- Red danger zone card
- "Delete My Account" button → multi-step confirmation modal
  * Type "DELETE" to confirm
  * Warning list of what gets deleted
  * Final red "Yes, Delete Everything" button
  * Loading → success → redirect to landing

ANIMATIONS:
- Section switch: content slide + fade (300ms)
- Toggle switch: thumb slides + spring animation
- Save button: appears with fade-up when form is dirty
- Danger zone: accordion expand
```

---

## 📄 PAGE 13 — Verifier Queue (`/verify/queue`)

```
Design the verification queue page for FairGig verifiers — volunteers who review worker screenshots.

[Apply the FairGig design system above]

LAYOUT: Sidebar (Verifier nav: Queue | History | Settings) + main content

PAGE HEADER:
- Role badge: "Verifier" (purple badge)
- Heading: "Verification Queue"
- Sub: "47 screenshots pending review"

STATS BAR (4 small tiles):
- 🕐 Pending: 47
- ✅ Verified Today: 12
- ⚠️ Average Wait: 2.3 days
- 🏆 Your Total: 284 verifications

FILTER BAR:
- Platform filter (all shown by default)
- Age sort: Oldest first (default — encourages clearing backlog) | Newest first
- My assignments only toggle

QUEUE LIST:
Each queue item (card with left accent bar):
- Left: Platform logo + colored chip
- Center:
  * Worker: "Worker #847" (anonymized)
  * Period: "Shift: April 14, 2026"
  * Amount claimed: ₨2,450 gross
  * Waiting: "⏱ 2 days" — turns amber at 2 days, red at 4+ days
- Right:
  * Screenshot thumbnail (blurred/preview)
  * "Review →" button (cyan)
- Oldest items: priority indicator (🔴 red left border)
- Claimed by me: "In Review" badge (prevents double-work)

EMPTY STATE:
- Emerald illustration + "Queue is clear! All screenshots reviewed."
- Confetti animation 🎉

PAGINATION: 20 per page, numbered pages

ANIMATIONS:
- Page load: cards stagger-fade in (30ms delay each)
- Item completion: card collapses smoothly (height → 0, 400ms) and counter decrements
- Age timer: live countdown for near-SLA items
```

---

## 📄 PAGE 14 — Verifier Review (`/verify/:shiftId`)

```
Design the screenshot review page for a FairGig verifier — the side-by-side comparison tool.

[Apply the FairGig design system above]

LAYOUT: Wide two-panel layout (no sidebar — full focus mode)

TOP BAR:
- "← Back to Queue" link
- Breadcrumb: "Queue / Review #847-Apr14"
- Progress: "Shift 3 of 47 in queue" with prev/next arrows
- "Skip this shift" ghost button (right)

LEFT PANEL (55%) — SCREENSHOT VIEWER:
- Large image viewer with dark background
- Zoom in/out controls (+/- buttons + scroll zoom)
- "Open full size" button (opens in new tab via signed URL)
- Pan/drag to explore
- Red overlay highlights (optional — for flagging areas)
- IMAGE METADATA: filename, upload date, file size
- PRIVACY NOTE: "Do not share or save this screenshot outside FairGig"

RIGHT PANEL (45%) — LOGGED VALUES:
- WORKER DATA CARD:
  * "Worker reports:" label (not the worker's name — only worker ID)
  * Date: April 14, 2026
  * Platform: Careem
  * Hours Worked: 6.5 hrs
  * Gross Earned: ₨3,200
  * Platform Deductions: ₨640
  * Net Received: ₨2,560
  * Auto-calculated commission: 20%
  * Notes from worker: "Busy night shift, extra bonus ride"

COMPARISON HELPER:
- Auto-tip: "Check: total shown in screenshot should match Gross ₨3,200"
- Commission rate reference: "Careem standard rate: 18-22%"
- Anomaly service result (if available): "No anomalies flagged for this shift"

DECISION FORM:
- Heading: "Your Verdict"
- Three large radio-button cards (full width):
  * ✅ CONFIRM — "Screenshot matches the logged values" — emerald
  * ⚠️ DISCREPANCY — "I see a mismatch between screenshot and logged data" — amber
  * ❓ UNVERIFIABLE — "Screenshot is unclear, unreadable, or unrelated" — slate
- Note field (required if DISCREPANCY or UNVERIFIABLE):
  * Textarea: "Add a note explaining your decision…"
  * Char counter, min 10 chars
- "Submit Decision →" button (full width, color matches verdict: emerald/amber/slate)
- Confirmation modal: "Submit Confirm verdict for ₨3,200 shift?" — Yes/Cancel

SUBMITTED STATE:
- Verdict banner (color coded)
- "Next in Queue →" button auto-appears
- Audit trail entry: "You verified this shift on Apr 18, 2026 at 11:24 AM"

MOBILE: Stacked panels, screenshot on top (collapsible), form below

ANIMATIONS:
- Image load: fade-in + subtle scale from 0.95→1
- Verdict card selection: scale + glow + radio fills (spring animation)
- Submit: button pulse → spinner → success/color transition
- Next shift: slide panel right → new shift slides in from right
```

---

## 📄 PAGE 15 — Verifier History (`/verify/history`)

```
Design the verification history page for a FairGig verifier.

[Apply the FairGig design system above]

PAGE HEADER:
- "My Verification History"
- Stats row: Total Verified: 284 | Confirmed: 251 (88%) | Discrepancies: 21 (7%) | Unverifiable: 12 (4%)

PERFORMANCE CHART:
- Line chart: daily verification count over time (last 30 days)
- Cyan line, dark bg
- "Most active day: Apr 12 — 24 verifications"

HISTORY TABLE:
Columns: Date | Worker (anon ID) | Platform | Amount | My Decision | Notes | Timestamp
- Decision badge colored
- Notes: truncated with expand
- Sorted newest first
- Filter by: decision type | date range | platform

STREAK BADGE (gamification, subtle):
- "🔥 7-day verification streak — you're making a difference"
- Emerald animated border on badge card

ANIMATIONS: Same table animations as shifts list
```

---

## 📄 PAGE 16 — Advocate Overview (`/advocate/overview`)

```
Design the main advocate/analyst dashboard for FairGig — showing aggregate gig worker data for labour rights work.

[Apply the FairGig design system above]

ROLE BADGE: "Advocate" (purple gradient badge in sidebar)

SIDEBAR (Advocate nav):
- 📊 Overview | 💹 Commissions | 🗺️ Zones | 🗣️ Complaints | ⚡ Vulnerability | ⚙️ Settings

PAGE HEADER:
- Heading: "Advocate Intelligence Dashboard"
- Sub: "Aggregate data from 10,847 verified shifts across Pakistan"
- Last updated: "Data refreshed 3 minutes ago" with live green dot
- "Export Report" button (ghost, with download icon)

K-ANONYMITY NOTICE (persistent amber banner):
- "All data shown represents aggregates of 5+ workers. Individual identities are never exposed."
- Dismiss × (stays dismissed per session)

4 KPI TILES (large, more detailed than worker tiles):
1. COMMISSION TREND:
   - "Avg Platform Commission: 22.4%" 
   - Sparkline chart (last 12 weeks)
   - "↑ 1.8% vs last month — across all platforms"
   - "Drill into Commissions →" link

2. INCOME BY ZONE:
   - Map pin icon + "Gulberg (Lahore) highest median: ₨318/hr"
   - Mini Pakistan map thumbnail with heat zone
   - "Explore by Zone →" link

3. TOP COMPLAINT CATEGORY:
   - "Commission Rate Changes (34% of complaints this week)"
   - Category breakdown mini-bar
   - "View Complaints →" link

4. VULNERABILITY FLAG:
   - "⚡ 47 workers with >20% income drop month-over-month"
   - Red/amber trend indicator
   - "View Vulnerability List →" link (red CTA)

DETAILED CHARTS SECTION:

CHART 1 — Commission Trends (Multi-line, by platform):
- Recharts multi-line, each platform = different color series
- Full width, last 6 months
- Hover: tooltip with all platforms + values
- Zoom controls (last 30d / 3m / 6m / 1yr)

CHART 2 — Income Distribution by Zone (Horizontal bar):
- Each bar = city zone, length = median income
- Color coded: above national median = emerald, below = amber
- "National median: ₨263/hr" reference line

CHART 3 — Top Complaint Categories (Donut or stacked bar):
- Commission | Deactivation | Ratings | Payments | Other
- This week vs last week comparison

COMPLAINT SNAPSHOT:
- Latest 5 escalated complaints (cards, anonymized)
- Quick "Tag" action inline
- "Go to Complaints Board →" CTA

ANIMATIONS:
- Dashboard loads with cinematic stagger (KPI tiles one by one, 100ms delay)
- Charts draw in on load
- Live data indicator: green dot pulses
- Vulnerability count: red counter with urgency animation
```

---

## 📄 PAGE 17 — Advocate Commissions (`/advocate/commissions`)

```
Design the commission trend drilldown page for FairGig advocates.

[Apply the FairGig design system above]

PAGE HEADER: "Platform Commission Trends"
Sub: "Track how platforms change their commission rates over time"

PLATFORM SELECTOR:
- Large toggleable chips: Careem | Uber | Bykea | Foodpanda | inDrive | All Platforms
- Multi-select, active = colored fill (platform brand color)

TIME RANGE: Tabs — 1M | 3M | 6M | 1Y | Custom

MAIN CHART (full width, 400px height):
- Multi-line chart, one line per selected platform
- Platform colors (Careem=green, Uber=black→gray, Bykea=orange, Foodpanda=red)
- Y-axis: Commission % (0–35%)
- Dark grid, glowing data points
- On hover: crosshair + tooltip card showing all platform values on that date
- ANNOTATION MARKERS: flag markers on the line when a significant spike detected (auto from anomaly service)
  * Red triangle marker + tooltip: "23% → 28% jump — detected Apr 14"

CHANGE LOG TABLE (below chart):
Columns: Date | Platform | Previous % | New % | Change | Workers Affected | Status
- Status: "Anomaly Detected (red)" | "Normal variation (slate)"
- Row hover: highlight

BENCHMARK CARD:
- Side card: "Platform Comparison Snapshot"
- Ranked list: Careem 22% | Uber 20% | Bykea 24% | Foodpanda 19% | inDrive 18%
- Color bar visualization per platform

ANIMATIONS:
- Chart: redraw animation when platform selection changes (400ms)
- Annotation flags: drop in from top on chart load
- Table rows: stagger fade-in
```

---

## 📄 PAGE 18 — Advocate Zones (`/advocate/zones`)

```
Design the city zone income distribution page for FairGig advocates.

[Apply the FairGig design system above]

PAGE HEADER: "Income Distribution by Zone"
Sub: "Compare worker earnings across Pakistan cities and zones"

CITY SELECTOR:
- Tab pills: All Cities | Karachi | Lahore | Islamabad | Rawalpindi | Faisalabad | Other

HEAT MAP / CHOROPLETH (main visual):
- Simplified Pakistan city district map (SVG-based)
- Color gradient: light amber (low income) → emerald (high income)
- On zone hover: tooltip with zone name + median ₨/hr + worker count (anonymised as "N workers")
- Click zone: drills down to zone detail

INCOME BARS (right panel or below map):
- Horizontal bar chart: zones sorted by median income
- Each bar: zone name + median ₨/hr value
- National median line (vertical dashed)
- Color: above median = emerald, below = amber
- Worker count shown as small text: "(142 workers)"
- k-anonymity: zones with <5 workers shown as "Insufficient data (slate)"

TREND OVER TIME (bottom):
- Select a zone → see its median income over last 6 months (line chart)
- Compare multiple zones (up to 3, overlay)

STATS CALLOUTS:
- "Most improved zone this month: Defence (Lahore) +₨24/hr"
- "Zone with widest income gap: Korangi vs Clifton (Karachi)"

ANIMATIONS:
- Map: zones fade in with delay from top-left to bottom-right
- Bar chart: bars grow from left on load/filter change
- Zone hover: tooltip fade-in + zone glow
```

---

## 📄 PAGE 19 — Advocate Complaints (`/advocate/complaints`) & Detail

```
Design the complaint management board for FairGig advocates — where they tag, cluster, and escalate worker complaints.

[Apply the FairGig design system above]

PAGE HEADER: "Grievance Management"
Sub: "Review, tag, cluster, and escalate worker complaints"

STATS ROW: Total: 1,247 | Open: 342 | Escalated: 89 | Resolved: 816

FILTER + SEARCH BAR:
- Search input (search by keyword)
- Platform filter | Category filter | Tag filter | Status filter
- Date range picker
- "Active Clusters" toggle (shows only clustered complaints)

COMPLAINT CARDS GRID (2-col desktop, 1-col mobile):
Each card (dark glass):
- Category icon + Platform chip
- Anonymized worker handle: "Worker #A4F2"
- Complaint text (3-line truncate with expand)
- Date + "2 days ago" relative time
- Tags: pill chips (auto-generated + manually added)
- Status badge: Open | Escalated (purple) | Resolved (emerald)
- Cluster: "Cluster #12 — Commission Spike (34 complaints)" link if clustered
- ACTIONS (bottom of card): 
  * "Tag" dropdown → add/remove tags
  * "Add to Cluster" → select or create cluster
  * "Escalate" button (purple)
  * "Resolve" button (emerald)
  * "Moderate (Remove)" — red ghost

CLUSTERS SIDEBAR (right column, desktop):
- "Active Clusters" panel
- Each cluster: name + complaint count + primary category + "View Cluster →"
- "Create New Cluster +" button
- Cluster badge: colored by category

--- COMPLAINT DETAIL PAGE ---

BREADCRUMB: "Complaints / #1247 — Commission Spike"

TWO-COLUMN:
Left: Full complaint text + worker info (anon) + date + platform
Right: Actions panel

ACTIONS PANEL:
- Add Tags: searchable tag input with autocomplete
- Cluster linker: "Add to Cluster" dropdown with search
- Status change: stepper: Open → Escalated → Resolved
- Internal Note: advocate-only note textarea
- "Post Public Response" toggle (posts back to community board with PII stripped)

COMMENT THREAD (below):
- Internal comment thread (advocates only)
- External thread visible to worker (if any)
- Comment input at bottom

RELATED COMPLAINTS:
- "Similar complaints (same cluster)" list: 5 complaint snippets with links

ANIMATIONS:
- Cards: masonry stagger-load animation
- Tag add: pill pops in with scale animation
- Status change: badge morphs with color transition
- Cluster view: panel slides in from right
```

---

## 📄 PAGE 20 — Advocate Vulnerability (`/advocate/vulnerability`)

```
Design the vulnerability monitoring page for FairGig advocates — tracking workers with large income drops.

[Apply the FairGig design system above]

PAGE HEADER:
- Heading: "Vulnerability Monitor"
- Sub: "Workers with income drops >20% month-over-month — anonymised for privacy"
- Urgency indicator: "⚡ 47 workers flagged this month" (red chip)

ANONYMIZATION NOTICE (prominent):
- Dark amber callout: "Worker IDs shown are internal anonymized identifiers. This data is never linkable to real names outside FairGig admin context."

SUMMARY STATS (4 small tiles):
- Flagged This Month: 47 | Previous Month: 31 | ↑52% more cases | Most Affected Platform: Bykea

TREND CHART:
- Line chart: flagged worker count over last 12 months
- Annotate spikes (e.g., "Oct '25: Foodpanda policy change")
- Threshold line: "Intervention threshold: 50 workers" (red dashed line)
- Description: "When this line is crossed, automatic escalation to advocacy team"

VULNERABILITY TABLE:
Columns: Anon ID | Platform | Zone | Previous Month ₨ | Current Month ₨ | Drop % | Status
- Drop % column: red color, larger bold font for highest drops
- Status: New Flag (red) | Ongoing (amber) | Improved (emerald) | Resolved (slate)
- Row click: expand detail → mini chart of that worker's income (no PII, just trend)
- Sort by: drop % (default desc) | platform | zone

BATCH ACTIONS:
- Select multiple → "Create Cluster from These Cases"
- "Export Anonymised Report" button → CSV download

PLATFORM BREAKDOWN:
- Donut chart: which platforms have highest vulnerability rate
- "Bykea: 18 workers (38%)" | "Careem: 12 workers (26%)" etc.

ANIMATIONS:
- Red counter: urgency pulse animation
- Table rows: stagger reveal
- Expand row: height animation
- Chart annotation: marker drops in on load
```

---

## 📄 PAGE 21 — Admin Overview (`/admin/overview`)

```
Design the admin control panel overview for FairGig.

[Apply the FairGig design system above]

ROLE BADGE: "Admin" (orange/gold badge — distinct from other roles)

SIDEBAR (Admin nav):
- 📊 Overview | 🚗 Platforms | 🗺️ Zones | 👥 Users | 📋 Audit Log | 🌱 Seed Data

PAGE HEADER: "Admin Overview"
Sub: "System health and management"

SYSTEM HEALTH BAR (top):
- Service status indicators (green dot = healthy):
  * Auth Service ● | Earnings Service ● | Analytics FastAPI ● | Anomaly FastAPI ● | Grievance Service ●
- "All services operational" → emerald badge
- If any down: red badge + alert

KPI TILES (6-up grid):
- Total Workers: 10,847 | Verifiers: 24 | Advocates: 12 | Pending Role Requests: 3
- Shifts Logged (today): 847 | Pending Verification: 47

PENDING ROLE REQUESTS (urgent action section):
- Table: Worker Name | Requested Role | Reason | Date | Actions (Approve/Reject)
- "3 pending" badge (amber)

RECENT AUDIT EVENTS:
- Timeline: last 10 audit events
- Each: timestamp | actor | action | target
  * "Admin approved Verifier role for user@email.com" 
  * "Complaint #1247 escalated by Advocate Ayesha"
  * "Shift #8472 verified (CONFIRMED) by Verifier Omar"
- Color-coded by action type

QUICK LINKS:
- "Add Platform +" | "Add Zone +" | "Freeze User" | "Run Seed"

ANIMATIONS: Same dashboard animation patterns — stagger, count-up, health dot pulse
```

---

## 📄 PAGE 22 — Admin Platforms & Zones (`/admin/platforms` & `/admin/zones`)

```
Design CRUD management pages for platforms and zones in FairGig admin panel.

[Apply the FairGig design system above]

PLATFORMS PAGE:

PAGE HEADER: "Platforms" + "Add Platform +" button (cyan)

PLATFORMS TABLE:
Columns: Logo | Name | Slug | Category | Active | Created | Actions
- Logo: small colored circle + letter (since we can't use real logos)
- Active toggle: custom toggle switch
- Category: chip (Ride-Hailing | Food Delivery | Freelance | Other)
- Actions: Edit ✏️ | Deactivate 🚫 | Delete 🗑️

ADD/EDIT PLATFORM MODAL:
- Platform name (text input)
- Category select
- Icon/color picker (for placeholder logo)
- Active toggle
- "Save Platform" button

SEEDED PLATFORMS (pre-filled for Pakistan):
Careem | Uber | Bykea | Foodpanda | inDrive | Shopify (freelance) | Fiverr | Upwork | Other

---

ZONES PAGE:
Same table structure:
Columns: Zone Name | City | Province | Active | Workers | Actions

ADD ZONE MODAL:
- Zone name
- City dropdown (Pakistan cities)
- Province auto-fill
- Active toggle

Both pages:
- Search/filter bar
- Pagination
- Confirmation modal for delete (with impact count: "Deleting this zone affects 142 workers")
```

---

## 📄 PAGE 23 — Admin Users (`/admin/users`)

```
Design the user management page for FairGig admin.

[Apply the FairGig design system above]

PAGE HEADER: "User Management"
Stats: "10,883 users total | 47 frozen | 3 pending role requests"

SEARCH + FILTER BAR:
- Search by name/email (with debounce)
- Role filter: All | Worker | Verifier | Advocate | Admin
- Status filter: All | Active | Frozen | Pending Approval
- Sort by: Newest | Name | Role

USERS TABLE:
Columns: Avatar+Name | Email | Role | Status | Joined | Last Active | Actions
- Avatar: initials circle (colored by role — cyan=worker, purple=verifier/advocate)
- Status badge: Active (emerald) | Frozen (red) | Pending (amber)
- Actions dropdown:
  * View Profile
  * Change Role (→ opens role change modal)
  * Freeze Account (turns amber → requires reason)
  * Unfreeze
  * View Audit Trail for this user

FREEZE MODAL:
- "Freeze @username's account?"
- Reason textarea (required)
- Duration: indefinite / 7 days / 30 days
- Red "Confirm Freeze" button (requires typing reason first)
- All actions audited

ROLE APPROVAL SECTION (tab or panel):
- Pending role requests with worker's self-written reason
- "Approve as Verifier" | "Approve as Advocate" | "Reject" buttons
- Reject requires reason (sent to worker)

ANIMATIONS:
- Freeze action: row tints red with animation
- Unfreeze: transitions to emerald
- Search results: fade transition
```

---

## 📄 PAGE 24 — Admin Audit Log (`/admin/audit`)

```
Design the audit log viewer for FairGig admin — a read-only event trail.

[Apply the FairGig design system above]

PAGE HEADER: "Audit Log"
Sub: "Every sensitive action logged with actor, timestamp, and target"

FILTER BAR:
- Date range picker
- Actor (search by user)
- Action type: all | role_change | verification | escalation | freeze | login | screenshot_view
- Target type: user | shift | complaint | certificate

LOG ENTRIES (timeline style):
Each entry:
- Left: colored dot (action type color)
- Timestamp: exact datetime in JetBrains Mono
- Action description: "Admin approved Verifier role for Omar Farooq (user #8472)"
- Actor: admin name + role badge
- Target: linked entity name/ID
- IP address (for auth events)
- Expand → shows full JSON payload

ACTION TYPE COLORS:
- role_change → purple
- verification → emerald
- escalation → amber
- freeze → red
- login/logout → slate
- screenshot_view → orange (sensitive!)

SCREENSHOT VIEW ALERTS:
- Any screenshot_view event gets special orange border card
- "An admin viewed a protected screenshot — this access is logged"

EXPORT:
- "Export as CSV" button (filtered export)

SEARCH:
- Free-text search across all log entries
- Results highlight matching text

ANIMATIONS:
- New entries: slide in from top (if live-polling is on)
- Live indicator: green pulse dot if polling active
- Expand: accordion animation
```

---

## 📄 PAGE 25 — Admin Seed (`/admin/seed`)

```
Design the seed data page for FairGig admin (dev/demo use only).

[Apply the FairGig design system above]

PAGE HEADER: "Seed Data"
WARNING BANNER: "⚠️ This page is for development and demo environments only. Do not use in production."
Orange border, prominent placement.

SEED OPTIONS (cards):
1. Seed Platforms — "Load 8 Pakistani gig platforms" — "Careem, Uber, Bykea, Foodpanda, inDrive + 3 more"
2. Seed City Zones — "Load 25 Pakistan city zones" — major districts/towns
3. Seed Workers — slider: 10 / 50 / 100 workers → "100 workers with 90 days of shifts each"
4. Seed Verifiers — "5 verifier accounts"
5. Seed Advocates — "3 advocate accounts"
6. Seed Complaints — "200 anonymised complaints across categories"
7. Full Reset — "⚠️ DELETE ALL DATA and re-seed from scratch" — red danger card

Each card:
- Icon + title + description
- "Run" button (cyan for normal, red for reset)
- Status: "Last run: Apr 17, 2026 at 11:30" or "Not yet seeded"
- Progress bar shown when running

RUN PROGRESS MODAL:
- "Seeding 100 workers with 9,000 shifts…"
- Progress bar
- Live log lines: "Created worker #1… #2…" (terminal-style, dark bg, green text, monospace)

ANIMATIONS:
- Terminal log: typewriter reveal effect
- Progress bar: smooth fill
- Completion: "Seed complete ✅" with checkmark
```

---

## 📄 PAGE 26 — Public Certificate (`/certificate/public/:signedId`)

```
Design the publicly accessible, shareable income certificate page for FairGig.
This page has NO login required and is sent to landlords, banks, and employers.

[Apply the FairGig design system above — but this certificate section uses LIGHT MODE]

TOP BAR (dark, thin):
- FairGig logo + "Income Verification Certificate"
- "Verify this certificate →" link (calls QR scan equivalent)
- Print button 🖨️

CERTIFICATE DOCUMENT (centered, max-width 780px, white background):
--- CERTIFICATE DESIGN (formal, print-ready) ---

HEADER:
- FairGig logo (full color) + "INCOME CERTIFICATE" bold centered heading
- Issue Date: April 18, 2026 | Document ID: #FG-2026-47829
- Decorative thin border frame around entire certificate

CERTIFIES SECTION:
- "This document certifies the income of:"
- Worker Name: large, Syne 800 font
- Occupation: "Ride-Hailing Driver" (category chip)
- Platform(s): "Careem, Uber" chips
- City / Zone: "Lahore — DHA Zone"
- FairGig Worker ID: monospace

EARNINGS SUMMARY TABLE:
- Period: April 1, 2026 – June 30, 2026
- Table:
  Month | Platform | Verified Shifts | Gross (₨) | Deductions (₨) | Net (₨)
- Footer row (bold): Total | - | 32 shifts | ₨1,47,200 | ₨29,440 | ₨1,17,760
- All numbers: JetBrains Mono
- "VERIFIED" watermark-style in background of table (very subtle, emerald)

VERIFICATION STATEMENT:
- "32 of 37 shifts in this period were verified by FairGig-trained volunteer verifiers. 5 shifts are self-attested and marked accordingly."
- "Verification is based on screenshot evidence submitted by the worker."

FOOTER OF CERTIFICATE:
- Left: QR code (real or placeholder) — "Scan to verify online"
- Center: FairGig shield logo + "Verified by FairGig Platform"
- Right: Certificate expires: July 18, 2026

FINE PRINT:
- "This certificate is generated by FairGig. FairGig does not guarantee the accuracy of self-attested earnings. Verified earnings have been reviewed by trained volunteers."

--- EXPIRED STATE ---
- Dark overlay: lock icon centered
- "This certificate link has expired or been revoked by the worker."
- "Please contact the worker to request a new verification link."
- FairGig logo still visible

PRINT CSS:
- Hides top bar, print button, all non-certificate elements
- Certificate full page, black text on white
- QR code prints cleanly

ANIMATIONS (screen only, not print):
- Certificate: elegant fade-up + slight scale (500ms ease)
- QR: subtle spin-in
- Verified badge: shield pulse animation on load
```

---

## 🔔 BONUS — Notification Center (Dropdown / Panel)

```
Design a notification panel for FairGig — the dropdown/slide-out from the bell icon.

[Apply the FairGig design system above]

TRIGGER: Bell icon in top navbar, with badge count (red circle, white number)

PANEL (slide-out from top-right, 380px wide, full height on mobile):

HEADER:
- "Notifications" heading
- "Mark all read" link (right)
- Unread count: "5 unread"

NOTIFICATION ITEMS:
Each item (48px min height, tap friendly):

✅ VERIFICATION:
- Emerald left border
- "Your shift on Apr 14 was verified ✅"
- "Careem • April 14 • 2 hours ago"
- Tap → goes to shift detail

⚠️ ANOMALY:
- Amber left border
- "⚠️ Anomaly detected in your last 7 days of earnings"
- "Commission rate increased by 5% — see details"
- Tap → opens analytics

🗣️ COMPLAINT UPDATE:
- Purple left border
- "Your complaint has been tagged by an advocate"
- "Commission Spike • 1 day ago"
- Tap → complaint detail

✅ ROLE UPDATE:
- Cyan left border
- "Your Verifier role request was approved!"
- "You can now access the verification queue"

UNREAD styling: slightly brighter background
READ styling: dim

EMPTY STATE:
- Bell illustration + "You're all caught up! 🎉"

FOOTER: "View all notifications →" link

ANIMATIONS:
- Panel: slide-down from top-right with spring (350ms)
- New notification badge: pop scale (bounce)
- Mark as read: item fades to muted tone (300ms)
- Item enter: fade + slide from right
```

---

## 📱 BONUS — Mobile-Specific Components

```
Design the mobile-specific navigation and key components for FairGig mobile users (primary audience: delivery riders).

[Apply the FairGig design system above]

BOTTOM TAB BAR (Worker — mobile only):
- 5 tabs: 🏠 Home | 📋 Shifts | ➕ (FAB) | 📊 Analytics | More
- Center FAB: large cyan circle button (+) for "Log Shift" — elevated above tab bar
- Active tab: icon turns cyan + label bold
- Tab bar: dark glass morphism with blur
- Height: 64px minimum

FLOATING ACTION BUTTON:
- 64px diameter
- Cyan filled with + icon
- On tap: expands to reveal options: "Log Shift" | "Import CSV" | "Post Complaint"
- Expansion: fan animation (3 buttons spread above FAB)

SHIFT LOG FORM (mobile optimized):
- Platform selector: large swipeable carousel (not grid)
- Number inputs: native numeric keyboard triggered
- Hours stepper: large + and - buttons (56px hit target)
- Full screen flow, step-by-step (not all fields visible at once)
- Sticky bottom bar: progress indicator + "Continue →" button

MOBILE CHART INTERACTIONS:
- All charts: horizontal scroll gesture for time range navigation
- Pinch to zoom on charts
- Tap data point → bottom sheet with details (not tooltip)

BOTTOM SHEET (reusable):
- Drag handle at top
- Closes on swipe down or backdrop tap
- Dark glass background, rounded top corners (24px)
- Used for: shift actions, filter options, chart details, quick actions

PULL TO REFRESH:
- Custom loading indicator: FairGig shield icon rotates (CSS keyframe)
- Used on dashboard, shifts list, queue
```

---

## 🎨 DESIGN TOKENS REFERENCE

```
CSS CUSTOM PROPERTIES TO USE IN CODE (for Antigravity MCP or direct Tailwind config):

:root {
  /* Colors */
  --fg-bg-deep: #0A0E1A;
  --fg-bg-surface: #111827;
  --fg-bg-card: #1A2236;
  --fg-bg-glass: rgba(255,255,255,0.04);
  --fg-border: #1E293B;

  --fg-cyan: #00D4FF;
  --fg-cyan-dim: rgba(0,212,255,0.15);
  --fg-emerald: #6EE7B7;
  --fg-emerald-dim: rgba(110,231,183,0.15);
  --fg-amber: #F59E0B;
  --fg-amber-dim: rgba(245,158,11,0.15);
  --fg-red: #F87171;
  --fg-red-dim: rgba(248,113,113,0.15);
  --fg-purple: #A78BFA;
  --fg-purple-dim: rgba(167,139,250,0.15);

  --fg-text-primary: #F1F5F9;
  --fg-text-secondary: #94A3B8;
  --fg-text-muted: #475569;

  /* Typography */
  --fg-font-display: 'Syne', sans-serif;
  --fg-font-body: 'DM Sans', sans-serif;
  --fg-font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --fg-space-xs: 4px;
  --fg-space-sm: 8px;
  --fg-space-md: 16px;
  --fg-space-lg: 24px;
  --fg-space-xl: 32px;
  --fg-space-2xl: 48px;
  --fg-space-3xl: 64px;

  /* Radius */
  --fg-radius-sm: 6px;
  --fg-radius-md: 12px;
  --fg-radius-lg: 16px;
  --fg-radius-xl: 24px;
  --fg-radius-full: 9999px;

  /* Shadows */
  --fg-shadow-card: 0 4px 24px rgba(0,0,0,0.4);
  --fg-glow-cyan: 0 0 20px rgba(0,212,255,0.2);
  --fg-glow-emerald: 0 0 20px rgba(110,231,183,0.2);
}
```

---

## 📋 QUICK REFERENCE: ALL PAGES AT A GLANCE

| # | Page | Route | Role | Prompt Section |
|---|------|--------|------|----------------|
| 1 | Landing | `/` | Public | PAGE 1 |
| 2 | Sign In | `/auth/sign-in` | Public | PAGE 2 |
| 3 | Sign Up | `/auth/sign-up` | Public | PAGE 3 |
| 4 | Forgot/Reset Password | `/auth/forgot` + `/auth/reset/:token` | Public | PAGE 4 |
| 5 | Worker Dashboard | `/worker/dashboard` | Worker | PAGE 5 |
| 6 | Shifts List | `/worker/shifts` | Worker | PAGE 6 |
| 7 | Log/Edit Shift | `/worker/shifts/new` + `/:id` | Worker | PAGE 7 |
| 8 | CSV Import | `/worker/import` | Worker | PAGE 8 |
| 9 | Worker Analytics | `/worker/analytics` | Worker | PAGE 9 |
| 10 | Certificate Builder + Public View | `/worker/certificate` + `/certificate/public/:id` | Worker/Public | PAGE 10 |
| 11 | Grievances | `/worker/grievances` | Worker | PAGE 11 |
| 12 | Settings | `/worker/settings` | All | PAGE 12 |
| 13 | Verifier Queue | `/verify/queue` | Verifier | PAGE 13 |
| 14 | Verifier Review | `/verify/:shiftId` | Verifier | PAGE 14 |
| 15 | Verifier History | `/verify/history` | Verifier | PAGE 15 |
| 16 | Advocate Overview | `/advocate/overview` | Advocate | PAGE 16 |
| 17 | Advocate Commissions | `/advocate/commissions` | Advocate | PAGE 17 |
| 18 | Advocate Zones | `/advocate/zones` | Advocate | PAGE 18 |
| 19 | Advocate Complaints + Detail | `/advocate/complaints` + `/:id` | Advocate | PAGE 19 |
| 20 | Advocate Vulnerability | `/advocate/vulnerability` | Advocate | PAGE 20 |
| 21 | Admin Overview | `/admin/overview` | Admin | PAGE 21 |
| 22 | Admin Platforms + Zones | `/admin/platforms` + `/admin/zones` | Admin | PAGE 22 |
| 23 | Admin Users | `/admin/users` | Admin | PAGE 23 |
| 24 | Admin Audit Log | `/admin/audit` | Admin | PAGE 24 |
| 25 | Admin Seed | `/admin/seed` | Admin | PAGE 25 |
| 26 | Public Certificate | `/certificate/public/:signedId` | Public | PAGE 26 |

**Total: 26 pages / screens + bonus notification center + mobile components**
