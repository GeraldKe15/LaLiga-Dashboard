import { useState, useEffect } from "react";
import { getSeasonSchedule } from "../api";

export default function SeasonSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedMatchday, setExpandedMatchday] = useState(null);

    useEffect(() => {
        getSeasonSchedule().then(res => {
            if (res.data && Array.isArray(res.data.matches)){
                setSchedule(res.data.matches);
            } else {
                setError("No data received");
            }
        }).catch(err => {
            console.error("Error fetching schedule:", err);
            setError("Failed to fetch data");
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-4 text-center">Loading Season Schedule...</p>
    if (error) return <p className="p-4 text-center text-red-600">{error}</p>
    
    // grouping matches by matchday
    const matchdays = schedule.reduce((acc, match) => {
        const day = match.matchday || "Unknown";
        if (!acc[day]) acc[day] = [];
        acc[day].push(match);
        return acc;
    }, {})

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
                La Liga 2025/26 Season Schedule
            </h1>
            <div className="space-y-4">
                {Object.keys(matchdays).sort((a, b) => a - b).map((day) => (
                    <div key={day} className="border rounded-lg shadow-sm">
                        <button onClick={() => 
                            setExpandedMatchday(expandedMatchday === day ? null : day)
                        }
                        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <span className="font-semibold">Matchday {day}</span>
                            <span className="text0gray-600 text-sm">
                                {expandedMatchday === day ? "Hide" : "Show"}
                            </span>
                        </button>

                        {expandedMatchday === day && (
                            <div className="p-4 bg-white">
                                {matchdays[day].map((match, i) => (
                                    <MatchRow key={i} match={match} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function MatchRow({ match }) {
    const { homeTeam, awayTeam, utcDate, score, status } = match;

    const formattedDate = new Date(utcDate).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="flex justify-between items-center py-2 border-b last:border-0">
            <div className="text-gray-500 text-sm w-40">{formattedDate}</div>
            <div className="flex-1 text-center font-medium">
                {homeTeam} <span className="text-gray-500">vs</span> {awayTeam}
            </div>
            <div className="w-24 text-right text-blue-700 font-semibold">
                {status === "FINISHED" ? `${score.home ?? "-"} : ${score.away ?? "-"}`
                : status}
            </div>
        </div>
    );
}