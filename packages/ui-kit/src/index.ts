// @nphuonha/ui-kit — solid, clean, flat, modern.
// Usage:
//   import "@nphuonha/ui-kit/styles.css";
//   import { Button } from "@nphuonha/ui-kit";
// Scope with <div data-ui="kit">. Kit styles never touch anything outside it.
// Portalled overlays (Dialog, Popover, Menu, Select, Tooltip, Toaster, …)
// carry their own data-ui="kit" scope, so they work even outside the wrapper.
// Keep `.dark` on <html> and apply accentStyle to documentElement so portals
// inherit dark mode + accent.

export { cn } from "./lib/utils";
export type { IconComponent } from "./lib/utils";
export { generateAccentVars, accentStyle } from "./lib/color";
export type { AccentVars, ThemeMode } from "./lib/color";
export { IconProvider, useKitIcon } from "./components/ui/_shared/icon-provider";
export type {
  IconProviderProps,
  KitIcon,
  KitIconName,
} from "./components/ui/_shared/icon-provider";

export * from "./components/ui/accordion";
export * from "./components/ui/alert";
export * from "./components/ui/alert-dialog";
export * from "./components/ui/avatar";
export * from "./components/ui/badge";
export * from "./components/ui/bottom-nav";
export * from "./components/ui/breadcrumb";
export * from "./components/ui/button";
export * from "./components/ui/calendar";
export * from "./components/ui/card";
export * from "./components/ui/checkbox";
export * from "./components/ui/checkbox-group";
export * from "./components/ui/collapsible";
export * from "./components/ui/color-picker";
export * from "./components/ui/combobox";
export * from "./components/ui/context-menu";
export * from "./components/ui/date-picker";
export * from "./components/ui/date-time-picker";
export * from "./components/ui/data-table";
export * from "./components/ui/desktop-nav";
export * from "./components/ui/dialog";
export * from "./components/ui/empty-state";
export * from "./components/ui/field";
export * from "./components/ui/fieldset";
export * from "./components/ui/file-upload";
export * from "./components/ui/form";
export * from "./components/ui/icon-button";
export * from "./components/ui/input";
export * from "./components/ui/kbd";
export * from "./components/ui/label";
export * from "./components/ui/menu";
export * from "./components/ui/meter";
export * from "./components/ui/mobile-nav";
export * from "./components/ui/number-field";
export * from "./components/ui/otp-field";
export * from "./components/ui/pagination";
export * from "./components/ui/popover";
export * from "./components/ui/preview-card";
export * from "./components/ui/progress";
export * from "./components/ui/radio-group";
export * from "./components/ui/scroll-area";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/sheet";
export * from "./components/ui/skeleton";
export * from "./components/ui/slider";
export * from "./components/ui/spinner";
export * from "./components/ui/switch";
export * from "./components/ui/table";
export * from "./components/ui/tabs";
export * from "./components/ui/textarea";
export * from "./components/ui/time-field";
export * from "./components/ui/toast";
export * from "./components/ui/toggle";
export * from "./components/ui/toggle-group";
export * from "./components/ui/toolbar";
export * from "./components/ui/tooltip";
