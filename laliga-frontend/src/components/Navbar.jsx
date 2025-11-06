import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white p-4 flex gap-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/teams" className="hover:underline">Teams</Link>
            <Link to="/standings" className="hover:underline">Standings</Link>
            <Link to="/matches" className="hover:underline">Matches</Link>
            <Link to="/squads" className="hover:underline">Squads</Link>
            <Link to="/scorers" className="hover:underline">Top Scorers</Link>
            <Link to="/seasonSchedule" className="hover:underline">Season Schedule</Link>
        </nav>
    );
}
