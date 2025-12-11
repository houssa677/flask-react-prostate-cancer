import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState({});
  const [prediction, setPrediction] = useState("");
  const [metrics, setMetrics] = useState({});
// Input columns
  const columns = [
    "radius", "texture", "perimeter", "area",
    "smoothness", "compactness", "symmetry", "fractal_dimension"
  ];

  // Load model metrics on startup
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/metrics")
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Erreur metrics:", err));
  }, []);

  // Field handling
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", inputs);
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error("Erreur prédiction:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Prostate Cancer Prediction</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {columns.map((col) => (
          <div key={col} style={styles.inputGroup}>
            <label style={styles.label}>{col}</label>
            <input
              type="number"
              step="any"
              name={col}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        ))}
        <button type="submit" style={styles.button}>Predict</button>
      </form>

      {prediction && (
        <div style={{
          ...styles.result,
          backgroundColor: prediction.includes("Malignant") ? "#e74c3c" : "#2ecc71"
        }}>
          Prediction: <strong>{prediction}</strong>
        </div>
      )}

      <div style={styles.metricsContainer}>
        <h2 style={styles.subtitle}>  Model Performance</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Metric</th>
              <th style={styles.th}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(metrics).map(([key, value]) => (
              <tr key={key}>
                <td style={styles.td}>{key}</td>
                <td style={styles.td}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === 🎨 CSS styles in JS ===
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    color: "#2c3e50",
    marginBottom: "20px"
  },
  form: {
    textAlign: "left",
    marginBottom: "25px"
  },
  inputGroup: {
    marginBottom: "10px"
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "4px"
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    width: "100%",
    marginTop: "15px",
    backgroundColor: "#2ecc71",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  },
  result: {
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "20px",
    fontSize: "18px"
  },
  metricsContainer: {
    marginTop: "30px"
  },
  subtitle: {
    marginBottom: "10px",
    color: "#34495e"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    backgroundColor: "#f4f4f4",
    border: "1px solid #ccc",
    padding: "8px"
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px"
  }
};

export default App;






