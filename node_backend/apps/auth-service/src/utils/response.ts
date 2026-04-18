import { Response } from 'express';

interface Meta {
  page?: number;
  limit?: number;
  total?: number;
  [key: string]: unknown;
}

export function sendSuccess<T>(res: Response, data: T, status = 200, meta: Meta = {}): void {
  res.status(status).json({ data, meta, error: null });
}

export function sendCreated<T>(res: Response, data: T, meta: Meta = {}): void {
  sendSuccess(res, data, 201, meta);
}
