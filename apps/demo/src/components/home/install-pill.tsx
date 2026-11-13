"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Card, IconButton, cn } from "@nphuonha/ui-kit";
import { copyText } from "@/lib/clipboard";

const command = "npm install @nphuonha/ui-kit";

export function InstallPill({ className }: { className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await copyText(command);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card
      className={cn(
        "inline-flex h-11 max-w-full items-center gap-2 rounded-pill pl-4 pr-1",
        className,
      )}
    >
      <span aria-hidden className="font-mono text-[11px] text-muted-foreground">
        $
      </span>
      <code className="truncate font-mono text-xs text-foreground">{command}</code>
      <IconButton
        type="button"
        onClick={onCopy}
        variant="ghost"
        size="icon-sm"
        shape="pill"
        aria-label={copied ? "Copied install command" : "Copy install command"}
        className={cn("ml-0.5 shrink-0", copied && "text-success")}
      >
        {copied ? <CheckIcon size={15} weight="bold" /> : <CopyIcon size={15} />}
      </IconButton>
    </Card>
  );
}
