# API Reference — Tax-Assist AI Backend

Base URL (local): `http://localhost:5000/api`

All protected routes require an `Authorization: Bearer <token>` header,
using the token returned from register/login.

---

## Health

### `GET /health`
Returns service status.

**Response 200**
```json
{ "status": "ok", "service": "uni-chatbot-backend", "timestamp": "..." }
```

---

## Auth

### `POST /auth/register`
**Body**
```json
{ "name": "Zainab Fatima", "email": "zainab@example.com", "password": "yourpassword" }
```
**Response 201** — user object + JWT `token`

### `POST /auth/login`
**Body**
```json
{ "email": "zainab@example.com", "password": "yourpassword" }
```
**Response 200** — user object + JWT `token`

### `GET /auth/me` *(protected)*
Returns the currently authenticated user.

---

## Chat

### `POST /chat` *(protected)*
Runs the full RAG pipeline: embeds the query, retrieves relevant chunks
from the vector store, generates a grounded answer via Gemini, and saves
the exchange to the user's conversation history.

**Body**
```json
{ "message": "What documents do I need to file my taxes?" }
```

**Response 200**
```json
{
  "answer": "...",
  "sources": [{ "source": "filing-guide-TEMPLATE.md", "score": 0.81 }]
}
```

**Errors**
- `400` — message missing or over 1000 characters
- `500` — pipeline error (e.g. missing `GEMINI_API_KEY`, embedding/generation failure)

### `GET /chat/history` *(protected)*
Returns the authenticated user's saved conversation (capped to the most
recent 100 messages).

**Response 200**
```json
{ "messages": [{ "role": "user", "content": "...", "createdAt": "..." }, ...] }
```

---

## Notes for future modules
- Currently one running conversation per user. Multiple named threads would
  need a `conversationId` param added to `POST /chat` and a list endpoint.
- Vector store is a simple file-backed cosine-similarity implementation —
  see `src/services/vectorStore.js` for notes on swapping in ChromaDB/FAISS
  for production scale.
