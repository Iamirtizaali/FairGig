import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FairGig — Grievance Service',
      version: '1.0.0',
      description:
        'Complaint management, tagging, clustering, escalation, and the community bulletin board.\n\n' +
        'Required to be Node.js by project spec.',
    },
    servers: [{ url: '/', description: 'Grievance Service root' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        Complaint: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            platform: { type: 'string' },
            category: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            visibility: { type: 'string', enum: ['public_anon', 'internal'] },
            status: { type: 'string', enum: ['open', 'under_review', 'escalated', 'resolved', 'hidden'] },
            clusterId: { type: 'string', nullable: true },
            tags: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, label: { type: 'string' } } } },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Cluster: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            createdBy: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
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
