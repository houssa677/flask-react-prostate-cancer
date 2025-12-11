# Flask–React Prostate Cancer

Flask–React Prostate Cancer is a web-based application for prostate cancer risk prediction and analysis.  
The backend, built with Flask, exposes a trained logistic regression model, while the React frontend provides an interactive interface for entering patient-related features and visualising the prediction results.

This repository is intended to accompany a scientific article and allow editors/reviewers to inspect and reproduce the main computational components.

---

## 1. Overview

The goal of this project is to:

- use **logistic regression** to perform **binary classification** (e.g. low-risk vs high-risk prostate cancer),
- deploy the trained model through a **Flask API**,
- connect a **React** frontend to this API to offer an intuitive web interface,
- provide a clean, reproducible codebase for reviewers and other researchers.

The application is organised in two main parts:

- `backend/` – Python / Flask API, model loading, prediction logic and dependencies  
- `frontend/` – React application (JavaScript) for the user interface

---

## 2. Project structure

```text
flask-react-prostate-cancer/
├── backend/
│   ├── app.py              # Flask application (API endpoints, model loading, prediction)
│   ├── requirements.txt    # Python dependencies for the backend
│   └── model.pkl           # Trained logistic regression model (if included)
├── frontend/
│   ├── package.json        # Frontend dependencies and scripts
│   ├── package-lock.json   # Exact dependency versions (npm)
│   ├── src/                # React components (App.js, views, styles, etc.)
│   ├── public/             # index.html and static assets
│   └── .gitignore          # Node / React ignores (node_modules, build, etc.)
└── README.md               # This file
