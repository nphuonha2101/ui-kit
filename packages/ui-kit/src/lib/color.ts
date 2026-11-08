export type ThemeMode = "light" | "dark";

export interface AccentVars {
  "--primary": string;
  "--primary-foreground": string;
  "--primary-hover": string;
  "--primary-active": string;
  "--primary-soft": string;
  "--primary-soft-foreground": string;
  "--ring": string;
}

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(v)) throw new Error(`Invalid hex color: ${hex}`);
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  const to = (x: number) => Math.round(x).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function hslToHex(h: number, s: number, l: number) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastText(bg: string) {
  return relativeLuminance(bg) > 0.45 ? "#111827" : "#ffffff";
}

/**
 * Generate accent/primary CSS variables from a single color.
 * Apply the returned vars on `[data-ui="kit"]` (or a wrapper) to change accent.
 */
export function generateAccentVars(accent: string, mode: ThemeMode = "light"): AccentVars {
  const { r, g, b } = hexToRgb(accent);
  const { h, s } = rgbToHsl(r, g, b);
  const sat = clamp(s, 0.35, 1);
  if (mode === "dark") {
    const primary = hslToHex(h, sat, 0.62);
    return {
      "--primary": primary,
      "--primary-foreground": contrastText(primary),
      "--primary-hover": hslToHex(h, sat, 0.68),
      "--primary-active": hslToHex(h, sat, 0.56),
      "--primary-soft": hslToHex(h, clamp(sat - 0.15, 0.2, 1), 0.22),
      "--primary-soft-foreground": hslToHex(h, clamp(sat - 0.05, 0.2, 1), 0.82),
      "--ring": hslToHex(h, sat, 0.62),
    };
  }
  const primary = hslToHex(h, sat, 0.48);
  return {
    "--primary": primary,
    "--primary-foreground": contrastText(primary),
    "--primary-hover": hslToHex(h, sat, 0.42),
    "--primary-active": hslToHex(h, sat, 0.38),
    "--primary-soft": hslToHex(h, clamp(sat - 0.1, 0.15, 1), 0.94),
    "--primary-soft-foreground": hslToHex(h, sat, 0.3),
    "--ring": hslToHex(h, sat, 0.48),
  };
}

export function accentStyle(accent: string, mode: ThemeMode = "light"): React.CSSProperties {
  return generateAccentVars(accent, mode) as React.CSSProperties;
}
