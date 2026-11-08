export type MigrationKind = "additive" | "behavior" | "rename" | "remove" | "replace";

export interface ApiMigration {
  id: string;
  kind: MigrationKind;
  surface: string;
  before: string;
  after: string;
  find: string;
  fix: string;
}

export interface ReleaseMigration {
  version: string;
  date: string;
  breaking: boolean;
  summary: string;
  changes: ApiMigration[];
}

/**
 * Release upgrade log. Newest release first; never rewrite shipped entries.
 *
 * Every breaking API change must be recorded here with an old → new snippet,
 * a searchable `find` pattern and a concise fix. Additive changes are listed
 * too, so agents can discover them while upgrading without treating them as
 * required migrations.
 */
export const releases: ReleaseMigration[] = [
  {
    version: "0.4.0",
    date: "2026-11-08",
    breaking: false,
    summary:
      "Additive release. Existing imports, props and CSS entry points keep working.",
    changes: [
      {
        id: "select-ref-onblur",
        kind: "additive",
        surface: "Select",
        before: "The trigger did not forward a ref or expose onBlur.",
        after: "<Select ref={ref} onBlur={onBlur} />",
        find: "<Select",
        fix: "Nothing required. Attach ref/onBlur only when needed; both land on the trigger button.",
      },
      {
        id: "toaster-close-icon",
        kind: "behavior",
        surface: "Toaster.icons",
        before: "Passing icons only overrode status icons; close fell back to Sonner.",
        after: "icons={{ close: <XIcon /> }}",
        find: "icons={{",
        fix: "Nothing required. The kit close icon is merged in by default and can be overridden with icons.close.",
      },
      {
        id: "new-component-subpaths",
        kind: "additive",
        surface: "Package exports",
        before: "New components were only available from the root barrel.",
        after: 'import { Table } from "@nphuonha/ui-kit/table";',
        find: 'from "@nphuonha/ui-kit"',
        fix: "Nothing required. Keep root imports or switch to subpaths for smaller client bundles.",
      },
    ],
  },
];

export const latestRelease = releases[0];
