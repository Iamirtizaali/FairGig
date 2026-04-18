import jwt from 'jsonwebtoken';

const SECRET = 'test-secret-that-is-at-least-32-chars-long-for-validation';

export function makeToken(
  payload: { sub: string; email: string; role: string } = {
    sub: 'user-id-1',
    email: 'test@example.com',
    role: 'worker',
  },
): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function makeAdminToken(): string {
  return makeToken({ sub: 'admin-id-1', email: 'admin@example.com', role: 'admin' });
}
