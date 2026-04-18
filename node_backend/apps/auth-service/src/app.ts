import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { helmetMiddleware } from "./middleware/helmet";
import { httpLoggerMiddleware } from "./middleware/logger";
import { rateLimitMiddleware } from "./middleware/rateLimit";
import { requestIdMiddleware } from "./middleware/requestId";
import { swaggerSpec } from "./swagger";

export function createApp() {
  const app = express();

  app.use(requestIdMiddleware);
  app.use(httpLoggerMiddleware);
  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(rateLimitMiddleware);
  app.use(cookieParser())
  app.use(rateLimitMiddleware);
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));

  app.use(router);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
