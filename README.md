# GrowEasy AI Importer

AI-powered CSV importer that automatically maps uploaded customer data into a CRM-friendly format using Google Gemini AI.

## Features

- Upload CSV files
- Parse CSV data automatically
- Preview uploaded CSV records
- AI-powered semantic column mapping
- Confidence score for AI-generated mappings
- Review AI-transformed data before import
- Simple responsive user interface

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- CSS

## Backend

- Node.js
- Express.js
- TypeScript
- Multer
- PapaParse

## AI

- Google Gemini API

---

# Architecture

```
React Frontend
      |
      | CSV Upload
      ↓
Express Backend API
      |
      | CSV Parsing
      ↓
PapaParse
      |
      | Semantic Mapping Request
      ↓
Google Gemini AI
      |
      ↓
CRM Formatted Data
```

---

# Project Structure

```
groweasy-ai-importer/

├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── gemini.ts
│   │   ├── crm.schema.ts
│   │   └── routes/
│   │       └── upload.routes.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# Setup Instructions

## Backend Setup

Open terminal inside the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a file named:

```
.env
```

inside the backend folder.

Add:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Start backend server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal.

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# How To Use

1. Open the frontend application.
2. Click "Choose File".
3. Select a CSV file.
4. Click "Upload CSV".
5. Review uploaded CSV preview.
6. Review AI mapping results.
7. Click "Confirm Import".

---

# API Documentation

## Upload CSV

### Endpoint

```
POST /api/upload
```

### Input

CSV file using multipart/form-data.

### Response

Returns:

- filename
- CSV headers
- row count
- preview records
- AI mapped records
- confidence score

Example:

```json
{
  "filename": "customers.csv",
  "rowCount": 3,
  "aiMapping": [
    {
      "mapping": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210",
        "company": "Google"
      },
      "confidence": "high"
    }
  ]
}
```

---

# AI Mapping Logic

The system uses Gemini AI to understand column meaning instead of only matching exact names.

Examples:

```
full_name → name

customer_name → name

email_id → email

mobile_number → phone

organization → company
```

The AI:

- Preserves original values
- Avoids hallucinated data
- Returns structured JSON
- Provides confidence level

---

# Future Improvements

- Database integration
- Authentication
- Import history
- Advanced validation
- Background processing