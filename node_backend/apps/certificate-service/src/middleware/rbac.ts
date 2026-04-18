import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { JwtPayload } from './auth';

type Role = JwtPayload['role'];

export function rbac(...allowedRoles: Role[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Requires role: ${allowedRoles.join(' or ')}`));
    }
    next();
  };
}

export function requireOwnerOrAdmin(getOwnerId: (req: Request) => string): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(new UnauthorizedError());
    const ownerId = getOwnerId(req);
    if (req.user.sub !== ownerId && req.user.role !== 'admin') {
      return next(new ForbiddenError());
    }
    next();
  };
}
