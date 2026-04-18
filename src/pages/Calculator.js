import React, { useState } from "react";

function Calculator() {
  const [drug, setDrug] = useState("");
  const [genotype, setGenotype] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");

  const calculateDose = () => {
    if (!drug || !genotype || !age || !weight) {
      alert("Please fill all fields");
      return;
    }

    let recommendation = "";

    // 💊 DRUG-SPECIFIC LOGIC

    if (drug === "Warfarin") {
      let dose = weight * 0.1;

      if (genotype === "Poor") dose *= 0.6;
      else if (genotype === "Intermediate") dose *= 0.8;
      else if (genotype === "Ultra") dose *= 1.2;

      if (age > 60) dose *= 0.8;

      recommendation = `Recommended Warfarin dose: ${dose.toFixed(2)} mg/day (based on CYP2C9/VKORC1 metabolism).`;
    }

    else if (drug === "Clopidogrel") {
      if (genotype === "Poor") {
        recommendation = "Poor metabolizer: Reduced activation. Consider alternative drug (e.g., Ticagrelor).";
      } else if (genotype === "Intermediate") {
        recommendation = "Intermediate metabolizer: Reduced response. Monitor efficacy or adjust therapy.";
      } else {
        recommendation = "Normal/Ultra metabolizer: Standard Clopidogrel dose recommended.";
      }
    }

    else if (drug === "Atorvastatin") {
      let dose = weight * 0.2;

      if (genotype === "Poor") {
        recommendation = `High risk of statin toxicity. Consider lower dose (~${(dose * 0.5).toFixed(2)} mg).`;
      } else {
        recommendation = `Recommended dose: ${dose.toFixed(2)} mg with monitoring for muscle toxicity.`;
      }
    }

    setResult(recommendation);
  };

  const reset = () => {
    setDrug("");
    setGenotype("");
    setAge("");
    setWeight("");
    setResult("");
  };

  return (
    <div style={{ padding: "40px", background: "#f5f7fa" }}>

      <h1>🧮 Dose Recommendation Calculator</h1>
      <p>
        This calculator simulates pharmacogenomic dose adjustments using gene–drug interactions.
      </p>

      {/* FORM */}
      <div style={card}>
        <div style={grid}>

          {/* DRUG */}
          <div>
            <label>Select Drug</label>
            <select value={drug} onChange={(e) => setDrug(e.target.value)} style={input}>
              <option value="">Select Drug</option>
              <option value="Warfarin">Warfarin</option>
              <option value="Clopidogrel">Clopidogrel</option>
              <option value="Atorvastatin">Atorvastatin</option>
            </select>
          </div>

          {/* GENOTYPE */}
          <div>
            <label>Metabolizer Status</label>
            <select value={genotype} onChange={(e) => setGenotype(e.target.value)} style={input}>
              <option value="">Select</option>
              <option value="Poor">Poor</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Normal">Normal</option>
              <option value="Ultra">Ultra-rapid</option>
            </select>
          </div>

          {/* AGE */}
          <div>
            <label>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={input} />
          </div>

          {/* WEIGHT */}
          <div>
            <label>Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={input} />
          </div>

        </div>

        {/* BUTTONS */}
        <div style={{ marginTop: "20px" }}>
          <button style={primaryBtn} onClick={calculateDose}>
            Calculate Dose
          </button>

          <button style={secondaryBtn} onClick={reset}>
            Reset
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div style={resultBox}>
            <h3>Recommendation</h3>
            <p>{result}</p>
          </div>
        )}
      </div>

      {/* INFO */}
      <div style={card}>
        <h2>Clinical Interpretation</h2>
        <p><b>Poor Metabolizers:</b> Increased drug levels → higher toxicity risk</p>
        <p><b>Intermediate:</b> Moderate metabolism → dose adjustment needed</p>
        <p><b>Normal:</b> Standard response</p>
        <p><b>Ultra-rapid:</b> Faster metabolism → reduced efficacy</p>
      </div>

    </div>
  );
}

/* STYLES */

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "5px"
};

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  marginRight: "10px",
  cursor: "pointer"
};

const secondaryBtn = {
  background: "#ccc",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const resultBox = {
  marginTop: "20px",
  padding: "15px",
  background: "#e6f4ea",
  borderRadius: "8px"
};

export default Calculator;