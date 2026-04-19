import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function Genes() {
  const [genes, setGenes] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true });
        const data = parsed.data;

        // Remove empty + get unique genes
        const uniqueGenes = [
          ...new Set(
            data
              .map(d => d.gene)
              .filter(g => g && g.trim() !== "")
          )
        ];

        setGenes(uniqueGenes);
      })
      .catch(err => {
        console.error("Error loading CSV:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pharmacogenomic Genes</h1>

      {genes.length === 0 ? (
        <p>Loading genes...</p>
      ) : (
        genes.map((gene, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              borderRadius: "6px"
            }}
          >
            <h3>{gene}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Genes;