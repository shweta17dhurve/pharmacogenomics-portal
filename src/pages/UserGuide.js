import React from "react";

function UserGuide() {
  return (
    <div style={{
      padding: "40px",
      lineHeight: "1.8",
      maxWidth: "1000px",
      margin: "auto"
    }}>
      <h1>User Guide</h1>

      <p>
        This guide explains how to effectively use the Pharmacogenomics Portal
        to explore drug–gene interactions and analyze pharmacogenomic data.
      </p>

      {/* HOME */}
      <h2>🏠 1. Home Page</h2>
      <p>
        The Home page provides an overview of the portal, including a summary
        of the database and a search feature.
      </p>

      <ul>
        <li>View total number of drugs and genes</li>
        <li>Use the search bar to find drugs or genes</li>
        <li>Read about pharmacogenomics and portal features</li>
      </ul>

      {/* SEARCH */}
      <h2>🔍 2. Search Function</h2>
      <p>
        The search feature allows users to quickly find drugs or genes in the database.
      </p>

      <ol>
        <li>Enter a drug name (e.g., Warfarin) or gene name (e.g., CYP2C9)</li>
        <li>Click the <b>Search</b> button</li>
        <li>Matching results will be displayed below</li>
      </ol>

      <p>
        If no results are found, the system will display a “No drug found” message.
      </p>

      {/* DRUG DASHBOARD */}
      <h2>💊 3. Drug Dashboard</h2>
      <p>
        The Drug Dashboard displays all pharmacogenomic drugs and allows
        filtering and exploration.
      </p>

      <ul>
        <li>View all drugs in the dataset</li>
        <li>Use search to filter drugs by name</li>
        <li>Apply filters:
          <ul>
            <li>By Gene</li>
            <li>By Drug Class</li>
            <li>By Clinical Significance</li>
          </ul>
        </li>
        <li>Observe color-coded clinical significance badges</li>
      </ul>

      {/* DRUG DETAIL */}
      <h2>📄 4. Drug Detail Page</h2>
      <p>
        Clicking on a drug name opens the detailed drug profile page.
      </p>

      <ul>
        <li>View gene association</li>
        <li>Understand disease relevance</li>
        <li>Read mechanism of action</li>
        <li>Check drug response information</li>
        <li>Access external research links (PubMed, NCBI, DrugBank)</li>
      </ul>

      {/* GENES */}
      <h2>🧬 5. Genes Page</h2>
      <p>
        The Genes page lists all genes present in the dataset.
      </p>

      <ul>
        <li>View all unique genes</li>
        <li>Understand gene–drug relationships</li>
      </ul>

      {/* CALCULATOR */}
      <h2>🧮 6. Dose Calculator</h2>
      <p>
        The dose calculator provides an estimate based on user input.
      </p>

      <ol>
        <li>Enter patient details (e.g., weight, age)</li>
        <li>View calculated dosage recommendation</li>
      </ol>

      {/* CLINICAL COLORS */}
      <h2>🎨 7. Clinical Significance Colors</h2>
      <p>
        Clinical significance is displayed using color-coded labels:
      </p>

      <ul>
        <li style={{ color: "red" }}>Pathogenic → High risk</li>
        <li style={{ color: "orange" }}>Likely Pathogenic → Moderate risk</li>
        <li style={{ color: "gold" }}>Uncertain → Unknown effect</li>
        <li style={{ color: "lightgreen" }}>Likely Benign → Low risk</li>
        <li style={{ color: "green" }}>Benign → Minimal risk</li>
        <li style={{ color: "gray" }}>Non-pathogenic → No effect</li>
      </ul>

      {/* TIPS */}
      <h2>💡 8. Tips for Best Use</h2>
      <ul>
        <li>Use search and filters together for accurate results</li>
        <li>Explore drug detail pages for complete information</li>
        <li>Check clinical significance before interpreting results</li>
      </ul>

      {/* DISCLAIMER */}
      <h2>⚠️ Disclaimer</h2>
      <p>
        This portal is intended for educational and research purposes only.
        It should not be used for direct clinical decision-making without
        professional medical consultation.
      </p>

    </div>
  );
}

export default UserGuide;