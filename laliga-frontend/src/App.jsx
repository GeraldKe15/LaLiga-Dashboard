import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopScorers from "./pages/TopScorers";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/scorers" element={<TopScorers />} />
      </Routes>
    </Router>
  );
}