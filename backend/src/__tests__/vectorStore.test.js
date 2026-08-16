import fs from "fs";
import os from "os";
import path from "path";
import { addDocuments, search, clearStore } from "../services/vectorStore.js";

const TEMP_STORE = path.join(os.tmpdir(), `vector-store-test-${Date.now()}.json`);

describe("vectorStore", () => {
  beforeAll(() => {
    process.env.VECTOR_STORE_PATH = TEMP_STORE;
  });

  beforeEach(() => {
    clearStore();
  });

  afterAll(() => {
    delete process.env.VECTOR_STORE_PATH;
    if (fs.existsSync(TEMP_STORE)) fs.unlinkSync(TEMP_STORE);
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
