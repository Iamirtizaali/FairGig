# Anomaly Service API (For Judges)

This API determines if a worker is experiencing statistically unfair deduction spikes, unreasonable hourly rate drops, or sudden >20% month-over-month income crashes. We use Pandas DataFrame modeling and `scipy.stats.zscore` internally.

You can hit our endpoint directly using this `curl` snippet. To bypass JWT requirements locally, you must pass the `X-API-Key`.

## Local Testing Curl

```bash
curl -X POST "http://127.0.0.1:8001/detect" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: softec_judge_2026" \
  -d '{
        "worker_id": "W1234",
        "shifts": [
          { "date": "2026-01-01", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-02", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-03", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-04", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-05", "hours_worked": 8, "gross_earned": 2000, "platform_deductions": 200, "net_received": 1800 },
          { "date": "2026-01-06", "hours_worked": 8, "gross_earned": 1500, "platform_deductions": 600, "net_received": 900 }
        ]
      }'
```

**Expected Response**:
If you run this payload, the 6th shift is a huge statistical outlier (40% deduction compared to ~10%). The service will return something like:

```json
{
  "worker_id": "W1234",
  "anomalies": [
    "Your platform took 40.0% in deductions recently vs your usual 15.0%."
  ],
  "status": "issues_found"
}
```
