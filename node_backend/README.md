# FairGig Node Backend (Sprint 0)

Services:

- apps/auth-service (port 3001)
- apps/earnings-service (port 3002)
- apps/certificate-service (port 3003)
- apps/grievance-service (port 3004)

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL (Neon)
- Redis (Upstash)

## Database setup

Run schema bootstrap SQL in Neon SQL editor using infra/db/create_schemas.sql.

## Shared environment

Copy .env.shared.example values into each service .env.
Use the same JWT_SECRET in all services.

## Run each service

From a service folder:

- pnpm install
- pnpm dev

Health endpoint: /health
Swagger docs: /docs
