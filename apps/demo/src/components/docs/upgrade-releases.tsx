"use client";

import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Badge,
  Button,
  DataTable,
  Dialog,
  Input,
  Select,
  Switch,
  cn,
  type DataTableColumn,
} from "@nphuonha/ui-kit";
import { copyText } from "@/lib/clipboard";
import {
  InlineCopyButton,
  ReleaseCopyButton,
  formatReleaseCopy,
} from "@/components/docs/migration-copy";
import type {
  ApiMigration,
  MigrationKind,
  ReleaseMigration,
} from "@/content/migrations";

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

function MigrationDetailDialog({
  release,
  change,
  onClose,
}: {
  release: ReleaseMigration;
  change: ApiMigration | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={change !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={change?.surface}
      description={
        change
          ? `v${release.version} · ${kindBadge[change.kind].label} · ${release.date}`
          : undefined
      }
    >
      {change ? (
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Before
            </p>
            <div className="flex items-start gap-1.5 rounded-control bg-surface/60 p-3">
              <code className="flex-1 break-words font-mono text-xs text-muted-foreground">
                {change.before}
              </code>
              <InlineCopyButton
                text={change.before}
                label={`Copy before snippet for ${change.surface}`}
              />
            </div>
          </div>
          <div>
            <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              After
            </p>
            <div className="flex items-start gap-1.5 rounded-control bg-surface/60 p-3">
              <code className="flex-1 break-words font-mono text-xs text-foreground">
                {change.after}
              </code>
              <InlineCopyButton
                text={change.after}
                label={`Copy after snippet for ${change.surface}`}
              />
            </div>
          </div>
          <div>
            <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Find
            </p>
            <div className="flex items-start gap-1.5 rounded-control bg-surface/60 p-3">
              <code className="flex-1 break-all font-mono text-[11px] text-muted-foreground">
                {change.find}
              </code>
              <InlineCopyButton
                text={change.find}
                label={`Copy find pattern for ${change.surface}`}
              />
            </div>
          </div>
          <p className="leading-6 text-muted-foreground">{change.fix}</p>
        </div>
      ) : null}
    </Dialog>
  );
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
  const [detail, setDetail] = React.useState<ApiMigration | null>(null);
  const columns = React.useMemo<DataTableColumn<ApiMigration>[]>(
    () => [
      {
        key: "surface",
        header: "Surface",
        render: (change) => (
          <div>
            <div className="font-medium whitespace-nowrap text-foreground">
              {change.surface}
            </div>
            <Badge variant={kindBadge[change.kind].variant} className="mt-1.5">
              {kindBadge[change.kind].label}
            </Badge>
          </div>
        ),
        sortable: true,
        sortValue: (change) => change.surface,
      },
      {
        key: "before",
        header: "Before",
        render: (change) => (
          <code
            title={change.before}
            className="block max-w-44 truncate font-mono text-xs text-muted-foreground sm:max-w-60"
          >
            {change.before}
          </code>
        ),
      },
      {
        key: "after",
        header: "After",
        render: (change) => (
          <code
            title={change.after}
            className="block max-w-44 truncate font-mono text-xs text-foreground sm:max-w-60"
          >
            {change.after}
          </code>
        ),
      },
      {
        key: "actions",
        header: <span className="sr-only">Actions</span>,
        render: (change) => (
          <Button variant="ghost" size="sm" onClick={() => setDetail(change)}>
            View detail
          </Button>
        ),
        headerClassName: "text-right",
        cellClassName: "whitespace-nowrap text-right",
      },
    ],
    [],
  );
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

          <div className="mt-4">
            <DataTable
              columns={columns}
              rows={release.changes}
              getRowId={(change) => change.id}
              caption={`Migration rows for v${release.version}`}
              defaultSortKey="surface"
              pageSize={5}
              emptyTitle="No migration rows"
              emptyDescription="No action required for this release."
            />
          </div>
          <MigrationDetailDialog
            release={release}
            change={detail}
            onClose={() => setDetail(null)}
          />
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
