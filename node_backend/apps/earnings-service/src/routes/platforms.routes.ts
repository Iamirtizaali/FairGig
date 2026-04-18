import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import * as ctrl from '../controllers/platform.controller';

export const platformsRouter = Router();

/**
 * @openapi
 * /earnings/v1/platforms:
 *   get:
 *     tags: [Reference Data]
 *     summary: List all active platforms
 *     description: Returns the platform catalogue. Cached for 5 minutes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of platforms
 *         headers:
 *           Cache-Control:
 *             schema: { type: string, example: "public, max-age=300" }
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     platforms:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: string }
 *                           name: { type: string, example: Uber }
 *                           slug: { type: string, example: uber }
 *                           logoUrl: { type: string, nullable: true }
 */
platformsRouter.get('/platforms', authenticate, ctrl.listPlatforms);

/**
 * @openapi
 * /earnings/v1/city-zones:
 *   get:
 *     tags: [Reference Data]
 *     summary: List all active city zones
 *     description: Returns city/district zones grouped alphabetically. Cached for 5 minutes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of city zones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     zones:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: string }
 *                           city: { type: string, example: Lahore }
 *                           zone: { type: string, example: Gulberg }
 */
platformsRouter.get('/city-zones', authenticate, ctrl.listCityZones);
