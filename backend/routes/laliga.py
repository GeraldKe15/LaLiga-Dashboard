from fastapi import APIRouter
from dotenv import load_dotenv
import os
import requests

# Loading environment variables from .env file
load_dotenv()
API_KEY = os.getenv("FOOTBALL_API_KEY")

router = APIRouter(prefix="/laliga", tags=["La Liga"])

@router.get("/hello")
def hello():
    return {"message": "Hello!"}

@router.get("/teams")
def get_teams():
    """
    Fetches the current La Liga team data from the Football-Data.org
    API and returns it as a JSON
    """
    url = "https://api.football-data.org/v4/competitions/PD/teams"
    headers = {"X-Auth-Token": API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch data", "status": response.status_code}
    
    data = response.json()

    teams = [
        {
            "name": team["name"],
            "shortName": team["shortName"],
            "crest": team["crest"],
            "founded": team["founded"],
            "venue": team["venue"],
        }
        for team in data.get("teams", [])
    ]

    return {"teams": teams}

@router.get("/matches")
def get_matches():
    """
    Fetches recent and upcoming La Liga matches
    """
    url = "https://api.football-data.org/v4/competitions/PD/matches"
    headers = {"X-Auth-Token": API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch data", "status": response.status_code}

    data = response.json()

    matches = [
        {
            "utcDate": match["utcDate"],
            "status": match["status"],
            "matchday": match.get("matchday"),
            "homeTeam": match["homeTeam"]["name"],
            "awayTeam": match["awayTeam"]["name"],
            "score": {
                "home": match["score"]["fullTime"]["home"],
                "away": match["score"]["fullTime"]["away"]
            }
        }
        for match in data.get("matches", [])
    ]

    return {"matches": matches}