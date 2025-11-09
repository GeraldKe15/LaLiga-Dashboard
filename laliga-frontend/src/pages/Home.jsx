import { useState, useEffect } from "react";
import { getStandings, getTopScorers, getMatches } from "../api";

export default function Home() {
    const [topTeams, setTopTeams] = useState([]);
    const [topScorers, setTopScorers] = useState([]);
    const [currentMatchday, setCurrentMatchday] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const standingsRes = await getStandings();
                const scorersRes = await getTopScorers();
                const matchesRes = await getMatches();

                if (standingsRes.data?.standings) {
                    setTopTeams(standingsRes.data.standings.slice(0, 3));
                }

                if (scorersRes.data?.topScorers) {
                    setTopScorers(scorersRes.data.topScorers.slice(0, 3));
                }

                if (matchesRes.data?.currentMatchday) {
                    setCurrentMatchday(matchesRes.data.currentMatchday);
                }
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setLoading(false);
            }
        } 
        fetchData();
    }, []);

    if (loading) return <p className="p-6">Loading dashboard...</p>;

    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">La Liga Dashboard</h1>
            <p className="text-gray-600 mb-8">
                Insight into stats, standings, and player data from Spain's top football league.
            </p>

            {currentMatchday && (
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">
                Current Matchday: <span className="text-blue-600">{currentMatchday}</span>
                </h2>
            </div>
            )}

            {/* Top Teams Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Top 3 Teams</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {topTeams.map((team, idx) => (
                        <div key={idx}
                            className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition">
                            <h3 className="font-bold text-lg">{team.team}</h3>
                            <p className="text-gray-600">Points: {team.points}</p>
                            <p className="text-gray-500 text-sm">
                                W: {team.won} | D: {team.draw} | L: {team.lost}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Top Scorers Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Top Scorers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {topScorers.map((scorer, idx) => (
                        <div key={idx}
                            className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition">
                            <h3 className="font-bold text-lg">{scorer.player}</h3>
                            <p className="text-gray-600">{scorer.team}</p>
                            <p className="text-gray-500">Goals: {scorer.goals}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
