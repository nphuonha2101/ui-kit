"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { cn } from "@nphuonha/ui-kit";
import { copyText } from "@/lib/clipboard";

function useCopiedFlag() {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const flag = React.useCallback(() => {
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }, []);

  return { copied, flag };
}

export function InlineCopyButton({ text, label }: { text: string; label: string }) {
  const { copied, flag } = useCopiedFlag();

  const onCopy = async () => {
    try {
      await copyText(text);
      flag();
    } catch {
      // Clipboard unavailable — leave button unchanged.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-xs transition-colors",
        copied
          ? "text-primary"
          : "text-muted-foreground/60 hover:bg-surface hover:text-foreground",
      )}
    >
      {copied ? <CheckIcon size={13} weight="bold" /> : <CopyIcon size={13} />}
    </button>
  );
}
