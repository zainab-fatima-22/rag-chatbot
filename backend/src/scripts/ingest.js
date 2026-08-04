/**
 * Ingestion script — reads documents from data/raw-docs, chunks them, and
 * (once embeddingService is wired up in Day 8) will embed + store them in
 * the vector store for retrieval.
 *
 * Run with: node src/scripts/ingest.js
 *
 * NOTE: embedding generation is stubbed for now — this script currently
 * just proves out the chunking + file-reading part of the pipeline.
 * Day 8 will plug in the real embedding calls.
 */

import fs from "fs";
import path from "path";
import { chunkByMarkdownSection } from "../utils/textChunker.js";

const RAW_DOCS_DIR = path.join(process.cwd(), "data", "raw-docs");

function readRawDocs() {
  const files = fs.readdirSync(RAW_DOCS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => ({
    filename: file,
    content: fs.readFileSync(path.join(RAW_DOCS_DIR, file), "utf-8"),
  }));
}

async function runIngestion() {
  const docs = readRawDocs();
  console.log(`Found ${docs.length} document(s) in data/raw-docs`);

  const allChunks = [];
  for (const doc of docs) {
    const chunks = chunkByMarkdownSection(doc.content);
    chunks.forEach((chunk, i) => {
      allChunks.push({
        text: chunk,
        metadata: { source: doc.filename, chunkIndex: i },
      });
    });
  }

  console.log(`Produced ${allChunks.length} chunks total`);
  console.log("Embedding + vector store insertion will be added in Day 8.");
}

runIngestion();
