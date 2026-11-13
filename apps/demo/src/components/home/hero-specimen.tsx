"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import {
  Button,
  type ButtonVariants,
  Card,
  IconButton,
  ScrollArea,
  ToggleGroup,
  cn,
  toast,
} from "@nphuonha/ui-kit";
import { copyText } from "@/lib/clipboard";

type Variant = NonNullable<ButtonVariants["variant"]>;
type Size = Extract<NonNullable<ButtonVariants["size"]>, "sm" | "default" | "lg">;

const variants: { value: Variant; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
];

const sizes: { value: Size; label: string }[] = [
  { value: "sm", label: "sm" },
  { value: "default", label: "md" },
  { value: "lg", label: "lg" },
];

export function HeroSpecimen() {
  const [variant, setVariant] = React.useState<Variant>("primary");
  const [size, setSize] = React.useState<Size>("default");
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const code =
    size === "default"
      ? `<Button variant="${variant}">Continue</Button>`
      : `<Button variant="${variant}" size="${size}">Continue</Button>`;

  const onCopy = async () => {
    try {
      await copyText(code);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div data-motion="hero-card" className="relative w-full">
      <Card className="overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-overlay)]">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
          <span className="text-sm font-semibold">Button</span>
        </div>

        <div className="preview-canvas relative flex min-h-[216px] items-center justify-center p-10">
          <div
            key={`${variant}-${size}`}
            className="animate-in fade-in zoom-in-95 duration-200"
          >
            <Button
              variant={variant}
              size={size}
              className="min-w-32 transition-[transform,background-color,color,box-shadow] duration-300"
              onClick={() =>
                toast("Continue pressed", {
                  description: `variant="${variant}" · size="${size === "default" ? "md" : size}"`,
                })
              }
            >
              Continue
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/60 p-5">
          <div className="flex min-w-0 flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Variant
            </span>
            <ScrollArea
              orientation="horizontal"
              scrollbar="hidden"
              className="w-full min-w-0 md:w-auto"
              viewportClassName="px-1 max-sm:[mask-image:linear-gradient(to_right,#000_88%,transparent)]"
            >
              <ToggleGroup
                aria-label="Button variant"
                items={variants}
                value={[variant]}
                variant="segmented"
                onValueChange={(next) => next[0] && setVariant(next[0] as Variant)}
                className="w-max"
              />
            </ScrollArea>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Size
            </span>
            <ToggleGroup
              variant="segmented"
              aria-label="Button size"
              items={sizes}
              value={[size]}
              onValueChange={(next) => next[0] && setSize(next[0] as Size)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-surface/60 px-5 py-2.5">
          <code
            aria-live="polite"
            className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground"
          >
            {code}
          </code>
          <IconButton
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onCopy}
            aria-label={copied ? "Copied" : "Copy snippet"}
            className={cn("size-7 shrink-0", copied && "text-success")}
          >
            {copied ? <CheckIcon size={14} weight="bold" /> : <CopyIcon size={14} />}
          </IconButton>
        </div>
      </Card>
    </div>
  );
}
