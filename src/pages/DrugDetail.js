import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

function DrugDetail() {
  const { name } = useParams();

  const [drug, setDrug] = useState(null);

  // Calculator states
  const [genotype, setGenotype] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [dose, setDose] = useState("");

  useEffect(() => {
    fetch("/data/drugs.csv")
      .then(res => res.text())
      .then(text => {
        const data = Papa.parse(text, { header: true }).data;
        const found = data.find(d => d.drug === name);
        setDrug(found);
      });
  }, [name]);

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

  if (!drug) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={page}>

      <h1 style={title}>{drug.drug} Pharmacogenomic Profile</h1>

      <div style={container}>

        {/* LEFT SIDE */}
        <div style={leftCard}>

          <Section title="Drug Information">
            <Row label="Drug Name" value={drug.drug} />
            <Row label="Drug Class" value={drug.class} />
            <Row label="Associated Disease" value={drug.disease} />
          </Section>

          <Section title="Description">
            <p>
              {drug.drug} is a {drug.class} used in treating {drug.disease}.
              It plays a key role in personalized medicine.
            </p>
          </Section>

          <Section title="Gene Information">
            <Row label="Target Gene" value={drug.gene} />
            <Row label="Gene Full Name" value={drug.gene_full_name} />
          </Section>

          <Section title="Pharmacogenomic Significance">
            <p>
              Variations in {drug.gene} influence metabolism and response of {drug.drug},
              affecting drug safety and efficacy.
            </p>
          </Section>

          <Section title="Clinical Significance">
            <span style={badge}>{drug.clinical_significance}</span>
          </Section>

          <Section title="Drug Response">
            <p>{drug.response}</p>
          </Section>

          <Section title="Mechanism of Action">
            <p>{drug.mechanism}</p>
          </Section>

          <Section title="Related Pharmacogenomic Genes">
            <p>{drug.gene}</p>
          </Section>

          <Section title="Scientific Reference">
            <p>{drug.reference_paper}</p>
          </Section>

          {/* 🧮 CALCULATOR */}
          <Section title="Dose Recommendation Calculator">

            <p style={{ marginBottom: "15px", color: "#555" }}>
              This calculator simulates dose adjustment guidance based on metabolizer status and basic patient factors.
            </p>

            {/* INPUT ROW */}
            <div style={calcGrid}>

              <div>
                <label style={label}>Metabolizer Genotype</label>
                <select value={genotype} onChange={(e) => setGenotype(e.target.value)} style={input}>
                  <option value="">Select genotype</option>
                  <option value="Poor">Poor metabolizer</option>
                  <option value="Intermediate">Intermediate metabolizer</option>
                  <option value="Normal">Normal metabolizer</option>
                  <option value="Ultra">Ultra-rapid metabolizer</option>
                </select>
              </div>

              <div>
                <label style={label}>Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={input} />
              </div>

              <div>
                <label style={label}>Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={input} />
              </div>

            </div>

            <button style={calcBtnLarge} onClick={calculateDose}>
              Calculate Dose
            </button>

            {dose && (
              <div style={resultBox}>
                <b>{dose}</b>
              </div>
            )}

          </Section>

        </div>

        {/* RIGHT SIDE */}
        <div style={right}>

          <div style={card}>
            <h3 style={cardTitle}>Molecular Structure</h3>
            <div style={imageBox}>
              <img
                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${drug.drug}/PNG`}
                alt="structure"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div style={card}>
            <h3 style={cardTitle}>External Links</h3>

            <p>🔗 <a href={`https://pubmed.ncbi.nlm.nih.gov/?term=${drug.drug}`} target="_blank" rel="noreferrer">PubMed</a></p>
            <p>🔗 <a href={`https://www.ncbi.nlm.nih.gov/gene/?term=${drug.gene}`} target="_blank" rel="noreferrer">NCBI Gene</a></p>
            <p>🔗 <a href={`https://go.drugbank.com/unearth/q?query=${drug.drug}`} target="_blank" rel="noreferrer">DrugBank</a></p>

          </div>

        </div>

      </div>
    </div>
  );
}

/* COMPONENTS */
const Section = ({ title, children }) => (
  <div style={section}>
    <h3 style={sectionTitle}>{title}</h3>
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
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const right = { flex: 1 };

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const section = { marginBottom: "20px" };

const sectionTitle = {
  borderBottom: "1px solid #ddd",
  marginBottom: "10px"
};

const badge = {
  background: "#f8d7da",
  padding: "5px 10px",
  borderRadius: "20px"
};

const calcGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "20px",
  marginBottom: "15px"
};

const label = {
  display: "block",
  marginBottom: "5px"
};

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const calcBtnLarge = {
  background: "#2563eb",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const resultBox = {
  marginTop: "15px",
  background: "#e6f4ea",
  padding: "10px",
  borderRadius: "6px"
};

const imageBox = {
  background: "#f5f5f5",
  padding: "10px",
  borderRadius: "8px"
};

const cardTitle = {
  fontWeight: "bold",
  marginBottom: "10px"
};

export default DrugDetail;