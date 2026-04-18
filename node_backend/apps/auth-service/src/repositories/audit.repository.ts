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

export async function listAuditEvents(opts: {
  page: number;
  limit: number;
  actorId?: string;
  action?: string;
  entity?: string;
  from?: Date;
  to?: Date;
}) {
  const where: Record<string, unknown> = {};
  if (opts.actorId) where['actorId'] = opts.actorId;
  if (opts.action) where['action'] = { contains: opts.action, mode: 'insensitive' };
  if (opts.entity) where['entity'] = opts.entity;
  if (opts.from || opts.to) {
    where['createdAt'] = {
      ...(opts.from ? { gte: opts.from } : {}),
      ...(opts.to ? { lte: opts.to } : {}),
    };
  }

  const [events, total] = await Promise.all([
    prisma.auditEvent.findMany({
      where: where as never,
      orderBy: { createdAt: 'desc' },
      skip: (opts.page - 1) * opts.limit,
      take: opts.limit,
    }),
    prisma.auditEvent.count({ where: where as never }),
  ]);
  return { events, total };
}

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
