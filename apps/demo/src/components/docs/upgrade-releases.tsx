"use client";

import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Badge, Input, Select, Switch, cn } from "@nphuonha/ui-kit";
import { copyText } from "@/lib/clipboard";
import {
  InlineCopyButton,
  ReleaseCopyButton,
  formatReleaseCopy,
} from "@/components/docs/migration-copy";
import type { MigrationKind, ReleaseMigration } from "@/content/migrations";

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

function compareVersions(a: string, b: string) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function ReleaseCard({
  release,
  open,
  onToggle,
}: {
  release: ReleaseMigration;
  open: boolean;
  onToggle: () => void;
}) {
  const anchor = `v-${release.version.replaceAll(".", "-")}`;
  const changeCount = release.changes.length;
  return (
    <article
      id={anchor}
      className="surface-curved relative scroll-mt-24 rounded-card bg-card p-5 shadow-soft"
    >
      <header className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${anchor}-panel`}
          aria-label={open ? `Collapse v${release.version}` : `Expand v${release.version}`}
          className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-left"
        >
          <h3 className="text-lg font-semibold tracking-[-0.02em]">
            v{release.version}
          </h3>
          <Badge variant={release.breaking ? "danger" : "success"}>
            {release.breaking ? "Breaking changes" : "No breaking changes"}
          </Badge>
          <span className="font-mono text-[11px] text-muted-foreground">
            {changeCount === 0
              ? "no rows"
              : `${changeCount} change${changeCount > 1 ? "s" : ""}`}
          </span>
          <CaretDownIcon
            size={14}
            className={cn(
              "shrink-0 text-muted-foreground transition-transform duration-[var(--duration-ui)]",
              open && "rotate-180",
            )}
          />
        </button>
        <span className="ml-auto flex items-center gap-1">
          <ReleaseCopyButton release={release} />
          <span className="font-mono text-xs text-muted-foreground">{release.date}</span>
        </span>
      </header>

      {open ? (
        <div id={`${anchor}-panel`}>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {release.summary}
          </p>

          {changeCount > 0 ? (
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
                      <tr
                        key={change.id}
                        className="align-top transition-colors hover:bg-surface/50"
                      >
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="font-medium text-foreground">
                            {change.surface}
                          </div>
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
                          <div className="flex items-start gap-1.5">
                            <code className="flex-1 break-words font-mono text-xs text-foreground">
                              {change.after}
                            </code>
                            <InlineCopyButton
                              text={change.after}
                              label={`Copy after snippet for ${change.surface}`}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          <p className="leading-6">{change.fix}</p>
                          <div className="mt-1.5 flex items-start gap-1.5">
                            <code className="flex-1 break-all font-mono text-[11px] text-muted-foreground/80">
                              find: {change.find}
                            </code>
                            <InlineCopyButton
                              text={change.find}
                              label={`Copy find pattern for ${change.surface}`}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-1.5 truncate text-sm text-muted-foreground">{release.summary}</p>
      )}
    </article>
  );
}

export function UpgradeReleases({ releases }: { releases: ReleaseMigration[] }) {
  const ascending = React.useMemo(
    () => [...releases].sort((a, b) => compareVersions(a.version, b.version)),
    [releases],
  );
  const latest = releases[0]?.version ?? "";

  const [from, setFrom] = React.useState<string | null>(null);
  const [to, setTo] = React.useState<string | null>(latest);
  const [breakingOnly, setBreakingOnly] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [overrides, setOverrides] = React.useState<Record<string, boolean>>({});
  const [pathCopied, setPathCopied] = React.useState(false);

  const isPathMode = from !== null;
  const invalidRange =
    from !== null && to !== null && compareVersions(from, to) >= 0;

  const filtered = React.useMemo(() => {
    let list = [...releases];

    if (from !== null && to !== null && !invalidRange) {
      list = ascending.filter(
        (r) =>
          compareVersions(r.version, from) >= 0 && compareVersions(r.version, to) <= 0,
      );
    } else if (to !== null && to !== latest) {
      list = releases.filter((r) => compareVersions(r.version, to) <= 0);
    }

    if (breakingOnly) list = list.filter((r) => r.breaking);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list
        .map((r) => ({
          ...r,
          changes: r.changes.filter((c) =>
            [c.surface, c.before, c.after, c.find, c.fix, c.kind]
              .join(" ")
              .toLowerCase()
              .includes(q),
          ),
        }))
        .filter(
          (r) =>
            r.version.toLowerCase().includes(q) ||
            r.summary.toLowerCase().includes(q) ||
            r.changes.length > 0,
        );
    }

    if (isPathMode && !invalidRange) list.sort((a, b) => compareVersions(a.version, b.version));
    return list;
  }, [releases, ascending, from, to, latest, breakingOnly, query, isPathMode, invalidRange]);

  const isOpen = (version: string, index: number) =>
    overrides[version] ?? (isPathMode ? true : index < 2);

  const expandAll = () =>
    setOverrides(Object.fromEntries(filtered.map((r) => [r.version, true])));
  const collapseAll = () =>
    setOverrides(Object.fromEntries(filtered.map((r) => [r.version, false])));
  const reset = () => {
    setFrom(null);
    setTo(latest);
    setBreakingOnly(false);
    setQuery("");
    setOverrides({});
  };

  const copyPath = async () => {
    const body = filtered.map(formatReleaseCopy).join("\n\n---\n\n");
    try {
      await copyText(
        `# Upgrade plan${from ? ` v${from} → v${to ?? latest}` : ""}\n\nApply oldest → newest.\n\n${body}`,
      );
      setPathCopied(true);
      window.setTimeout(() => setPathCopied(false), 1800);
    } catch {
      // Clipboard unavailable.
    }
  };

  const options = releases.map((r) => ({
    value: r.version,
    label: `v${r.version}${r.breaking ? " — breaking" : ""}`,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-card bg-surface/60 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
            From (installed)
            <Select
              aria-label="Installed version"
              options={options}
              value={from}
              onValueChange={(v) => setFrom(v)}
              placeholder="All releases"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
            To (target)
            <Select
              aria-label="Target version"
              options={options}
              value={to}
              onValueChange={(v) => setTo(v ?? latest)}
              placeholder={latest ? `v${latest}` : "Latest"}
            />
          </label>
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by surface, prop or find pattern… e.g. Select, scrollbar, data-ui"
          aria-label="Filter migrations"
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Switch
            label="Breaking only"
            checked={breakingOnly}
            onCheckedChange={(checked) => setBreakingOnly(checked === true)}
          />
          <span className="font-mono text-[11px] text-muted-foreground">
            {filtered.length}/{releases.length} releases
            {isPathMode && !invalidRange ? " · oldest → newest" : ""}
          </span>
          <span className="ml-auto flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={expandAll}
              className="rounded-control px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="rounded-control px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              Collapse
            </button>
            <button
              type="button"
              onClick={copyPath}
              className={cn(
                "rounded-control px-2 py-1 font-mono text-[11px] font-medium transition-colors",
                pathCopied
                  ? "bg-primary-soft text-primary-soft-foreground"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground",
              )}
            >
              {pathCopied ? "Copied plan" : "Copy plan"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-control px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              Reset
            </button>
          </span>
        </div>
        {invalidRange ? (
          <p role="alert" className="text-xs leading-5 text-destructive">
            From must be older than To. Currently at v{from} — pick a To newer than v
            {from}.
          </p>
        ) : null}
        {isPathMode && !invalidRange ? (
          <p className="text-xs leading-5 text-muted-foreground">
            Showing v{from} → v{to ?? latest} inclusive: {filtered.length} release
            {filtered.length === 1 ? "" : "s"} oldest → newest.
          </p>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card bg-card p-5 text-sm leading-6 text-muted-foreground shadow-soft">
          No releases match. Try clearing Breaking only, removing the keyword, or resetting
          the filters.
        </div>
      ) : (
        filtered.map((release, index) => (
          <ReleaseCard
            key={release.version}
            release={release}
            open={isOpen(release.version, index)}
            onToggle={() =>
              setOverrides((prev) => ({
                ...prev,
                [release.version]: !isOpen(release.version, index),
              }))
            }
          />
        ))
      )}
    </div>
  );
}
