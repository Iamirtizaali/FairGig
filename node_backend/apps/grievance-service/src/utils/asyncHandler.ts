import type { Request, Response, NextFunction } from 'express';

export type AppHandler = (req: Request, res: Response, next: NextFunction) => void;

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export function asyncHandler(fn: AsyncRequestHandler): AppHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
