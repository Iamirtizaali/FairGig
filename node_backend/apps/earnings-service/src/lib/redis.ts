import Redis from 'ioredis';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let _redis: Redis | null = null;

export function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null, // required by BullMQ
      enableReadyCheck: false,
      lazyConnect: false,
      connectTimeout: 10000,
    });
    _redis.on('error', (err) => logger.warn({ err }, 'redis error'));
  }
  return _redis;
}
