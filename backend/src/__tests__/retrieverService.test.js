import { preprocessQuery } from "../services/retrieverService.js";

describe("retrieverService helpers", () => {
  test("removes common filler phrases", () => {
    expect(preprocessQuery("Hey, can you tell me what the tax slabs are?"))
      .toBe("tell me what the tax slabs are?");
  });

  test("does not turn a greeting into an empty embedding request", () => {
    expect(preprocessQuery("hi")).toBe("hi");
  });
});
