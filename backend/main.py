from fastapi import FastAPI
from routes import laliga

app = FastAPI(title="La Liga Insights API")

app.include_router(laliga.router)

@app.get("/laliga")
def root():
    return {"message": "La Liga Dashboard"}
