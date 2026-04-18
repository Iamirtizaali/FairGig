import type { NextFunction, Request, Response } from "express";

type Role = "worker" | "verifier" | "advocate" | "admin";

export function rbacMiddleware(allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ error: { code: "FORBIDDEN", message: "Insufficient role" } });
      return;
    }
    next();
  };
}
