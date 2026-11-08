"use client";

import * as React from "react";
import { Toaster, generateAccentVars } from "@nphuonha/ui-kit";

type ThemeSettings = {
  dark: boolean;
  setDark: (dark: boolean) => void;
  accent: string | null;
  setAccent: (accent: string | null) => void;
};

const ThemeSettingsContext = React.createContext<ThemeSettings | null>(null);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const ACCENT_KEYS = [
  "--primary",
  "--primary-foreground",
  "--primary-hover",
  "--primary-active",
  "--primary-soft",
  "--primary-soft-foreground",
  "--ring",
] as const;

export function Providers({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(false);
  const [accent, setAccent] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("ui-kit-theme");
      const storedAccent = localStorage.getItem("ui-kit-accent");
      setDark(storedTheme === "dark");
      setAccent(storedAccent || null);
    } catch {
      // Ignore storage failures.
    }
    setReady(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.dataset.ui = "kit";
    root.classList.toggle("dark", dark);

    if (accent) {
      const vars = generateAccentVars(accent, dark ? "dark" : "light");
      for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, value);
      }
      try {
        localStorage.setItem("ui-kit-accent-vars", JSON.stringify(vars));
      } catch {
        // Ignore storage failures.
      }
    } else {
      for (const key of ACCENT_KEYS) root.style.removeProperty(key);
      try {
        localStorage.removeItem("ui-kit-accent-vars");
      } catch {
        // Ignore storage failures.
      }
    }

    try {
      localStorage.setItem("ui-kit-theme", dark ? "dark" : "light");
      if (accent) localStorage.setItem("ui-kit-accent", accent);
      else localStorage.removeItem("ui-kit-accent");
    } catch {
      // Ignore storage failures.
    }
  }, [ready, dark, accent]);

  const value = React.useMemo(
    () => ({ dark, setDark, accent, setAccent }),
    [dark, accent],
  );

  return (
    <ThemeSettingsContext.Provider value={value}>
      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" />
      {children}
    </ThemeSettingsContext.Provider>
  );
}

export function useThemeSettings() {
  const context = React.useContext(ThemeSettingsContext);
  if (!context) throw new Error("useThemeSettings must be used within <Providers>");
  return context;
}
