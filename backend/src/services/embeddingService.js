/**
 * Embedding service — wraps Google's Gemini embedding API.
 *
 * Uses the `text-embedding-004` model via the Generative Language API.
 * Requires GEMINI_API_KEY to be set in .env.
 */

const EMBED_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent";

// Simple in-memory cache — avoids re-embedding identical queries within the
// same server run (e.g. common questions like "what documents do I need").
// Not persisted across restarts; a Redis-backed cache would be the natural
// upgrade if this needs to survive restarts or scale across instances.
const embeddingCache = new Map();

export async function generateEmbedding(text) {
  const cacheKey = text.trim().toLowerCase();
  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const res = await fetch(`${EMBED_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/text-embedding-004",
      content: { parts: [{ text }] },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Embedding request failed: ${res.status} ${errBody}`);
  }

  const data = await res.json();
  const embedding = data.embedding.values;
  embeddingCache.set(cacheKey, embedding);
  return embedding;
}

/**
 * Embeds a batch of text chunks sequentially. Kept simple (no parallel
 * requests) to stay well under API rate limits during development —
 * can be optimized with batching/concurrency later if ingestion gets slow.
 */
export async function generateEmbeddings(texts) {
  const embeddings = [];
  for (const text of texts) {
    const embedding = await generateEmbedding(text);
    embeddings.push(embedding);
  }
  return embeddings;
}
