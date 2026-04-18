import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    const fields: Record<string, string> = {};
    err.errors.forEach((e) => {
      fields[e.path.join('.')] = e.message;
    });
    res.status(422).json({
      data: null,
      meta: {},
      error: { code: 'VALIDATION_ERROR', message: 'Validation failed', fields },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      data: null,
      meta: {},
      error: {
        code: err.code,
        message: err.message,
        ...(err.fields ? { fields: err.fields } : {}),
      },
    });
    return;
  }

  logger.error(
    { err, requestId: req.headers['x-request-id'] },
    'Unhandled error',
  );

  res.status(500).json({
    data: null,
    meta: {},
    error: {
      code: 'INTERNAL_ERROR',
      message:
        env.NODE_ENV === 'development'
          ? err.message
          : 'An unexpected error occurred',
    },
  });
}
