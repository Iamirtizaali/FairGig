import { Redis } from '@upstash/redis';
import { env } from '../config/env';

type RedisClient = Redis;

let redisClient: RedisClient | null = null;

export function getRedis(): RedisClient {
  if (!redisClient) {
    if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required');
    }

    redisClient = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return redisClient;
}
