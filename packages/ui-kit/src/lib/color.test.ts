import { describe, expect, it } from "vitest";
import { generateAccentVars } from "./color";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const parsed = parseInt(value, 16);
  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: string, b: string) {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const accents = [
  "#4f46e5",
  "#00ff00",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#ff0000",
  "#0d9488",
  "#f97316",
  "#64748b",
];

describe("generateAccentVars", () => {
  it.each(["light", "dark"] as const)(
    "keeps %s primary readable for every hue",
    (mode) => {
      for (const accent of accents) {
        const vars = generateAccentVars(accent, mode);
        expect(vars["--primary"]).toMatch(/^#[0-9a-f]{6}$/);
        expect(
          contrast(vars["--primary"], vars["--primary-foreground"]),
        ).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  it("keeps neutral accents neutral in light mode", () => {
    const vars = generateAccentVars("#808080", "light");
    const { r, g, b } = hexToRgb(vars["--primary"]);
    expect(r).toBe(g);
    expect(g).toBe(b);
  });

  it("returns every accent variable", () => {
    const vars = generateAccentVars("#0d9488", "light");
    expect(Object.keys(vars)).toEqual([
      "--primary",
      "--primary-foreground",
      "--primary-hover",
      "--primary-active",
      "--primary-soft",
      "--primary-soft-foreground",
      "--ring",
    ]);
  });
});
