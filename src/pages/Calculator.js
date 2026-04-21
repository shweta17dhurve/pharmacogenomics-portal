import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function Calculator() {
  const [drugs, setDrugs] = useState([]);

  const [drug, setDrug] = useState("");
  const [genotype, setGenotype] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");

  const [result, setResult] = useState("");

  // LOAD DRUG DATA
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data;
        setDrugs(data.filter(d => d.drug));
      });
  }, []);

  // 🧮 IMPROVED DOSE LOGIC
  const calculateDose = () => {
    if (!drug || !genotype || !age || !weight) {
      setResult("Please fill all required fields");
      return;
    }

    let output = "";

    if (drug === "Warfarin") {
      let dose = weight * 0.1;

      if (genotype === "Poor") {
        dose *= 0.6;
        output = "Reduced dose required due to poor metabolism.";
      } 
      else if (genotype === "Intermediate") {
        dose *= 0.8;
        output = "Moderate dose adjustment recommended.";
      } 
      else if (genotype === "Ultra") {
        dose *= 1.2;
        output = "Higher dose may be required.";
      } 
      else {
        output = "Standard dose recommended.";
      }

      if (age > 60) {
        dose *= 0.8;
        output += " Age factor applied (elderly patient).";
      }

      setResult(`${output} Final Dose: ${dose.toFixed(2)} mg/day`);
    }

    else if (drug === "Clopidogrel") {
      if (genotype === "Poor") {
        setResult("Avoid Clopidogrel. Consider alternative such as Ticagrelor.");
      } else {
        setResult("Standard dosing recommended.");
      }
    }

    else {
      setResult("No specific pharmacogenomic guideline available.");
    }
  };

  const reset = () => {
    setDrug("");
    setGenotype("");
    setAge("");
    setWeight("");
    setResult("");
  };

  return (
    <div style={{ padding: "30px", background: "#eef2f6" }}>

      {/* HEADER */}
      <h1 style={{ color: "#2f5d83" }}>
        Pharmacogenomic Dose Calculator
      </h1>

      <p style={{ color: "#555" }}>
        Enter patient-specific genetic and clinical information to receive
        personalized dosing recommendations.
      </p>

      {/* CARD */}
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: "600px"
      }}>

        {/* DRUG */}
        <label>Drug</label>
        <select value={drug} onChange={(e) => setDrug(e.target.value)} style={input}>
          <option value="">Select Drug</option>
          {[...new Set(drugs.map(d => d.drug))].map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>

        {/* GENOTYPE */}
        <label>Metabolizer Genotype</label>
        <select value={genotype} onChange={(e) => setGenotype(e.target.value)} style={input}>
          <option value="">Select genotype</option>
          <option value="Poor">Poor metabolizer</option>
          <option value="Intermediate">Intermediate metabolizer</option>
          <option value="Normal">Normal metabolizer</option>
          <option value="Ultra">Ultra-rapid metabolizer</option>
        </select>

        {/* AGE */}
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={input}
        />

        {/* WEIGHT */}
        <label>Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={input}
        />

        {/* BUTTONS */}
        <div style={{ marginTop: "15px" }}>
          <button onClick={calculateDose} style={btn}>
            Calculate Dose
          </button>

          <button onClick={reset} style={resetBtn}>
            Reset
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div style={{
            marginTop: "20px",
            background: "#f1f5f9",
            padding: "15px",
            borderRadius: "8px"
          }}>
            <h4>Clinical Interpretation</h4>
            <p>{result}</p>

            <p style={{ fontSize: "12px", color: "#555" }}>
              Based on pharmacogenomic principles (e.g., CPIC guidelines),
              genetic variations influence drug metabolism and response.
            </p>
          </div>
        )}

        {/* DISCLAIMER */}
        <p style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "red"
        }}>
          Disclaimer: This tool is for educational purposes only and should not
          replace clinical judgment.
        </p>

      </div>
    </div>
  );
}

/* STYLES */

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
  marginRight: "10px",
  cursor: "pointer"
};

const resetBtn = {
  padding: "10px 20px",
  background: "#ccc",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Calculator;