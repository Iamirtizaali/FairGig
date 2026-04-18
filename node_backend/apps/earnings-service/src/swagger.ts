import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FairGig — Earnings Service',
      version: '1.0.0',
      description:
        'Shift logging, CSV bulk import, screenshot upload & verification workflow.\n\n' +
        'All endpoints require a valid Bearer access token from the Auth Service ' +
        'except public templates.',
    },
    servers: [{ url: '/', description: 'Earnings Service root' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        Shift: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            workerId: { type: 'string' },
            platform: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, slug: { type: 'string' } } },
            cityZone: { type: 'object', nullable: true },
            shiftDate: { type: 'string', format: 'date' },
            hoursWorked: { type: 'string', example: '6.50' },
            grossPay: { type: 'string', example: '1200.00' },
            deductions: { type: 'string', example: '100.00' },
            netPay: { type: 'string', example: '1100.00' },
            currency: { type: 'string', example: 'PKR' },
            source: { type: 'string', enum: ['manual', 'csv', 'ocr'] },
            verificationStatus: { type: 'string', enum: ['self_attested', 'pending_review', 'verified', 'discrepancy_flagged', 'unverifiable'] },
            notes: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Verification: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            shiftId: { type: 'string' },
            verifierId: { type: 'string' },
            screenshotId: { type: 'string', nullable: true },
            status: { type: 'string', enum: ['pending', 'confirmed', 'discrepancy', 'unverifiable'] },
            notes: { type: 'string', nullable: true },
            decidedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        QueueItem: {
          type: 'object',
          properties: {
            shiftId: { type: 'string' },
            workerId: { type: 'string' },
            workerName: { type: 'string' },
            shiftDate: { type: 'string', format: 'date' },
            grossPay: { type: 'string' },
            netPay: { type: 'string' },
            platform: { type: 'string' },
            screenshotCount: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CsvImport: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            workerId: { type: 'string' },
            status: { type: 'string', enum: ['queued', 'processing', 'done', 'failed'] },
            rowsTotal: { type: 'integer' },
            rowsOk: { type: 'integer' },
            rowsFailed: { type: 'integer' },
            errorCsvKey: { type: 'string', nullable: true, description: 'Supabase storage key for error CSV, if any rows failed' },
            jobId: { type: 'string', nullable: true },
            startedAt: { type: 'string', format: 'date-time', nullable: true },
            finishedAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/routes/**/*.ts'],
};

export function setupSwagger(app: Express): void {
  const spec = swaggerJsdoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
  app.get('/docs.json', (_req, res) => res.json(spec));
}
