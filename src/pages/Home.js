import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [drugs, setDrugs] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data;
        setDrugs(data.filter(d => d.drug));
      });
  }, []);

  // 🔍 LIVE SEARCH FUNCTION
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = drugs.filter(d =>
      d.drug.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  };

  // 🔎 SEARCH BUTTON
  const handleSearch = () => {
    if (!search.trim()) return;

    const found = drugs.find(d =>
      d.drug.toLowerCase() === search.toLowerCase()
    );

    if (found) {
      navigate(`/drug/${found.drug}`);
    } else {
      setSearched(true);
    }
  };

  const geneCount = new Set(drugs.map(d => d.gene)).size;

  return (
    <div>

      {/* HEADER */}
      <div style={{
        background: "#2f5d83",
        color: "white",
        padding: "20px"
      }}>
        <h2>Pharmacogenomics Portal</h2>
        <p>Personalized medicine database for cardiovascular drugs</p>
        <h3>PGx DB</h3>
      </div>

      {/* NAVBAR */}
      <Navbar />

      <div style={{
        display: "flex",
        padding: "20px",
        background: "#eef2f6"
      }}>

        {/* LEFT */}
        <div style={{ flex: 3, marginRight: "20px" }}>

          <div style={card}>
            <h2>Home</h2>
            <p>
              This portal helps explore pharmacogenomic drug–gene interactions
              and supports personalized medicine analysis.
            </p>
          </div>

          {/* SEARCH */}
          <div style={card}>
            <h2>Search</h2>

            <div style={{ display: "flex" }}>
              <input
                placeholder="Enter drug name (e.g., warfarin)"
                value={search}
                onChange={handleChange}
                style={input}
              />

              <button onClick={handleSearch} style={btn}>
                Search
              </button>
            </div>

            {/* 🔽 LIVE SEARCH DROPDOWN */}
            {suggestions.length > 0 && (
              <div style={{
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginTop: "5px"
              }}>
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee"
                    }}
                    onClick={() => navigate(`/drug/${s.drug}`)}
                  >
                    {s.drug} ({s.gene})
                  </div>
                ))}
              </div>
            )}

            {searched && (
              <p style={{ marginTop: "10px", color: "red" }}>
                Drug not found
              </p>
            )}
          </div>

        </div>

        {/* RIGHT */}
        <div style={{ flex: 1 }}>
          <div style={card}>
            <h3>Database Summary</h3>

            <div style={summaryBox}>
              <p>Total Genes</p>
              <h3>{geneCount}</h3>
            </div>

            <div style={summaryBox}>
              <p>Total Drugs</p>
              <h3>{drugs.length}</h3>
            </div>

            <div style={summaryBox}>
              <p>Total Interactions</p>
              <h3>{drugs.length}</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* STYLES */

const card = {
  background: "white",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "8px"
};

const input = {
  flex: 1,
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const btn = {
  marginLeft: "10px",
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

const summaryBox = {
  background: "#f1f5f9",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  textAlign: "center"
};

export default Home;