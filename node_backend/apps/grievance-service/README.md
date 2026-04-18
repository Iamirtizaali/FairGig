# Grievance Service

Complaint management, tagging, clustering, escalation, and community bulletin board for FairGig.

**Required to be Node.js** by project specification.

**Port:** `3004`  
**Path prefix:** `/grievance/v1`

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL instance
- Redis (optional — used for KPI caching)
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

Service starts at: **http://localhost:3004**

## Endpoints (Sprint 0)

| Method | Path      | Auth | Description    |
|--------|-----------|------|----------------|
| GET    | `/health` | —    | Liveness check |
| GET    | `/docs`   | —    | Swagger UI     |

## Environment Variables

See [.env.example](./.env.example) for full list.

| Variable           | Required | Default                |
|--------------------|----------|------------------------|
| `DATABASE_URL`     | ✅        | —                      |
| `JWT_SECRET`       | ✅        | —                      |
| `REDIS_URL`        | —        | `redis://localhost:6379`|

## Tech Stack

Express · TypeScript · Prisma · Zod · pino · ioredis (optional caching)
