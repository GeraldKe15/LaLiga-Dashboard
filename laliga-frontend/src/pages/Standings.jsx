import { useState, useEffect } from "react";
import { getStandings } from "../api";

export default function Standings() {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getStandings().then(res => {
            if (res.data && Array.isArray(res.data.standings)){
                setStandings(res.data.standings);
            } else {
                setError("No data received");
            }
        }).catch(err => {
            console.error("Error fetching standings:", err);
            setError("Failed to fetch data");
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-4">Loading Standings...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">La Liga Standings</h1>
            <table className="w-full border border-gray-300 border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 text-left border-b border-gray-300">#</th>
                        <th className="p-2 text-left border-b border-gray-300">Team</th>
                        <th className="p-2 text-left border-b border-gray-300">Played</th>
                        <th className="p-2 text-left border-b border-gray-300">Won</th>
                        <th className="p-2 text-left border-b border-gray-300">Drawn</th>
                        <th className="p-2 text-left border-b border-gray-300">Lost</th>
                        <th className="p-2 text-left border-b border-gray-300">GD</th>
                        <th className="p-2 text-left border-b border-gray-300">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="p-2">{team.position}</td>
                            <td className="p-2">{team.team}</td>
                            <td className="p-2">{team.playedGames}</td>
                            <td className="p-2">{team.won}</td>
                            <td className="p-2">{team.draw}</td>
                            <td className="p-2">{team.lost}</td>
                            <td className="p-2">{team.goalDifference}</td>
                            <td className="p-2 font-semibold">{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}