import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { certificateRepository } from '../repositories/certificate.repository';
import { AppError, NotFoundError, ForbiddenError } from '../utils/errors';
import { env } from '../config/env';
import type { BuildCertificateInput, ShareCertificateInput } from '../validators/certificate.schema';

// Load and compile the HBS template once at module load
const TEMPLATE_PATH = path.join(process.cwd(), 'templates', 'certificate.hbs');
const compiledTemplate = Handlebars.compile(
  fs.existsSync(TEMPLATE_PATH) ? fs.readFileSync(TEMPLATE_PATH, 'utf8') : '',
);

export interface CertificateData {
  workerName: string;
  periodStart: string;
  periodEnd: string;
  issuedAt: string;
  currency: string;
  platformBreakdown: PlatformRow[];
  monthlyBreakdown: MonthlyRow[];
  totals: TotalsRow;
  avgHourlyRate: string;
  verificationPct: number;
  shareToken?: string;
  shareUrl?: string;
}

interface PlatformRow {
  platform: string;
  shifts: number;
  hours: string;
  gross: string;
  deductions: string;
  net: string;
  currency: string;
}

interface MonthlyRow {
  month: string;
  shifts: number;
  hours: string;
  net: string;
}

interface TotalsRow {
  shifts: number;
  hours: string;
  gross: string;
  deductions: string;
  net: string;
}

export async function buildCertificateData(
  workerId: string,
  input: BuildCertificateInput,
): Promise<CertificateData> {
  const from = new Date(input.from);
  const to = new Date(input.to);

  if (from >= to) throw new AppError(400, 'INVALID_DATE_RANGE', 'from must be before to');

  const shifts = await certificateRepository.getVerifiedShifts(workerId, from, to);

  if (shifts.length === 0) {
    return emptyData(input.from, input.to);
  }

  // Platform breakdown
  const platformMap = new Map<string, { name: string; shifts: number; hours: number; gross: number; deductions: number; net: number }>();
  for (const s of shifts) {
    const key = s.platformId;
    const existing = platformMap.get(key) ?? { name: s.platform.name, shifts: 0, hours: 0, gross: 0, deductions: 0, net: 0 };
    existing.shifts++;
    existing.hours += Number(s.hoursWorked);
    existing.gross += Number(s.grossPay);
    existing.deductions += Number(s.deductions);
    existing.net += Number(s.netPay);
    platformMap.set(key, existing);
  }

  const currency = 'PKR';
  const platformBreakdown: PlatformRow[] = Array.from(platformMap.values()).map((p) => ({
    platform: p.name,
    shifts: p.shifts,
    hours: p.hours.toFixed(2),
    gross: p.gross.toFixed(2),
    deductions: p.deductions.toFixed(2),
    net: p.net.toFixed(2),
    currency,
  }));

  // Monthly breakdown
  const monthlyMap = new Map<string, { shifts: number; hours: number; net: number }>();
  for (const s of shifts) {
    const key = s.shiftDate.toISOString().slice(0, 7); // YYYY-MM
    const existing = monthlyMap.get(key) ?? { shifts: 0, hours: 0, net: 0 };
    existing.shifts++;
    existing.hours += Number(s.hoursWorked);
    existing.net += Number(s.netPay);
    monthlyMap.set(key, existing);
  }

  const monthlyBreakdown: MonthlyRow[] = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, m]) => ({
      month,
      shifts: m.shifts,
      hours: m.hours.toFixed(2),
      net: m.net.toFixed(2),
    }));

  // Totals
  const totalShifts = shifts.length;
  const totalHours = shifts.reduce((s, r) => s + Number(r.hoursWorked), 0);
  const totalGross = shifts.reduce((s, r) => s + Number(r.grossPay), 0);
  const totalDeductions = shifts.reduce((s, r) => s + Number(r.deductions), 0);
  const totalNet = shifts.reduce((s, r) => s + Number(r.netPay), 0);

  const avgHourlyRate = totalHours > 0 ? (totalNet / totalHours).toFixed(2) : '0.00';

  return {
    workerName: workerId, // frontend will substitute display name
    periodStart: input.from,
    periodEnd: input.to,
    issuedAt: new Date().toISOString().slice(0, 10),
    currency,
    platformBreakdown,
    monthlyBreakdown,
    totals: {
      shifts: totalShifts,
      hours: totalHours.toFixed(2),
      gross: totalGross.toFixed(2),
      deductions: totalDeductions.toFixed(2),
      net: totalNet.toFixed(2),
    },
    avgHourlyRate,
    verificationPct: totalShifts,
  };
}

export async function shareCertificate(workerId: string, input: ShareCertificateInput) {
  const cert = await certificateRepository.create({
    workerId,
    periodStart: new Date(input.from),
    periodEnd: new Date(input.to),
    ttlDays: input.ttlDays,
  });

  const shareUrl = `${env.CERT_SHARE_BASE_URL}/certificate/v1/public/${cert.shareToken}`;
  return { shareToken: cert.shareToken, shareUrl, expiresAt: cert.expiresAt };
}

export async function getPublicCertificate(shareToken: string): Promise<CertificateData> {
  const cert = await certificateRepository.findByToken(shareToken);
  if (!cert) throw new NotFoundError('Certificate');
  if (cert.revokedAt) throw new AppError(410, 'CERT_REVOKED', 'This certificate has been revoked');
  if (cert.expiresAt < new Date()) throw new AppError(410, 'CERT_EXPIRED', 'This certificate has expired');

  const data = await buildCertificateData(cert.workerId, {
    from: cert.periodStart.toISOString().slice(0, 10),
    to: cert.periodEnd.toISOString().slice(0, 10),
  });

  data.shareToken = shareToken;
  data.shareUrl = `${env.CERT_SHARE_BASE_URL}/certificate/v1/public/${shareToken}`;
  return data;
}

export async function getPublicCertificateHtml(shareToken: string): Promise<string> {
  const data = await getPublicCertificate(shareToken);
  return compiledTemplate(data);
}

export async function revokeCertificate(shareToken: string, workerId: string) {
  const result = await certificateRepository.revoke(shareToken, workerId);
  if (result.count === 0) throw new NotFoundError('Certificate');
  return { revoked: true };
}

function emptyData(from: string, to: string): CertificateData {
  return {
    workerName: '',
    periodStart: from,
    periodEnd: to,
    issuedAt: new Date().toISOString().slice(0, 10),
    currency: 'PKR',
    platformBreakdown: [],
    monthlyBreakdown: [],
    totals: { shifts: 0, hours: '0.00', gross: '0.00', deductions: '0.00', net: '0.00' },
    avgHourlyRate: '0.00',
    verificationPct: 0,
  };
}
