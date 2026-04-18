import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Drugs from "./pages/Drugs";
import Genes from "./pages/Genes";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import UserGuide from "./pages/UserGuide";
import DrugDetail from "./pages/DrugDetail";

function App() {
  return (
    <Router>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Dashboard / Drugs */}
        <Route path="/drugs" element={<Drugs />} />

        {/* Genes */}
        <Route path="/genes" element={<Genes />} />

        {/* Calculator */}
        <Route path="/calculator" element={<Calculator />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* User Guide */}
        <Route path="/guide" element={<UserGuide />} />

        {/* Drug Detail Page */}
        <Route path="/drug/:name" element={<DrugDetail />} />

      </Routes>
    </Router>
  );
}

export default App;