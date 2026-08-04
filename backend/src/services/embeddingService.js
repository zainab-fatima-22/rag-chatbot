/**
 * Embedding service — wraps Google's Gemini embedding API.
 *
 * Uses the `text-embedding-004` model via the Generative Language API.
 * Requires GEMINI_API_KEY to be set in .env.
 */

const EMBED_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent";

export async function generateEmbedding(text) {
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
  return data.embedding.values;
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
