// Set required env vars BEFORE any app module is loaded
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.JWT_SECRET = 'test-secret-that-is-at-least-32-chars-long-for-validation';
process.env.ACCESS_TOKEN_EXPIRY = '15m';
process.env.REFRESH_TOKEN_EXPIRY = '7d';
process.env.COOKIE_SECRET = 'test-cookie-secret-16chars';
process.env.FRONTEND_ORIGINS = 'http://localhost:5173';
process.env.LOG_LEVEL = 'error';
