import React from "react";

function About() {
  return (
    <div style={{
      padding: "40px",
      lineHeight: "1.8",
      maxWidth: "1000px",
      margin: "auto"
    }}>
      <h1>About Pharmacogenomics Portal</h1>

      {/* WHAT IS PHARMACOGENOMICS */}
      <h2>🧬 What is Pharmacogenomic Data?</h2>
      <p>
        Pharmacogenomic data refers to information that describes how an
        individual's genetic makeup influences their response to drugs.
        It includes gene variants, drug metabolism pathways, and genetic
        markers that affect drug efficacy and safety.
      </p>

      <p>
        Genes such as <b>CYP2C9</b>, <b>CYP2C19</b>, and <b>VKORC1</b> play a
        critical role in drug metabolism, especially in cardiovascular
        treatments. Variations in these genes can lead to differences in drug
        response, toxicity, or therapeutic effectiveness.
      </p>

      {/* ABOUT WEBSITE */}
      <h2>🌐 About This Web Portal</h2>
      <p>
        This Pharmacogenomics Portal is a web-based platform designed to
        provide structured access to drug–gene interaction data. It enables
        users to explore pharmacogenomic relationships through a clean,
        interactive interface.
      </p>

      <p>
        The system integrates multiple data attributes such as drug name,
        associated gene, clinical significance, mechanism of action, and
        response patterns. It also provides search and filtering capabilities
        to simplify data exploration.
      </p>

      <ul>
        <li>💊 Drug–gene interaction database</li>
        <li>🧬 Gene-based filtering and analysis</li>
        <li>📊 Clinical significance classification</li>
        <li>📄 Detailed pharmacogenomic profiles</li>
        <li>🔍 Advanced search functionality</li>
      </ul>

      {/* IMPORTANCE */}
      <h2>📊 Importance of Pharmacogenomics</h2>
      <p>
        Pharmacogenomics is a key component of personalized medicine. It helps
        in predicting how patients will respond to specific drugs, thereby
        reducing adverse drug reactions and improving treatment outcomes.
      </p>

      <p>
        In cardiovascular diseases, pharmacogenomics plays a significant role
        in optimizing therapies such as anticoagulants and antiplatelet drugs.
        It ensures safer and more effective treatment by considering genetic
        variability.
      </p>

      <ul>
        <li>✔ Reduces adverse drug reactions</li>
        <li>✔ Improves drug efficacy</li>
        <li>✔ Enables personalized treatment</li>
        <li>✔ Supports clinical decision-making</li>
      </ul>

      {/* CONCLUSION */}
      <h2>📌 Conclusion</h2>
      <p>
        This portal demonstrates how pharmacogenomic data can be integrated
        into a web-based system to support research and education. It provides
        a user-friendly interface for analyzing drug–gene interactions and
        understanding their clinical significance.
      </p>

      <p>
        By combining bioinformatics with modern web technologies, the system
        highlights the practical application of personalized medicine in
        healthcare.
      </p>

      {/* FUTURE SCOPE */}
      <h2>🚀 Future Scope</h2>
      <p>
        The portal can be further enhanced by integrating real-time APIs,
        machine learning models, and clinical datasets to provide predictive
        insights.
      </p>

      <ul>
        <li>🔗 Integration with NCBI, PharmGKB APIs</li>
        <li>🤖 AI-based drug response prediction</li>
        <li>📊 Advanced data visualization (graphs & charts)</li>
        <li>📱 Mobile-friendly responsive design</li>
        <li>🏥 Clinical decision support system integration</li>
      </ul>

      <p>
        These improvements will make the platform more powerful and closer to
        real-world clinical applications.
      </p>

    </div>
  );
}

export default About;