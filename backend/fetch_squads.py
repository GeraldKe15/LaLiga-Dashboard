import requests 
import json 
import time
import os 
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("FOOTBALL_API_KEY")

def fetch_all_squads():
    url = "https://api.football-data.org/v4"
    headers = {"X-Auth-Token": API_KEY}

    print("Fetching La Liga teams. This will take about 3 minutes.")
    response = requests.get(f"{url}/competitions/PD/teams", headers=headers)
    if response.status_code != 200:
        print("Failed to fetch teams:", response.status_code)
        return 
    
    data = response.json().get("teams", [])
    print(f"Found {len(data)} teams.")

    all_squads = []
    for i, team in enumerate(data, 1):
        team_id = team.get("id")
        team_name = team.get("name")
        print(f"[{i}/{len(data)}] Fetching the squad for {team_name}")

        response = requests.get(f"{url}/teams/{team_id}", headers=headers)
        if response.status_code != 200:
            print(f"Failed to fetch the squad for {team_name}")
            continue 

        team_data = response.json()
        squad = team_data.get("squad", [])

        players = [
            {
                "name": player.get("name"),
                "position": player.get("position"),
                "nationality": player.get("nationality")
            }
            for player in squad
        ]

        all_squads.append(
            {
                "team": team_name,
                "shortName": team.get("shortName"),
                "crest": team.get("crest"),
                "squadSize": len(players),
                "coach": team.get("coach", {}).get("name", {}),
                "players": players
            }
        )

        # The rate limit is 10 API calls per 60 seconds, therefore I'll 
        # wait 7 seconds in between calls for each team
        time.sleep(7)

    with open("data/squads.json", "w") as f:
        json.dump(
            {
                "lastUpdated": time.strftime("%Y-%m-%d %H:%M:%S"),
                "totalTeams": len(all_squads),
                "squads": all_squads
            }, f, indent=2
        )

if __name__ == "__main__":
    fetch_all_squads()
    print("\n All squads saved to data/squads.json")