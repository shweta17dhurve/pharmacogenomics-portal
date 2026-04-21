import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function Calculator() {
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState("");
  const [genotype, setGenotype] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data;
        setDrugs(data.filter(d => d.drug));
      });
  }, []);

  const calculateDose = () => {
    if (!drug || !genotype || !age || !weight) {
      setResult("Please fill all fields");
      return;
    }

    let dose = "";

    if (drug === "Warfarin") {
      let d = weight * 0.1;

      if (genotype === "Poor") d *= 0.6;
      else if (genotype === "Intermediate") d *= 0.8;
      else if (genotype === "Ultra") d *= 1.2;

      if (age > 60) d *= 0.8;

      dose = `Recommended dose: ${d.toFixed(2)} mg/day`;
    } else if (drug === "Clopidogrel") {
      dose =
        genotype === "Poor"
          ? "Use alternative drug (Ticagrelor)"
          : "Standard dose recommended";
    } else {
      dose = "Standard dose guidance";
    }

    setResult(dose);
  };

  const reset = () => {
    setDrug("");
    setGenotype("");
    setAge("");
    setWeight("");
    setResult("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dose Recommendation Calculator</h1>

      <div style={card}>

        <label>Select Drug</label>
        <select value={drug} onChange={(e) => setDrug(e.target.value)} style={input}>
          <option value="">Select Drug</option>
          {[...new Set(drugs.map(d => d.drug))].map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        <label>Metabolizer Genotype</label>
        <select value={genotype} onChange={(e) => setGenotype(e.target.value)} style={input}>
          <option value="">Select genotype</option>
          <option value="Poor">Poor</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Normal">Normal</option>
          <option value="Ultra">Ultra</option>
        </select>

        <label>Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={input} />

        <label>Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={input} />

        <div style={{ marginTop: "15px" }}>
          <button onClick={calculateDose} style={btn}>Calculate Dose</button>
          <button onClick={reset} style={resetBtn}>Reset</button>
        </div>

        {result && <p style={{ marginTop: "15px" }}>{result}</p>}
      </div>
    </div>
  );
}

const card = {
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btn = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginRight: "10px"
};

const resetBtn = {
  padding: "10px 20px",
  background: "#ccc",
  border: "none",
  borderRadius: "5px"
};

export default Calculator;