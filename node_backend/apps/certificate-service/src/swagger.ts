import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FairGig — Certificate Service',
      version: '1.0.0',
      description:
        'Income certificate generation, sharing, and public print rendering.\n\n' +
        'Only VERIFIED shifts appear in certificates unless includeSelfAttested=true ' +
        '(labelled prominently).',
    },
    servers: [{ url: '/', description: 'Certificate Service root' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        CertificateData: {
          type: 'object',
          properties: {
            workerName: { type: 'string' },
            periodStart: { type: 'string', format: 'date' },
            periodEnd: { type: 'string', format: 'date' },
            issuedAt: { type: 'string', format: 'date' },
            currency: { type: 'string', example: 'PKR' },
            platformBreakdown: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  platform: { type: 'string' },
                  shifts: { type: 'integer' },
                  hours: { type: 'string' },
                  gross: { type: 'string' },
                  deductions: { type: 'string' },
                  net: { type: 'string' },
                },
              },
            },
            monthlyBreakdown: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  month: { type: 'string', example: '2026-03' },
                  shifts: { type: 'integer' },
                  hours: { type: 'string' },
                  net: { type: 'string' },
                },
              },
            },
            totals: {
              type: 'object',
              properties: {
                shifts: { type: 'integer' },
                hours: { type: 'string' },
                gross: { type: 'string' },
                deductions: { type: 'string' },
                net: { type: 'string' },
              },
            },
            avgHourlyRate: { type: 'string' },
            verificationPct: { type: 'number' },
            shareToken: { type: 'string', nullable: true },
            shareUrl: { type: 'string', nullable: true },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export function setupSwagger(app: Express): void {
  const spec = swaggerJsdoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
  app.get('/docs.json', (_req, res) => res.json(spec));
}
