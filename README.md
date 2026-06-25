# 🩺 MedExplain AI

> **AI-powered Medical Report & Chest X-ray Analysis Platform**

MedExplain AI is a full-stack healthcare web application that helps users understand their medical reports and chest X-rays through Artificial Intelligence. Users can upload a laboratory report (PDF), a chest X-ray image, or both to receive structured medical insights, AI-generated explanations, Grad-CAM visualizations, and personalized recommendations.

> **Disclaimer:** This application is intended for educational and research purposes only. It does **not** replace professional medical diagnosis or treatment.

---

# Features

## User Authentication

* Secure user registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Protected dashboard and API routes
* Persistent user sessions

---

## Medical Report Analysis

Upload laboratory reports in PDF format.

The system:

* Extracts text from PDFs
* Parses laboratory parameters
* Detects abnormal values
* Compares results against reference ranges
* Generates structured medical summaries

Supported laboratory reports include:

* Complete Blood Count (CBC)
* Blood Glucose Reports
* Lipid Profile
* Liver Function Test (LFT)
* Kidney Function Test (KFT)
* Thyroid Reports
* Vitamin Reports
* Other structured pathology reports

---

## Chest X-ray Analysis

Upload chest X-ray images.

The AI model:

* Classifies the image as:

  * NORMAL
  * PNEUMONIA
* Predicts confidence score
* Detects affected lung region
* Estimates severity
* Generates Grad-CAM explainability heatmaps

---

## Combined AI Analysis

When both a medical report and chest X-ray are uploaded, the application combines information from both sources to provide:

* Patient-friendly explanation
* Overall severity assessment
* Combined findings
* Personalized recommendations

If only one document is uploaded, the application still generates AI insights based on the available information.

---

## Dashboard

Each authenticated user has a personal dashboard containing:

* Previous analyses
* Prediction history
* Confidence scores
* Analysis timestamps
* Detailed result pages

---

## Heatmap Visualization

Grad-CAM heatmaps highlight the regions that influenced the AI model's decision, improving transparency and interpretability.

---

## Analysis History

Every analysis is stored securely and can be accessed later through the dashboard.

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide Icons

---

## Backend

* Next.js API Routes
* Node.js

---

## Machine Learning Service

* Python
* FastAPI
* PyTorch
* Torchvision
* Grad-CAM
* Ollama
* Phi-3

---

## Database

* PostgreSQL
* Neon Database

---

## Authentication

* JWT
* bcrypt

---

# AI Pipeline

```
Medical Report (PDF)
        │
        ▼
PDF Text Extraction
        │
        ▼
Medical Parameter Parser
        │
        ▼
Structured Medical Data
        │
        ▼
                ┌───────────────┐
Chest X-ray ───► Pneumonia Model │
                └───────────────┘
                        │
                        ▼
                 Grad-CAM Heatmap
                        │
                        ▼
          AI Medical Reasoning (Phi-3)
                        │
                        ▼
            Combined Medical Insights
                        │
                        ▼
             Stored in PostgreSQL
                        │
                        ▼
              Displayed on Dashboard
```

---

# Project Structure

```
MedExplain/
│
├── medexplain-frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── lib/
│   ├── types/
│   └── ...
│
├── ml-service/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   └── uploads/
│
└── README.md
```

---

# How It Works

## 1. User Login

Users securely authenticate using JWT-based authentication.

---

## 2. Upload Files

The application supports:

* Medical Report only
* Chest X-ray only
* Medical Report + Chest X-ray

---

## 3. AI Processing

Depending on the uploaded files:

### Report Only

* Extract report text
* Parse laboratory values
* Generate AI explanation

### X-ray Only

* Detect pneumonia
* Generate Grad-CAM heatmap
* Produce AI explanation

### Report + X-ray

* Perform both analyses
* Combine findings
* Generate unified recommendations

---

## 4. Store Results

Analysis results are securely stored in PostgreSQL and linked to the authenticated user.

---

## 5. View History

Users can revisit previous analyses anytime from the dashboard.

---

# Current Capabilities

* User authentication
* PDF report parsing
* Chest X-ray pneumonia detection
* Grad-CAM explainability
* AI-generated medical explanations
* Combined report + X-ray reasoning
* Personal analysis history
* Responsive dashboard

---

# Current Limitations

* Best suited for structured pathology/laboratory reports.
* Handwritten reports may not be parsed accurately.
* Complex discharge summaries and prescriptions are not fully supported.
* Chest X-ray model currently supports binary classification:

  * NORMAL
  * PNEUMONIA
* AI-generated insights are informational and should not be considered medical advice.

---

# Future Improvements

* Multi-disease chest X-ray detection
* OCR improvements for scanned reports
* DICOM image support
* AI-assisted extraction of all laboratory parameters
* Doctor dashboard
* Patient profile management
* PDF report generation
* Email notifications
* Cloud storage for uploaded files
* Role-based authentication
* Medical trend visualization
* Integration with electronic health records (EHR)

---

# Installation

## Clone the repository

```bash
git clone <repository-url>
cd MedExplain
```

---

## Frontend

```bash
cd medexplain-frontend

npm install

npm run dev
```

---

## ML Service

```bash
cd ml-service

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Environment Variables

### Frontend

Create a `.env.local` file:

```env
DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

NEXT_PUBLIC_ML_SERVICE_URL=http://127.0.0.1:8000
```

---

### ML Service

Create a `.env` file:

```env
BASE_URL=http://127.0.0.1:8000
```



---

# Contributors

Developed by **Raj Patkar**

---

# License

This project is developed for educational and research purposes.

Medical decisions should always be made in consultation with qualified healthcare professionals.
