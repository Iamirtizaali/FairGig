import type { Request } from 'express';
import { shiftRepository, ListShiftsOpts } from '../repositories/shift.repository';
import { anomalyFlagRepository } from '../repositories/anomalyFlag.repository';
import { detectAnomalies, AnomalyShiftInput } from '../integrations/anomalyClient';
import { shiftEventsQueue } from '../queues/shiftEvents.queue';
import { AppError, NotFoundError, ForbiddenError, ValidationError } from '../utils/errors';
import { logger } from '../utils/logger';
import type { CreateShiftInput, UpdateShiftInput } from '../validators/shift.schema';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

function validateFinancialIntegrity(grossPay: number, deductions: number, netPay: number) {
  const expected = grossPay - deductions;
  if (Math.abs(expected - netPay) > 0.01) {
    throw new ValidationError(
      `net_pay must equal gross_pay minus deductions (expected ${expected.toFixed(2)}, got ${netPay.toFixed(2)})`,
      { netPay: `Expected ${expected.toFixed(2)}` },
    );
  }
}

export async function createShift(workerId: string, input: CreateShiftInput, _req?: Request) {
  validateFinancialIntegrity(input.grossPay, input.deductions, input.netPay);
  const shift = await shiftRepository.create({ ...input, workerId });

  // fire-and-forget side effects — never block the response
  void (async () => {
    try {
      await shiftEventsQueue.add('shift.created', { shiftId: shift.id, workerId });
    } catch (err) {
      logger.warn({ err }, 'failed to enqueue shift.created event');
    }

    try {
      const recent = await shiftRepository.findRecentForWorker(workerId, 90) as Array<{
        shiftDate: Date; platform: { slug: string };
        hoursWorked: unknown; grossPay: unknown; deductions: unknown; netPay: unknown;
      }>;
      const payload: AnomalyShiftInput[] = recent.map((s) => ({
        date: s.shiftDate.toISOString().split('T')[0],
        platform: s.platform.slug,
        hours_worked: Number(s.hoursWorked),
        gross_earned: Number(s.grossPay),
        platform_deductions: Number(s.deductions),
        net_received: Number(s.netPay),
      }));
      const anomalies = await detectAnomalies(workerId, payload);
      if (anomalies.length > 0) {
        await anomalyFlagRepository.createMany(
          anomalies.map((a) => ({
            shiftId: shift.id,
            reason: a.explanation,
            score: a.z ?? null,
          })),
        );
      }
    } catch (err) {
      logger.warn({ err }, 'anomaly detection side-effect failed');
    }
  })();

  return shift;
}

export async function listShifts(opts: ListShiftsOpts, role: Role, userId: string) {
  return shiftRepository.list(opts, role, userId);
}

export async function getShift(id: string, role: Role, userId: string) {
  const shift = await shiftRepository.findById(id);
  if (!shift) throw new NotFoundError('Shift');

  if (role === 'worker' && shift.workerId !== userId) {
    throw new ForbiddenError('You do not own this shift');
  }

  return shift;
}

export async function updateShift(
  id: string,
  input: UpdateShiftInput,
  userId: string,
  role: Role,
) {
  const shift = await shiftRepository.findById(id);
  if (!shift) throw new NotFoundError('Shift');
  if (shift.workerId !== userId && role !== 'admin') {
    throw new ForbiddenError('You do not own this shift');
  }
  if ((shift.verificationStatus as string) === 'verified') {
    throw new AppError(409, 'SHIFT_VERIFIED', 'Verified shifts cannot be edited');
  }

  if (input.grossPay !== undefined || input.deductions !== undefined || input.netPay !== undefined) {
    const gross = input.grossPay ?? Number(shift.grossPay);
    const ded = input.deductions ?? Number(shift.deductions);
    const net = input.netPay ?? Number(shift.netPay);
    validateFinancialIntegrity(gross, ded, net);
  }

  return shiftRepository.update(id, input);
}

export async function deleteShift(id: string, userId: string, role: Role) {
  const shift = await shiftRepository.findById(id);
  if (!shift) throw new NotFoundError('Shift');
  if (shift.workerId !== userId && role !== 'admin') {
    throw new ForbiddenError('You do not own this shift');
  }
  await shiftRepository.softDelete(id);
}
