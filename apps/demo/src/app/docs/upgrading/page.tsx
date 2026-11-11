import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  InfoIcon,
  TerminalWindowIcon,
} from "@/components/icons";
import { Alert, buttonVariants } from "@nphuonha/ui-kit";
import { AgentCopyButton } from "@/components/docs/agent-copy-button";
import { CodeBlock } from "@/components/docs/code-block";
import { UpgradeReleases } from "@/components/docs/upgrade-releases";
import { PageHeader } from "@/components/docs/page-header";
import { DOCS_URL, UPGRADING_AGENT_PROMPT } from "@/content/llms";
import { latestRelease, releases } from "@/content/migrations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Upgrading",
  description:
    "Upgrade @nphuonha/ui-kit safely. Every breaking API change is recorded with an old snippet, a new snippet, a search pattern and a fix.",
  path: "/docs/upgrading/",
});

const checklist = [
  "Read the installed version from package.json and choose the target version.",
  "Apply only the releases between those versions, oldest first.",
  "Run typecheck and tests. Type errors usually point at renamed or removed props.",
  "Spot-check focus rings, overlays, dark mode and the runtime accent.",
];

export default function UpgradingPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Upgrading"
        description="Move between kit versions without guessing. Each release records old code, new code and a search pattern so people and coding agents can patch quickly."
        action={<AgentCopyButton text={UPGRADING_AGENT_PROMPT} />}
      />

      <div className="flex flex-col gap-10">
        <Alert variant="info" title={`Latest release: ${latestRelease.version}`}>
          Additive changes ship in minor releases. Breaking API changes require a major
          release (or a minor while the package is 0.x) and always get a migration row below.
        </Alert>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Upgrade checklist</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {checklist.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-card bg-surface/60 p-3.5 text-sm leading-6 text-muted-foreground"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-soft font-mono text-[11px] font-semibold text-primary-soft-foreground">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`npm install @nphuonha/ui-kit@latest
npm run typecheck
npm test`}
            language="bash"
            filename="Terminal"
          />
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <TerminalWindowIcon size={18} className="text-primary" />
            <h2 className="text-xl font-semibold tracking-[-0.025em]">Agent workflow</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Point coding agents at the machine-readable upgrade file before they bump the
            package. It lists every release, the rows to apply and the rule that missing
            migrations must be reported instead of invented.
          </p>
          <CodeBlock
            code={`${DOCS_URL}/docs/upgrading/llms.txt`}
            language="bash"
            filename="Machine-readable upgrade guide"
          />
          <CodeBlock
            code={UPGRADING_AGENT_PROMPT}
            language="markdown"
            filename="Prompt to copy"
          />
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.025em]">
              Release migrations
            </h2>
            <p className="mt-1 text-sm leading-7 text-muted-foreground">
              Apply entries oldest → newest. Additive rows are optional; rename, remove and
              replace rows are required. Pick From/To to narrow to your upgrade path.
            </p>
          </div>
          <UpgradeReleases releases={releases} />
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <InfoIcon size={18} className="text-primary" />
            <h2 className="text-xl font-semibold tracking-[-0.025em]">
              When something is missing
            </h2>
          </div>
          <ul className="flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
            {[
              "Open the component page and confirm the current prop names.",
              "Inspect node_modules/@nphuonha/ui-kit/dist for the shipped .d.ts files.",
              "If a breaking change has no row here, report it with the type error and the old/new API names.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="https://github.com/nphuonha2101/ui-kit/issues"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Report a missing migration
              <ArrowUpRightIcon size={14} />
            </Link>
            <Link
              href="https://github.com/nphuonha2101/ui-kit/releases"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Releases
              <ArrowUpRightIcon size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
