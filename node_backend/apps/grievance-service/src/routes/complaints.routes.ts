import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import { validate } from '../middleware/validate';
import {
  createComplaintSchema,
  updateComplaintSchema,
  updateComplaintStatusSchema,
  addTagSchema,
  addCommentSchema,
  reportComplaintSchema,
} from '../validators/grievance.schema';
import * as ctrl from '../controllers/complaint.controller';

export const complaintsRouter = Router();

complaintsRouter.use(authenticate);

/**
 * @openapi
 * /grievance/v1/complaints:
 *   post:
 *     tags: [Complaints]
 *     summary: Submit a new complaint
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [platform, category, title, description]
 *             properties:
 *               platform: { type: string }
 *               category: { type: string }
 *               title: { type: string, maxLength: 200 }
 *               description: { type: string, maxLength: 5000 }
 *               visibility: { type: string, enum: [public_anon, internal], default: public_anon }
 *     responses:
 *       201:
 *         description: Complaint created
 */
complaintsRouter.post('/', rbac('worker', 'advocate', 'admin'), validate(createComplaintSchema), ctrl.createComplaint);

/**
 * @openapi
 * /grievance/v1/complaints:
 *   get:
 *     tags: [Complaints]
 *     summary: List complaints (role-filtered)
 *     description: |
 *       Workers and verifiers see anonymised authors. Advocates and admins see real authors.
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
 *         name: platform
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [open, under_review, escalated, resolved, hidden] }
 *       - in: query
 *         name: tag
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated complaint list
 */
complaintsRouter.get('/', ctrl.listComplaints);

/**
 * @openapi
 * /grievance/v1/complaints/{id}:
 *   get:
 *     tags: [Complaints]
 *     summary: Get one complaint with comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Complaint detail with comment thread
 *       404:
 *         description: Not found
 */
complaintsRouter.get('/:id', ctrl.getComplaint);

/**
 * @openapi
 * /grievance/v1/complaints/{id}:
 *   patch:
 *     tags: [Complaints]
 *     summary: Edit a complaint (author or advocate/admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               visibility: { type: string, enum: [public_anon, internal] }
 *     responses:
 *       200:
 *         description: Updated complaint
 */
complaintsRouter.patch('/:id', validate(updateComplaintSchema), ctrl.updateComplaint);

/**
 * @openapi
 * /grievance/v1/complaints/{id}/status:
 *   patch:
 *     tags: [Complaints]
 *     summary: Update complaint status (advocate/admin only)
 *     description: Valid transitions — escalate, resolve, hide, re-open.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, under_review, escalated, resolved, hidden]
 *     responses:
 *       200:
 *         description: Status updated
 */
complaintsRouter.patch(
  '/:id/status',
  rbac('advocate', 'admin'),
  validate(updateComplaintStatusSchema),
  ctrl.updateComplaintStatus,
);

/**
 * @openapi
 * /grievance/v1/complaints/{id}/tags:
 *   post:
 *     tags: [Complaints]
 *     summary: Add a tag to a complaint (advocate/admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [label]
 *             properties:
 *               label: { type: string, maxLength: 50 }
 *     responses:
 *       201:
 *         description: Tag added
 */
complaintsRouter.post('/:id/tags', rbac('advocate', 'admin'), validate(addTagSchema), ctrl.addTag);

/**
 * @openapi
 * /grievance/v1/complaints/{id}/tags/{tagId}:
 *   delete:
 *     tags: [Complaints]
 *     summary: Remove a tag from a complaint (advocate/admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Tag removed
 */
complaintsRouter.delete('/:id/tags/:tagId', rbac('advocate', 'admin'), ctrl.removeTag);

/**
 * @openapi
 * /grievance/v1/complaints/{id}/comments:
 *   post:
 *     tags: [Complaints]
 *     summary: Add a comment to a complaint
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [body]
 *             properties:
 *               body: { type: string, maxLength: 2000 }
 *     responses:
 *       201:
 *         description: Comment added
 */
complaintsRouter.post('/:id/comments', validate(addCommentSchema), ctrl.addComment);

/**
 * @openapi
 * /grievance/v1/complaints/{id}/report:
 *   post:
 *     tags: [Complaints]
 *     summary: Report a complaint for moderation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [reason]
 *             properties:
 *               reason: { type: string, maxLength: 500 }
 *     responses:
 *       201:
 *         description: Report submitted
 */
complaintsRouter.post('/:id/report', validate(reportComplaintSchema), ctrl.reportComplaint);
