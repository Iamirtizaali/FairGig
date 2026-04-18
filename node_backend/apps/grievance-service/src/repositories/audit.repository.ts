import { getPrisma } from '../lib/prisma';
import type { Request } from 'express';

const prisma = getPrisma();

export interface AuditInput {
  actorId?: string;
  actorRole?: string;
  action: string;
  entity: string;
  entityId: string;
  diff?: Record<string, unknown>;
  req?: Request;
}

export async function writeAuditEvent(input: AuditInput): Promise<void> {
  try {
    await prisma.auditEvent.create({
      data: {
        actorId: input.actorId ?? null,
        actorRole: input.actorRole ?? null,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        diff: input.diff ?? {},
        ip: input.req?.ip ?? null,
        ua: input.req?.headers['user-agent'] ?? null,
      },
    });
  } catch {
    // Audit write failures must never break business flows
  }
}
