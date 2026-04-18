import jwt from 'jsonwebtoken';

const SECRET = 'test-secret-that-is-at-least-32-chars-long-for-validation';

export function makeToken(overrides: Partial<{ sub: string; email: string; role: string }> = {}): string {
  return jwt.sign(
    { sub: 'worker-id-1', email: 'worker@example.com', role: 'worker', ...overrides },
    SECRET,
    { expiresIn: '1h' },
  );
}

export const workerToken = () => makeToken();
export const verifierToken = () => makeToken({ sub: 'verifier-id-1', email: 'verifier@example.com', role: 'verifier' });
export const adminToken = () => makeToken({ sub: 'admin-id-1', email: 'admin@example.com', role: 'admin' });
