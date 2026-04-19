import { Router, type Router as ExpressRouter } from 'express';
import { getHealth } from '../controllers/health.controller';

export const healthRouter: ExpressRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the running status of the auth service. Used by load balancers and uptime monitors.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 service:
 *                   type: string
 *                   example: auth-service
 *                 uptime:
 *                   type: number
 *                   description: Process uptime in seconds
 */
healthRouter.get('/', getHealth);
