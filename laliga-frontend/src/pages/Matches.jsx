import { useState, useEffect } from "react";
import { getMatches } from "../api";

export default function Matches() {
    const [matchesData, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getMatches().then(res => {
            if (res.data){
                setMatches(res.data);
            } else {
                setError("No data received");
            }
        }).catch(err => {
            console.error("Error fetching matches:", err);
            setError("Failed to fetch data");
        }).finally(() => setLoading(false));
    }, []);
    
    if (loading) return <p className="p-4">Loading Matches...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;
    if (!matchesData) return <p className="p-4">No match data available.</p>

    const {
        currentMatchday,
        currentMatches,
        upcomingMatchday,
        previousMatchday
    } = matchesData;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                La Liga Matchday {currentMatchday}
            </h1>
            <MatchSection title="Current Matchday Matches" matches={currentMatches} color="blue" />
            <MatchSection title="Upcoming Matchday Matches" matches={upcomingMatchday} color="green" />
            <MatchSection title="Previous Matchday Matches" matches={previousMatchday} color="red" />
        </div>
    );
}

/* Reusable Section Component */
function MatchSection({title, matches, color}){
    const colors = {
        blue: "text-blue-600",
        green: "text-green-600",
        red: "text-red-600"
    };

    return (
        <section className="mb-10">
            <h2 className={`text-2xl font-semibold mb-4 text-center ${colors[color]}`}>
                {title}
            </h2>
            {matches.length > 0 ?  (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {matches.map((match, index) => (
                        <MatchCard key={index} match={match} />
                    ))}
                </div>

            ): (
                <p className="text-center text-gray-500">No Matches Available</p>
            )}
        </section>
    );
}

/* Match Card Component */
function MatchCard({ match }) {
    const { homeTeam, awayTeam, utcDate, score, status} = match;

    const formattedDate = new Date(utcDate).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour : "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
            <p className="text-gray-500 text-sm mb-2">{formattedDate}</p>
            <p className="font-semibold mb-2">
                {homeTeam} <span className="text-gray-600">vs</span> {awayTeam}
            </p>

            {status === "FINISHED" ? (
                <p className="text-lg font-bold text-blue-800">
                    {score.home ?? "-"} : {score.away ?? "-"}
                </p>
            ) : (
                <p className="text-sm italic text-gray-600">Status: {status}</p>
            )}
        </div>
    );
}