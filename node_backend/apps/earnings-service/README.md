# Earnings Service

Shift logging, CSV bulk import, screenshot upload, and verification workflow for FairGig.

**Port:** `3002`  
**Path prefix:** `/earnings/v1`

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL instance
- Upstash Redis REST credentials for CSV import jobs
- Supabase project (for screenshot object storage)
- Run `infra/db/init.sql` against your DB once to create schemas

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Generate Prisma client
pnpm prisma:generate

# 4. Run migrations
pnpm prisma:migrate

# 5. Start dev server with hot reload
pnpm dev
```

Service starts at: **http://localhost:3002**

## Endpoints (Sprint 0)

| Method | Path      | Auth | Description    |
| ------ | --------- | ---- | -------------- |
| GET    | `/health` | —    | Liveness check |
| GET    | `/docs`   | —    | Swagger UI     |

## Environment Variables

See [.env.example](./.env.example) for full list.

| Variable                    | Required  | Default |
| --------------------------- | --------- | ------- |
| `DATABASE_URL`              | ✅        | —       |
| `JWT_SECRET`                | ✅        | —       |
| `UPSTASH_REDIS_REST_URL`    | ✅        | —       |
| `UPSTASH_REDIS_REST_TOKEN`  | ✅        | —       |
| `SUPABASE_URL`              | ✅ (prod) | —       |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (prod) | —       |

## Tech Stack

Express · TypeScript · Prisma · Zod · pino · multer · csv-parse · @upstash/redis · @supabase/supabase-js
