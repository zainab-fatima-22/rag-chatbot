# Tax-Assist AI — Demo Script

A quick walkthrough for presenting the project.

## 1. The problem (30 sec)
Filing personal income tax in Pakistan is confusing for salaried individuals
and freelancers — scattered FBR guidance, jargon-heavy rules, and slabs that
change every year. Tax-Assist AI answers plain-language questions grounded
in official source documents instead of a generic AI's guesswork.

## 2. Live walkthrough
1. **Register / Login** — show the auth flow (JWT-based, bcrypt-hashed passwords)
2. **Ask a question** in the chat — e.g. *"What documents do I need to file
   my taxes?"* — point out:
   - the typing indicator while the RAG pipeline runs
   - the answer citing which source document it came from
3. **Refresh the page** — conversation history reloads automatically
4. **Visit the FAQ / About pages** — show the disclaimer and general info
5. *(Optional)* Show `docs/API.md` and the Postman collection for the API surface

## 3. How it works (architecture, ~1 min)
Walk through the diagram in the README:
`Frontend → /api/chat → embed query → vector search → build context → Gemini generate → save + return`

Mention the deliberate simplifications for a class project:
- Vector store is a lightweight file-backed cosine-similarity implementation
  (interface-compatible with swapping in ChromaDB/FAISS later)
- Source documents are currently templates — real ingestion of verified FBR
  content is the natural next step beyond this timeline

## 4. What's tested
- Unit tests for chunking and vector search (`npm test`)
- Manual retrieval evaluation script (`npm run eval:retrieval`)
- Postman collection covering all endpoints

## 5. Possible next steps (if asked)
- Swap in a production vector DB (ChromaDB) once the document set grows
- Multiple named conversation threads instead of one running history
- Streaming responses instead of a single blocking reply
- Real FBR document ingestion pipeline with citation-verified content
