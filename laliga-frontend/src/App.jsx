import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopScorers from "./pages/TopScorers";
import Standings from "./pages/Standings";
import Teams from "./pages/Teams";
import Squads from "./pages/Squads";
import Matches from "./pages/Matches";
import SeasonSchedule from "./pages/SeasonSchedule";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/scorers" element={<TopScorers />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/squads" element={<Squads />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/seasonSchedule" element={<SeasonSchedule />} />
      </Routes>
    </Router>
  );
}