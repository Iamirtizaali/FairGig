import { Router, type Router as ExpressRouter } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import { validate } from '../middleware/validate';
import { z } from 'zod';
import * as ctrl from '../controllers/platform.controller';

export const platformsRouter: ExpressRouter = Router();

const createPlatformSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  logoUrl: z.string().url().optional(),
});

const updatePlatformSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/).optional(),
  logoUrl: z.string().url().nullable().optional(),
  active: z.boolean().optional(),
});

const createCityZoneSchema = z.object({
  city: z.string().min(1).max(100),
  zone: z.string().min(1).max(100),
});

const updateCityZoneSchema = z.object({
  city: z.string().min(1).max(100).optional(),
  zone: z.string().min(1).max(100).optional(),
  active: z.boolean().optional(),
});

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

// ─── Admin: platforms ─────────────────────────────────────────────────────────

/**
 * @openapi
 * /earnings/v1/admin/platforms:
 *   get:
 *     tags: [Admin]
 *     summary: List all platforms including inactive (admin only)
 *     security:
 *       - bearerAuth: []
 *   post:
 *     tags: [Admin]
 *     summary: Create a platform (admin only)
 *     security:
 *       - bearerAuth: []
 */
platformsRouter.get('/admin/platforms', authenticate, rbac('admin'), ctrl.adminListPlatforms);
platformsRouter.post('/admin/platforms', authenticate, rbac('admin'), validate(createPlatformSchema), ctrl.adminCreatePlatform);
platformsRouter.patch('/admin/platforms/:id', authenticate, rbac('admin'), validate(updatePlatformSchema), ctrl.adminUpdatePlatform);

// ─── Admin: city zones ────────────────────────────────────────────────────────

/**
 * @openapi
 * /earnings/v1/admin/city-zones:
 *   get:
 *     tags: [Admin]
 *     summary: List all city zones including inactive (admin only)
 *     security:
 *       - bearerAuth: []
 *   post:
 *     tags: [Admin]
 *     summary: Create a city zone (admin only)
 *     security:
 *       - bearerAuth: []
 */
platformsRouter.get('/admin/city-zones', authenticate, rbac('admin'), ctrl.adminListCityZones);
platformsRouter.post('/admin/city-zones', authenticate, rbac('admin'), validate(createCityZoneSchema), ctrl.adminCreateCityZone);
platformsRouter.patch('/admin/city-zones/:id', authenticate, rbac('admin'), validate(updateCityZoneSchema), ctrl.adminUpdateCityZone);
