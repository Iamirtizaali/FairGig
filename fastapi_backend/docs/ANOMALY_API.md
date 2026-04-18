# Anomaly Service API (For Judges)

This API determines if a worker is experiencing statistically unfair deduction spikes, unreasonable hourly rate drops, or sudden >20% month-over-month income crashes. We use Pandas DataFrame modeling and `scipy.stats.zscore` scaling dynamically against a tumbling 60-day window index.

You can hit our endpoint directly using this `curl` snippet. To bypass JWT requirements safely during hacking protocols, you must pass the `X-API-Key`.

## Local Testing Curl

```bash
curl -X POST "http://127.0.0.1:8001/detect" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: softec_judge_2026" \
  -d '{
        "worker_id": "W1234",
        "currency": "PKR",
        "shifts": [
          { "date": "2026-01-01", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-02", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-03", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-04", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-05", "platform": "Uber", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-06", "platform": "Uber", "hours_worked": 8, "gross_earned": 1500, "platform_deductions": 700, "net_received": 800 }
        ],
        "options": {
          "z_threshold": 2.5,
          "mom_drop_pct": 20.0
        }
      }'
```

**Expected Response**:
If you run this payload, the 6th shift is a huge statistical outlier (46% deduction compared to baseline 10%). The service strictly responds with Pydantic typed arrays:

```json
{
  "summary": {
    "shifts_analysed": 6,
    "windows": [
      "weekly",
      "monthly"
    ]
  },
  "anomalies": [
    {
      "kind": "deduction_spike",
      "severity": "high",
      "window": "Week ending 2026-01-11",
      "metric": "deduction_pct",
      "observed": 0.46,
      "baseline_mean": 0.10,
      "baseline_std": 0.01,
      "z": 36.0,
      "explanation": "Your platform cut 46% this week versus your usual 10%."
    }
  ]
}
```
