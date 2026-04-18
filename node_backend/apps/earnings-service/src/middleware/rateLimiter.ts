import rateLimit from 'express-rate-limit';

const errorBody = (code: string, message: string) => ({
  data: null,
  meta: {},
  error: { code, message },
});

export const defaultRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Too many requests, please try again in a minute.'),
});

export const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Too many authentication attempts.'),
});

export const uploadRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Upload rate limit exceeded.'),
});
