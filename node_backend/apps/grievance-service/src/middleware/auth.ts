import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtClaims {
  sub: string;
  role: "worker" | "verifier" | "advocate" | "admin";
  email?: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing bearer token" } });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtClaims;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } });
  }
}
