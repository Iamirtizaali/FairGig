import type { Request, Response } from "express";
import { healthService } from "../services/health.service";

export function healthController(_req: Request, res: Response): void {
  const payload = healthService.getHealth();
  res.status(200).json(payload);
}
