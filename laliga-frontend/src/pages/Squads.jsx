import { useState, useEffect } from "react";
import { getSquads } from "../api";

export default function Squads() {
    const [squads, setSquads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedTeam, setExpandedTeam] = useState(null);

    useEffect(() => {
        getSquads().then((res) => {
            if (res.data && Array.isArray(res.data.squads)){
                setSquads(res.data.squads);
            } else {
                setError("No data received");
            }
        }).catch((err) => {
            console.error("Error fetching squads:", err);
            setError("Failed to fetch squads");
        }).finally(() => setLoading(false));
    }, []);

    const toggleTeam = (teamName) => {
        setExpandedTeam((prev) => (prev === teamName ? null : teamName));
    }

    if (loading) return <p className="p-4">Loading Squads ...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-1 text-center">La Liga Squads</h1>
            <h1 className="text-sm font-semibold mb-5 text-center">Click on teams to view squads.</h1>

            {squads.map((team, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                    <div className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleTeam(team.team)}>
                        <div className="flex items-center space-x-3">
                            {team.crest && (
                                <img 
                                    src={team.crest}
                                    alt={`${team.team} crest`}
                                    className="w-8 h-8"
                                />
                            )}
                            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                                {team.team}
                            </h2>
                        </div>
                        <span className="text-sm text-gray-500">
                            {expandedTeam === team.team ? "Hide" : "Show"}
                        </span>
                    </div>

                    {expandedTeam === team.team && (
                        <div className="mt-3">
                            <p className="text-gray-600 mb-2">
                                Coach: <span className="font-medium">{team.coach || "N/A"}</span> - Squad Size:{" "}
                                {team.squadSize}
                            </p>

                            <table className="w-full border border-gray-300 border-collapse text-sm">
                                <thead className="bg-gray-100">
                                    <th className="p-2 text-left border-b border-gray-300">Name</th>
                                    <th className="p-2 text-left border-b border-gray-300">Position</th>
                                    <th className="p-2 text-left border-b border-gray-300">Nationality</th>
                                </thead>
                                <tbody>
                                    {team.players.map((player, i) => (
                                        <tr key={i} className="hover:bg-gray-50 border-t">
                                            <td className="p-2">{player.name}</td>
                                            <td className="p-2">{player.position}</td>
                                            <td className="p-2">{player.nationality}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}