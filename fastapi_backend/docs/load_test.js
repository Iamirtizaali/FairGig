/**
 * k6 load test — FairGig Anomaly Detection Service
 * Sprint 5 acceptance: p95 latency < 2000ms under 100 concurrent users
 *
 * Run with:
 *   k6 run docs/load_test.js
 *   k6 run --out cloud docs/load_test.js   (for cloud dashboard)
 *
 * Install k6: https://k6.io/docs/getting-started/installation/
 */
import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";

const p95 = new Trend("p95_latency");

export const options = {
  stages: [
    { duration: "10s", target: 20 },   // ramp up
    { duration: "30s", target: 100 },  // 100 concurrent users
    { duration: "10s", target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],  // ✅ sprint 5 acceptance criterion
    http_req_failed:   ["rate<0.01"],   // < 1% errors
  },
};

// 66-day payload with a deduction spike on the last 4 days
const PAYLOAD = JSON.stringify({
  worker_id: `LOAD-TEST-${__VU}`,
  currency: "PKR",
  shifts: Array.from({ length: 62 }, (_, i) => {
    const d = new Date(2026, 0, 1 + i);
    return {
      date: d.toISOString().split("T")[0],
      platform: "Uber",
      hours_worked: 8,
      gross_earned: 2000,
      platform_deductions: 200,
      net_received: 1800,
    };
  }).concat(
    Array.from({ length: 4 }, (_, i) => {
      const d = new Date(2026, 2, 4 + i);
      return {
        date: d.toISOString().split("T")[0],
        platform: "Uber",
        hours_worked: 8,
        gross_earned: 2000,
        platform_deductions: 900,
        net_received: 1100,
      };
    })
  ),
  options: { z_threshold: 2.5, mom_drop_pct: 20.0 },
});

const HEADERS = {
  "Content-Type": "application/json",
  "X-API-Key": "softec_judge_2026",
};

export default function () {
  const res = http.post("http://localhost:8001/detect", PAYLOAD, { headers: HEADERS });

  p95.add(res.timings.duration);

  check(res, {
    "status 200":              (r) => r.status === 200,
    "has anomalies field":     (r) => r.json("anomalies") !== undefined,
    "latency < 2000ms":        (r) => r.timings.duration < 2000,
    "deduction_spike flagged": (r) => {
      const body = r.json();
      return body.anomalies && body.anomalies.some((a) => a.kind === "deduction_spike");
    },
  });

  sleep(0.1);
}
