# run_all.ps1
Write-Host "Starting FairGig Microservices..." -ForegroundColor Green

# Start Anomaly Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/anomaly-service; ../../venv/Scripts/uvicorn app.main:app --port 8001 --reload"

# Start Analytics Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/analytics-service; ../../venv/Scripts/uvicorn app.main:app --port 8002 --reload"

Write-Host "Services are launching in new windows." -ForegroundColor Yellow
Write-Host "Anomaly Service: http://localhost:8001/docs" -ForegroundColor Cyan
Write-Host "Analytics Service: http://localhost:8002/docs" -ForegroundColor Cyan
