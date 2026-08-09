import { chunkText, chunkByMarkdownSection } from "../utils/textChunker.js";

describe("chunkText", () => {
  test("splits text into overlapping chunks of roughly the given size", () => {
    const text = "a".repeat(2000);
    const chunks = chunkText(text, 800, 150);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].length).toBe(800);
  });

  test("returns a single chunk if text is shorter than chunkSize", () => {
    const chunks = chunkText("short text", 800, 150);
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toBe("short text");
  });

  test("filters out empty chunks", () => {
    const chunks = chunkText("", 800, 150);
    expect(chunks).toHaveLength(0);
  });
});

describe("chunkByMarkdownSection", () => {
  test("splits on ## headers", () => {
    const doc = "# Title\nintro\n\n## Section One\ncontent one\n\n## Section Two\ncontent two";
    const chunks = chunkByMarkdownSection(doc);
    expect(chunks.length).toBe(3);
    expect(chunks[1]).toContain("Section One");
    expect(chunks[2]).toContain("Section Two");
  });

  test("returns the whole doc as one chunk if there are no ## headers", () => {
    const doc = "just plain text with no headers";
    const chunks = chunkByMarkdownSection(doc);
    expect(chunks).toHaveLength(1);
  });
});
