import { Router, type Router as ExpressRouter } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/auth';
import { rbac } from '../middleware/rbac';
import * as ctrl from '../controllers/csvImport.controller';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'tmp', 'csv-imports');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are accepted'));
    }
  },
});

export const importsRouter: ExpressRouter = Router();

/**
 * @openapi
 * /earnings/v1/imports/template:
 *   get:
 *     tags: [CSV Import]
 *     summary: Download the CSV template for bulk shift import
 *     description: Returns a CSV file with the correct column headers and one example row.
 *     responses:
 *       200:
 *         description: CSV file download
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 */
importsRouter.get('/imports/template', ctrl.getTemplate);

importsRouter.use(authenticate);

/**
 * @openapi
 * /earnings/v1/imports/csv:
 *   post:
 *     tags: [CSV Import]
 *     summary: Upload a CSV file for bulk shift import
 *     description: |
 *       Accepts a multipart/form-data upload with a `file` field containing a CSV.
 *       The file is uploaded to Supabase Storage and a BullMQ job is enqueued.
 *       Poll `GET /earnings/v1/imports/{importId}` for status.
 *       Maximum file size: 10 MB. Maximum rows: limited by BullMQ job timeout.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Import job queued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     importId: { type: string }
 *                     jobId: { type: string }
 */
importsRouter.post(
  '/imports/csv',
  rbac('worker'),
  upload.single('file'),
  ctrl.uploadCsv,
);

/**
 * @openapi
 * /earnings/v1/imports/{importId}:
 *   get:
 *     tags: [CSV Import]
 *     summary: Poll the status of a CSV import job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: importId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Import record with current status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     import:
 *                       $ref: '#/components/schemas/CsvImport'
 *       404:
 *         description: Import not found or not owned by caller
 */
importsRouter.get('/imports/:importId', rbac('worker', 'admin'), ctrl.getImportStatus);
