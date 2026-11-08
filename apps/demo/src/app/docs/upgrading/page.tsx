import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  InfoIcon,
  TerminalWindowIcon,
} from "@/components/icons";
import { Alert, Badge, buttonVariants } from "@nphuonha/ui-kit";
import { AgentCopyButton } from "@/components/docs/agent-copy-button";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { DOCS_URL, UPGRADING_AGENT_PROMPT } from "@/content/llms";
import {
  latestRelease,
  releases,
  type MigrationKind,
  type ReleaseMigration,
} from "@/content/migrations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Upgrading",
  description:
    "Upgrade @nphuonha/ui-kit safely. Every breaking API change is recorded with an old snippet, a new snippet, a search pattern and a fix.",
  path: "/docs/upgrading/",
});

const kindBadge: Record<
  MigrationKind,
  { label: string; variant: "neutral" | "info" | "warning" | "danger" | "success" }
> = {
  additive: { label: "Additive", variant: "info" },
  behavior: { label: "Behavior", variant: "warning" },
  rename: { label: "Rename", variant: "danger" },
  remove: { label: "Removed", variant: "danger" },
  replace: { label: "Replaced", variant: "danger" },
};

const checklist = [
  "Read the installed version from package.json and choose the target version.",
  "Apply only the releases between those versions, oldest first.",
  "Run typecheck and tests. Type errors usually point at renamed or removed props.",
  "Spot-check focus rings, overlays, dark mode and the runtime accent.",
];

function ReleaseCard({ release }: { release: ReleaseMigration }) {
  return (
    <article className="surface-curved relative rounded-card bg-card p-5 shadow-soft">
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-[-0.02em]">v{release.version}</h3>
        <Badge variant={release.breaking ? "danger" : "success"}>
          {release.breaking ? "Breaking changes" : "No breaking changes"}
        </Badge>
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {release.date}
        </span>
      </header>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">{release.summary}</p>

      {release.changes.length > 0 ? (
        <div className="mt-4 overflow-x-auto rounded-control bg-surface/40">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Surface</th>
                <th className="px-4 py-3 font-semibold">Before</th>
                <th className="px-4 py-3 font-semibold">After</th>
                <th className="px-4 py-3 font-semibold">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {release.changes.map((change) => {
                const badge = kindBadge[change.kind];
                return (
                  <tr key={change.id} className="align-top transition-colors hover:bg-surface/50">
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="font-medium text-foreground">{change.surface}</div>
                      <Badge variant={badge.variant} className="mt-1.5">
                        {badge.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <code className="break-words font-mono text-xs text-muted-foreground">
                        {change.before}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="break-words font-mono text-xs text-foreground">
                        {change.after}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <p className="leading-6">{change.fix}</p>
                      <code className="mt-1.5 inline-block break-all font-mono text-[11px] text-muted-foreground/80">
                        find: {change.find}
                      </code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </article>
  );
}

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
              replace rows are required.
            </p>
          </div>
          {releases.map((release) => (
            <ReleaseCard key={release.version} release={release} />
          ))}
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
