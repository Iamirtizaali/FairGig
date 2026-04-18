import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rbac } from '../middleware/rbac';
import { buildCertificateSchema, shareCertificateSchema } from '../validators/certificate.schema';
import * as ctrl from '../controllers/certificate.controller';

export const certificateRouter = Router();

/**
 * @openapi
 * /certificate/v1/build:
 *   get:
 *     tags: [Certificate]
 *     summary: Build certificate data for a date range
 *     description: |
 *       Returns a structured data object representing the worker's VERIFIED shifts
 *       in the given date range. The frontend renders this as a preview.
 *       Only shifts with verificationStatus=verified are included.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema: { type: string, format: date, example: '2026-01-01' }
 *       - in: query
 *         name: to
 *         required: true
 *         schema: { type: string, format: date, example: '2026-03-31' }
 *     responses:
 *       200:
 *         description: Certificate data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/CertificateData'
 *       400:
 *         description: Invalid date range
 */
certificateRouter.get(
  '/build',
  authenticate,
  rbac('worker'),
  validate(buildCertificateSchema, 'query'),
  ctrl.buildCertificate,
);

/**
 * @openapi
 * /certificate/v1/share:
 *   post:
 *     tags: [Certificate]
 *     summary: Create a shareable certificate link
 *     description: |
 *       Creates a certificate record with a UUID share token and returns the
 *       full share URL. Default TTL is 14 days (configurable up to 90).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [from, to]
 *             properties:
 *               from: { type: string, format: date }
 *               to: { type: string, format: date }
 *               ttlDays: { type: integer, minimum: 1, maximum: 90 }
 *     responses:
 *       201:
 *         description: Share link created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     shareToken: { type: string }
 *                     shareUrl: { type: string }
 *                     expiresAt: { type: string, format: date-time }
 */
certificateRouter.post(
  '/share',
  authenticate,
  rbac('worker'),
  validate(shareCertificateSchema),
  ctrl.shareCertificate,
);

/**
 * @openapi
 * /certificate/v1/public/{signedId}:
 *   get:
 *     tags: [Certificate]
 *     summary: View a shared certificate (no auth required)
 *     description: |
 *       Public endpoint — anyone with the signed URL can call it.
 *       Returns JSON when Accept=application/json, or print-ready HTML when Accept=text/html.
 *       Returns 410 if revoked or expired.
 *     parameters:
 *       - in: path
 *         name: signedId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Certificate data (JSON) or HTML
 *       410:
 *         description: Certificate revoked or expired
 *       404:
 *         description: Certificate not found
 */
certificateRouter.get('/public/:signedId', ctrl.getPublicCertificate);

/**
 * @openapi
 * /certificate/v1/{signedId}/revoke:
 *   post:
 *     tags: [Certificate]
 *     summary: Revoke a shared certificate
 *     description: |
 *       Marks the certificate as revoked. Only the owning worker can revoke.
 *       After revocation, the public URL returns 410.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: signedId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Certificate revoked
 *       404:
 *         description: Certificate not found or not owned by caller
 */
certificateRouter.post('/:signedId/revoke', authenticate, rbac('worker'), ctrl.revokeCertificate);
