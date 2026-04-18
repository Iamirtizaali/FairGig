import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import * as ctrl from '../controllers/admin.controller';

export const adminRouter = Router();

/**
 * @openapi
 * /grievance/v1/admin/reports:
 *   get:
 *     tags: [Admin]
 *     summary: List user-submitted content reports (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: resolved
 *         schema: { type: boolean }
 *         description: Filter by resolution status
 *     responses:
 *       200:
 *         description: Paginated list of reports
 *       403:
 *         description: Admin only
 */
adminRouter.get('/reports', authenticate, rbac('admin'), ctrl.listReports);

/**
 * @openapi
 * /grievance/v1/admin/reports/{id}/resolve:
 *   post:
 *     tags: [Admin]
 *     summary: Mark a report as resolved (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Report resolved
 *       404:
 *         description: Report not found
 */
adminRouter.post('/reports/:id/resolve', authenticate, rbac('admin'), ctrl.resolveReport);
