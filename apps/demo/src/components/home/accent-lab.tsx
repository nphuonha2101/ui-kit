"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Progress,
  Switch,
} from "@nphuonha/ui-kit";
import { AccentPicker } from "@/components/site/accent-picker";
import { useThemeSettings } from "@/components/site/providers";

const tokens = [
  { name: "--primary", note: "Action fill" },
  { name: "--primary-soft", note: "Quiet fill" },
  { name: "--primary-soft-foreground", note: "Text on soft" },
  { name: "--ring", note: "Focus ring" },
  { name: "--surface", note: "Tonal step" },
  { name: "--border", note: "Hairline" },
];

export function AccentLab() {
  const { accent, dark } = useThemeSettings();
  const [values, setValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const token of tokens) {
      next[token.name] = styles.getPropertyValue(token.name).trim();
    }
    setValues(next);
  }, [accent, dark]);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border/60 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            {accent ? "Accent applied" : "Default accent"}
          </p>
        </div>
        <div className="mt-3">
          <AccentPicker />
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="flex flex-col gap-5 border-b border-border/60 p-5 md:border-b-0 md:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>

          <div className="flex flex-col gap-3">
            <Checkbox label="Email me about releases" defaultChecked />
            <Switch label="Follow the accent everywhere" defaultChecked />
          </div>

          <Progress value={68} label="Migrated tokens" showValue size="sm" />

          <Link
            href="/docs/theming"
            className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Theme reference <ArrowUpRightIcon size={13} />
          </Link>
        </div>

        <div className="flex flex-col">
          <p className="px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Tokens
          </p>
          <dl className="mt-2 flex flex-col px-2 pb-2">
            {tokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center gap-3 rounded-control px-3 py-2.5 transition-colors hover:bg-surface/70"
              >
                <span
                  className="size-6 shrink-0 rounded-xs shadow-[inset_0_0_0_1px_var(--border)] transition-[background-color,box-shadow] duration-300"
                  style={{ background: `var(${token.name})` }}
                  aria-hidden
                />
                <dt className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-[11px] text-foreground">
                    {token.name}
                  </span>
                  <span className="block text-[10px] text-muted-foreground">{token.note}</span>
                </dt>
                <dd className="shrink-0 font-mono text-[10px] uppercase text-muted-foreground">
                  {values[token.name] || "—"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Card>
  );
}
