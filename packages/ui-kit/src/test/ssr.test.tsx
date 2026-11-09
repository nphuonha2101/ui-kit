// @vitest-environment node
import * as React from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SsrRoot, ssrFixtures } from "./ssr-fixtures";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SSR (node, no DOM globals)", () => {
  it("runs in an environment without browser globals", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  it.each(ssrFixtures)("renders $name without browser APIs", ({ render }) => {
    const errors: unknown[][] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args) => {
      errors.push(args);
    });

    let html = "";
    try {
      html = renderToString(<SsrRoot>{render()}</SsrRoot>);
    } finally {
      spy.mockRestore();
    }

    expect(errors).toEqual([]);
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
