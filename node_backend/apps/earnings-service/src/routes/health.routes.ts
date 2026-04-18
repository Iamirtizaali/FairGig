import { Router } from 'express';
import { getHealth } from '../controllers/health.controller';

export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the running status of the earnings service.
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
 *                   example: earnings-service
 *                 uptime:
 *                   type: number
 */
healthRouter.get('/', getHealth);
