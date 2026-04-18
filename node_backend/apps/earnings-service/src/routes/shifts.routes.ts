import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';

export const shiftsRouter = Router();

// All shifts routes require authentication
shiftsRouter.use(authenticate);

/**
 * @openapi
 * /earnings/v1/shifts:
 *   get:
 *     tags: [Shifts]
 *     summary: List shifts for the authenticated worker
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
 *         name: platformId
 *         schema: { type: string }
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Paginated list of shifts
 *       401:
 *         description: Not authenticated
 */
shiftsRouter.get('/', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts:
 *   post:
 *     tags: [Shifts]
 *     summary: Create a new shift (manual entry)
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
 *               cityZoneId:
 *                 type: string
 *               shiftDate:
 *                 type: string
 *                 format: date
 *               hoursWorked:
 *                 type: number
 *                 minimum: 0.1
 *               grossPay:
 *                 type: number
 *                 minimum: 0
 *               deductions:
 *                 type: number
 *                 minimum: 0
 *               netPay:
 *                 type: number
 *                 minimum: 0
 *               currency:
 *                 type: string
 *                 default: PKR
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shift created
 *       422:
 *         description: Validation error
 */
shiftsRouter.post('/', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts/{id}:
 *   get:
 *     tags: [Shifts]
 *     summary: Get a single shift by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Shift record
 *       404:
 *         description: Not found
 */
shiftsRouter.get('/:id', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts/{id}:
 *   patch:
 *     tags: [Shifts]
 *     summary: Update a shift (worker owns the shift)
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
 *     responses:
 *       200:
 *         description: Updated shift
 *       403:
 *         description: Ownership violation
 *       404:
 *         description: Not found
 */
shiftsRouter.patch('/:id', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts/{id}:
 *   delete:
 *     tags: [Shifts]
 *     summary: Soft-delete a shift (worker owns the shift)
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
shiftsRouter.delete('/:id', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts/import/csv:
 *   post:
 *     tags: [Shifts]
 *     summary: Queue a CSV bulk import (BullMQ job)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [storageKey]
 *             properties:
 *               storageKey:
 *                 type: string
 *                 description: Supabase storage key of the uploaded CSV
 *     responses:
 *       202:
 *         description: Import job queued
 */
shiftsRouter.post('/import/csv', rbac('worker'), (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});
