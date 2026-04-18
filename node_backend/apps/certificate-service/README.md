# Certificate Service

Income certificate generation, signed sharing, and print-friendly HTML rendering for FairGig.

**Port:** `3003`  
**Path prefix:** `/certificate/v1`

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL instance (reads `earnings.*` schema for verified shifts)
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

Service starts at: **http://localhost:3003**

## Endpoints (Sprint 0)

| Method | Path      | Auth | Description    |
|--------|-----------|------|----------------|
| GET    | `/health` | —    | Liveness check |
| GET    | `/docs`   | —    | Swagger UI     |

## Environment Variables

See [.env.example](./.env.example) for full list.

| Variable             | Required | Default                  |
|----------------------|----------|--------------------------|
| `DATABASE_URL`       | ✅        | —                        |
| `JWT_SECRET`         | ✅        | —                        |
| `CERT_SHARE_BASE_URL`| —        | `http://localhost:3003`  |
| `CERT_SHARE_TTL_DAYS`| —        | `14`                     |

## Tech Stack

Express · TypeScript · Prisma · Zod · pino · Handlebars · @supabase/supabase-js
