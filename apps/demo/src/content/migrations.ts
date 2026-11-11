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
    version: "0.13.0",
    date: "2026-11-11",
    breaking: false,
    summary:
      "Additive release: DataTable brings sorting, client-side pagination, row selection and custom action columns on top of the Table primitives. Existing imports and props keep working.",
    changes: [
      {
        id: "data-table-0-13-0",
        kind: "additive",
        surface: "DataTable",
        before:
          "Sortable or paginated tables had to be composed manually from Table primitives, Pagination and Checkbox.",
        after:
          'import { DataTable, type DataTableColumn } from "@nphuonha/ui-kit";\n\n<DataTable columns={columns} rows={rows} getRowId={(row) => row.id} pageSize={10} />',
        find: "<Table",
        fix: "Nothing required. Mark a column sortable with sortValue, set pageSize={0} to disable pagination, or add selectable for checkboxes and an action column for row buttons and dialogs.",
      },
    ],
  },
  {
    version: "0.12.1",
    date: "2026-11-11",
    breaking: false,
    summary:
      "Patch release: the scrollbar-styled thumb is stronger so the page scrollbar stays perceivable. No API changes.",
    changes: [
      {
        id: "scrollbar-thumb-contrast-0-12-1",
        kind: "behavior",
        surface: "scrollbar-styled",
        before:
          "The resting thumb used muted-foreground at 32% (55% on hover), which could read as invisible on low-contrast displays — and Firefox has no hover state for scrollbar-color, so the faint rest tone was all it ever showed.",
        after:
          "The resting thumb uses muted-foreground at 50% (70% on hover in WebKit).",
        find: "scrollbar-styled",
        fix: "Nothing required. Override with your own scrollbar-color if you need the old tone.",
      },
    ],
  },
  {
    version: "0.12.0",
    date: "2026-11-11",
    breaking: false,
    summary:
      "Isolation release: kit CSS no longer touches anything outside <div data-ui=\"kit\"> — no Tailwind preflight, no :root tokens, no bare html/body resets. Portalled overlays carry their own scope, and Skeleton placeholders use a stronger tone.",
    changes: [
      {
        id: "style-isolation-0-12-0",
        kind: "behavior",
        surface: "styles.css / theme tokens",
        before:
          "The kit stylesheet imported full tailwindcss (including preflight) and defined --background/--foreground/... on :root, so importing the kit could reset and recolor the host page.",
        after:
          "The kit ships theme + utilities only (no preflight); all base rules and tokens live under [data-ui=\"kit\"]. The host app owns its reset with its own @import \"tailwindcss\".",
        find: '@nphuonha/ui-kit/styles.css',
        fix: "Add your own @import \"tailwindcss\" to your global CSS, keep kit usage inside <div data-ui=\"kit\">, and do not rely on kit tokens outside the wrapper.",
      },
      {
        id: "portal-scope-0-12-0",
        kind: "additive",
        surface:
          "Dialog / AlertDialog / Sheet / Popover / Menu / Select / Combobox / Tooltip / PreviewCard / Toaster",
        before:
          "Portalled overlays rendered into <body> depended on the wrapper's token scope and broke visually outside of it.",
        after:
          "Every portalled root carries its own data-ui=\"kit\" scope via the shared kitScope helper, so overlays render correctly even outside the wrapper.",
        find: "<Dialog",
        fix: "Nothing required. Keep .dark on <html> and apply accentStyle to documentElement so portals inherit dark mode and accent.",
      },
      {
        id: "skeleton-contrast-0-12-0",
        kind: "behavior",
        surface: "Skeleton",
        before:
          "Skeleton placeholders used bg-surface, which nearly disappeared against the page background.",
        after: "Skeleton placeholders use bg-surface-hover.",
        find: "<Skeleton",
        fix: "Nothing required. Override with className if you need the old tone.",
      },
    ],
  },
  {
    version: "0.11.0",
    date: "2026-11-10",
    breaking: false,
    summary:
      "Additive release: scrollbar-styled utility brings token-styled native scrollbars (thin track, pill thumb matching ScrollArea) to any page or scroll container. Existing APIs keep working.",
    changes: [
      {
        id: "scrollbar-styled-0-11-0",
        kind: "additive",
        surface: "scrollbar-styled",
        before:
          "Native scrollbars used the browser default; only ScrollArea had token-styled bars.",
        after:
          '<html className="scrollbar-styled"> for page-wide styling, or <div className="scrollbar-styled h-56 overflow-y-auto"> for one container.',
        find: "scrollbar-none",
        fix: "Nothing required. Put scrollbar-styled on <html> for page-wide effect (the viewport scrollbar follows the root element); scrollbar-none still opts out.",
      },
    ],
  },
  {
    version: "0.10.1",
    date: "2026-11-10",
    breaking: false,
    summary:
      "Patch release: Toolbar keeps its curved surface treatment. The container and its buttons/toggles are now positioned, so the surface rim renders on the toolbar instead of leaking onto an ancestor. No API changes.",
    changes: [
      {
        id: "toolbar-surface-0-10-1",
        kind: "behavior",
        surface: "Toolbar",
        before:
          "The Toolbar container and its buttons/toggles were unpositioned, so the surface-curved-soft rim painted onto the nearest positioned ancestor and the toolbar looked flat.",
        after:
          "Toolbar and its button/toggle items are relatively positioned, so the surface rim and the pressed toggle treatment render on the controls themselves.",
        find: "<Toolbar",
        fix: "Nothing required. Update to 0.10.1; markup and props are unchanged.",
      },
    ],
  },
  {
    version: "0.10.0",
    date: "2026-11-10",
    breaking: false,
    summary:
      "Additive release: Toolbar brings roving keyboard focus to action bars, formatting controls and compact forms. Existing APIs keep working.",
    changes: [
      {
        id: "toolbar-0-10-0",
        kind: "additive",
        surface: "Toolbar",
        before:
          "Toolbars had to be composed manually from buttons, links and inputs, without shared keyboard navigation.",
        after:
          'import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator, ToolbarToggle } from "@nphuonha/ui-kit";\n\n<Toolbar aria-label="Formatting">\n  <ToolbarToggle aria-label="Bold" defaultPressed>B</ToolbarToggle>\n  <ToolbarSeparator />\n  <ToolbarButton>Undo</ToolbarButton>\n</Toolbar>',
        find: 'from "@nphuonha/ui-kit"',
        fix: "Nothing required. Use ToolbarButton with render to compose menus, popovers or selects; place a single ToolbarInput last in a horizontal toolbar.",
      },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-11-10",
    breaking: false,
    summary:
      "Additive release: Combobox, Menu, CheckboxGroup, Fieldset, OTPField, Collapsible, Meter and PreviewCard, plus Field/FormField validation support for the new form controls. Existing APIs keep working.",
    changes: [
      {
        id: "new-components-0-9-0",
        kind: "additive",
        surface:
          "Combobox / Menu / CheckboxGroup / Fieldset / OTPField / Collapsible / Meter / PreviewCard",
        before:
          "Searchable selects, action menus, checkbox groups, fieldsets, OTP codes, standalone disclosures, meters and hover previews had to be composed manually.",
        after:
          'import { Collapsible, Combobox, Fieldset, Menu, Meter, OTPField, PreviewCard } from "@nphuonha/ui-kit";\nimport { CheckboxGroup } from "@nphuonha/ui-kit/checkbox-group";',
        find: 'from "@nphuonha/ui-kit"',
        fix: "Nothing required. Subpath exports are available for every new component. Menu uses a trigger plus items; Collapsible uses title/content; Meter accepts low/high/optimum for threshold tones.",
      },
      {
        id: "combobox-validation-0-9-0",
        kind: "additive",
        surface: "Combobox / Field / FormField",
        before:
          "A searchable select could not share the kit's label, required, error and aria wiring.",
        after:
          '<Field label="Framework" required error={errors.framework?.message}>\n  <Combobox value={value} onValueChange={setValue} options={options} />\n</Field>',
        find: "<Combobox",
        fix: "Nothing required. Combobox is label-less like Select: use Field or FormField for label/description/error. required also reaches the native input, and aria-invalid/aria-describedby/aria-labelledby are forwarded.",
      },
      {
        id: "group-otp-validation-0-9-0",
        kind: "additive",
        surface: "CheckboxGroup / OTPField",
        before:
          "Multi-checkbox groups and one-time-code inputs had no shared label, required mark or error wiring.",
        after:
          '<CheckboxGroup label="Channels" required error={error} value={value} onValueChange={setValue} options={options} />\n\n<OTPField label="Verification code" required onValueComplete={verify} />',
        find: "<CheckboxGroup",
        fix: "Nothing required. Both own their label and error message, so use Controller rather than FormField when both are used with react-hook-form. OTPField forwards required/name to the native control and supports autoSubmit.",
      },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-11-09",
    breaking: false,
    summary:
      "Additive release: Calendar, DatePicker and FileUpload, consistent required marks and error wiring across form controls, and stronger Field/FormField integration. Existing APIs keep working.",
    changes: [
      {
        id: "form-components-0-8-0",
        kind: "additive",
        surface: "Calendar / DatePicker / FileUpload",
        before:
          "Date pickers and file uploads had to be composed manually from Popover, Calendar and a native file input.",
        after:
          'import { Calendar, DatePicker, FileUpload } from "@nphuonha/ui-kit";',
        find: 'from "@nphuonha/ui-kit"',
        fix: 'Nothing required. DatePicker is the input-style popup field; Calendar stays inline for single/range grids. FileUpload is UI-only and reports File[] through onFilesChange.',
      },
      {
        id: "date-picker-range",
        kind: "additive",
        surface: "DatePicker",
        before: "DatePicker only supported a single date.",
        after:
          '<DatePicker mode="range" value={range} onValueChange={setRange} />',
        find: "<DatePicker",
        fix: 'Nothing required. Range mode uses CalendarRange ({ from, to }) and closes after both endpoints are selected.',
      },
      {
        id: "required-marks",
        kind: "behavior",
        surface: "Checkbox / Switch / RadioGroup / Select / Field",
        before:
          "Some controls accepted required for native validation but did not render the red mark. Field did not forward required to its control.",
        after:
          '<Checkbox label="Terms" required />\n\n<Field label="Email" required><Input /></Field>',
        find: "<Checkbox",
        fix: "Nothing required. Label-owning controls and Field now render the mark and forward required. With FormField, keep required for the mark and rules for validation.",
      },
      {
        id: "formfield-aria-wiring",
        kind: "behavior",
        surface: "FormField",
        before:
          "FormField always injected aria-invalid/aria-describedby and error booleans, which could override a child's own state and create dangling aria references.",
        after:
          '<FormField control={control} name="email" label="Email" required rules={{ required: "Email is required" }} render={({ field }) => <Input {...field} />} />',
        find: "<FormField",
        fix: "Nothing required. Keep label/required/error on FormField and value/onChange/onBlur on the child. Do not pass the same error message to both.",
      },
      {
        id: "checkbox-switch-errors",
        kind: "additive",
        surface: "Checkbox / Switch",
        before:
          "error only toggled the invalid style; it could not render or link an error message.",
        after: '<Checkbox label="Terms" error="You must accept the terms" />',
        find: "<Checkbox",
        fix: "Nothing required. error now accepts a ReactNode, renders role=alert and links the message with aria-describedby.",
      },
      {
        id: "slider-aria",
        kind: "behavior",
        surface: "Slider",
        before:
          "FormField labels and error/description ids were not forwarded to the range input, leaving it unnamed or unlinked.",
        after:
          '<FormField control={control} name="volume" label="Volume" render={({ field }) => <Slider value={field.value} onValueChange={field.onChange} />} />',
        find: "<Slider",
        fix: "Nothing required. Slider now forwards aria-label, aria-labelledby, aria-describedby and aria-invalid to the actual range input.",
      },
      {
        id: "popover-aria-label",
        kind: "additive",
        surface: "Popover",
        before:
          "A popover without a visible title had no way to provide an accessible name.",
        after: '<Popover aria-label="Filters" trigger={<Button>Filters</Button>}>...</Popover>',
        find: "<Popover",
        fix: "Nothing required. Pass aria-label when the popup has no title.",
      },
      {
        id: "form-icons",
        kind: "additive",
        surface: "IconProvider",
        before:
          "Date and upload affordances used direct Phosphor imports instead of the kit icon contract.",
        after:
          'icons={{ calendar: CalendarIcon, file: FileIcon, upload: UploadIcon }}',
        find: "<IconProvider",
        fix: "Nothing required. calendar, file and upload now join the replaceable internal icon set.",
      },
    ],
  },
  {
    version: "0.7.0",
    date: "2026-11-09",
    breaking: false,
    summary:
      "Additive release: MobileNav, nested DesktopNav submenus, a Sheet header slot and animated nav indicators. Existing APIs and imports keep working.",
    changes: [
      {
        id: "mobile-nav",
        kind: "additive",
        surface: "MobileNav",
        before:
          "Mobile navigation required composing Sheet, a trigger and collapsible groups manually.",
        after:
          'import { MobileNav } from "@nphuonha/ui-kit";\n\n<MobileNav items={items} logo={<BrandMark />} />',
        find: "<Sheet",
        fix: 'Nothing required. Use MobileNav for a logo header, collapsible groups and multi-level mobile navigation. Sheet now also accepts header and aria-label for custom menus.',
      },
      {
        id: "desktop-nav-submenus",
        kind: "additive",
        surface: "DesktopNav",
        before:
          "DesktopNav only accepted a flat item list.",
        after:
          'const items = [{ value: "components", label: "Components", children: [{ value: "buttons", label: "Buttons" }] }];',
        find: "DesktopNavItem",
        fix: "Nothing required. Add children to any item to render a submenu; children can nest recursively.",
      },
      {
        id: "sheet-header-aria-label",
        kind: "additive",
        surface: "Sheet",
        before:
          "Sheet had no logo slot and required a visible title for its accessible name.",
        after:
          '<Sheet header={<BrandMark />} aria-label="Menu">...</Sheet>',
        find: "<Sheet",
        fix: "Nothing required. Use header for logos and aria-label when omitting the visible title.",
      },
      {
        id: "depth-and-shape-tokens",
        kind: "additive",
        surface: "Theme tokens",
        before:
          "Small active indicators used Tailwind's shadow-sm and micro controls used arbitrary radius values.",
        after:
          'className="shadow-control rounded-xs"',
        find: "shadow-sm",
        fix: "Nothing required. shadow-control, rounded-xs and rounded-2xs are available alongside the existing soft/raised/overlay shadows and shape tokens.",
      },
      {
        id: "nav-active-motion",
        kind: "behavior",
        surface: "BottomNav / DesktopNav",
        before:
          "Active items changed state without moving the active indicator.",
        after:
          "<BottomNav items={items} value={active} onValueChange={setActive} />",
        find: "<BottomNav",
        fix: "Nothing required. Active pills now slide between items and honor prefers-reduced-motion automatically.",
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-11-09",
    breaking: false,
    summary:
      "Additive release: five new components, ButtonLink for navigation, and a clearer disabled state for buttons. Existing imports and props keep working.",
    changes: [
      {
        id: "new-components-0-6-0",
        kind: "additive",
        surface: "Components",
        before:
          "Accordion, Avatar, Progress, Skeleton and Toggle were not part of the kit.",
        after:
          'import { Accordion, Avatar, Progress, Skeleton, Toggle } from "@nphuonha/ui-kit";',
        find: 'from "@nphuonha/ui-kit"',
        fix: 'Nothing required. Each component also ships a subpath such as "@nphuonha/ui-kit/progress".',
      },
      {
        id: "button-link",
        kind: "additive",
        surface: "ButtonLink",
        before:
          "Navigation links had to reuse buttonVariants manually on an anchor element.",
        after:
          '<ButtonLink href="/docs" variant="secondary">Read the docs</ButtonLink>',
        find: "buttonVariants({",
        fix: "Nothing required. Keep buttonVariants for custom elements or switch to ButtonLink for styled anchors and framework links via render.",
      },
      {
        id: "button-disabled-state",
        kind: "behavior",
        surface: "Button",
        before:
          "Disabled buttons were dimmed but used pointer-events-none, so they showed no disabled cursor and could still match hover styles.",
        after: "<Button disabled>Save</Button>",
        find: "<Button",
        fix: "Nothing required. Disabled buttons now show cursor-not-allowed, flatten their shadow and ignore hover styles.",
      },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-11-08",
    breaking: false,
    summary:
      "ScrollArea scrollbars now auto-hide by default and can be hidden entirely. The new prop is additive; the default visual behavior changes.",
    changes: [
      {
        id: "scroll-area-scrollbar-visibility",
        kind: "behavior",
        surface: "ScrollArea.scrollbar",
        before: "Custom scrollbars stayed visible whenever content overflowed.",
        after: 'scrollbar="auto" | "hidden" (default: "auto")',
        find: "<ScrollArea",
        fix: "Nothing required. auto reveals the bar on hover, focus or scroll; hidden removes the bar while scrolling still works.",
      },
    ],
  },
  {
    version: "0.4.1",
    date: "2026-11-08",
    breaking: false,
    summary:
      "Patch release. Keeps the toast close-button focus ring compact and adds the upgrading guide. No API changes.",
    changes: [],
  },
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
