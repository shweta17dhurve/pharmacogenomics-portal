import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function Genes() {
  const [genes, setGenes] = useState([]);

  useEffect(() => {
    fetch("/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data;
        const unique = [...new Set(data.map(d => d.gene))];
        setGenes(unique);
      });
  }, []);

  return (
    <div>
      <h1>Genes</h1>
      {genes.map(g => <div key={g}>{g}</div>)}
    </div>
  );
}

export default Genes;