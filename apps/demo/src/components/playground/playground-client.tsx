"use client";

import * as React from "react";
import Editor, {
  loader,
  type BeforeMount,
  type Monaco,
  type OnMount,
} from "@monaco-editor/react";
import type { editor as monacoEditor } from "monaco-editor";
import {
  ArrowClockwiseIcon,
  FileTsxIcon,
  MonitorIcon,
  PlayIcon,
  TerminalIcon,
} from "@phosphor-icons/react";
import { Badge, Button, Spinner, cn } from "@nphuonha/ui-kit";
import { useThemeSettings } from "@/components/site/providers";
import { createSandboxHtml } from "./sandbox";

loader.config({ paths: { vs: "/monaco/vs" } });

const STARTER_CODE = `import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@nphuonha/ui-kit";

export default function App() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Project settings</CardTitle>
          <Badge variant="primary">Live</Badge>
        </div>
        <CardDescription>
          Edit the code on the left. The preview updates when you stop typing.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Workspace name
          <Input defaultValue="nphuonha UI" />
        </label>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" />
          Preview is running in a sandbox
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}`;

const EXAMPLES = [
  {
    name: "Starter",
    code: STARTER_CODE,
  },
  {
    name: "Actions",
    code: `import { Alert, Badge, Button, Spinner } from "@nphuonha/ui-kit";

export default function App() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Ready</Badge>
        <Badge variant="warning">Draft</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <Alert variant="info" title="Heads up">
        Use the playground to try kit primitives without setting up a project.
      </Alert>
      <Button loading>Loading state</Button>
      <Spinner />
    </div>
  );
}`,
  },
  {
    name: "Overlays",
    code: `import { Button, Dialog, Popover } from "@nphuonha/ui-kit";

export default function App() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Dialog
        trigger={<Button>Open dialog</Button>}
        title="Dialog title"
        description="Portalled content inherits the kit theme."
        footer={<Button>Confirm</Button>}
      >
        <p className="text-sm text-muted-foreground">
          Dialogs render in a portal and keep the current accent and dark mode.
        </p>
      </Dialog>
      <Popover
        trigger={<Button variant="secondary">Open popover</Button>}
        title="Popover"
        description="Anchored content."
      >
        <p className="text-sm text-muted-foreground">
          Popovers use the same solid surface language.
        </p>
      </Popover>
    </div>
  );
}`,
  },
];

const ACCENT_KEYS = [
  "--primary",
  "--primary-foreground",
  "--primary-hover",
  "--primary-active",
  "--primary-soft",
  "--primary-soft-foreground",
  "--ring",
] as const;

type Status = "booting" | "compiling" | "ready" | "error";
type LogLevel = "log" | "info" | "warn" | "error";
type LogItem = { id: number; level: LogLevel; text: string };

const configuredMonaco = new WeakSet<Monaco>();
let typesPromise:
  | Promise<{ files: Array<{ path: string; content: string }> }>
  | null = null;

