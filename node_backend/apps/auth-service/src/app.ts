import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { requestId } from './middleware/requestId';
import { httpLogger } from './middleware/httpLogger';
import { defaultRateLimit } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health.routes';
import { authRouter } from './routes/auth.routes';
import { setupSwagger } from './swagger';
import { env } from './config/env';

export function buildApp(): Application {
  const app = express();

  // ── Security & infra middleware ─────────────────────────────────────────────
  app.use(requestId);
  app.use(httpLogger);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          scriptSrc: ["'none'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          baseUri: ["'none'"],
          formAction: ["'none'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
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
  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(defaultRateLimit);

  // ── Swagger UI ─────────────────────────────────────────────────────────────
  app.use(
    '/docs',
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'https:'],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          imgSrc: ["'self'", 'data:'],
          fontSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
        },
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  setupSwagger(app);

  // ── Routes ─────────────────────────────────────────────────────────────────
  app.use('/health', healthRouter);
  app.use('/auth/v1', authRouter);

  // ── Error handler (must be last) ───────────────────────────────────────────
  app.use(errorHandler);

  return app;
}
