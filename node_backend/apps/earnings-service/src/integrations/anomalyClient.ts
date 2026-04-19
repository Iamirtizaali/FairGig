import { env } from '../config/env';
import { logger } from '../utils/logger';

export interface AnomalyShiftInput {
  date: string;
  platform: string;
  hours_worked: number;
  gross_earned: number;
  platform_deductions: number;
  net_received: number;
}

export interface AnomalyResult {
  kind: string;
  severity: 'low' | 'medium' | 'high';
  window: string;
  explanation: string;
  z?: number;
}

export async function detectAnomalies(
  workerId: string,
  shifts: AnomalyShiftInput[],
): Promise<AnomalyResult[]> {
  try {
    const res = await fetch(`${env.ANOMALY_SERVICE_URL}/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': env.ANOMALY_API_KEY,
      },
      body: JSON.stringify({
        worker_id: workerId,
        shifts,
        options: { z_threshold: 2.5, mom_drop_pct: 20.0 },
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      logger.warn({ status: res.status }, 'anomaly service returned non-2xx');
      return [];
    }
    const body = await res.json() as { anomalies?: AnomalyResult[] };
    return body.anomalies ?? [];
  } catch (err) {
    logger.warn({ err }, 'anomaly service call failed — skipping');
    return [];
  }
}
