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
        BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
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
