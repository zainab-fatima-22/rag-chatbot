import { generateEmbedding } from "./embeddingService.js";
import { search } from "./vectorStore.js";

const DEFAULT_MIN_SCORE = 0.55;
const DEFAULT_TOP_K = 4;

/**
 * Light query preprocessing — trims whitespace and strips filler phrases
 * that don't add retrieval signal ("hey", "can you tell me", etc.), so the
 * embedding better reflects the actual tax question being asked.
 */
function preprocessQuery(query) {
  return query
    .trim()
    .replace(/^(hey|hi|hello)[,!\s]*/i, "")
    .replace(/^(can you|could you|please)\s+/i, "");
}

/**
 * Retrieves the most relevant document chunks for a user query.
 *
 * @param {string} query - the user's question
 * @param {object} options
 * @param {number} options.topK - how many chunks to retrieve
 * @param {number} options.minScore - relevance cutoff (0-1)
 */
export async function retrieveRelevantChunks(query, options = {}) {
  const { topK = DEFAULT_TOP_K, minScore = DEFAULT_MIN_SCORE } = options;

  const cleanedQuery = preprocessQuery(query);
  const queryEmbedding = await generateEmbedding(cleanedQuery);
  const results = search(queryEmbedding, topK);

  // Drop very low-relevance matches rather than always returning topK —
  // an irrelevant chunk in the prompt can do more harm than a shorter context.
  return results.filter((r) => r.score >= minScore);
}

/**
 * Formats retrieved chunks into a single context block for the LLM prompt,
 * with source citations so answers can reference where info came from.
 */
export function formatContextForPrompt(chunks) {
  if (chunks.length === 0) return "No relevant context found in the knowledge base.";

  return chunks
    .map(
      (c, i) =>
        `[Source ${i + 1}: ${c.metadata?.source || "unknown"}]\n${c.text}`
    )
    .join("\n\n---\n\n");
}
