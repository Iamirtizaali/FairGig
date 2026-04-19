import { Router, type Router as ExpressRouter } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import { validate } from '../middleware/validate';
import { createShiftSchema, updateShiftSchema } from '../validators/shift.schema';
import * as ctrl from '../controllers/shift.controller';

export const shiftsRouter: ExpressRouter = Router();

shiftsRouter.use(authenticate);

/**
 * @openapi
 * /earnings/v1/shifts:
 *   get:
 *     tags: [Shifts]
 *     summary: List shifts (role-filtered)
 *     description: |
 *       - **worker**: own shifts only
 *       - **verifier**: shifts with status `pending_review`
 *       - **admin/advocate**: all shifts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *       - in: query
 *         name: platformId
 *         schema: { type: string }
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date, example: "2026-01-01" }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date, example: "2026-04-30" }
 *       - in: query
 *         name: verificationStatus
 *         schema:
 *           type: string
 *           enum: [self_attested, pending_review, verified, discrepancy_flagged, unverifiable]
 *     responses:
 *       200:
 *         description: Paginated shifts
 *       401:
 *         description: Not authenticated
 */
shiftsRouter.get('/', ctrl.listShifts);

/**
 * @openapi
 * /earnings/v1/shifts:
 *   post:
 *     tags: [Shifts]
 *     summary: Create a new shift (manual entry)
 *     description: |
 *       Validates financial integrity: `net_pay` must equal `gross_pay − deductions`.
 *       After creation, triggers anomaly detection asynchronously.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [platformId, shiftDate, hoursWorked, grossPay, netPay]
 *             properties:
 *               platformId:
 *                 type: string
 *                 example: clxyz123
 *               cityZoneId:
 *                 type: string
 *               shiftDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-04-18"
 *               hoursWorked:
 *                 type: number
 *                 minimum: 0.1
 *                 maximum: 24
 *                 example: 6.5
 *               grossPay:
 *                 type: number
 *                 minimum: 0
 *                 example: 1200
 *               deductions:
 *                 type: number
 *                 minimum: 0
 *                 default: 0
 *                 example: 100
 *               netPay:
 *                 type: number
 *                 minimum: 0
 *                 example: 1100
 *               currency:
 *                 type: string
 *                 default: PKR
 *               notes:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Shift created
 *       422:
 *         description: Validation error or financial integrity violation
 */
shiftsRouter.post('/', rbac('worker'), validate(createShiftSchema), ctrl.createShift);

/**
 * @openapi
 * /earnings/v1/shifts/{id}:
 *   get:
 *     tags: [Shifts]
 *     summary: Get a single shift with verification history and screenshot URL
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Shift detail with screenshots, verifications, and anomaly flags
 *       403:
 *         description: Workers can only view their own shifts
 *       404:
 *         description: Shift not found
 */
shiftsRouter.get('/:id', ctrl.getShift);

/**
 * @openapi
 * /earnings/v1/shifts/{id}:
 *   patch:
 *     tags: [Shifts]
 *     summary: Update a shift (owner only, not if verified)
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
 *               shiftDate: { type: string, format: date }
 *               hoursWorked: { type: number }
 *               grossPay: { type: number }
 *               deductions: { type: number }
 *               netPay: { type: number }
 *               notes: { type: string }
 *     responses:
 *       200:
 *         description: Updated shift
 *       403:
 *         description: Ownership violation
 *       409:
 *         description: Shift is already verified
 */
shiftsRouter.patch('/:id', validate(updateShiftSchema), ctrl.updateShift);

/**
 * @openapi
 * /earnings/v1/shifts/{id}:
 *   delete:
 *     tags: [Shifts]
 *     summary: Soft-delete a shift (owner only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Shift deleted
 *       403:
 *         description: Ownership violation
 */
shiftsRouter.delete('/:id', ctrl.deleteShift);
