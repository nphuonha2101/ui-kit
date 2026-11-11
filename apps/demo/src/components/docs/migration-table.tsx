"use client";

import * as React from "react";
import {
  Badge,
  Button,
  DataTable,
  Dialog,
  type DataTableColumn,
} from "@nphuonha/ui-kit";
import { InlineCopyButton, ReleaseCopyButton } from "@/components/docs/migration-copy";
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

function CodeRow({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <div className="flex items-start gap-1.5 rounded-control bg-surface/60 p-3">
        <code
          className={
            mono
              ? "flex-1 break-words font-mono text-xs text-foreground"
              : "flex-1 break-words text-sm leading-6 text-muted-foreground"
          }
        >
          {value}
        </code>
        <InlineCopyButton text={value} label={`Copy ${label.toLowerCase()}`} />
      </div>
    </div>
  );
}

function ReleaseDetailDialog({
  release,
  onClose,
}: {
  release: ReleaseMigration | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={release !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={release ? `v${release.version}` : undefined}
      description={release ? `${release.date} · ${release.summary}` : undefined}
      className="max-w-2xl"
      footer={
        release ? (
          <>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
            <ReleaseCopyButton release={release} />
          </>
        ) : null
      }
    >
      {release ? (
        release.changes.length > 0 ? (
          <div className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto pr-1">
            {release.changes.map((change) => (
              <section key={change.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {change.surface}
                  </h3>
                  <Badge variant={kindBadge[change.kind].variant}>
                    {kindBadge[change.kind].label}
                  </Badge>
                </div>
                <CodeRow label="Before" value={change.before} />
                <CodeRow label="After" value={change.after} />
                <CodeRow label="Find" value={change.find} />
                <p className="text-sm leading-6 text-muted-foreground">{change.fix}</p>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            No action required for this release.
          </p>
        )
      ) : null}
    </Dialog>
  );
}

export function MigrationTable({ releases }: { releases: ReleaseMigration[] }) {
  const [detail, setDetail] = React.useState<ReleaseMigration | null>(null);

  const columns = React.useMemo<DataTableColumn<ReleaseMigration>[]>(
    () => [
      {
        key: "version",
        header: "Version",
        render: (release) => (
          <div className="whitespace-nowrap">
            <div className="font-mono text-xs font-semibold text-foreground">
              v{release.version}
            </div>
            <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              {release.date}
            </div>
          </div>
        ),
        sortable: true,
        sortValue: (release) => release.version,
      },
      {
        key: "summary",
        header: "Summary",
        render: (release) => (
          <p
            title={release.summary}
            className="max-w-[38rem] truncate text-sm text-muted-foreground"
          >
            {release.summary}
          </p>
        ),
        cellClassName: "hidden w-full max-w-0 sm:table-cell",
        headerClassName: "hidden sm:table-cell",
      },
      {
        key: "changes",
        header: "Changes",
        render: (release) => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-mono text-xs text-muted-foreground">
              {release.changes.length === 0
                ? "none"
                : `${release.changes.length} change${
                    release.changes.length === 1 ? "" : "s"
                  }`}
            </span>
            {release.breaking ? (
              <Badge variant="danger">Breaking</Badge>
            ) : null}
          </div>
        ),
      },
      {
        key: "actions",
        header: <span className="sr-only">Actions</span>,
        render: (release) => (
          <Button variant="ghost" size="sm" onClick={() => setDetail(release)}>
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
    <>
      <DataTable
        columns={columns}
        rows={releases}
        getRowId={(release) => release.version}
        caption="Releases and their migration summary"
        defaultSortKey="version"
        defaultSortDirection="desc"
        pageSize={10}
        searchable
        searchPlaceholder="Search version, summary or surface…"
        getSearchText={(release) =>
          [
            release.version,
            release.date,
            release.summary,
            release.breaking ? "breaking" : "safe",
            ...release.changes.flatMap((change) => [
              change.surface,
              change.kind,
              kindBadge[change.kind].label,
              change.before,
              change.after,
              change.find,
              change.fix,
            ]),
          ].join(" ")
        }
        emptyTitle="No releases match"
        emptyDescription="Try a different keyword, e.g. a version, a surface or a prop."
      />
      <ReleaseDetailDialog release={detail} onClose={() => setDetail(null)} />
    </>
  );
}
