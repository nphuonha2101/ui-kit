"use client";

import * as React from "react";
import { CodeIcon, EyeIcon } from "@phosphor-icons/react";
import { cn } from "@nphuonha/ui-kit";
import { CodeBlock } from "./code-block";

export interface ComponentPreviewProps {
  code: string;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function ComponentPreview({
  code,
  children,
  title = "Live preview",
  className,
}: ComponentPreviewProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview");

  return (
    <div
      className={cn(
        "surface-curved relative overflow-hidden rounded-card bg-card shadow-soft",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 bg-surface/40 px-3.5 py-2">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <div className="flex items-center gap-0.5 rounded-pill bg-surface p-1">
          <button
            type="button"
            onClick={() => setView("preview")}
            aria-pressed={view === "preview"}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-pill px-2.5 text-xs font-medium transition-[background-color,color,box-shadow]",
              view === "preview"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <EyeIcon size={13} />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setView("code")}
            aria-pressed={view === "code"}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-pill px-2.5 text-xs font-medium transition-[background-color,color,box-shadow]",
              view === "code"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <CodeIcon size={13} />
            Code
          </button>
        </div>
      </div>
      {view === "preview" ? (
        <div className="preview-canvas flex min-h-[260px] w-full items-center justify-center p-6">
          <div className="w-full">{children}</div>
        </div>
      ) : (
        <CodeBlock
          code={code}
          className="rounded-none shadow-none"
        />
      )}
    </div>
  );
}
