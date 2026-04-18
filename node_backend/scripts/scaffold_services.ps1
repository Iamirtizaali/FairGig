$base = 'D:\FairGig\node_backend\apps'
$services = @(
    @{ Name = 'auth-service'; Port = '3001' },
    @{ Name = 'earnings-service'; Port = '3002' },
    @{ Name = 'certificate-service'; Port = '3003' },
    @{ Name = 'grievance-service'; Port = '3004' }
)

foreach ($svc in $services) {
    $root = Join-Path $base $svc.Name
    New-Item -ItemType Directory -Path (Join-Path $root 'src/types') -Force | Out-Null

    @'
import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(60)
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
'@ | Set-Content -Path (Join-Path $root 'src/config/env.ts') -Encoding UTF8

    @'
import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug"
});
'@ | Set-Content -Path (Join-Path $root 'src/utils/logger.ts') -Encoding UTF8

    @'
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header("x-request-id");
  const requestId = incoming && incoming.trim().length > 0 ? incoming : randomUUID();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
}
'@ | Set-Content -Path (Join-Path $root 'src/middleware/requestId.ts') -Encoding UTF8

    @'
import pinoHttp from "pino-http";
import { logger } from "../utils/logger";

export const httpLoggerMiddleware = pinoHttp({ logger });
'@ | Set-Content -Path (Join-Path $root 'src/middleware/logger.ts') -Encoding UTF8

    @'
import cors from "cors";
import { env } from "../config/env";

export const corsMiddleware = cors({
  origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  credentials: true
});
'@ | Set-Content -Path (Join-Path $root 'src/middleware/cors.ts') -Encoding UTF8

    @'
import helmet from "helmet";

export const helmetMiddleware = helmet();
'@ | Set-Content -Path (Join-Path $root 'src/middleware/helmet.ts') -Encoding UTF8

    @'
import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const rateLimitMiddleware = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false
});
'@ | Set-Content -Path (Join-Path $root 'src/middleware/rateLimit.ts') -Encoding UTF8

    @'
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtClaims {
  sub: string;
  role: "worker" | "verifier" | "advocate" | "admin";
  email?: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing bearer token" } });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtClaims;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } });
  }
}
'@ | Set-Content -Path (Join-Path $root 'src/middleware/auth.ts') -Encoding UTF8

    @'
import type { NextFunction, Request, Response } from "express";

type Role = "worker" | "verifier" | "advocate" | "admin";

export function rbacMiddleware(allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Insufficient role" } });
      return;
    }
    next();
  };
}
'@ | Set-Content -Path (Join-Path $root 'src/middleware/rbac.ts') -Encoding UTF8

    @'
import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const message = error instanceof Error ? error.message : "Internal server error";
  res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message } });
}
'@ | Set-Content -Path (Join-Path $root 'src/middleware/errorHandler.ts') -Encoding UTF8

    @'
import type { Request, Response } from "express";
import { healthService } from "../services/health.service";

export function healthController(_req: Request, res: Response): void {
  const payload = healthService.getHealth();
  res.status(200).json(payload);
}
'@ | Set-Content -Path (Join-Path $root 'src/controllers/health.controller.ts') -Encoding UTF8

    @'
export const healthRepository = {
  ping(): { status: "ok" } {
    return { status: "ok" };
  }
};
'@ | Set-Content -Path (Join-Path $root 'src/repositories/health.repository.ts') -Encoding UTF8

    @'
import { healthRepository } from "../repositories/health.repository";

export const healthService = {
  getHealth(): { status: "ok" } {
    return healthRepository.ping();
  }
};
'@ | Set-Content -Path (Join-Path $root 'src/services/health.service.ts') -Encoding UTF8

    @'
import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.literal("ok")
});
'@ | Set-Content -Path (Join-Path $root 'src/validators/health.schema.ts') -Encoding UTF8

    @'
import { Router } from "express";
import { healthController } from "../controllers/health.controller";

const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
healthRouter.get("/health", healthController);

export { healthRouter };
'@ | Set-Content -Path (Join-Path $root 'src/routes/health.routes.ts') -Encoding UTF8

    @'
import { Router } from "express";
import { healthRouter } from "./health.routes";

const router = Router();

router.use(healthRouter);

export { router };
'@ | Set-Content -Path (Join-Path $root 'src/routes/index.ts') -Encoding UTF8

    @'
import swaggerJsdoc from "swagger-jsdoc";

const serviceName = process.env.SERVICE_NAME ?? "FairGig Service";
const servicePort = process.env.PORT ?? "3000";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${serviceName} API`,
      version: "1.0.0"
    },
    servers: [
      {
        url: `http://localhost:${servicePort}`
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});
'@ | Set-Content -Path (Join-Path $root 'src/swagger.ts') -Encoding UTF8

    @'
import express from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { helmetMiddleware } from "./middleware/helmet";
import { httpLoggerMiddleware } from "./middleware/logger";
import { rateLimitMiddleware } from "./middleware/rateLimit";
import { requestIdMiddleware } from "./middleware/requestId";
import { swaggerSpec } from "./swagger";

export function createApp() {
  const app = express();

  app.use(requestIdMiddleware);
  app.use(httpLoggerMiddleware);
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(rateLimitMiddleware);
  app.use(express.json({ limit: "1mb" }));

  app.use(router);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
'@ | Set-Content -Path (Join-Path $root 'src/app.ts') -Encoding UTF8

    @'
import "dotenv/config";
import { env } from "./config/env";
import { createApp } from "./app";
import { logger } from "./utils/logger";

const app = createApp();

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "Service started");
});
'@ | Set-Content -Path (Join-Path $root 'src/index.ts') -Encoding UTF8

    @'
declare namespace Express {
  interface Request {
    requestId?: string;
    user?: {
      sub: string;
      role: "worker" | "verifier" | "advocate" | "admin";
      email?: string;
    };
  }
}

export {};
'@ | Set-Content -Path (Join-Path $root 'src/types/express.d.ts') -Encoding UTF8

    $serviceSchema = $svc.Name -replace '-service', ''
    @"
generator client {
  provider = \"prisma-client-js\"
  previewFeatures = [\"multiSchema\"]
}

datasource db {
  provider = \"postgresql\"
  url      = env(\"DATABASE_URL\")
  schemas  = [\"$serviceSchema\", \"audit\"]
}
"@ | Set-Content -Path (Join-Path $root 'prisma/schema.prisma') -Encoding UTF8

    @'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts"],
  "exclude": ["dist", "node_modules"]
}
'@ | Set-Content -Path (Join-Path $root 'tsconfig.json') -Encoding UTF8

    @"
NODE_ENV=development
SERVICE_NAME=$($svc.Name)
PORT=$($svc.Port)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require
JWT_SECRET=replace_with_shared_secret
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=60
"@ | Set-Content -Path (Join-Path $root '.env.example') -Encoding UTF8

    @"
# $($svc.Name)

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
"@ | Set-Content -Path (Join-Path $root 'README.md') -Encoding UTF8
}
