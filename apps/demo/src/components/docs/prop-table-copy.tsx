"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Button } from "@nphuonha/ui-kit";
import type { ComponentProp } from "@/content/types";
import { copyText } from "@/lib/clipboard";

function escapeCell(value: string) {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

function toMarkdown(props: ComponentProp[], title?: string) {
  const rows = props.map(
    (prop) =>
      `| \`${prop.name}\` | \`${escapeCell(prop.type)}\` | ${
        prop.default ? `\`${escapeCell(prop.default)}\`` : "—"
      } | ${escapeCell(prop.description)} |`,
  );

  const table = [
    "| Prop | Type | Default | Description |",
    "| --- | --- | --- | --- |",
    ...rows,
  ].join("\n");

  return title ? `## ${title} props\n\n${table}` : table;
}

export function PropTableCopyButton({
  props,
  title,
}: {
  props: ComponentProp[];
  title?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await copyText(toMarkdown(props, title));
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      startIcon={copied ? CheckIcon : CopyIcon}
      onClick={onCopy}
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy API"}
    </Button>
  );
}
