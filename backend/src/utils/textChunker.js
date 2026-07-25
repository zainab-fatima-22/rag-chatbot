/**
 * Basic text chunking utility for RAG preprocessing.
 * Splits long documents into overlapping chunks so embeddings capture
 * enough local context without exceeding token limits.
 *
 * This is a simple character-based splitter for now — Module 2 will likely
 * upgrade this to a markdown-section-aware or token-based splitter, since
 * tax documents are better chunked by logical section (see notes in the
 * raw-docs templates) than by raw character count.
 */

export function chunkText(text, chunkSize = 800, overlap = 150) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end).trim());
    start += chunkSize - overlap;
  }

  return chunks.filter(Boolean);
}

/**
 * Splits a markdown doc into chunks by ## section headers instead of raw
 * character count — better fit for structured docs like the FBR templates.
 */
export function chunkByMarkdownSection(text) {
  const sections = text.split(/\n(?=## )/g);
  return sections.map((s) => s.trim()).filter(Boolean);
}
