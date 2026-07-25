# Tax-Assist AI (RAG-Based Pakistan Personal Income Tax Chatbot)

AI-powered assistant that uses Retrieval-Augmented Generation (RAG) to help
salaried individuals and freelancers in Pakistan understand personal income
tax — tax slabs, deductions, filing steps, and deadlines — by retrieving
answers directly from official FBR (Federal Board of Revenue) documents and
the Income Tax Ordinance, 2001, minimizing AI hallucination.

> **Scope:** Personal income tax for salaried individuals & freelancers only
> (not corporate/business tax). Informational only — not a substitute for a
> licensed tax consultant or FBR itself. The application includes a clear
> disclaimer encouraging users to verify important tax matters with official
> FBR resources.

---

# Features

### Current Features

- User authentication (Register/Login)
- JWT-based protected routes
- Secure password hashing with bcrypt
- Persistent authentication using React Context
- REST API architecture
- Responsive React frontend
- MongoDB integration
- Modular backend structure
- Ready for RAG document ingestion

### Planned Features

- FBR document processing
- Vector database integration (ChromaDB / FAISS)
- AI-powered tax chatbot
- Conversation history
- Personalized tax guidance
- Advanced search and retrieval

---

# Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Express
- **Authentication:** JWT, bcrypt
- **Vector DB:** ChromaDB / FAISS
- **LLM:** Google Gemini API
- **Tools/Deploy:** GitHub, Postman, Vercel, Render

---

# Project Structure

```text
rag-uni-chatbot/
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── routes/
│       └── utils/
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── utils/
    │   └── server.js
    └── data/
        └── raw-docs/
```

---

# Authentication Flow

The application uses JWT-based authentication.

- User registers with email and password
- Passwords are securely hashed using **bcrypt**
- Backend issues a signed JWT after successful login
- JWT is stored on the client
- Protected API routes verify the token through authentication middleware
- AuthContext maintains authentication state throughout the frontend
- `/api/auth/me` returns the currently authenticated user

---

# Roadmap

### Module 1 (Jul 20 – Jul 26)

- Project setup
- Frontend architecture
- Backend architecture
- Authentication system
- Document collection & preprocessing

### Module 2 (Jul 27 – Aug 02)

- RAG pipeline
- Embeddings
- Vector database integration
- Backend AI APIs

### Module 3 (Aug 03 – Aug 09)

- Chatbot integration
- Context retrieval optimization
- Conversation history
- Performance improvements

### Module 4 (Aug 10 – Aug 15)

- Testing
- Deployment
- Documentation
- Final polish

---

# Development Log

## Day 1 (Jul 20, 2026)

- ✅ Repository initialized
- ✅ Frontend (React + TypeScript + Tailwind) scaffolded
- ✅ Backend (Express) scaffolded
- ✅ Base folder structure created
- ✅ Health check endpoint added
- ✅ Environment configuration prepared
- ✅ Project scope finalized

---

## Day 2 (Jul 21, 2026)

### Backend

- ✅ Implemented secure authentication system
- ✅ Added bcrypt password hashing
- ✅ JWT token generation for authenticated users
- ✅ Authentication middleware for protected routes
- ✅ Added `/api/auth/me` endpoint
- ✅ Configured MongoDB connection

### Frontend

- ✅ Created global `AuthContext`
- ✅ Built Login page
- ✅ Built Register page
- ✅ Added client-side form validation
- ✅ Configured React Router authentication flow
- ✅ Added centralized API service layer
- ✅ Connected frontend authentication with backend APIs

**Status:** End-to-end authentication flow is fully operational.

---

# Setup

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Future Work

- Integrate FBR documents
- Build RAG pipeline
- Generate embeddings
- Store vectors in ChromaDB/FAISS
- Connect Gemini API
- Implement AI chatbot interface
- Improve retrieval accuracy
- Deploy application
