import fs from "fs";
import path from "path";

/**
 * Lightweight file-backed vector store using cosine similarity search.
 *
 * This stands in for ChromaDB/FAISS during early development so the RAG
 * pipeline can be built and tested without standing up a separate vector
 * DB service. The interface (addDocuments / search) is intentionally
 * generic — swapping this out for a real ChromaDB client later should only
 * require changing this file, not the callers.
 */

function getStorePath() {
  return process.env.VECTOR_STORE_PATH || path.join(process.cwd(), "data", "vector-store.json");
}

function loadStore() {
  const storePath = getStorePath();
  if (!fs.existsSync(storePath)) return [];
  return JSON.parse(fs.readFileSync(storePath, "utf-8"));
}

function saveStore(records) {
  fs.writeFileSync(getStorePath(), JSON.stringify(records, null, 2));
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

/**
 * @param {Array<{ text: string, embedding: number[], metadata: object }>} docs
 */
export function addDocuments(docs) {
  const store = loadStore();
  store.push(...docs);
  saveStore(store);
  return store.length;
}

/**
 * @param {number[]} queryEmbedding
 * @param {number} topK
 */
export function search(queryEmbedding, topK = 4) {
  const store = loadStore();
  return store
    .map((doc) => ({ ...doc, score: cosineSimilarity(queryEmbedding, doc.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function clearStore() {
  saveStore([]);
}
