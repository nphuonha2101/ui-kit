"use client";

import * as React from "react";
import {
  Badge,
  Button,
  DataTable,
  Dialog,
  type DataTableColumn,
} from "@nphuonha/ui-kit";
import { InlineCopyButton } from "@/components/docs/migration-copy";
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

export interface MigrationRow {
  id: string;
  version: string;
  date: string;
  summary: string;
  change: ApiMigration;
}

function MigrationDetailDialog({
  row,
  onClose,
}: {
  row: MigrationRow | null;
  onClose: () => void;
}) {
  const change = row?.change;
  return (
    <Dialog
      open={row !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={change?.surface}
      description={
        row && change
          ? `v${row.version} · ${kindBadge[change.kind].label} · ${row.date}`
          : undefined
      }
    >
      {row && change ? (
        <div className="flex flex-col gap-4 text-sm">
          <p className="leading-6 text-muted-foreground">{row.summary}</p>
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

export function MigrationTable({ releases }: { releases: ReleaseMigration[] }) {
  const [detail, setDetail] = React.useState<MigrationRow | null>(null);

  const rows = React.useMemo<MigrationRow[]>(
    () =>
      releases.flatMap((release) =>
        release.changes.map((change) => ({
          id: change.id,
          version: release.version,
          date: release.date,
          summary: release.summary,
          change,
        })),
      ),
    [releases],
  );

  const columns = React.useMemo<DataTableColumn<MigrationRow>[]>(
    () => [
      {
        key: "version",
        header: "Version",
        render: (row) => (
          <div>
            <div className="font-mono font-medium whitespace-nowrap text-foreground">
              v{row.version}
            </div>
            <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
              {row.date}
            </div>
          </div>
        ),
        sortable: true,
        sortValue: (row) => row.version,
      },
      {
        key: "surface",
        header: "Surface",
        render: (row) => (
          <div>
            <div className="font-medium whitespace-nowrap text-foreground">
              {row.change.surface}
            </div>
            <Badge
              variant={kindBadge[row.change.kind].variant}
              className="mt-1.5"
            >
              {kindBadge[row.change.kind].label}
            </Badge>
          </div>
        ),
        sortable: true,
        sortValue: (row) => row.change.surface,
      },
      {
        key: "before",
        header: "Before",
        render: (row) => (
          <code
            title={row.change.before}
            className="block max-w-44 truncate font-mono text-xs text-muted-foreground sm:max-w-60"
          >
            {row.change.before}
          </code>
        ),
      },
      {
        key: "after",
        header: "After",
        render: (row) => (
          <code
            title={row.change.after}
            className="block max-w-44 truncate font-mono text-xs text-foreground sm:max-w-60"
          >
            {row.change.after}
          </code>
        ),
      },
      {
        key: "actions",
        header: <span className="sr-only">Actions</span>,
        render: (row) => (
          <Button variant="ghost" size="sm" onClick={() => setDetail(row)}>
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
        rows={rows}
        getRowId={(row) => row.id}
        caption="Migration rows for every release"
        defaultSortKey="version"
        defaultSortDirection="desc"
        pageSize={10}
        searchable
        searchPlaceholder="Search by version, surface or pattern…"
        getSearchText={(row) =>
          [
            row.version,
            row.date,
            row.summary,
            row.change.surface,
            row.change.kind,
            kindBadge[row.change.kind].label,
            row.change.before,
            row.change.after,
            row.change.find,
            row.change.fix,
          ].join(" ")
        }
        emptyTitle="No migrations match"
        emptyDescription="Try a different keyword, e.g. a surface, a prop or a find pattern."
      />
      <MigrationDetailDialog row={detail} onClose={() => setDetail(null)} />
    </>
  );
}
