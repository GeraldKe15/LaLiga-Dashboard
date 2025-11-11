# La Liga Dashboard

An interactive full-stack web application that visualizes real-time data from Spain’s top football league, La Liga.  
Built with FastAPI, React, and TailwindCSS. Deployed with Render and Vercel. 

---

## Features
- View live standings, matches, player stats, and full season schedule
- Explore team rosters, including players, positions, and nationalities
- Dynamic home page showing current matchday, top clubs, and top scorers
- Backend API integration with [Football-Data.org](https://www.football-data.org/)
- UI built with React + TailwindCSS

---

## Tech Stack
**Frontend:** React, Vite, TailwindCSS  
**Backend:** FastAPI, Python  
**Database/Data Source:** Football-Data.org API  
**Deployment:** Render - Backend hosting (FastAPI service), Vercel - Frontend hosting (React app)

---

## Deployment

This project is deployed using:

Frontend (Vercel): https://la-liga-dashboard.vercel.app

Backend (Render): https://laliga-dashboard-backend.onrender.com/laliga

Both services are automatically updated with the latest code whenever new commits are pushed to GitHub.

Note that you may need to open the backend link and let it load first, since it can timeout. 

---

## Local Setup

### 1. Setup
  - ##### Clone the repository:
    `git clone https://github.com/GeraldKe15/LaLiga-Dashboard.git`

    `cd LaLiga-Dashboard/backend`

  - #### Create a virtual environment:
    `python3 -m venv venv`

    `source venv/bin/activate`   (on Mac/Linux)

  - #### Install dependencies:
    `pip install -r requirements.txt`

### 2. Run the backend
While in LaLiga-Dashboard/backend, run the API:

`uvicorn main:app --reload`

The backend runs at: http://127.0.0.1:8000/laliga

### 3. Run the frontend
`cd ../frontend`

  - #### Install dependencies:
    `npm install`

  - #### Start the app:
    `npm run dev`

The frontend runs at: http://localhost:5173
