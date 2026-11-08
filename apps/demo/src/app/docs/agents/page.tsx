import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  RobotIcon,
  TerminalWindowIcon,
} from "@/components/icons";
import { Badge, buttonVariants } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { componentGroups } from "@/content/components";
import { DOCS_URL } from "@/content/llms";

export const metadata: Metadata = { title: "For agents" };

const prompt = `Read ${DOCS_URL}/llms.txt before writing UI.
Use @nphuonha/ui-kit as the source of truth for primitives.
Import the stylesheet once and put data-ui="kit" on <html>.
Prefer semantic tokens, existing components and the documented props.
Do not add another component library unless explicitly asked.`;

const rules = [
  "Install @nphuonha/ui-kit and import the stylesheet once at the app root.",
  'Put data-ui="kit" on <html>; add class="dark" to the same element for dark mode.',
  "Use semantic utilities and tokens instead of raw colors: bg-card, bg-surface, text-muted-foreground, rounded-card, shadow-soft.",
  "Prefer the kit's Button, Input, Field, Dialog, Sheet and Popover over new dependencies.",
  "Use startIcon/endIcon on buttons; activeIcon on BottomNav/DesktopNav items.",
  "Use generateAccentVars or accentStyle for runtime accent changes.",
];

export default function AgentsPage() {
  const groups = componentGroups.filter((group) => group.components.length > 0);

  return (
    <div className="max-w-3xl">
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="primary">AI</Badge>
        <span className="text-xs font-medium text-muted-foreground">
          Machine-readable docs
        </span>
      </div>
      <PageHeader
        title="For agents"
        description="A compact, opinionated guide for coding agents. Point your agent at llms.txt once, then let it work against the kit instead of inventing another UI layer."
      />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.025em]">
                One link to load everything
              </h2>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                The machine-readable file contains setup rules, token conventions and the
                full component map with links.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: "sm" })}
              >
                Open llms.txt
                <ArrowUpRightIcon size={14} />
              </Link>
              <Link
                href="/docs/components"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                Component index
              </Link>
            </div>
          </div>
          <CodeBlock code={`${DOCS_URL}/llms.txt`} language="bash" filename="llms.txt" />
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <RobotIcon size={18} className="text-primary" />
            <h2 className="text-xl font-semibold tracking-[-0.025em]">
              Prompt to copy
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Paste this into your coding agent before it starts on a screen or component.
          </p>
          <CodeBlock code={prompt} language="markdown" filename="Agent prompt" />
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TerminalWindowIcon size={18} className="text-primary" />
            <h2 className="text-xl font-semibold tracking-[-0.025em]">
              Rules agents should follow
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {rules.map((rule) => (
              <div
                key={rule}
                className="flex items-start gap-2.5 rounded-card bg-surface/60 p-3.5 text-sm leading-6 text-muted-foreground"
              >
                <CheckCircleIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">
            Component map
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            The same list is included in <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">llms.txt</code>.
            Each link opens the live API, props and examples.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.category} className="rounded-card bg-surface/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{group.category}</h3>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {group.components.length}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.components.map((component) => (
                    <Link
                      key={component.slug}
                      href={`/docs/components/${component.slug}`}
                      className="rounded-pill bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {component.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-3 rounded-card bg-surface/60 p-4 text-sm text-muted-foreground">
          <span>
            Need the full setup? Read{" "}
            <Link href="/docs/installation" className="docs-link">
              Installation
            </Link>{" "}
            and{" "}
            <Link href="/docs/theming" className="docs-link">
              Theming
            </Link>
            .
          </span>
        </section>
      </div>
    </div>
  );
}
