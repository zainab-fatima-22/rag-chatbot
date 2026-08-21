Project Overview

Tax Assist AI combines a modern web application with Retrieval Augmented Generation to make Pakistan's personal income tax information easier to understand. Instead of generating answers from general model knowledge, the system first searches its curated tax knowledge base and then uses the retrieved information to generate a contextual response.

# Tax Assist AI

Tax Assist AI is a Retrieval Augmented Generation (RAG) chatbot that helps salaried individuals and freelancers in Pakistan understand personal income tax. It answers plain language questions about tax slabs, deductions, filing steps, and deadlines by retrieving the relevant passages from official Federal Board of Revenue (FBR) source documents instead of relying on a generic language model's memory. Grounding answers in real source material keeps them factual, citable, and much less prone to hallucination.

The scope is intentionally limited to personal income tax for salaried individuals and freelancers. Corporate tax, sales tax, customs duty, and other regimes are out of scope. The application is informational only. It is not a substitute for a licensed tax consultant or for FBR itself, and the interface carries a clear disclaimer to that effect.

## Table of Contents

- [Why This Project Exists](#why-this-project-exists)
- [Issues Faced During Development](#issues-faced-during-development)
- [What This Project Solves](#what-this-project-solves)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Deployment](#deployment)
- [Knowledge Base](#knowledge-base)
- [Demo Script](#demo-script)
- [Known Limitations and Next Steps](#known-limitations-and-next-steps)
- [Development Reports](#development-reports)

## Why This Project Exists

Filing personal income tax in Pakistan is confusing for most people. Official FBR guidance is scattered across notices, guides, and ordinance text, the rules are dense with jargon, and the slab rates change with every Finance Act. A generic chatbot often answers confidently but incorrectly because it has no access to the current source material.

Tax Assist AI addresses this directly. It grounds every answer in a curated set of official source documents, so a question about the Tax Year 2027 salaried slabs returns the rates that actually apply, with a note about which document the answer came from. The result is a tool that is more trustworthy than a general purpose assistant and far easier to use than reading the raw ordinance.

## Issues Faced During Development

The project surfaced a number of real engineering and product problems along the way, several of which shaped the final design.

- **Hallucination risk.** A raw language model often invents tax rates. The project answered this by moving to a RAG pipeline that only passes retrieved source context into the generation model, and by instructing the model to say clearly when the context does not contain an answer.
- **Vague questions.** A question such as "how much tax will I pay" cannot be answered without knowing the income and filer type. The assistant now asks for the missing detail instead of guessing.
- **Unbounded conversation history.** Over a long session a user's saved messages could grow without limit and slow down history loads. History is now capped to the most recent one hundred messages.
- **Duplicate accounts from email casing.** The same address typed with different capital letters was treated as separate accounts. Emails are now normalized (trimmed and lowercased) before registration and login.
- **Duplicate form submissions.** The login and register buttons could be clicked repeatedly while a request was in flight. The buttons now disable and show a loading state during submission.
- **Repeated embedding work.** Identical or repeated questions were sent to the embedding service on every request. An in memory embedding cache now avoids the redundant work within a server session.
- **Hardcoded API keys.** Early versions embedded the Gemini API key directly in source files. These are now read from environment configuration only, and the key never appears in the repository.
- **Cross platform test failures.** The test runner script was not compatible with Windows. It now invokes the Jest binary directly so the same command works on any operating system.
- **Uncontrolled rate limiting memory.** The in memory rate limiter could grow without bound on a long running server. Expired buckets are now cleaned up on a timer.
- **Stale service identity.** The health endpoint still reported the original university chatbot project name. It now reports the actual service name.

## What This Project Solves

- It makes complex tax rules answerable in plain language, no jargon required.
- It grounds answers in official FBR documents and the Income Tax Ordinance, and cites the source of each answer.
- It walks a first time filer through registration, IRIS filing, and the Active Taxpayer List basics.
- It differentiates the rules that matter most to salaried employees and to freelancers, including eligible IT export income.
- It preserves a user's conversation history so a session can be resumed after a page refresh.
- It protects accounts with hashed passwords and token based sessions, and it normalizes emails so the same person cannot end up with duplicate accounts.
- It keeps responses within a defined scope and reminds users to confirm figures with FBR or a licensed consultant before filing.

## Features

- Registration and login with bcrypt hashed passwords and seven day JSON Web Token sessions.
- A protected chat page that runs the full RAG pipeline and returns grounded answers with source citations.
- Saved conversation history per user, reloaded automatically when the chat page opens.
- An in memory embedding cache so repeated questions do not hit the embedding service twice.
- Query preprocessing that strips filler phrases so the embedding focuses on the real tax content.
- Configurable retrieval depth and a minimum relevance threshold so low quality matches never reach the prompt.
- Rate limiting middleware, request logging, and centralized error handling.
- A ledger and ink stamp visual identity with a deep pine green and brass gold palette on a warm paper background.
- Accessibility improvements including proper labels, a live chat region for screen readers, and automatic scroll to the newest message.

## Technology Stack

| Layer                     | Technology                                             |
| :------------------------ | :----------------------------------------------------- |
| Frontend                  | React, TypeScript, Tailwind CSS, Vite                  |
| Backend                   | Node.js, Express.js                                    |
| Database                  | MongoDB for users and conversation history             |
| Embeddings and generation | Google Gemini API                                      |
| Retrieval                 | Cosine similarity search over chunked source documents |
| Authentication            | bcrypt password hashing, JSON Web Tokens               |
| Testing                   | Jest                                                   |
| Deployment                | Render for the backend, Vercel for the frontend        |

## Project Structure

```
rag-chatbot/
├── backend/                 Node and Express API
│   ├── data/
│   │   ├── raw-docs/        FBR source documents used for RAG ingestion
│   │   └── vector-store.json  built by the ingestion script (ignored by git)
│   ├── src/
│   │   ├── config/          environment and database configuration
│   │   ├── controllers/     auth and chat request handling
│   │   ├── middleware/      auth, rate limiting, logging, errors
│   │   ├── models/          Mongoose models for User and Conversation
│   │   ├── routes/          Express route definitions
│   │   ├── scripts/         ingestion and retrieval evaluation scripts
│   │   ├── services/        embedding, vector store, retrieval, generation
│   │   ├── utils/           token generation, text chunking
│   │   └── __tests__/       Jest unit tests
│   ├── .env.example         environment template for the backend
│   ├── package.json
│   ├── postman_collection.json
│   └── render.yaml          Render deployment configuration
└── frontend/                React, TypeScript, Tailwind, Vite client
    ├── public/              favicon
    ├── src/
    │   ├── components/      UI components
    │   ├── context/         global auth state
    │   ├── hooks/           shared hooks
    │   ├── pages/           application pages
    │   └── services/        API client
    ├── .env.example         environment template for the frontend
    ├── index.html
    ├── package.json
    └── vercel.json          Vercel deployment configuration
```

## How It Works

A user question flows through the full RAG pipeline in a single request.

1. The user submits a question from the chat page.
2. The backend preprocesses the question, trimming filler phrases so the embedding reflects the actual tax content.
3. The question is converted into a numeric embedding by the Gemini embedding model.
4. The embedding is compared against the stored source chunks using cosine similarity, and the closest matches above a relevance threshold are retrieved.
5. Only those retrieved passages are formatted into a context block with source citations.
6. The Gemini generation model writes an answer using only that context, and cites which document each part came from.
7. The exchange is saved to the user's conversation history and returned to the frontend.

The application is split into two independent services that talk to each other over HTTP. The React single page application renders the landing, auth, chat, FAQ, about, and profile pages. The Express API handles authentication, conversation history, and the RAG pipeline. The backend depends on MongoDB for persistence and on the Google Gemini API for embeddings and answer generation.

```
Browser
   |
   | React + Vite single page app (frontend)
   |
   | HTTP and JSON (REST)
   v
Express API (backend) ----------------> MongoDB (users, conversations)
   |
   | /api/chat
   v
RAG pipeline (services)
   |
   +--> embeddingService  ------> Gemini embedding model
   +--> vectorStore       ------> data/vector-store.json (cosine search)
   +--> generationService ------> Gemini generation model
```

### Ingestion

The ingestion script builds the vector store. It reads every Markdown file in `data/raw-docs`, splits each into logical sections using markdown section headers, embeds each section, and writes the chunks with their embeddings and source metadata to `data/vector-store.json`. The store is cleared and rebuilt on each run, so it always reflects the current source documents.

### Key Design Decision

The vector store is a lightweight, file backed implementation that uses cosine similarity search in memory. It stands in for a dedicated vector database such as ChromaDB or FAISS during development. Its interface (`addDocuments` and `search`) is intentionally generic, so swapping in a production vector database later only requires changing that one service file and not the rest of the pipeline.

## API Reference

The backend exposes the following endpoints. The base URL for local development is `http://localhost:5000/api`. All protected routes require an `Authorization: Bearer <token>` header using the token returned from register or login.

### Health

**GET /health**

Returns the service status. No authentication required.

```json
{ "status": "ok", "service": "tax-assist-ai-backend", "timestamp": "..." }
```

### Auth

**POST /auth/register**

Body:

```json
{
  "name": "Zainab Fatima",
  "email": "zainab@example.com",
  "password": "yourpassword"
}
```

Response 201, the user object plus a JWT `token`.

Errors: 400 if any field is missing or the email is already registered.

**POST /auth/login**

Body:

```json
{ "email": "zainab@example.com", "password": "yourpassword" }
```

Response 200, the user object plus a JWT `token`.

Errors: 401 if the email or password is incorrect.

**GET /auth/me** (protected)

Returns the currently authenticated user.

Errors: 401 if no valid token is provided.

### Chat

**POST /chat** (protected)

Runs the full RAG pipeline. It embeds the query, retrieves the relevant chunks from the vector store, generates a grounded answer via Gemini, and saves the exchange to the user's conversation history.

Body:

```json
{ "message": "What documents do I need to file my taxes?" }
```

Response 200:

```json
{
  "answer": "...",
  "sources": [
    { "source": "04-registration-iris-filing-and-atl.md", "score": 0.81 }
  ]
}
```

Errors: 400 if the message is missing or longer than 1000 characters. 500 on a pipeline failure, such as a missing Gemini API key or an embedding or generation error.

**GET /chat/history** (protected)

Returns the authenticated user's saved conversation, capped to the most recent 100 messages.

Response 200:

```json
{ "messages": [{ "role": "user", "content": "...", "createdAt": "..." }, ...] }
```

A Postman collection covering every endpoint is included at `backend/postman_collection.json`.

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB (local instance or a cloud connection string)
- A Google Gemini API key

### Backend

```bash
cd backend
npm install
```

Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

The required variables are `MONGODB_URI`, `GEMINI_API_KEY`, `JWT_SECRET`, and `CLIENT_URL`. The `JWT_SECRET` must be at least 32 characters long.

Start the development server:

```bash
npm run dev
```

Ingest the source documents from `data/raw-docs` into the vector store:

```bash
npm run ingest
```

Sanity check retrieval quality with sample questions:

```bash
npm run eval:retrieval
```

Run the automated unit tests:

```bash
npm test
```

### Frontend

```bash
cd frontend
npm install
```

Copy the environment template:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default and talks to the backend at `http://localhost:5000/api`.

## Testing

The backend includes Jest unit tests covering the document chunking utility, the vector store search behavior, and the retrieval preprocessing helpers. Run them with `npm test` in the `backend` directory.

- Text chunking tests confirm the character based splitter produces overlapping chunks, returns a single chunk for short text, filters empty chunks, and splits markdown documents by section header.
- Vector store tests confirm search returns the most similar document first and handles an empty store gracefully.
- Retrieval helper tests confirm filler phrases are stripped and that a greeting alone is never turned into an empty embedding request.

There is also a manual retrieval evaluation script (`npm run eval:retrieval`) and a Postman collection in `backend/postman_collection.json` for exercising the API by hand.

## Deployment

**Backend on Render.** The repository includes `backend/render.yaml`. Connect the repository and set the `MONGODB_URI`, `GEMINI_API_KEY`, `JWT_SECRET`, and `CLIENT_URL` environment variables in the Render dashboard.

**Frontend on Vercel.** Connect the repository with the root directory set to `frontend/`. Set `VITE_API_BASE_URL` to the deployed backend's `/api` URL in the Vercel environment variables. The included `vercel.json` configures the SPA rewrite so client side routing works on refresh.

## Knowledge Base

The source documents in `backend/data/raw-docs` are a curated Tax Year 2027 starter set based on official FBR material, covering scope and tax year, salaried tax slabs, freelancer and IT export income, registration and IRIS filing, and late filing.

The project does not train or fine tune Gemini on these files. The ingestion process reads the documents, splits them into logical sections, sends each section to the Gemini embedding model, stores the returned vectors and original text in the vector store, retrieves the most similar sections for each user question, and sends only the retrieved context to the Gemini generation model.

The knowledge base should be refreshed whenever FBR publishes a new Finance Act, notification, or rate card.

## Demo Script

A short walkthrough for presenting the project.

1. **The problem.** Filing personal income tax in Pakistan is confusing for salaried individuals and freelancers. FBR guidance is scattered, the rules are jargon heavy, and the slabs change every year. Tax Assist AI answers plain language questions grounded in official source documents instead of a generic AI's guesswork.
2. **Live walkthrough.** Register or log in and show the auth flow, which uses JWT tokens and bcrypt hashed passwords. Ask a question in the chat, for example "What documents do I need to file my taxes?" Point out the typing indicator while the RAG pipeline runs, and the answer citing which source document it came from. Refresh the page and show that conversation history reloads automatically. Visit the FAQ and About pages and show the disclaimer.
3. **How it works.** Walk through the pipeline: embed the query, search the vector store, build the context block, generate a grounded answer, save and return. Mention the deliberate simplifications, the lightweight file backed vector store that is interface compatible with ChromaDB or FAISS, and the curated Tax Year 2027 starter knowledge base.
4. **What is tested.** Unit tests for chunking, vector search, and retrieval preprocessing, run with `npm test`. A manual retrieval evaluation script, run with `npm run eval:retrieval`. A Postman collection covering all endpoints.

## Known Limitations and Next Steps

- The knowledge base is a curated Tax Year 2027 starter set. Rates change with each Finance Act, so the source documents should be refreshed whenever FBR publishes new material.
- The vector store is not built for production scale. A dedicated vector database such as ChromaDB would be the natural upgrade once the document set grows.
- Each user currently has one running conversation thread. Multiple named conversations would require a conversation identifier on the chat endpoint and a listing endpoint.
- Responses are not streamed. The chat waits for the full answer before displaying it; streaming would improve perceived responsiveness.
- Saved filing details and document uploads are planned for a future update.

## Development Reports

A day by day account of the full development process, from project setup through the four module roadmap and the additional enhancement work, is available in [REPORTS.md](REPORTS.md). The project was built over the period from July 10 to August 17, 2026.
