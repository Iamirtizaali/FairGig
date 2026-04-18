import { prisma } from '../lib/prisma';
import { Request } from 'express';

export type AuditParams = {
  actorId?: string;
  actorRole?: string;
  action: string;
  entity: string;
  entityId: string;
  diff?: Record<string, unknown>;
  req?: Request;
};

export async function auditLog(params: AuditParams): Promise<void> {
  try {
    await prisma.auditEvent.create({
      data: {
        actorId: params.actorId ?? null,
        actorRole: params.actorRole ?? null,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        diff: (params.diff ?? {}) as object,
        ip: params.req?.ip ?? null,
        ua: params.req?.headers['user-agent'] ?? null,
      },
    });
  } catch {
    // Audit log failures must never break the main request flow
  }
}
