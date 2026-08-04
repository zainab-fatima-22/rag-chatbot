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

## Day 2 Log (Jul 21, 2026)
- [x] Backend: full authentication implemented — register/login with bcrypt password hashing
- [x] Backend: JWT token generation + `protect` middleware for authenticated routes
- [x] Backend: `/api/auth/me` protected route added, MongoDB connection wired into server start
- [x] Frontend: AuthContext for global auth state (login/register/logout)
- [x] Frontend: Login and Register pages with form validation & error handling
- [x] Frontend: React Router wired up (`/`, `/login`, `/register`)
- [x] Frontend: API service layer (`services/api.ts`) for talking to backend
## Day 3 Log (Jul 22, 2026)
- [x] Backend: document preprocessing utilities added — `chunkText` (char-based) and `chunkByMarkdownSection` (section-based) for RAG ingestion
- [x] Backend: template reference docs added to `data/raw-docs/` (tax slabs, filing guide) outlining structure/metadata needed once populated with verified FBR content
- [x] Frontend: Chat UI built — `ChatBubble`, `ChatInput` components and full `ChatPage`
- [x] Frontend: `ProtectedRoute` component — `/chat` now requires login
- [x] Frontend: Landing page linked to Login/Register flow

## Day 4 Log (Jul 23, 2026)
- [x] Backend: centralized error handling — `notFound` (404) and global `errorHandler` middleware for consistent API error responses
- [x] Frontend: global `Navbar` component with persistent disclaimer banner ("informational only" notice)
- [x] Frontend: `About` page with project description and full disclaimer
- [x] Frontend: cleaned up duplicate header logic in ChatPage now that Navbar handles navigation

## Day 5 Log (Jul 24, 2026)
- [x] Frontend: `Profile` page (protected) showing logged-in user's name, email, role
- [x] Frontend: static `FAQ` page with common tax-filing questions
- [x] Frontend: routes and nav links wired up for Profile and FAQ

## Day 6 Log (Jul 25, 2026)
- [x] Backend: Postman collection added (`postman_collection.json`) for manually testing health check, register, login, and protected `/me` endpoint
- [x] Manual testing pass on auth flow (register, login, protected route access, invalid credential handling)
- [x] Code cleanup and comment pass across backend controllers/middleware and frontend components
- [x] README documentation finalized for Module 1

**Module 1 complete** — project setup, full auth system, document preprocessing utilities, and core UI (landing, auth, chat skeleton, about, FAQ, profile) all in place.

## Day 7 Log (Jul 27, 2026)
- [x] Backend: lightweight file-backed vector store (`vectorStore.js`) using cosine similarity search — stands in for ChromaDB/FAISS during early development, same `addDocuments`/`search` interface so swapping in a real vector DB later is a drop-in change
- [x] Backend: ingestion script skeleton (`scripts/ingest.js`) — reads `data/raw-docs`, chunks by markdown section, ready for embedding step
- [x] Added `npm run ingest` command
## Day 8 Log (Jul 28, 2026)
- [x] Backend: `embeddingService.js` — wraps Gemini's `text-embedding-004` model to generate vector embeddings for text chunks
- [x] Backend: wired embedding generation into `ingest.js` — script now chunks docs, embeds each chunk, and stores them in the vector store
- [ ] Retrieval / similarity search wiring into a real endpoint (next)

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
