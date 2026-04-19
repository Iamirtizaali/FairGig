import { Redis } from '@upstash/redis';
import { env } from '../config/env';
import { RedisReply } from 'rate-limit-redis';

let _redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) return null;
  if (_redis) return _redis;

  _redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  return _redis;
}

export async function sendRedisCommand(...args: string[]) {
  const redis = getRedis();
  if (!redis) {
    throw new Error('Upstash Redis credentials are required for auth rate limiting');
  }

  const [command, ...commandArgs] = args;
  switch (command.toUpperCase()) {
    case 'SCRIPT': {
      const [subcommand, script] = commandArgs;
      if (subcommand?.toUpperCase() !== 'LOAD' || typeof script !== 'string') {
        throw new Error(`Unsupported Redis command: ${args.join(' ')}`);
      }
      return redis.scriptLoad(script);
    }
    case 'EVALSHA': {
      const [sha, numKeys, ...rest] = commandArgs;
      if (typeof sha !== 'string' || typeof numKeys !== 'string') {
        throw new Error(`Unsupported Redis command: ${args.join(' ')}`);
      }
      const keyCount = Number(numKeys);
      const keys = rest.slice(0, keyCount);
      const argv = rest.slice(keyCount);
      return redis.evalsha(sha, keys, argv);
    }
    case 'PTTL':
      return redis.pttl(commandArgs[0]);
    case 'PEXPIRE':
      return redis.pexpire(commandArgs[0], Number(commandArgs[1]));
    case 'DECR':
      return redis.decr(commandArgs[0]);
    case 'DEL':
      return redis.del(commandArgs[0]);
    default:
      throw new Error(`Unsupported Redis command: ${args.join(' ')}`);
  }
}
