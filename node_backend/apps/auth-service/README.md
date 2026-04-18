# Auth Service

JWT authentication, user management, and role-upgrade requests for FairGig.

**Port:** `3001`  
**Path prefix:** `/auth/v1`

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- PostgreSQL instance (Supabase or Render)
- Run `infra/db/init.sql` against your DB once to create schemas

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Generate Prisma client
pnpm prisma:generate

# 4. Run migrations (Sprint 1+ adds models)
pnpm prisma:migrate

# 5. Start dev server with hot reload
pnpm dev
```

Service starts at: **http://localhost:3001**

## Endpoints (Sprint 0)

| Method | Path      | Auth | Description     |
|--------|-----------|------|-----------------|
| GET    | `/health` | —    | Liveness check  |
| GET    | `/docs`   | —    | Swagger UI      |

## Environment Variables

See [.env.example](./.env.example) for full list with descriptions.

| Variable             | Required | Default                |
|----------------------|----------|------------------------|
| `DATABASE_URL`       | ✅        | —                      |
| `JWT_SECRET`         | ✅        | — (min 32 chars)       |
| `COOKIE_SECRET`      | ✅        | — (min 16 chars)       |
| `PORT`               | —        | `3001`                 |
| `FRONTEND_ORIGINS`   | —        | `http://localhost:5173`|

## Tech Stack

Express · TypeScript · Prisma · Zod · pino · jsonwebtoken · bcrypt · cookie-parser · swagger-ui-express
