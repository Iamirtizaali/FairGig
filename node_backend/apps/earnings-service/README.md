# earnings-service

## Setup

1. Install dependencies: pnpm install
2. Copy .env.example to .env and fill values
3. Run dev server: pnpm dev

## Scripts

- pnpm dev - Start with hot reload
- pnpm build - Compile TypeScript
- pnpm start - Run compiled app
- pnpm prisma:generate - Generate Prisma client
- pnpm prisma:migrate - Run Prisma migrate dev

## Endpoints

- Health: GET /health
- Swagger: GET /docs
