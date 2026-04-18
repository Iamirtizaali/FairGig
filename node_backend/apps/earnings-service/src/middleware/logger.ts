import pinoHttp from "pino-http";
import { logger } from "../utils/logger";

export const httpLoggerMiddleware = pinoHttp({ logger });
