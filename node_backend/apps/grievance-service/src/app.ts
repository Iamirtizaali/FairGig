import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestId } from './middleware/requestId';
import { httpLogger } from './middleware/httpLogger';
import { defaultRateLimit } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health.routes';
import { complaintsRouter } from './routes/complaints.routes';
import { clustersRouter } from './routes/clusters.routes';
import { boardRouter } from './routes/board.routes';
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
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(defaultRateLimit);

  // ── Swagger UI ─────────────────────────────────────────────────────────────
  setupSwagger(app);

  // ── Routes ─────────────────────────────────────────────────────────────────
  app.use('/health', healthRouter);
  app.use('/grievance/v1/board', boardRouter);
  app.use('/grievance/v1/complaints', complaintsRouter);
  app.use('/grievance/v1/clusters', clustersRouter);

  // ── Error handler (must be last) ───────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
