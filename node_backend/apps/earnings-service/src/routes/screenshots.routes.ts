import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { presignSchema, confirmScreenshotSchema } from '../validators/shift.schema';
import * as ctrl from '../controllers/screenshot.controller';

export const screenshotsRouter = Router();

screenshotsRouter.use(authenticate);

/**
 * @openapi
 * /earnings/v1/shifts/{shiftId}/screenshots/presign:
 *   post:
 *     tags: [Screenshots]
 *     summary: Get a presigned PUT URL to upload a screenshot to Supabase Storage
 *     description: |
 *       Returns a short-lived signed upload URL. The frontend should PUT the file
 *       bytes directly to `signedUrl`, then call the confirm endpoint.
 *       File is placed at `screenshots/{workerId}/{shiftId}/{uuid}.{ext}`.
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
 *                 description: File size in bytes (max 5 MB)
 *     responses:
 *       200:
 *         description: Presigned upload URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     signedUrl: { type: string }
 *                     storageKey: { type: string }
 *                     token: { type: string }
 *       403:
 *         description: Not the shift owner
 *       404:
 *         description: Shift not found
 */
screenshotsRouter.post(
  '/shifts/:shiftId/screenshots/presign',
  validate(presignSchema),
  ctrl.presignUpload,
);

/**
 * @openapi
 * /earnings/v1/shifts/{shiftId}/screenshots:
 *   post:
 *     tags: [Screenshots]
 *     summary: Confirm a screenshot upload after PUT to Supabase
 *     description: |
 *       Creates the screenshot record and transitions the shift's
 *       `verificationStatus` from `self_attested` → `pending_review`.
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
 *                 description: The path returned by the presign endpoint
 *               sizeBytes:
 *                 type: integer
 *               mimeType:
 *                 type: string
 *                 enum: [image/jpeg, image/png, image/webp]
 *     responses:
 *       201:
 *         description: Screenshot record created; shift is now pending_review
 *       403:
 *         description: Not the shift owner
 *       409:
 *         description: storageKey already exists
 */
screenshotsRouter.post(
  '/shifts/:shiftId/screenshots',
  validate(confirmScreenshotSchema),
  ctrl.confirmUpload,
);

/**
 * @openapi
 * /earnings/v1/shifts/{shiftId}/screenshots/url:
 *   get:
 *     tags: [Screenshots]
 *     summary: Get a short-lived signed GET URL for the screenshot
 *     description: Valid for 5 minutes. Accessible by the shift owner, verifiers, and admins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shiftId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Signed URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     screenshotId: { type: string }
 *                     signedUrl: { type: string }
 *                     expiresIn: { type: integer, example: 300 }
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Shift or screenshot not found
 */
screenshotsRouter.get('/shifts/:shiftId/screenshots/url', ctrl.getScreenshotUrl);
