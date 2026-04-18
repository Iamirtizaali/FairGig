import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestId } from './middleware/requestId';
import { httpLogger } from './middleware/httpLogger';
import { defaultRateLimit } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health.routes';
import { certificateRouter } from './routes/certificate.routes';
import { setupSwagger } from './swagger';
import { env } from './config/env';

export function buildApp(): Application {
  const app = express();

  // ── Security & infra middleware ─────────────────────────────────────────────
  app.use(requestId);
  app.use(httpLogger);
  // Relax CSP only for the public certificate print page (inline styles needed)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          scriptSrc: ["'self'"],
        },
      },
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      frameguard: { action: 'deny' },
      noSniff: true,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );
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
  app.use('/certificate/v1', certificateRouter);

  // ── Error handler (must be last) ───────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
