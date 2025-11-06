import { useState, useEffect } from "react";
import { getTopScorers } from "../api";

export default function TopScorers() {
  const [scorers, setScorers] = useState([]);       // start with an empty array
  const [currSeason, setSeason] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopScorers()
      .then(res => {
        if (res.data && Array.isArray(res.data.topScorers)) {
          setScorers(res.data.topScorers);
          setSeason(res.data.season);
        } else {
          setError("No data received");
        }
      })
      .catch(err => {
        console.error("Error fetching top scorers:", err);
        setError("Failed to fetch data");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Top Scorers</h1>
      <h1 className="text-md font-semibold mb-4">{currSeason} Season</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Player</th>
            <th className="p-2 text-left">Team</th>
            <th className="p-2 text-left">Goals</th>
            <th className="p-2 text-left">Assists</th>
          </tr>
        </thead>
        <tbody>
          {scorers.map((s) => (
            <tr key={s.rank} className="border-t">
              <td className="p-2">{s.rank}</td>
              <td className="p-2">{s.player}</td>
              <td className="p-2">{s.team}</td>
              <td className="p-2">{s.goals}</td>
              <td className="p-2">{s.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
