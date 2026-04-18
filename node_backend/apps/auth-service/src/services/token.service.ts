import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
  });
}

export function generateRefreshTokenValue(): string {
  return uuidv4();
}

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function getRefreshTokenExpiry(): Date {
  const raw = env.REFRESH_TOKEN_EXPIRY;
  const match = raw.match(/^(\d+)([dhm])$/);
  if (!match) throw new Error(`Invalid REFRESH_TOKEN_EXPIRY: "${raw}"`);
  const amount = parseInt(match[1], 10);
  const unit = match[2];
  const msMap: Record<string, number> = { d: 86_400_000, h: 3_600_000, m: 60_000 };
  return new Date(Date.now() + amount * msMap[unit]);
}

export function getRefreshCookieMaxAge(): number {
  return getRefreshTokenExpiry().getTime() - Date.now();
}
