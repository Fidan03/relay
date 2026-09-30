import { describe, expect, it } from "vitest";

import { highlight } from "./highlight";

describe("highlight", () => {
  it("renders the code as syntax-highlighted HTML", async () => {
    const html = await highlight('const x = 1;', "ts");

    expect(html).toContain("<pre");
    expect(html).toContain("<code");
    expect(html).toContain("const");
  });

  it("defaults to the ts grammar when no lang is given", async () => {
    const withDefault = await highlight("const relay = 1;");
    const explicitTs = await highlight("const relay = 1;", "ts");

    expect(withDefault).toBe(explicitTs);
  });

  it("trims leading/trailing whitespace before highlighting", async () => {
    const padded = await highlight("\n  const x = 1;\n\n", "ts");
    const trimmed = await highlight("const x = 1;", "ts");

    expect(padded).toBe(trimmed);
  });

  it("supports the bash grammar for install snippets", async () => {
    const html = await highlight("npm i @relay/queue", "bash");

    expect(html).toContain("<pre");
    expect(html).toContain("relay/queue");
  });

  it("wires up both light and dark theme color variables", async () => {
    const html = await highlight("const x = 1;", "ts");

    expect(html).toContain("--shiki-light");
    expect(html).toContain("--shiki-dark");
  });
});
