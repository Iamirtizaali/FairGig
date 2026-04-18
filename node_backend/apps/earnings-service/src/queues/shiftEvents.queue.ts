import { randomUUID } from 'crypto';
import { getRedis } from '../lib/redis';

const queueKey = 'earnings:queue:shift-events';

export const shiftEventsQueue = {
  async add(name: string, data: unknown) {
    const job = {
      id: randomUUID(),
      name,
      data,
      createdAt: new Date().toISOString(),
    };

    await getRedis().lpush(queueKey, JSON.stringify(job));

    return { id: job.id };
  },
};
