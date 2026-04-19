import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import jsPDF from "jspdf";

function DrugDetail() {
  const { name } = useParams();

  const [drug, setDrug] = useState(null);

  // Calculator states
  const [genotype, setGenotype] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [dose, setDose] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data;
        const found = data.find(d => d.drug === name);
        setDrug(found);
      });
  }, [name]);

  // 🔬 Clinical Recommendation
  const getRecommendation = () => {
    if (!drug) return "";

    if (drug.drug === "Warfarin") {
      return "Adjust dose based on CYP2C9 and VKORC1 genotype. Monitor INR closely.";
    }

    if (drug.drug === "Clopidogrel") {
      return "Poor metabolizers should use alternative drugs like Ticagrelor.";
    }

    return "Standard pharmacogenomic guidance applies.";
  };

  // 🧮 Dose Calculator
  const calculateDose = () => {
    if (!genotype || !age || !weight) {
      setDose("Please fill all fields");
      return;
    }

    let result = "";

    if (drug.drug === "Warfarin") {
      let d = weight * 0.1;

      if (genotype === "Poor") d *= 0.6;
      else if (genotype === "Intermediate") d *= 0.8;
      else if (genotype === "Ultra") d *= 1.2;

      if (age > 60) d *= 0.8;

      result = `Recommended dose: ${d.toFixed(2)} mg/day`;
    } else if (drug.drug === "Clopidogrel") {
      if (genotype === "Poor")
        result = "Poor metabolizer: Consider alternative (Ticagrelor)";
      else
        result = "Standard dose recommended";
    } else {
      result = "Dose guidance not available for this drug";
    }

    setDose(result);
  };

  // 📄 PDF Export
  const downloadReport = () => {
    const doc = new jsPDF();

    doc.text(`Drug: ${drug.drug}`, 10, 10);
    doc.text(`Gene: ${drug.gene}`, 10, 20);
    doc.text(`Disease: ${drug.disease}`, 10, 30);
    doc.text(`Clinical Significance: ${drug.clinical_significance}`, 10, 40);
    doc.text(`Recommendation: ${getRecommendation()}`, 10, 50);

    doc.save(`${drug.drug}_report.pdf`);
  };

  if (!drug) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={page}>

      <h1 style={title}>{drug.drug} Pharmacogenomic Profile</h1>

      <div style={container}>

        {/* LEFT */}
        <div style={leftCard}>

          <Section title="Drug Information">
            <Row label="Drug Name" value={drug.drug} />
            <Row label="Drug Class" value={drug.class} />
            <Row label="Associated Disease" value={drug.disease} />
          </Section>

          <Section title="Description">
            <p>
              {drug.drug} is a {drug.class} used in treating {drug.disease}.
            </p>
          </Section>

          <Section title="Gene Information">
            <Row label="Target Gene" value={drug.gene} />
            <Row label="Gene Full Name" value={drug.gene_full_name} />
          </Section>

          <Section title="Clinical Significance">
            <span style={badge}>{drug.clinical_significance}</span>
          </Section>

          {/* 🔥 NEW FEATURE */}
          <Section title="Clinical Recommendation">
            <div style={recommendBox}>
              {getRecommendation()}
            </div>
          </Section>

          <Section title="Drug Response">
            <p>{drug.response}</p>
          </Section>

          <Section title="Mechanism">
            <p>{drug.mechanism}</p>
          </Section>

          {/* 🧮 CALCULATOR */}
          <Section title="Dose Calculator">

            <div style={calcGrid}>
              <select value={genotype} onChange={(e) => setGenotype(e.target.value)} style={input}>
                <option value="">Genotype</option>
                <option value="Poor">Poor</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Normal">Normal</option>
                <option value="Ultra">Ultra</option>
              </select>

              <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} style={input} />
              <input type="number" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} style={input} />
            </div>

            <button style={btn} onClick={calculateDose}>
              Calculate Dose
            </button>

            {dose && <p>{dose}</p>}
          </Section>

          {/* 📄 PDF */}
          <button style={btn} onClick={downloadReport}>
            Download Report
          </button>

        </div>

        {/* RIGHT */}
        <div style={right}>

          <div style={card}>
            <h3>Molecular Structure</h3>
            <img
              src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${drug.drug}/PNG`}
              alt="structure"
              style={{ width: "100%" }}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */
const Section = ({ title, children }) => (
  <div style={section}>
    <h3>{title}</h3>
    {children}
  </div>
);

const Row = ({ label, value }) => (
  <p><b>{label}:</b> {value}</p>
);

/* STYLES */
const page = { background: "#eef2f6", padding: "30px" };
const title = { marginBottom: "20px" };
const container = { display: "flex", gap: "20px" };

const leftCard = {
  flex: 2,
  background: "white",
  padding: "20px",
  borderRadius: "10px"
};

const right = { flex: 1 };

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px"
};

const section = { marginBottom: "20px" };

const badge = {
  background: "#f8d7da",
  padding: "5px 10px",
  borderRadius: "20px"
};

const recommendBox = {
  background: "#e6f4ea",
  padding: "10px",
  borderRadius: "6px"
};

const calcGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "10px"
};

const input = {
  padding: "10px",
  border: "1px solid #ccc"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

export default DrugDetail;