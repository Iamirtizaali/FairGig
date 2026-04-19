# run_all.ps1
#
# Canonical FastAPI service ports (matches client/src/lib/*.ts defaults):
#   analytics-service → 5001   (VITE_ANALYTICS_API_URL)
#   anomaly-service   → 5002   (VITE_ANOMALY_API_URL, also Node ANOMALY_SERVICE_URL)
#
Write-Host "Starting FairGig Microservices..." -ForegroundColor Green

# Start Anomaly Service on 5002 (matches frontend + Node earnings-service defaults)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/anomaly-service; ../../venv/Scripts/uvicorn app.main:app --port 5002 --reload"

# Start Analytics Service on 5001 (matches frontend default)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/analytics-service; ../../venv/Scripts/uvicorn app.main:app --port 5001 --reload"

Write-Host "Services are launching in new windows." -ForegroundColor Yellow
Write-Host "Anomaly Service:   http://localhost:5002/docs" -ForegroundColor Cyan
Write-Host "Analytics Service: http://localhost:5001/docs" -ForegroundColor Cyan
