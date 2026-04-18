import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "#3b4a59",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "flex-end",
      gap: "20px"
    }}>
      <Link to="/" style={link}>Home</Link>
      <Link to="/drugs" style={link}>Dashboard</Link>
      <Link to="/genes" style={link}>Genes</Link>
      <Link to="/calculator" style={link}>Calculator</Link>
      <Link to="/about" style={link}>About</Link>
      <Link to="/guide" style={link}>User Guide</Link>
    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none"
};

export default Navbar;