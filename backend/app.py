from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pickle

app = Flask(__name__)
CORS(app)

# --- Load and prepare the dataset ---
df = pd.read_csv(r"C:\Users\houss\Downloads\Prostate_Cancer.csv")
df["diagnosis_result"] = df["diagnosis_result"].map({"M": 1, "B": 0})

X = df.drop(columns=["id", "diagnosis_result"])
y = df["diagnosis_result"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Modèle
model = LogisticRegression()
model.fit(X_train, y_train)

# Évaluation
y_pred = model.predict(X_test)
metrics = {
    "Accuracy": round(accuracy_score(y_test, y_pred), 3),
    "Precision": round(precision_score(y_test, y_pred), 3),
    "Recall": round(recall_score(y_test, y_pred), 3),
    "F1-Score": round(f1_score(y_test, y_pred), 3)
}

# Save the model
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(scaler, open("scaler.pkl", "wb"))

@app.route("/metrics", methods=["GET"])
def get_metrics():
    """Retourne les métriques du modèle."""
    return jsonify(metrics)

@app.route("/predict", methods=["POST"])
def predict():
    """Fait la prédiction à partir des données reçues du frontend."""
    data = request.get_json()
    features = np.array([list(data.values())])
    scaler = pickle.load(open("scaler.pkl", "rb"))
    model = pickle.load(open("model.pkl", "rb"))
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)[0]
    result = "Malignant (M)" if prediction == 1 else "Benign (B)"
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)









