import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestId } from './middleware/requestId';
import { httpLogger } from './middleware/httpLogger';
import { defaultRateLimit } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health.routes';
import { platformsRouter } from './routes/platforms.routes';
import { shiftsRouter } from './routes/shifts.routes';
import { screenshotsRouter } from './routes/screenshots.routes';
import { setupSwagger } from './swagger';
import { env } from './config/env';

export function buildApp(): Application {
  const app = express();

  // ── Security & infra middleware ─────────────────────────────────────────────
  app.use(requestId);
  app.use(httpLogger);
  app.use(helmet());
  app.use(
    cors({
      origin: env.FRONTEND_ORIGINS.split(',').map((o) => o.trim()),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(defaultRateLimit);

  // ── Swagger UI ─────────────────────────────────────────────────────────────
  setupSwagger(app);

  // ── Routes ─────────────────────────────────────────────────────────────────
  app.use('/health', healthRouter);
  app.use('/earnings/v1', platformsRouter);
  app.use('/earnings/v1/shifts', shiftsRouter);
  app.use('/earnings/v1', screenshotsRouter);

  // ── Error handler (must be last) ───────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
