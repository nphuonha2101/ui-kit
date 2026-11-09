"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Button } from "@nphuonha/ui-kit";
import { copyText } from "@/lib/clipboard";

export function AgentCopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
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
      await copyText(text);
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
      variant="secondary"
      size="sm"
      startIcon={copied ? CheckIcon : CopyIcon}
      onClick={onCopy}
      aria-live="polite"
      className={className}
    >
      {copied ? "Copied" : "Copy for agent"}
    </Button>
  );
}
