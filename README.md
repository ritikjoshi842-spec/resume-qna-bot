# Resume Chatbot

A full-stack application featuring a React + Vite frontend and FastAPI backend powered by Groq LLM for resume parsing, job description analysis, and intelligent match Q&A.

---

## 🛠 Local Development Setup

### 1. Backend (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # macOS/Linux:
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend/` directory (refer to `.env.example`):
   ```env
   GROQ_API_KEY=your_actual_groq_api_key
   FRONTEND_URL=http://localhost:5173
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will start at `http://localhost:8000`.

### 2. Frontend (React + Vite)

1. Navigate to `frontend/resume-chatbot`:
   ```bash
   cd frontend/resume-chatbot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/resume-chatbot` (refer to `.env.example`):
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

## 🚀 Vercel Deployment Instructions

Deploy the frontend and backend as two separate Vercel projects.

### 1. Frontend Vercel Project

- **Project Name**: `resume-chatbot-ritik`
- **Expected URL**: `https://resume-chatbot-ritik.vercel.app`
- **Root Directory**: `frontend/resume-chatbot`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**:
  | Key | Value |
  | --- | --- |
  | `VITE_API_URL` | `https://resume-chatbot-api-ritik.vercel.app` |

---

### 2. Backend Vercel Project

- **Project Name**: `resume-chatbot-api-ritik`
- **Expected URL**: `https://resume-chatbot-api-ritik.vercel.app`
- **Root Directory**: `backend`
- **Framework / Runtime**: `FastAPI` / `Python`
- **Build Command**: Default (Vercel builds using `requirements.txt` and `vercel.json`)
- **Environment Variables**:
  | Key | Value |
  | --- | --- |
  | `GROQ_API_KEY` | `your_groq_api_key_secret` |
  | `FRONTEND_URL` | `https://resume-chatbot-ritik.vercel.app` |

---

## 📁 Architecture Overview

```text
               INTERNET
                  |
        ┌─────────┴─────────┐
        ↓                   ↓
 Vercel Frontend      Vercel Backend
   React + Vite           FastAPI
        |                   |
        |                   |
        └──── API request ──→
                            |
                         LLM API
```
