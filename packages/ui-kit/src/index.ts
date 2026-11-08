// @nphuonha/ui-kit — solid, clean, flat, modern.
// Usage:
//   import "@nphuonha/ui-kit/styles.css";
//   import { Button } from "@nphuonha/ui-kit";
// Scope with <div data-ui="kit"> (put on <html> for portalled overlays).

export { cn } from "./lib/utils";
export type { IconComponent } from "./lib/utils";
export { generateAccentVars, accentStyle } from "./lib/color";
export type { AccentVars, ThemeMode } from "./lib/color";

export * from "./components/ui/alert";
export * from "./components/ui/badge";
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/checkbox";
export * from "./components/ui/dialog";
export * from "./components/ui/field";
export * from "./components/ui/icon-button";
export * from "./components/ui/input";
export * from "./components/ui/label";
export * from "./components/ui/popover";
export * from "./components/ui/radio-group";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/spinner";
export * from "./components/ui/switch";
export * from "./components/ui/tabs";
export * from "./components/ui/textarea";
export * from "./components/ui/toast";
export * from "./components/ui/tooltip";
