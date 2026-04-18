import { healthRepository } from "../repositories/health.repository";

export const healthService = {
  getHealth(): { status: "ok" } {
    return healthRepository.ping();
  }
};
