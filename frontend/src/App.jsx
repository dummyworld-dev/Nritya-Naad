import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import FeaturePage from "./pages/FeaturePage";
import Academies from "./pages/Academies";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/feature/:id" element={<FeaturePage />} />
        <Route path="/academies" element={<Academies />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}