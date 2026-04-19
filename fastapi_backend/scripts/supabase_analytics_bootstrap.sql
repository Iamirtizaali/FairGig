-- Bootstrap analytics-service tables and demo data in Supabase Postgres.
-- Safe to run multiple times.

CREATE TABLE IF NOT EXISTS worker_shifts_aggr (
  id BIGSERIAL PRIMARY KEY,
  worker_id TEXT,
  category TEXT,
  zone TEXT,
  week_no INTEGER,
  net_earnings DOUBLE PRECISION,
  hours_worked DOUBLE PRECISION,
  platform_deduction_pct DOUBLE PRECISION,
  income_drop_mom_pct DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS shifts (
  id BIGSERIAL PRIMARY KEY,
  worker_id TEXT NOT NULL,
  date DATE NOT NULL,
  platform TEXT NOT NULL,
  category TEXT NOT NULL,
  zone TEXT NOT NULL,
  hours_worked DOUBLE PRECISION NOT NULL,
  gross_earned DOUBLE PRECISION NOT NULL,
  platform_deductions DOUBLE PRECISION NOT NULL,
  net_received DOUBLE PRECISION NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_shifts_worker_id ON shifts(worker_id);
CREATE INDEX IF NOT EXISTS idx_shifts_date ON shifts(date);
CREATE INDEX IF NOT EXISTS idx_shifts_zone ON shifts(zone);
CREATE INDEX IF NOT EXISTS idx_shifts_category ON shifts(category);

CREATE TABLE IF NOT EXISTS complaints (
  id BIGSERIAL PRIMARY KEY,
  worker_id TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at DATE NOT NULL,
  zone TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints(category);

CREATE TABLE IF NOT EXISTS vulnerability_flags (
  worker_id TEXT PRIMARY KEY,
  zone TEXT,
  category TEXT,
  prior_month_income DOUBLE PRECISION,
  current_month_income DOUBLE PRECISION,
  drop_pct DOUBLE PRECISION,
  computed_at DATE
);

-- Seed shifts only if empty.
WITH has_rows AS (
  SELECT EXISTS(SELECT 1 FROM shifts LIMIT 1) AS present
),
workers AS (
  SELECT
    ('W-' || gs)::TEXT AS worker_id,
    (ARRAY['Downtown','Northside','Westend'])[((gs - 1) % 3) + 1] AS zone,
    (ARRAY['Bike Rider','Delivery','Cleaner'])[((gs - 1) % 3) + 1] AS category,
    (ARRAY['Uber','Careem','Foodpanda'])[((gs - 1) % 3) + 1] AS platform
  FROM generate_series(1, 18) AS gs
),
days AS (
  SELECT (CURRENT_DATE - offs)::DATE AS d
  FROM generate_series(0, 89) AS offs
)
INSERT INTO shifts (
  worker_id, date, platform, category, zone,
  hours_worked, gross_earned, platform_deductions, net_received, is_verified
)
SELECT
  w.worker_id,
  d.d,
  w.platform,
  w.category,
  w.zone,
  ROUND((5 + random() * 5)::numeric, 2)::double precision AS hours_worked,
  ROUND((2500 + random() * 2500)::numeric, 2)::double precision AS gross_earned,
  0,
  0,
  (random() > 0.1)
FROM workers w
CROSS JOIN days d
WHERE NOT (SELECT present FROM has_rows);

-- Fill deductions/net for rows where they are still zero.
UPDATE shifts
SET
  platform_deductions = ROUND((gross_earned * (0.10 + random() * 0.20))::numeric, 2)::double precision,
  net_received = ROUND((gross_earned - (gross_earned * (0.10 + random() * 0.20)))::numeric, 2)::double precision
WHERE platform_deductions = 0 OR net_received = 0;

-- Seed complaints only if empty.
WITH has_rows AS (
  SELECT EXISTS(SELECT 1 FROM complaints LIMIT 1) AS present
),
workers AS (
  SELECT ('W-' || gs)::TEXT AS worker_id,
         (ARRAY['Downtown','Northside','Westend'])[((gs - 1) % 3) + 1] AS zone
  FROM generate_series(1, 18) AS gs
),
complaint_types AS (
  SELECT unnest(ARRAY[
    'Deduction Dispute',
    'Late Payment',
    'App Glitch',
    'Unfair Rating',
    'Missing Bonus',
    'Incorrect Hours'
  ]) AS category
),
sample_dates AS (
  SELECT (CURRENT_DATE - offs)::DATE AS created_at
  FROM generate_series(0, 29) AS offs
)
INSERT INTO complaints (worker_id, category, created_at, zone)
SELECT
  w.worker_id,
  ct.category,
  sd.created_at,
  w.zone
FROM workers w
JOIN complaint_types ct ON TRUE
JOIN sample_dates sd ON random() < 0.08
WHERE NOT (SELECT present FROM has_rows);

-- Grant/re-grant read-only permissions for analytics_reader.
GRANT CONNECT ON DATABASE postgres TO analytics_reader;
GRANT USAGE ON SCHEMA public TO analytics_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_reader;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO analytics_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO analytics_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON SEQUENCES TO analytics_reader;
