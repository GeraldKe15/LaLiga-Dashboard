from fastapi import FastAPI
from routes import laliga

app = FastAPI(title="La Liga Insights API")

app.include_router(laliga.router)

@app.get("/")
def root():
    return {"message": "La Liga Dashboard"}
