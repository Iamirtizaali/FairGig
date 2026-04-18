from fastapi import FastAPI

app = FastAPI(title="FairGig API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FairGig API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
