from fastapi import FastAPI
from routes import laliga
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="La Liga Insights API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://la-liga-dashboard.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(laliga.router)

@app.get("/laliga")
def root():
    return {"message": "La Liga Dashboard"}
