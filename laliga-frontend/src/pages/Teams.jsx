import { useState, useEffect } from "react";
import { getTeams } from "../api";

export default function Teams(){
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getTeams().then(res => {
            if (res.data && Array.isArray(res.data.teams)){
                setTeams(res.data.teams);
            } else {
                setError("No data received");
            }
        }).catch(err => {
            console.error("Error fetching teams:", err);
            setError("Failed to fetch data");
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-4">Loading Teams...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">La Liga Teams</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-4 border rounded-lg shadow-sm hover:shadow-md tansition"
                        >
                            <img
                                src={team.crest}
                                alt={team.name}
                                className="w-16 h-16 object-contain mb-3"
                                onError={(e) => (e.target.style.display = "none")}
                            />
                            <h2 className="font-semibold text-center">{team.name}</h2>
                            <p className="text-sm text-gray-500 text-center">{team.venue}</p>
                            <p className="text-xs text-gray-400">Founded: {team.founded}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}