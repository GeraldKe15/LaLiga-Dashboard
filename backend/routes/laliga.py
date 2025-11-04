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

@router.get("/seasonSchedule")
def get_matches():
    """
    Fetches all games scheduled in the season, from matchday 1 - 38
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

@router.get("/matches")
def get_matches():
    """
    Fetches the current matchday games, upcoming matchday games, and the 
    previous matchday games. This is for keeping track of what's currently
    going on in the season. 
    """
    url = "https://api.football-data.org/v4/competitions/PD/matches"
    headers = {"X-Auth-Token": API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch data", "status": response.status_code}

    data = response.json()
    matches = data.get("matches", [])
    current_matchday = matches[0]["season"]["currentMatchday"]

    # Helper function for consistent formatting
    def format_match(match):
        return {
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

    if current_matchday:
        previous_matchday = [format_match(m) for m in matches if m["matchday"] == current_matchday - 1]
        current_matches = [format_match(m) for m in matches if m["matchday"] == current_matchday]
        upcoming_matchday = [format_match(m) for m in matches if m["matchday"] == current_matchday + 1]
    else:
        previous_matchday = []
        current_matches = []
        upcoming_matchday = []

    return {
        "currentMatchday": current_matchday,
        "currentMatches": current_matches,
        "upcomingMatchday": upcoming_matchday,
        "previousMatchday": previous_matchday
    }

@router.get("/standings")
def get_standings():
    """
    Fetches the current La Liga table
    """
    url = "https://api.football-data.org/v4/competitions/PD/standings"
    headers = {"X-Auth-Token": API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return {"error": "Failed to fetch data", "status": response.status_code}
    
    data = response.json()

    table = data["standings"][0]["table"]

    standings = [
        {
            "position": team["position"],
            "team": team["team"]["name"],
            "points": team["points"],
            "playedGames": team["playedGames"],
            "won": team["won"],
            "draw": team["draw"],
            "lost": team["lost"],
            "goalsFor": team["goalsFor"],
            "goalsAgainst": team["goalsAgainst"],
            "goalDifference": team["goalDifference"]
        }
        for team in table
    ]

    return {"standings": standings}
