import type { Request } from 'express';
import { complaintRepository, ListComplaintsOpts } from '../repositories/complaint.repository';
import { writeAuditEvent } from '../repositories/audit.repository';
import { NotFoundError, ForbiddenError, AppError } from '../utils/errors';
import type {
  CreateComplaintInput,
  UpdateComplaintInput,
  UpdateComplaintStatusInput,
  AddTagInput,
  AddCommentInput,
  ReportComplaintInput,
} from '../validators/grievance.schema';
import type { ComplaintStatus } from '../generated/prisma';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

export async function createComplaint(authorId: string, input: CreateComplaintInput) {
  return complaintRepository.create({ ...input, authorId });
}

export async function listComplaints(opts: ListComplaintsOpts, role: Role) {
  const { rows, total } = await complaintRepository.list(opts);

  // Workers and public see anonymised authors
  const isAdvocateOrAdmin = role === 'advocate' || role === 'admin';
  const sanitized = rows.map((c) => ({
    ...c,
    authorId: isAdvocateOrAdmin ? c.authorId : undefined,
  }));

  return { complaints: sanitized, total };
}

export async function getComplaint(id: string, role: Role) {
  const complaint = await complaintRepository.findById(id);
  if (!complaint) throw new NotFoundError('Complaint');

  const isAdvocateOrAdmin = role === 'advocate' || role === 'admin';
  return {
    ...complaint,
    authorId: isAdvocateOrAdmin ? complaint.authorId : undefined,
  };
}

export async function updateComplaint(
  id: string,
  input: UpdateComplaintInput,
  userId: string,
  role: Role,
) {
  const complaint = await complaintRepository.findById(id);
  if (!complaint) throw new NotFoundError('Complaint');

  const canEdit =
    complaint.authorId === userId ||
    role === 'advocate' ||
    role === 'admin';

  if (!canEdit) throw new ForbiddenError('You cannot edit this complaint');

  return complaintRepository.update(id, input);
}

export async function updateComplaintStatus(
  id: string,
  input: UpdateComplaintStatusInput,
  userId: string,
  role: Role,
  req?: Request,
) {
  const complaint = await complaintRepository.findById(id);
  if (!complaint) throw new NotFoundError('Complaint');

  if (role !== 'advocate' && role !== 'admin') {
    throw new ForbiddenError('Only advocates and admins can change complaint status');
  }

  await complaintRepository.updateStatus(id, input.status as ComplaintStatus);

  void writeAuditEvent({
    actorId: userId,
    actorRole: role,
    action: 'complaint.status_change',
    entity: 'complaints',
    entityId: id,
    diff: { from: complaint.status, to: input.status },
    req,
  });

  return { id, status: input.status };
}

export async function addTag(
  complaintId: string,
  input: AddTagInput,
  userId: string,
  role: Role,
  req?: Request,
) {
  const complaint = await complaintRepository.findById(complaintId);
  if (!complaint) throw new NotFoundError('Complaint');
  if (role !== 'advocate' && role !== 'admin') {
    throw new ForbiddenError('Only advocates and admins can add tags');
  }

  const tag = await complaintRepository.addTag(complaintId, input.label, userId);

  void writeAuditEvent({
    actorId: userId,
    actorRole: role,
    action: 'complaint.tag_added',
    entity: 'complaints',
    entityId: complaintId,
    diff: { label: input.label },
    req,
  });

  return tag;
}

export async function removeTag(
  complaintId: string,
  tagId: string,
  userId: string,
  role: Role,
  req?: Request,
) {
  if (role !== 'advocate' && role !== 'admin') {
    throw new ForbiddenError('Only advocates and admins can remove tags');
  }

  const result = await complaintRepository.removeTag(tagId, complaintId);
  if (result.count === 0) throw new NotFoundError('Tag');

  void writeAuditEvent({
    actorId: userId,
    actorRole: role,
    action: 'complaint.tag_removed',
    entity: 'complaint_tags',
    entityId: tagId,
    diff: { complaintId },
    req,
  });

  return { deleted: true };
}

export async function addComment(complaintId: string, input: AddCommentInput, authorId: string) {
  const complaint = await complaintRepository.findById(complaintId);
  if (!complaint) throw new NotFoundError('Complaint');
  return complaintRepository.addComment(complaintId, authorId, input.body);
}

export async function reportComplaint(
  complaintId: string,
  input: ReportComplaintInput,
  reporterId: string,
) {
  const complaint = await complaintRepository.findById(complaintId);
  if (!complaint) throw new NotFoundError('Complaint');
  return complaintRepository.addReport(complaintId, reporterId, input.reason);
}

export async function getBulletinBoard(page: number, limit: number) {
  // Public board: only public_anon, non-hidden, non-deleted complaints
  const { rows, total } = await complaintRepository.list({
    page,
    limit,
    status: undefined,
  });

  const filtered = rows.filter(
    (c) => c.visibility === 'public_anon' && c.status !== 'hidden',
  );

  return {
    complaints: filtered.map((c) => ({
      ...c,
      authorId: undefined, // always anonymised on bulletin board
    })),
    total,
  };
}
