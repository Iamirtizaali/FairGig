import { Router } from 'express';
import { authenticate } from '../middleware/auth';

export const screenshotsRouter = Router();

screenshotsRouter.use(authenticate);

/**
 * @openapi
 * /earnings/v1/shifts/{shiftId}/screenshots/presign:
 *   post:
 *     tags: [Screenshots]
 *     summary: Get a presigned PUT URL to upload a screenshot to Supabase Storage
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mimeType, sizeBytes]
 *             properties:
 *               mimeType:
 *                 type: string
 *                 enum: [image/jpeg, image/png, image/webp]
 *               sizeBytes:
 *                 type: integer
 *                 maximum: 5242880
 *     responses:
 *       200:
 *         description: Presigned upload URL + storage key
 *       404:
 *         description: Shift not found
 */
screenshotsRouter.post('/shifts/:shiftId/screenshots/presign', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts/{shiftId}/screenshots/confirm:
 *   post:
 *     tags: [Screenshots]
 *     summary: Confirm a screenshot upload after the client has PUT to Supabase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [storageKey, sizeBytes]
 *             properties:
 *               storageKey:
 *                 type: string
 *               sizeBytes:
 *                 type: integer
 *               mimeType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Screenshot record created
 *       409:
 *         description: storageKey already confirmed
 */
screenshotsRouter.post('/shifts/:shiftId/screenshots/confirm', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});

/**
 * @openapi
 * /earnings/v1/shifts/{shiftId}/screenshots/{id}:
 *   delete:
 *     tags: [Screenshots]
 *     summary: Soft-delete a screenshot record
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
screenshotsRouter.delete('/shifts/:shiftId/screenshots/:id', (_req, res) => {
  res.status(501).json({ data: null, meta: {}, error: { code: 'NOT_IMPLEMENTED', message: 'Coming in Sprint 2' } });
});
