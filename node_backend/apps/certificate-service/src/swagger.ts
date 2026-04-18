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
