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

function srgbToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
}

function linearToSrgb(channel: number) {
  const value = clamp(channel);
  return (
    255 *
    (value <= 0.0031308
      ? 12.92 * value
      : 1.055 * Math.pow(value, 1 / 2.4) - 0.055)
  );
}

function rgbToOklch(r: number, g: number, b: number) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  const lightness =
    0.2104542553 * lRoot + 0.7936177850 * mRoot - 0.0040720468 * sRoot;
  const a =
    1.9779984951 * lRoot - 2.4285922050 * mRoot + 0.4505937099 * sRoot;
  const bAxis =
    0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.8086757660 * sRoot;

  return {
    l: lightness,
    c: Math.hypot(a, bAxis),
    h: (Math.atan2(bAxis, a) * 180) / Math.PI,
  };
}

function oklchToLinearRgb(lightness: number, chroma: number, hue: number) {
  const radians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const bAxis = chroma * Math.sin(radians);

  const l = Math.pow(lightness + 0.3963377774 * a + 0.2158037573 * bAxis, 3);
  const m = Math.pow(lightness - 0.1055613458 * a - 0.0638541728 * bAxis, 3);
  const s = Math.pow(lightness - 0.0894841775 * a - 1.2914855480 * bAxis, 3);

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  };
}

function oklchToHex(lightness: number, chroma: number, hue: number) {
  // Reduce chroma until the color fits sRGB, instead of clipping channels
  // (which shifts hue and makes neon accents look muddy at the edges).
  let low = 0;
  let high = chroma;
  for (let index = 0; index < 16; index += 1) {
    const mid = (low + high) / 2;
    const rgb = oklchToLinearRgb(lightness, mid, hue);
    if (
      rgb.r >= -1e-6 &&
      rgb.r <= 1 + 1e-6 &&
      rgb.g >= -1e-6 &&
      rgb.g <= 1 + 1e-6 &&
      rgb.b >= -1e-6 &&
      rgb.b <= 1 + 1e-6
    ) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const rgb = oklchToLinearRgb(lightness, low, hue);
  return rgbToHex(
    linearToSrgb(rgb.r),
    linearToSrgb(rgb.g),
    linearToSrgb(rgb.b),
  );
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(a: string, b: string) {
  const first = relativeLuminance(a);
  const second = relativeLuminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function contrastText(bg: string) {
  return contrastRatio(bg, "#ffffff") >= contrastRatio(bg, "#111827")
    ? "#ffffff"
    : "#111827";
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
  // Light accents are derived in OKLCH so every hue lands on the same
  // perceived lightness. HSL keeps saturated cyans/yellows/neons much
  // brighter than indigo at the same L value, which reads as glare.
  const oklch = rgbToOklch(r, g, b);
  const neutral = oklch.c < 0.01;
  const hue = neutral ? 0 : oklch.h;
  const chroma = neutral
    ? 0
    : clamp(oklch.c * 0.8, 0.02, 0.17);
  const softChroma = neutral
    ? 0
    : Math.min(0.04, Math.max(0.01, chroma * 0.25));
  const softForegroundChroma = neutral
    ? 0
    : Math.min(0.12, Math.max(0.02, chroma * 0.65));

  const primary = oklchToHex(0.52, chroma, hue);
  return {
    "--primary": primary,
    "--primary-foreground": contrastText(primary),
    "--primary-hover": oklchToHex(0.47, chroma, hue),
    "--primary-active": oklchToHex(0.42, chroma, hue),
    "--primary-soft": oklchToHex(0.94, softChroma, hue),
    "--primary-soft-foreground": oklchToHex(0.36, softForegroundChroma, hue),
    "--ring": primary,
  };
}

export function accentStyle(accent: string, mode: ThemeMode = "light"): React.CSSProperties {
  return generateAccentVars(accent, mode) as React.CSSProperties;
}
