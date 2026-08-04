/**
 * Manual retrieval sanity-check script.
 *
 * Runs a handful of sample questions through the retriever and prints back
 * which chunks/sources came back and their similarity scores — useful for
 * eyeballing retrieval quality and tuning MIN_SCORE / topK before relying on
 * it for real answers.
 *
 * Run with: node src/scripts/evalRetrieval.js
 */

import dotenv from "dotenv";
import { retrieveRelevantChunks } from "../services/retrieverService.js";

dotenv.config();

const sampleQuestions = [
  "What documents do I need to file my taxes?",
  "What is the difference between salaried and non-salaried filers?",
  "What are the tax slabs for this year?",
  "Do freelancers need to register for an NTN?",
];

async function runEval() {
  for (const question of sampleQuestions) {
    console.log(`\nQ: ${question}`);
    try {
      const results = await retrieveRelevantChunks(question);
      if (results.length === 0) {
        console.log("  No chunks above the relevance threshold.");
      } else {
        results.forEach((r) => {
          console.log(`  [${r.score.toFixed(3)}] ${r.metadata?.source}`);
        });
      }
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
  }
}

runEval();
