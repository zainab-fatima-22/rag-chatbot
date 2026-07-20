# Tax-Assist AI (RAG-Based Pakistan Personal Income Tax Chatbot)

AI-powered assistant that uses Retrieval-Augmented Generation (RAG) to help
salaried individuals and freelancers in Pakistan understand personal income
tax — tax slabs, deductions, filing steps, and deadlines — by retrieving
answers directly from official FBR (Federal Board of Revenue) documents and
the Income Tax Ordinance, 2001, minimizing AI hallucination.

> **Scope:** Personal income tax for salaried individuals & freelancers only
> (not corporate/business tax). Informational only — not a substitute for a
> licensed tax consultant or FBR itself; the app will carry a clear disclaimer.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB
- **Vector DB:** ChromaDB / FAISS
- **LLM:** Google Gemini API
- **Tools/Deploy:** GitHub, Postman, Vercel, Render

## Project Structure
```
rag-uni-chatbot/
├── frontend/          # React + TS + Tailwind + Vite client
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── services/
└── backend/           # Node + Express API
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   ├── middleware/
    │   ├── config/
    │   └── utils/
    └── data/raw-docs/ # FBR guides, tax ordinance sections, slab notifications (for RAG ingestion)
```

## Roadmap
- **Module 1 (Jul 20 – Jul 26):** Project setup & architecture, frontend UI, auth system, document collection/preprocessing
- **Module 2 (Jul 27 – Aug 02):** RAG pipeline, embeddings, vector DB integration, backend API
- **Module 3 (Aug 03 – Aug 09):** Chatbot integration, context retrieval optimization, conversation history, performance
- **Module 4 (Aug 10 – Aug 15):** Testing, deployment, documentation, final polish

## Day 1 Log (Jul 20, 2026)
- [x] Repo structure created (frontend / backend separation)
- [x] Backend: Express server skeleton with `/api/health` route
- [x] Backend: base config, models, middleware, controllers folders scaffolded
- [x] Frontend: React + TS + Tailwind skeleton with landing page
- [x] `.env.example` files for both frontend and backend
- [x] `.gitignore` set up
- [x] Project scope finalized: Pakistan personal income tax assistant (salaried + freelance individuals)
- [ ] Full auth system (next)
- [ ] FBR document collection — tax slabs, filing guides, relevant Ordinance sections (next)

## Setup (local dev)
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```
