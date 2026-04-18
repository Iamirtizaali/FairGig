import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FairGig — Auth Service',
      version: '1.0.0',
      description:
        'Authentication, user management, and role-upgrade requests.\n\n' +
        'Issues JWT access tokens (15 min) + rotating refresh tokens (7 days).',
    },
    servers: [{ url: '/', description: 'Auth Service root' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string', enum: ['worker', 'employer', 'admin'] },
            language: { type: 'string', enum: ['en', 'ur'] },
            status: { type: 'string', enum: ['active', 'frozen', 'deleted'] },
            phone: { type: 'string', nullable: true },
            cityZoneId: { type: 'string', nullable: true },
            categories: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                accessToken: { type: 'string' },
              },
            },
            meta: { type: 'object' },
            error: { type: 'object', nullable: true },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
              },
            },
            meta: { type: 'object' },
            error: { type: 'object', nullable: true },
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
