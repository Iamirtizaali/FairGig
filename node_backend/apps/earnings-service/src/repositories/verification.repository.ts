import { getPrisma } from '../lib/prisma';
import type { VerificationStatus } from '@prisma/client';

const prisma = getPrisma();

export interface CreateVerificationInput {
  shiftId: string;
  verifierId: string;
  screenshotId?: string | null;
  status: VerificationStatus;
  notes?: string | null;
}

export const verificationRepository = {
  async create(input: CreateVerificationInput) {
    return prisma.verification.create({
      data: {
        ...input,
        decidedAt: new Date(),
      },
    });
  },

  async findByShift(shiftId: string) {
    return prisma.verification.findMany({
      where: { shiftId },
      orderBy: { createdAt: 'desc' },
    });
  },
};