function loadTypes() {
  if (!typesPromise) {
    typesPromise = fetch("/playground/types.json", { cache: "no-store" }).then(
      (response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load playground types (${response.status}).`,
          );
        }
        return response.json() as Promise<{
          files: Array<{ path: string; content: string }>;
        }>;
      },
    );
  }
  return typesPromise;
}

function configureTypes(monaco: Monaco) {
  if (configuredMonaco.has(monaco)) return;
  configuredMonaco.add(monaco);

  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2022,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    baseUrl: "file:///",
    paths: {
      react: ["node_modules/@types/react/index.d.ts"],
      "react/jsx-runtime": ["node_modules/@types/react/jsx-runtime.d.ts"],
      "react/jsx-dev-runtime": ["node_modules/@types/react/jsx-dev-runtime.d.ts"],
      "react-dom": ["node_modules/@types/react-dom/index.d.ts"],
      "react-dom/client": ["node_modules/@types/react-dom/client.d.ts"],
      csstype: ["node_modules/csstype/index.d.ts"],
    },
    typeRoots: ["node_modules/@types"],
  });

  void loadTypes()
    .then((data) => {
      for (const file of data.files) {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          file.content,
          file.path,
        );
      }
    })
    .catch((error: unknown) => {
      console.warn("Playground types unavailable:", error);
    });
}

function normalizeColor(color: string) {
  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }
  return color;
}

function readColor(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return normalizeColor(
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
      fallback,
  );
}

function stripColor(color: string) {
  return color.startsWith("#") ? color.slice(1) : color;
}

function withAlpha(color: string, alpha: string) {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? `${color}${alpha}` : color;
}

function defineKitTheme(monaco: Monaco, dark: boolean) {
  const primary = readColor("--primary", dark ? "#818cf8" : "#4f46e5");
  const card = readColor("--card", dark ? "#171a22" : "#ffffff");
  const foreground = readColor(
    "--foreground",
    dark ? "#f1f3f8" : "#16181d",
  );
  const muted = readColor(
    "--muted-foreground",
    dark ? "#9ba3b4" : "#63697a",
  );
  const info = readColor("--info", dark ? "#38bdf8" : "#0284c7");
  const warning = readColor("--warning", dark ? "#fbbf24" : "#d97706");
  const destructive = readColor(
    "--destructive",
    dark ? "#f87171" : "#dc2626",
  );

  // React/TSX-optimized palette, adapted to card background.
  // Dark = One Dark Pro style, Light = One Light / GitHub style.
  // JSX tags red, props orange, hooks/functions blue, types yellow.
  const code = dark
    ? {
        comment: "#7f848e",
        keyword: "#c678dd",
        string: "#98c379",
        number: "#d19a66",
        type: "#e5c07b",
        function: "#61afef",
        variable: "#abb2bf",
        operator: "#56b6c2",
        delimiter: "#828997",
        tag: "#e06c75",
        attribute: "#d19a66",
      }
    : {
        comment: "#a0a1a7",
        keyword: "#a626a4",
        string: "#50a14f",
        number: "#986801",
        type: "#c18401",
        function: "#4078f2",
        variable: "#383a42",
        operator: "#0184bc",
        delimiter: "#5c6773",
        tag: "#e45649",
        attribute: "#986801",
      };

  monaco.editor.defineTheme("kit", {
    base: dark ? "vs-dark" : "vs",
    inherit: false,
    rules: [
      { token: "", foreground: stripColor(code.variable) },
      {
        token: "comment",
        foreground: stripColor(code.comment),
        fontStyle: "italic",
      },
      { token: "string", foreground: stripColor(code.string) },
      { token: "string.jsx", foreground: stripColor(code.string) },
      { token: "string.html", foreground: stripColor(code.string) },
      { token: "string.xml", foreground: stripColor(code.string) },
      { token: "number", foreground: stripColor(code.number) },
      { token: "regexp", foreground: stripColor(code.string) },
      { token: "keyword", foreground: stripColor(code.keyword) },
      { token: "keyword.jsx", foreground: stripColor(code.keyword) },
      { token: "operator", foreground: stripColor(code.operator) },
      { token: "operator.jsx", foreground: stripColor(code.operator) },
      { token: "delimiter", foreground: stripColor(code.delimiter) },
      { token: "delimiter.html", foreground: stripColor(code.delimiter) },
      { token: "delimiter.xml", foreground: stripColor(code.delimiter) },
      {
        token: "delimiter.bracket",
        foreground: stripColor(code.delimiter),
      },
      { token: "delimiter.angle", foreground: stripColor(code.delimiter) },
      { token: "delimiter.parenthesis", foreground: stripColor(code.variable) },
      { token: "tag", foreground: stripColor(code.tag) },
      { token: "metatag", foreground: stripColor(code.tag) },
      { token: "metatag.html", foreground: stripColor(code.tag) },
      { token: "metatag.xml", foreground: stripColor(code.tag) },
      { token: "attribute.name", foreground: stripColor(code.attribute) },
      { token: "attribute.name.jsx", foreground: stripColor(code.attribute) },
      { token: "attribute.name.html", foreground: stripColor(code.attribute) },
      { token: "attribute.name.xml", foreground: stripColor(code.attribute) },
      { token: "attribute.value", foreground: stripColor(code.string) },
      { token: "attribute.value.jsx", foreground: stripColor(code.string) },
      { token: "attribute.value.html", foreground: stripColor(code.string) },
      { token: "type", foreground: stripColor(code.type) },
      { token: "type.identifier", foreground: stripColor(code.type) },
      { token: "identifier", foreground: stripColor(code.variable) },
      { token: "function", foreground: stripColor(code.function) },
      { token: "variable", foreground: stripColor(code.variable) },
      {
        token: "variable.predefined",
        foreground: stripColor(code.operator),
      },
      { token: "constant", foreground: stripColor(code.number) },
      { token: "annotation", foreground: stripColor(code.number) },
    ],
    colors: {
      "editor.background": card,
      "editor.foreground": foreground,
      "editorGutter.background": card,
      "editorLineNumber.foreground": withAlpha(muted, dark ? "99" : "cc"),
      "editorLineNumber.activeForeground": foreground,
      "editorCursor.foreground": primary,
      "editor.selectionBackground": withAlpha(primary, dark ? "45" : "2e"),
      "editor.inactiveSelectionBackground": withAlpha(primary, dark ? "2e" : "1f"),
      "editor.lineHighlightBackground": withAlpha(primary, dark ? "14" : "0f"),
      "editor.lineHighlightBorder": "#00000000",
      "editorWhitespace.foreground": withAlpha(muted, "45"),
      "editorIndentGuide.background1": withAlpha(muted, dark ? "2e" : "30"),
      "editorIndentGuide.activeBackground1": withAlpha(muted, "66"),
      "editorBracketHighlight.foreground1": primary,
      "editorBracketHighlight.foreground2": info,
      "editorBracketHighlight.foreground3": warning,
      "editorBracketHighlight.unexpectedBracket.foreground": destructive,
      "editorWidget.background": card,
      "editorWidget.foreground": foreground,
      "editorWidget.border": withAlpha(muted, "40"),
      "editorSuggestWidget.background": card,
      "editorSuggestWidget.foreground": foreground,
      "editorSuggestWidget.border": withAlpha(muted, "40"),
      "editorSuggestWidget.selectedBackground": withAlpha(primary, "26"),
      "editorSuggestWidget.highlightForeground": primary,
      "editorHoverWidget.background": card,
      "editorHoverWidget.foreground": foreground,
      "editorHoverWidget.border": withAlpha(muted, "40"),
      "editorError.foreground": destructive,
      "editorWarning.foreground": warning,
      "editorInfo.foreground": info,
      "editorOverviewRuler.border": "#00000000",
      "focusBorder": withAlpha(primary, "66"),
      "scrollbarSlider.background": withAlpha(muted, "40"),
      "scrollbarSlider.hoverBackground": withAlpha(muted, "55"),
      "scrollbarSlider.activeBackground": withAlpha(muted, "6e"),
    },
  });
  monaco.editor.setTheme("kit");
}

function collectStyles() {
  const chunks: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        // The sandboxed iframe has an opaque origin, so font files without
        // CORS headers would fail. The kit falls back to system fonts; skip
        // @font-face and @import rules instead of flooding the console.
        if (
          rule.type === CSSRule.FONT_FACE_RULE ||
          rule.type === CSSRule.IMPORT_RULE
        ) {
          continue;
        }
        chunks.push(rule.cssText);
      }
    } catch {
      // Cross-origin sheets cannot be read; skip them.
    }
  }
  return chunks.join("\n");
}

function collectAccentVars() {
  const style = document.documentElement.style;
  const vars: Record<string, string> = {};
  for (const key of ACCENT_KEYS) {
    const value = style.getPropertyValue(key).trim();
    if (value) vars[key] = value;
  }
  return vars;
}

export function PlaygroundClient() {
  const { dark, accent } = useThemeSettings();
  const [code, setCode] = React.useState(STARTER_CODE);
  const [status, setStatus] = React.useState<Status>("booting");
  const [logs, setLogs] = React.useState<LogItem[]>([]);
  const [sandboxHtml, setSandboxHtml] = React.useState<string>();
  const [iframeReady, setIframeReady] = React.useState(false);
  const [iframeKey, setIframeKey] = React.useState(0);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const editorRef = React.useRef<monacoEditor.IStandaloneCodeEditor | null>(null);
  const monacoRef = React.useRef<Monaco | null>(null);
  const compileRef = React.useRef<() => void>(() => {});
  const compileSeq = React.useRef(0);
  const logId = React.useRef(0);

  const addLog = React.useCallback((level: LogLevel, text: string) => {
    const message = text.trim().slice(0, 2000) || "(empty)";
    logId.current += 1;
    const entry = { id: logId.current, level, text: message };
    setLogs((current) => [...current.slice(-79), entry]);
  }, []);

  React.useEffect(() => {
    const origin = window.location.origin;
    setSandboxHtml(
      createSandboxHtml(
        // Cache-bust so a redeployed runtime.js never serves stale code.
        `${origin}/playground/runtime.js?v=${Date.now()}`,
        `${origin}/`,
      ),
    );
  }, []);

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data as
        | {
            source?: string;
            type?: string;
            level?: LogLevel;
            args?: string[];
            message?: string;
            seq?: number;
          }
        | null;
      if (!data || data.source !== "kit-playground") return;

      if (data.type === "ready") {
        setIframeReady(true);
        setStatus("compiling");
        return;
      }

      // Ignore stale results from an older compile that finished late.
      if (
        typeof data.seq === "number" &&
        data.seq !== 0 &&
        data.seq !== compileSeq.current
      ) {
        return;
      }

      if (data.type === "rendered") {
        setStatus("ready");
        return;
      }

      if (data.type === "error") {
        setStatus("error");
        addLog(
          "error",
          typeof data.message === "string" ? data.message : "Unknown runtime error",
        );
        return;
      }

      if (data.type === "log") {
        const level: LogLevel =
          data.level === "info" ||
          data.level === "warn" ||
          data.level === "error" ||
          data.level === "log"
            ? data.level
            : "log";
        const args = Array.isArray(data.args)
          ? data.args.filter((value): value is string => typeof value === "string")
          : [];
        addLog(level, args.join(" "));
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [addLog]);

  const sendTheme = React.useCallback(() => {
    if (!iframeReady) return;
    iframeRef.current?.contentWindow?.postMessage(
      {
        source: "kit-playground-host",
        type: "theme",
        dark,
        styles: collectStyles(),
        accentVars: collectAccentVars(),
      },
      "*",
    );
  }, [dark, iframeReady]);

  React.useEffect(() => {
    sendTheme();
  }, [sendTheme, accent]);

  const compile = React.useCallback(async () => {
    if (!iframeReady) return;
    compileSeq.current += 1;
    const seq = compileSeq.current;
    setStatus("compiling");
    try {
      const { transform } = await import("sucrase");
      // A newer edit started while sucrase was loading: drop this stale run.
      if (seq !== compileSeq.current) return;
      const result = transform(code, {
        transforms: ["typescript", "jsx", "imports"],
        jsxRuntime: "automatic",
        production: true,
        filePath: "App.tsx",
      });
      if (seq !== compileSeq.current) return;
      iframeRef.current?.contentWindow?.postMessage(
        {
          source: "kit-playground-host",
          type: "render",
          code: result.code,
          seq,
        },
        "*",
      );
    } catch (error) {
      if (seq !== compileSeq.current) return;
      setStatus("error");
      addLog("error", error instanceof Error ? error.message : String(error));
    }
  }, [addLog, code, iframeReady]);

  React.useEffect(() => {
    compileRef.current = () => {
      void compile();
    };
  }, [compile]);

  React.useEffect(() => {
    if (!iframeReady) return;
    const timer = window.setTimeout(() => {
      void compile();
    }, 450);
    return () => window.clearTimeout(timer);
  }, [compile, iframeReady]);

  React.useEffect(() => {
    if (!monacoRef.current) return;
    defineKitTheme(monacoRef.current, dark);
  }, [accent, dark]);

  const handleBeforeMount: BeforeMount = (monaco) => {
    defineKitTheme(monaco, dark);
    configureTypes(monaco);
  };

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => compileRef.current(),
    );
    editor.focus();
  };

  const loadExample = (nextCode: string) => {
    setCode(nextCode);
    editorRef.current?.setValue(nextCode);
    editorRef.current?.setPosition({ lineNumber: 1, column: 1 });
    editorRef.current?.focus();
  };

  const clearLogs = () => setLogs([]);

  const resetPreview = React.useCallback(() => {
    // Invalidate in-flight compiles so their late results can't overwrite
    // the fresh iframe, then remount it to drop any stuck React tree.
    compileSeq.current += 1;
    setIframeReady(false);
    setStatus("booting");
    setIframeKey((key) => key + 1);
  }, []);

  const statusMeta =
    status === "ready"
      ? { label: "Ready", variant: "success" as const }
      : status === "error"
        ? { label: "Error", variant: "danger" as const }
        : { label: status === "booting" ? "Booting" : "Compiling", variant: "primary" as const };

  return (
    <div className="mx-auto flex w-full max-w-[1680px] flex-col px-3 pb-5 pt-3 md:px-4">
      <div className="surface-curved relative flex min-h-[680px] flex-col overflow-hidden rounded-card bg-card shadow-soft lg:h-[calc(100dvh-6.5rem)]">
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-border/60 px-3">
          <span className="text-sm font-medium text-foreground">Playground</span>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant={statusMeta.variant} className="hidden sm:inline-flex">
              {status === "booting" || status === "compiling" ? (
                <Spinner size={11} className="shrink-0" />
              ) : null}
              {statusMeta.label}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={resetPreview}
              disabled={!iframeReady && status === "booting"}
              startIcon={ArrowClockwiseIcon}
              aria-label="Reset preview"
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => void compile()}
              loading={!iframeReady || status === "compiling"}
              startIcon={PlayIcon}
            >
              Run
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="hidden w-44 shrink-0 flex-col border-r border-border/60 bg-surface/25 p-3 lg:flex">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Examples
            </p>
            <div className="mt-2 flex flex-col gap-1">
              {EXAMPLES.map((example) => (
                <button
                  key={example.name}
                  type="button"
                  onClick={() => loadExample(example.code)}
                  className={cn(
                    "flex h-8 items-center rounded-control px-2 text-left text-xs transition-colors",
                    code === example.code
                      ? "bg-surface font-medium text-foreground"
                      : "text-muted-foreground hover:bg-surface/60 hover:text-foreground",
                  )}
                >
                  {example.name}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-9 shrink-0 items-center border-b border-border/60 bg-surface/20">
              <div className="flex h-full items-center gap-2 border-r border-border/60 bg-card px-3 text-xs font-medium text-foreground">
                <FileTsxIcon size={13} className="text-primary" />
                App.tsx
              </div>
            </div>

            <div className="grid min-h-0 flex-1 lg:grid-cols-2">
              <div className="flex min-h-[420px] flex-col border-b border-border/60 lg:border-b-0 lg:border-r">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  path="App.tsx"
                  defaultValue={STARTER_CODE}
                  theme="kit"
                  beforeMount={handleBeforeMount}
                  onMount={handleMount}
                  onChange={(value) => setCode(value ?? "")}
                  loading={
                    <div className="flex h-full items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Spinner size={14} />
                      Loading editor…
                    </div>
                  }
                  options={{
                    automaticLayout: true,
                    fontFamily:
                      '"Google Sans Code", ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 13,
                    lineHeight: 22,
                    fontLigatures: true,
                    fontWeight: "400",
                    letterSpacing: 0,
                    tabSize: 2,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    padding: { top: 16, bottom: 16 },
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    cursorWidth: 2,
                    renderLineHighlight: "all",
                    roundedSelection: true,
                    formatOnType: true,
                    formatOnPaste: true,
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    parameterHints: { enabled: true },
                    hover: { enabled: "on" },
                    wordWrap: "on",
                    bracketPairColorization: { enabled: true },
                    guides: {
                      bracketPairs: true,
                      bracketPairsHorizontal: true,
                      indentation: true,
                    },
                    scrollbar: {
                      verticalScrollbarSize: 10,
                      horizontalScrollbarSize: 10,
                      useShadows: false,
                    },
                    overviewRulerBorder: false,
                    lineNumbersMinChars: 3,
                    renderWhitespace: "none",
                    occurrencesHighlight: "singleFile",
                  }}
                />
              </div>

              <div className="flex min-h-[420px] flex-col">
                <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <MonitorIcon size={13} />
                  Preview
                </div>

                <div className="min-h-[280px] flex-1 bg-surface/15">
                  {sandboxHtml ? (
                    <iframe
                      key={iframeKey}
                      ref={iframeRef}
                      title="Playground preview"
                      sandbox="allow-scripts"
                      srcDoc={sandboxHtml}
                      className="h-full min-h-[280px] w-full"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Spinner size={14} />
                      Booting sandbox…
                    </div>
                  )}
                </div>

                <div className="flex h-40 shrink-0 flex-col border-t border-border/60 bg-surface/20">
                  <div className="flex h-8 shrink-0 items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <TerminalIcon size={13} />
                    Console
                    <button
                      type="button"
                      onClick={clearLogs}
                      className="ml-auto text-[10px] font-medium normal-case tracking-normal text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2 font-mono text-[11px] leading-5 scrollbar-none">
                    {logs.length === 0 ? (
                      <p className="text-muted-foreground/70">
                        Runtime logs appear here.
                      </p>
                    ) : (
                      logs.map((log) => (
                        <p
                          key={log.id}
                          className={cn(
                            "whitespace-pre-wrap break-words",
                            log.level === "error"
                              ? "text-destructive"
                              : log.level === "warn"
                                ? "text-warning"
                                : log.level === "info"
                                  ? "text-info"
                                  : "text-muted-foreground",
                          )}
                        >
                          <span className="mr-1.5 opacity-60">
                            {log.level === "error"
                              ? "✕"
                              : log.level === "warn"
                                ? "▲"
                                : log.level === "info"
                                  ? "●"
                                  : "›"}
                          </span>
                          {log.text}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
