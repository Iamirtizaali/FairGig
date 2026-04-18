-- FairGig — Database Schema Initialisation
-- Run this ONCE against your PostgreSQL instance BEFORE running Prisma migrations.
--
-- NOTE: If using Supabase, the 'auth' schema is reserved by Supabase's own
-- auth system. Rename 'auth' → 'app_auth' everywhere (schema.prisma + here)
-- before running, and update all @@schema("auth") references accordingly.

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS earnings;
CREATE SCHEMA IF NOT EXISTS grievance;
CREATE SCHEMA IF NOT EXISTS audit;

-- Grant usage to the application DB user (replace 'your_db_user' with actual value)
-- GRANT USAGE ON SCHEMA auth       TO your_db_user;
-- GRANT USAGE ON SCHEMA earnings   TO your_db_user;
-- GRANT USAGE ON SCHEMA grievance  TO your_db_user;
-- GRANT USAGE ON SCHEMA audit      TO your_db_user;

-- Read-only role for the analytics service (Python FastAPI)
-- CREATE ROLE analytics_reader NOLOGIN;
-- GRANT USAGE ON SCHEMA earnings  TO analytics_reader;
-- GRANT USAGE ON SCHEMA grievance TO analytics_reader;
-- GRANT SELECT ON ALL TABLES IN SCHEMA earnings  TO analytics_reader;
-- GRANT SELECT ON ALL TABLES IN SCHEMA grievance TO analytics_reader;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA earnings  GRANT SELECT ON TABLES TO analytics_reader;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA grievance GRANT SELECT ON TABLES TO analytics_reader;
