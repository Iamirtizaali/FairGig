import Redis from 'ioredis';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let _redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (!env.REDIS_URL) return null;
  if (_redis) return _redis;

  _redis = new Redis(env.REDIS_URL, {
    enableOfflineQueue: true,
    lazyConnect: false,
    maxRetriesPerRequest: 1,
    connectTimeout: 10000,
  });

  _redis.on('error', (err) =>
    logger.warn({ err: err.message }, 'Redis connection error — rate limiting uses in-memory fallback'),
  );
  _redis.on('connect', () => logger.info('Redis connected'));

  return _redis;
}
