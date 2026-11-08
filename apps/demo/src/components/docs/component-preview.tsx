"use client";

import * as React from "react";
import { CodeIcon, EyeIcon } from "@phosphor-icons/react";
import { Tabs, cn } from "@nphuonha/ui-kit";
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
  const tabs = [
    {
      value: "preview",
      label: (
        <span className="inline-flex items-center gap-1.5">
          <EyeIcon size={13} />
          Preview
        </span>
      ),
      content: (
        <div className="preview-canvas flex min-h-[260px] w-full items-center justify-center p-6">
          <div className="w-full">{children}</div>
        </div>
      ),
    },
    {
      value: "code",
      label: (
        <span className="inline-flex items-center gap-1.5">
          <CodeIcon size={13} />
          Code
        </span>
      ),
      content: <CodeBlock code={code} className="rounded-none shadow-none" />,
    },
  ];

  return (
    <div
      className={cn(
        "surface-curved relative overflow-hidden rounded-card bg-card shadow-soft",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-surface/40"
      />
      <span className="pointer-events-none absolute left-4 top-5 z-10 text-xs font-medium text-muted-foreground">
        {title}
      </span>
      <Tabs
        defaultValue="preview"
        items={tabs}
        className="relative z-10"
        listClassName="ml-auto mr-2 mt-2 mb-2 flex w-fit"
        panelClassName="mt-0 rounded-none focus-visible:ring-0"
      />
    </div>
  );
}
