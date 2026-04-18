import { Queue } from 'bullmq';
import { getRedis } from '../lib/redis';

export const shiftEventsQueue = new Queue('shift-events', {
  connection: getRedis(),
  defaultJobOptions: { removeOnComplete: 100, removeOnFail: 500 },
});
