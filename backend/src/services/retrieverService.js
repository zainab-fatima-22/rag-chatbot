import { generateEmbedding } from "./embeddingService.js";
import { search } from "./vectorStore.js";

/**
 * Retrieves the most relevant document chunks for a user query.
 *
 * @param {string} query - the user's question
 * @param {number} topK - how many chunks to retrieve
 * @returns {Promise<Array<{ text: string, metadata: object, score: number }>>}
 */
export async function retrieveRelevantChunks(query, topK = 4) {
  const queryEmbedding = await generateEmbedding(query);
  const results = search(queryEmbedding, topK);

  // Drop very low-relevance matches rather than always returning topK —
  // an irrelevant chunk in the prompt can do more harm than a shorter context.
  const MIN_SCORE = 0.55;
  return results.filter((r) => r.score >= MIN_SCORE);
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
