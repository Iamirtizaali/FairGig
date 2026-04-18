# FairGig FastAPI Microservices — Data Workflows

This document outlines the data workflows, I/O structures, and dedicated use cases across the Anomaly and Analytics Python microservices. All interactions map directly to the `FairGig_Blueprint.md` architectures.

---

## 1. Anomaly Detection Service

**Endpoint:** `POST /detect`
**Blueprint Reference:** Module: Anomaly Detection (AN1-AN4)
**Authorization:** Required (Worker or JWT Bearer)

### Input Data Shape (Request)
A standard JSON payload reflecting a worker's shift history.
```json
{
  "worker_id": "W-1234",
  "currency": "PKR",
  "shifts": [
    {
      "date": "2026-04-10",
      "platform": "Uber",
      "hours_worked": 8.5,
      "gross_earned": 2500.0,
      "platform_deductions": 500.0,
      "net_received": 2000.0
    }
  ],
  "options": {
    "z_threshold": 2.5,
    "mom_drop_pct": 20.0
  }
}
```

### Output Data Shape (Response)
Returns a processed aggregate evaluation isolating standard deviations and statistical alerts inside plain human-readable strings.
```json
{
  "summary": {
    "shifts_analysed": 1,
    "windows": ["weekly", "monthly"]
  },
  "anomalies": [
    {
      "kind": "deduction_spike",
      "severity": "high",
      "window": "Week ending 2026-04-16",
      "metric": "deduction_pct",
      "observed": 0.40,
      "baseline_mean": 0.10,
      "baseline_std": 0.01,
      "z": 30.0,
      "explanation": "Your platform cut 40% this week versus your usual 10%."
    }
  ]
}
```

### Dedicated Use Cases 
1. **The Consistent Rider (Happy Path):** A worker logs their shifts daily for a month. All deductions remain exactly at the platform's stated 15% rate, and hours/earnings remain stable. The worker's React dashboard sends the `POST /detect` payload, and the system immediately returns `status: "clean"` protecting them from panic.
2. **The Silent Deduction Spike:** A courier updates their logs. Suddenly, the platform subtly increases its hidden commission fees from 15% to 35% without telling the courier. The endpoint detects a `Z-score > 2.0` outlier algorithmically and returns an array of easy-to-read warnings. The React app flashes a red anomaly card on the worker's home screen.
3. **The Income Collapse (MoM Alert):** A freelance domestic worker inputs their shifts. Over the last 30 days, their market has dried up. The endpoint mathematically detects that their rolling 30-day sum is over `20%` lower than the preceding 30 days. It triggers an `income dropped by 24%` flag to warn the worker of the dangerous trend.

---

## 2. Analytics Service (Worker-Facing)

**Endpoint:** `GET /benchmark/city-median`
**Blueprint Reference:** Module: Analytics (Worker) (WA4)
**Authorization:** Public / Authenticated Worker

### Input Data Shape (Request Params)
URL Query strings searching for the specific worker cohort.
`GET /benchmark/city-median?category=Bike%20Rider&zone=Downtown`

### Output Data Shape (Response)
Returns a `k-anonymity` protected statistical rate isolating local aggregates.
```json
{
  "cohort_too_small": false,
  "worker_count": 52,
  "category": "Bike Rider",
  "zone": "Downtown",
  "median_hourly_rate": 345.50
}
```

### Dedicated Use Cases
1. **"Am I Earning Fairly?" Check:** A Bike Rider in the heavily populated "Downtown" zone feels they are under-earning. They click the 'Compare' tab. The endpoint verifies there are more than 5 riders in the DB (`k=5` passed), calculates the median `net_earnings / hours_worked` across them all, and returns `345.50 PKR`. The rider compares this to their own hourly rate (310.00 PKR) to realize they are below average.
2. **Privacy Protection (Anonymity Guard):** A worker is the very first person to ever sign up in a massive remote district like "Northside". When they search for the median benchmark, the system counts only `1` individual in that database. To never leak one specific user's earnings, the endpoint triggers the anonymity guard, returning `"cohort_too_small": true` and a `0.0` median, keeping privacy entirely intact.

---

## 3. Analytics Service (Sprint 2 - Worker Endpoints Skeleton)

**Endpoints:** `GET /worker/summary`, `GET /worker/trends`, `GET /worker/commission-tracker`, `GET /worker/median-compare`
**Authorization:** Required (JWT Bearer)

### Outputs (Stubs)
These endpoints were freshly skeletonized in Sprint 1 to prepare for Sprint 2 DB integrations.
- `/worker/summary`: Returns `{"total_earned": 0.0, "total_hours": 0.0, "verified_ratio": 0.0}`
- `/worker/trends`: Returns `{"weeks": [], "earnings": []}` 
- `/worker/commission-tracker`: Returns `{"average_commission": 0.0, "trend": "neutral"}`
- `/worker/median-compare`: Returns `{"worker_median": 0.0, "city_median": 0.0, "difference_pct": 0.0}`

### Dedicated Use Cases
1. **Dashboard Entry:** Worker drops into the app. `/worker/summary` paints the unified header tiles natively summarizing all aggregate platforms.
2. **Growth vs Plunge:** The `/worker/trends` graph exposes line trends proving whether earnings correlate with app algorithm updates across weeks.
3. **Ghost Commission Checks:** The `/worker/commission-tracker` notifies drivers silently if their platform has stealthily bumped commissions from 10% to 20% compared to city rivals.

---

## 4. Analytics Service (Advocate-Facing)

**Endpoint:** `GET /advocate/kpis`
**Blueprint Reference:** Module: Advocate Analytics (AA1, AA2, AA4)
**Authorization:** Required (Advocate Role / Judges Bypass)

### Input Data Shape (Request)
Empty `GET` headers mapped securely with authorization barriers (`X-API-Key` or `Bearer Token`).

### Output Data Shape (Response)
Returns massive structural aggregates dictating macro platform economics.
```json
{
  "commission_trends": {
    "1": 15.4,
    "2": 15.6,
    "3": 22.1
  },
  "income_distribution_percentiles": {
    "Downtown": { "10th": 200, "50th": 500, "90th": 900 }
  },
  "vulnerable_workers_flagged": ["W-532", "W-121"]
}
```

### Dedicated Use Cases
1. **Platform Strike Preparation:** An NGO labour advocate logs in to determine if a platform is squeezing its drivers aggressively. The endpoint retrieves the `commission_trends` map showing the system-wide average algorithmic deduction bumped to `22.1%` in Week 3. The React app feeds this JSON payload into a Recharts Line Graph, instantly validating the advocate's suspicions.
2. **Zone Inequality Heatmaps:** A labour rights analyst wants to measure wage inequality between "Downtown" and "Northside". The system returns the `income_distribution_percentiles` mapping `10th` to `90th` percentiles seamlessly. The frontend renders Box-and-Whisker plots allowing analysts to prove which parts of the city earn the least.
3. **Targeted Intervention (Vulnerability List):** The system isolated users who suffered massive MoM drops via the Worker aggregate DB and returns their IDs in `vulnerable_workers_flagged`. The NGO clicks on "W-532" to open a confidential grievance ticket and reach out directly to offer legal/financial support.
