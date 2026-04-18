import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import { validate } from '../middleware/validate';
import { verifyShiftSchema } from '../validators/shift.schema';
import * as ctrl from '../controllers/verification.controller';

export const verificationRouter = Router();

verificationRouter.use(authenticate);

/**
 * @openapi
 * /earnings/v1/shifts/{id}/verify:
 *   post:
 *     tags: [Verification]
 *     summary: Submit a verification decision for a shift
 *     description: |
 *       Only verifiers and admins may call this endpoint. The shift must be in
 *       `pending_review` status. The decision transitions the shift to one of:
 *       `verified`, `discrepancy_flagged`, or `unverifiable`.
 *       An audit event is written and the worker is notified in-process.
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
 *             required: [decision]
 *             properties:
 *               decision:
 *                 type: string
 *                 enum: [confirmed, discrepancy, unverifiable]
 *               screenshotId:
 *                 type: string
 *                 description: ID of the screenshot that informed the decision
 *               notes:
 *                 type: string
 *                 maxLength: 1000
 *     responses:
 *       201:
 *         description: Verification recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     verification:
 *                       $ref: '#/components/schemas/Verification'
 *       404:
 *         description: Shift not found
 *       409:
 *         description: Shift not in pending_review status
 */
verificationRouter.post(
  '/shifts/:id/verify',
  rbac('verifier', 'admin'),
  validate(verifyShiftSchema),
  ctrl.verifyShift,
);

/**
 * @openapi
 * /earnings/v1/verification/queue:
 *   get:
 *     tags: [Verification]
 *     summary: Get paginated verification queue (pending_review shifts)
 *     description: |
 *       Returns shifts awaiting review, enriched with the worker's display name
 *       via a cross-schema join with `auth.users`. Restricted to verifiers and admins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *     responses:
 *       200:
 *         description: Queue items with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     queue:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/QueueItem'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page: { type: integer }
 *                     limit: { type: integer }
 *                     total: { type: integer }
 */
verificationRouter.get(
  '/verification/queue',
  rbac('verifier', 'admin'),
  ctrl.getVerificationQueue,
);
