from fastapi import FastAPI
from app.api.routes import kpis
<<<<<<< HEAD
from app.repositories.database import init_db
=======
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767

app = FastAPI(
    title="FairGig Analytics Service",
    description="k-Anonymized macro analytics and worker dashboards.",
    version="1.0.0"
)

<<<<<<< HEAD
@app.on_event("startup")
async def on_startup():
    await init_db()

=======
>>>>>>> d9884f08b13838751b1573eb76b9d18855a76767
app.include_router(kpis.router, tags=["analytics"])

@app.get("/health", summary="Health Check")
async def health_check():
    return {"status": "ok", "service": "analytics-service"}
