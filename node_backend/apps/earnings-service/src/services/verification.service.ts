import type { Request } from 'express';
import { getPrisma } from '../lib/prisma';
import { verificationRepository } from '../repositories/verification.repository';
import { writeAuditEvent } from '../repositories/audit.repository';
import { shiftEventsQueue } from '../queues/shiftEvents.queue';
import { notifyUser } from './notification.service';
import { AppError, NotFoundError, ForbiddenError } from '../utils/errors';
import { logger } from '../utils/logger';
import type { VerifyShiftInput } from '../validators/shift.schema';

const prisma = getPrisma();

// Maps verifier decision → shift verification status
const DECISION_STATUS_MAP = {
  confirmed: 'verified',
  discrepancy: 'discrepancy_flagged',
  unverifiable: 'unverifiable',
} as const;

export async function verifyShift(
  shiftId: string,
  input: VerifyShiftInput,
  verifierId: string,
  req?: Request,
) {
  const shift = await prisma.shift.findUnique({
    where: { id: shiftId },
    select: { id: true, workerId: true, verificationStatus: true, deletedAt: true },
  });

  if (!shift || shift.deletedAt) throw new NotFoundError('Shift');

  if (shift.verificationStatus !== 'pending_review') {
    throw new AppError(
      409,
      'SHIFT_NOT_PENDING',
      `Shift is in status '${shift.verificationStatus}', expected 'pending_review'`,
    );
  }

  const newStatus = DECISION_STATUS_MAP[input.decision];

  // Persist verification record + transition shift status in one transaction
  const [verification] = await prisma.$transaction([
    prisma.verification.create({
      data: {
        shiftId,
        verifierId,
        screenshotId: input.screenshotId ?? null,
        status: input.decision,
        notes: input.notes ?? null,
        decidedAt: new Date(),
      },
    }),
    prisma.shift.update({
      where: { id: shiftId },
      data: { verificationStatus: newStatus },
    }),
  ]);

  // Audit log
  void writeAuditEvent({
    actorId: verifierId,
    actorRole: 'verifier',
    action: 'shift.verify',
    entity: 'shifts',
    entityId: shiftId,
    diff: { decision: input.decision, newStatus },
    req,
  });

  // Publish event to queue (fire-and-forget)
  void (async () => {
    try {
      await shiftEventsQueue.add('shift.verified', {
        shiftId,
        workerId: shift.workerId,
        decision: input.decision,
      });
    } catch (err) {
      logger.warn({ err }, 'failed to enqueue shift.verified event');
    }
  })();

  // Notify worker (fire-and-forget)
  void notifyUser({
    userId: shift.workerId,
    title: 'Shift verification update',
    body: buildNotificationBody(input.decision, shiftId),
    link: `/shifts/${shiftId}`,
  });

  return verification;
}

function buildNotificationBody(decision: string, shiftId: string): string {
  if (decision === 'confirmed') return `Your shift ${shiftId} has been verified and confirmed.`;
  if (decision === 'discrepancy') return `A discrepancy was flagged on shift ${shiftId}. Please review.`;
  return `Shift ${shiftId} could not be verified. Please upload clearer evidence.`;
}

export interface QueueItem {
  shiftId: string;
  workerId: string;
  workerName: string;
  shiftDate: string;
  grossPay: string;
  netPay: string;
  platform: string;
  screenshotCount: number;
  createdAt: string;
}

export async function getVerificationQueue(page: number, limit: number) {
  const offset = (page - 1) * limit;

  // Cross-schema raw query: join earnings.shifts with auth.users for worker display name
  const rows = await prisma.$queryRaw<QueueItem[]>`
    SELECT
      s.id            AS "shiftId",
      s."workerId",
      COALESCE(u.name, s."workerId") AS "workerName",
      s."shiftDate"::text            AS "shiftDate",
      s."grossPay"::text             AS "grossPay",
      s."netPay"::text               AS "netPay",
      p.name                         AS "platform",
      COUNT(sc.id)::int              AS "screenshotCount",
      s."createdAt"::text            AS "createdAt"
    FROM earnings.shifts s
    LEFT JOIN auth.users u     ON u.id = s."workerId"::uuid
    LEFT JOIN earnings.platforms p ON p.id = s."platformId"
    LEFT JOIN earnings.screenshots sc
           ON sc."shiftId" = s.id AND sc."deletedAt" IS NULL
    WHERE s."verificationStatus" = 'pending_review'
      AND s."deletedAt" IS NULL
    GROUP BY s.id, u.name, p.name
    ORDER BY s."createdAt" ASC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const countResult = await prisma.$queryRaw<[{ total: bigint }]>`
    SELECT COUNT(*)::bigint AS total
    FROM earnings.shifts
    WHERE "verificationStatus" = 'pending_review' AND "deletedAt" IS NULL
  `;

  const total = Number(countResult[0]?.total ?? 0);

  return { queue: rows, total };
}
