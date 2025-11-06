import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/laliga";

export const getStandings = () => axios.get(`${API_BASE}/standings`);
export const getTopScorers = () => axios.get(`${API_BASE}/top-scorers`);
export const getMatches = () => axios.get(`${API_BASE}/matches`);
export const getSquads = () => axios.get(`${API_BASE}/squads`);
export const getSeasonSchedule = () => axios.get(`${API_BASE}/seasonSchedule`);
export const getTeams = () => axios.get(`${API_BASE}/teams`);