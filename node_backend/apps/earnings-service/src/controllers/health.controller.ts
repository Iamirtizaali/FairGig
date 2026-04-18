import { Request, Response } from 'express';

export function getHealth(_req: Request, res: Response): void {
  res.json({
    status: 'ok',
    service: 'earnings-service',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
