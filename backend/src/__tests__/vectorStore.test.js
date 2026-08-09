import fs from "fs";
import path from "path";
import { addDocuments, search, clearStore } from "../services/vectorStore.js";

const STORE_PATH = path.join(process.cwd(), "data", "vector-store.json");

describe("vectorStore", () => {
  beforeEach(() => {
    clearStore();
  });

  afterAll(() => {
    if (fs.existsSync(STORE_PATH)) fs.writeFileSync(STORE_PATH, "[]");
  });

  test("search returns the most similar document first", () => {
    addDocuments([
      { text: "doc A", embedding: [1, 0, 0], metadata: { source: "a.md" } },
      { text: "doc B", embedding: [0, 1, 0], metadata: { source: "b.md" } },
      { text: "doc C", embedding: [0.9, 0.1, 0], metadata: { source: "c.md" } },
    ]);

    const results = search([1, 0, 0], 2);
    expect(results[0].metadata.source).toBe("a.md");
    expect(results).toHaveLength(2);
  });

  test("search returns empty array when store is empty", () => {
    const results = search([1, 0, 0], 3);
    expect(results).toHaveLength(0);
  });
});
