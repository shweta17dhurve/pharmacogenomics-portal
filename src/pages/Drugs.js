import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

// 🔥 CHART IMPORTS
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Drugs() {
  const [drugs, setDrugs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [gene, setGene] = useState("");
  const [drugClass, setDrugClass] = useState("");
  const [clinical, setClinical] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data.filter(d => d.drug);
        setDrugs(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let data = drugs;

    if (search)
      data = data.filter(d =>
        d.drug.toLowerCase().includes(search.toLowerCase()) ||
        d.gene.toLowerCase().includes(search.toLowerCase())
      );

    if (gene) data = data.filter(d => d.gene === gene);
    if (drugClass) data = data.filter(d => d.class === drugClass);
    if (clinical) data = data.filter(d => d.clinical_significance === clinical);

    setFiltered(data);
  }, [search, gene, drugClass, clinical, drugs]);

  const clearFilters = () => {
    setSearch("");
    setGene("");
    setDrugClass("");
    setClinical("");
  };

  const getBadgeStyle = (val) => {
    if (!val) return badge("#ccc", "#000");

    val = val.toLowerCase();

    if (val.includes("pathogenic")) return badge("#f8d7da", "#842029");
    if (val.includes("likely pathogenic")) return badge("#fff3cd", "#664d03");
    if (val.includes("uncertain")) return badge("#ffeeba", "#856404");
    if (val.includes("benign")) return badge("#d1e7dd", "#0f5132");

    return badge("#e2e3e5", "#41464b");
  };

  const badge = (bg, color) => ({
    background: bg,
    color: color,
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  });

  // 📊 CHART DATA
  const chartData = {
  labels: Object.keys(geneCounts),
  datasets: [
    {
      data: Object.values(geneCounts),

      backgroundColor: [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#FF9F40", "#8dd1e1", "#d0ed57",
        "#a4de6c", "#ffc658", "#ff8042", "#8884d8",
        "#82ca9d", "#ffc0cb", "#87ceeb"
      ]
    }
  ]
};

  const chartData = {
    labels: Object.keys(geneCounts),
    datasets: [
      {
        data: Object.values(geneCounts)
      }
    ]
  };

  // CSV EXPORT
  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "drug_data.csv";
    link.click();
  };

  // PDF EXPORT
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Drug Dashboard", 10, 10);

    doc.autoTable({
      head: [["Drug", "Class", "Gene", "Clinical"]],
      body: filtered.map(d => [
        d.drug,
        d.class,
        d.gene,
        d.clinical_significance
      ])
    });

    doc.save("drug_data.pdf");
  };

  return (
    <div style={{ padding: "30px", background: "#f5f7fa" }}>
      <h1>Drug Dashboard</h1>

      {/* 🔥 CHART */}
      <div style={{ width: "300px", marginBottom: "20px" }}>
        <h3>Gene Distribution</h3>
        <Pie data={chartData} />
      </div>

      {/* FILTER PANEL */}
      <div style={filterCard}>
        <div style={grid}>

          <div>
            <label>Search</label>
            <input
              placeholder="Drug or Gene name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={input}
            />
          </div>

          <div>
            <label>Gene</label>
            <select value={gene} onChange={(e) => setGene(e.target.value)} style={input}>
              <option value="">All Genes</option>
              {[...new Set(drugs.map(d => d.gene))].map(g =>
                <option key={g}>{g}</option>
              )}
            </select>
          </div>

          <div>
            <label>Drug Class</label>
            <select value={drugClass} onChange={(e) => setDrugClass(e.target.value)} style={input}>
              <option value="">All Classes</option>
              {[...new Set(drugs.map(d => d.class))].map(c =>
                <option key={c}>{c}</option>
              )}
            </select>
          </div>

          <div>
            <label>Clinical Significance</label>
            <select value={clinical} onChange={(e) => setClinical(e.target.value)} style={input}>
              <option value="">All</option>
              {[...new Set(drugs.map(d => d.clinical_significance))].map(c =>
                <option key={c}>{c}</option>
              )}
            </select>
          </div>

        </div>

        <p onClick={clearFilters} style={clearBtn}>
          Clear All Filters
        </p>
      </div>

      {/* EXPORT BUTTONS */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "10px" }}>
        <button style={exportBtn} onClick={exportCSV}>Export CSV</button>
        <button style={exportBtn} onClick={exportPDF}>Export PDF</button>
      </div>

      <p>Showing {filtered.length} of {drugs.length} drugs</p>

      {/* TABLE */}
      <table style={table}>
        <thead style={{ background: "#f1f3f5" }}>
          <tr>
            <th>S.No.</th>
            <th>Drug Name</th>
            <th>Drug Class</th>
            <th>Target Gene</th>
            <th>Clinical Significance</th>
            <th>Drug Response</th>
            <th>Data Source</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><b>{d.drug}</b></td>
              <td>{d.class}</td>
              <td>{d.gene}</td>
              <td>
                <span style={getBadgeStyle(d.clinical_significance)}>
                  {d.clinical_significance}
                </span>
              </td>
              <td>{d.response}</td>
              <td>{d.data_source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* STYLES */

const filterCard = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const clearBtn = {
  marginTop: "10px",
  color: "#2563eb",
  cursor: "pointer"
};

const exportBtn = {
  padding: "8px 15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  cursor: "pointer"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white"
};

export default Drugs;