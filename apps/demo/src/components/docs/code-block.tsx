"use client";

import * as React from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { cn } from "@nphuonha/ui-kit";

export interface CodeBlockProps {
  code: string;
  language?: Language;
  filename?: string;
  className?: string;
}

function copyText(value: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const onCopy = React.useCallback(async () => {
    try {
      await copyText(code);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div
      className={cn(
        "surface-curved relative overflow-hidden rounded-overlay bg-[#0b0f19] text-[#e5e7eb] shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#8b95a7]">
          {filename ?? language}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex size-7 items-center justify-center rounded-xs text-[#8b95a7] transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <CheckIcon size={14} weight="bold" /> : <CopyIcon size={14} />}
        </button>
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              "overflow-x-auto p-4 font-mono text-[13px] leading-6",
              preClassName,
            )}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
