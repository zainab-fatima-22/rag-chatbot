# Tax-Assist AI Knowledge Base

These Markdown files are the source documents used by the RAG ingestion pipeline.

## Important

This project does **not train or fine-tune Gemini** on these files. The ingestion process:

1. reads the documents;
2. splits them into logical Markdown sections;
3. sends each section to Gemini `models/gemini-embedding-001`;
4. stores the returned vectors and original text in `data/vector-store.json`;
5. retrieves the most similar sections for each user question;
6. sends only the retrieved context to the Gemini generation model.

The current knowledge base is a curated Tax Year 2027 starter set based primarily on official FBR sources checked in August 2026. It is intentionally focused on personal income tax, salaried taxpayers, eligible IT export/freelancer classification, Iris filing, registration, and ATL basics.

Before using the project for real filing decisions, update the knowledge base whenever FBR publishes a new Finance Act, SRO, circular, rate card, or other controlling material.
