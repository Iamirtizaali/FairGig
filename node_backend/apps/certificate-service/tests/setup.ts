process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.JWT_SECRET = 'test-secret-that-is-at-least-32-chars-long-for-validation';
process.env.FRONTEND_ORIGINS = 'http://localhost:5173';
process.env.LOG_LEVEL = 'error';
process.env.CERT_SHARE_BASE_URL = 'http://localhost:3003';
process.env.CERT_SHARE_TTL_DAYS = '14';
