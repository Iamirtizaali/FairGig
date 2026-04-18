import { v4 as uuidv4 } from 'uuid';
import { shiftRepository } from '../repositories/shift.repository';
import { screenshotRepository } from '../repositories/screenshot.repository';
import { createPresignedUploadUrl, createSignedDownloadUrl } from '../integrations/storage';
import { NotFoundError, ForbiddenError, AppError } from '../utils/errors';
import type { PresignInput, ConfirmScreenshotInput } from '../validators/shift.schema';

const MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function presignUpload(shiftId: string, input: PresignInput, userId: string) {
  const shift = await shiftRepository.findById(shiftId);
  if (!shift) throw new NotFoundError('Shift');
  if (shift.workerId !== userId) throw new ForbiddenError('You do not own this shift');
  if ((shift.verificationStatus as string) === 'verified') {
    throw new AppError(409, 'SHIFT_VERIFIED', 'Cannot upload screenshot for a verified shift');
  }

  const ext = MIME_EXT[input.mimeType] ?? 'jpg';
  const storagePath = `screenshots/${userId}/${shiftId}/${uuidv4()}.${ext}`;
  const { signedUrl, token } = await createPresignedUploadUrl(storagePath);
  return { signedUrl, storageKey: storagePath, token };
}

export async function confirmUpload(
  shiftId: string,
  input: ConfirmScreenshotInput,
  userId: string,
) {
  const shift = await shiftRepository.findById(shiftId);
  if (!shift) throw new NotFoundError('Shift');
  if (shift.workerId !== userId) throw new ForbiddenError('You do not own this shift');

  const screenshot = await screenshotRepository.create({
    shiftId,
    storageKey: input.storageKey,
    mimeType: input.mimeType,
    sizeBytes: input.sizeBytes,
  });

  // Transition shift to pending_review
  await shiftRepository.updateVerificationStatus(shiftId, 'pending_review');

  return screenshot;
}

export async function getScreenshotUrl(shiftId: string, userId: string, role: string) {
  const shift = await shiftRepository.findById(shiftId);
  if (!shift) throw new NotFoundError('Shift');

  const isOwner = shift.workerId === userId;
  const canView = isOwner || role === 'verifier' || role === 'admin';
  if (!canView) throw new ForbiddenError('Insufficient permissions to view screenshot');

  const screenshots = await screenshotRepository.findByShiftId(shiftId);
  if (screenshots.length === 0) throw new NotFoundError('Screenshot');

  const latest = screenshots[0];
  const signedUrl = await createSignedDownloadUrl(latest.storageKey, 300);
  return { screenshotId: latest.id, signedUrl, expiresIn: 300 };
}
