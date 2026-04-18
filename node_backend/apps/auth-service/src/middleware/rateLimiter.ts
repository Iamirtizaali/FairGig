import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { getRedis, sendRedisCommand } from '../lib/redis';

const errorBody = (code: string, message: string) => ({
  data: null,
  meta: {},
  error: { code, message },
});

function redisStoreOptions() {
  const redis = getRedis();
  if (!redis) return {};
  return {
    store: new RedisStore({
      sendCommand: sendRedisCommand,
    }),
  };
}

export const defaultRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Too many requests, please try again in a minute.'),
  ...redisStoreOptions(),
});

export const authRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Too many authentication attempts. Try again in a minute.'),
  ...redisStoreOptions(),
});

export const uploadRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Upload rate limit exceeded.'),
  ...redisStoreOptions(),
});

export const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: errorBody('RATE_LIMIT_EXCEEDED', 'Too many password reset attempts. Try again in a minute.'),
  ...redisStoreOptions(),
});
