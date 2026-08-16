/**
 * Embedding service — wraps Google's Gemini embedding API.
 *
 * Uses the gemini-embedding-001 model via the Generative Language API.
 * The API key is read from the environment (GEMINI_API_KEY), never hardcoded.
 */

import { env } from "../config/env.js";

const MODEL = env.embeddingModel;

const EMBED_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/${MODEL}:embedContent?key=${env.geminiApiKey}`;

// Simple in-memory cache
const embeddingCache = new Map();

export async function generateEmbedding(text) {
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Cannot generate embedding for empty text");
  }

  const cleanText = text.trim();
  const cacheKey = cleanText.toLowerCase();

  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey);
  }

  const res = await fetch(EMBED_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      content: {
        parts: [{ text: cleanText }],
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();

    throw new Error(
      `Embedding request failed: ${res.status} ${errBody} — model=${MODEL}`
    );
  }

  const data = await res.json();

  const embedding = data.embedding.values;

  embeddingCache.set(cacheKey, embedding);

  return embedding;
}

/**
 * Embeds a batch of text chunks sequentially.
 */
export async function generateEmbeddings(texts) {
  const embeddings = [];

  for (const text of texts) {
    const embedding = await generateEmbedding(text);
    embeddings.push(embedding);
  }

  return embeddings;
}