import type { Request } from 'express';
import { clusterRepository } from '../repositories/cluster.repository';
import { complaintRepository } from '../repositories/complaint.repository';
import { writeAuditEvent } from '../repositories/audit.repository';
import { getClusterSuggestions } from './clustering.service';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import type { CreateClusterInput, AttachToClusterInput } from '../validators/grievance.schema';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

export async function createCluster(
  input: CreateClusterInput,
  userId: string,
  role: Role,
  req?: Request,
) {
  if (role !== 'advocate' && role !== 'admin') {
    throw new ForbiddenError('Only advocates and admins can create clusters');
  }

  const cluster = await clusterRepository.create({ ...input, createdBy: userId });

  void writeAuditEvent({
    actorId: userId,
    actorRole: role,
    action: 'cluster.created',
    entity: 'complaint_clusters',
    entityId: cluster.id,
    diff: { title: input.title },
    req,
  });

  return cluster;
}

export async function listClusters(page: number, limit: number) {
  return clusterRepository.list(page, limit);
}

export async function attachToCluster(
  clusterId: string,
  input: AttachToClusterInput,
  userId: string,
  role: Role,
  req?: Request,
) {
  if (role !== 'advocate' && role !== 'admin') {
    throw new ForbiddenError('Only advocates and admins can attach complaints to clusters');
  }

  const cluster = await clusterRepository.findById(clusterId);
  if (!cluster) throw new NotFoundError('Cluster');

  await clusterRepository.attachComplaints(clusterId, input.complaintIds);

  void writeAuditEvent({
    actorId: userId,
    actorRole: role,
    action: 'cluster.attach',
    entity: 'complaint_clusters',
    entityId: clusterId,
    diff: { complaintIds: input.complaintIds },
    req,
  });

  return { clusterId, attached: input.complaintIds.length };
}

export async function getSuggestions(seedId: string) {
  const complaint = await complaintRepository.findById(seedId);
  if (!complaint) throw new NotFoundError('Complaint');
  return getClusterSuggestions(seedId);
}
