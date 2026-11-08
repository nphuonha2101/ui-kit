import type { Metadata } from "next";
import { Card, CardContent } from "@nphuonha/ui-kit";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { ThemingPlayground } from "@/components/docs/theming-playground";

export const metadata: Metadata = { title: "Theming" };

const tokens = [
  ["Surfaces", "--background, --card, --surface, --field, --popover, --muted"],
  ["Actions", "--primary, --primary-foreground, --primary-hover, --primary-soft, --ring"],
  ["Status", "--destructive, --success, --warning, --info"],
  ["Shape", "--radius-control, --radius-field, --radius-card, --radius-overlay"],
  ["Lighting", "--light-top, --light-sheen, --light-bottom, --light-rim"],
];

export default function ThemingPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Theming"
        description="Semantic CSS variables, a dark token set and runtime accent generation. Change one color and the whole system re-tones."
      />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Try it</h2>
          <ThemingPlayground />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Semantic tokens</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Components only read semantic tokens. Override them on the element that carries{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">data-ui=&quot;kit&quot;</code>{" "}
            (or on any descendant) to re-theme a subtree.
          </p>
          <div className="surface-curved relative overflow-hidden rounded-card bg-card shadow-soft">
            <dl className="divide-y divide-border/60 text-sm">
              {tokens.map(([label, value]) => (
                <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-medium text-foreground">{label}</dt>
                  <dd className="font-mono text-xs leading-6 text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            The default light/dark values live in{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">packages/ui-kit/src/styles/theme.css</code>.
            Components never use app-specific variables or raw paints where a token exists.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Accent generation</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">generateAccentVars(color, mode)</code>{" "}
            derives a full primary scale from one color: primary, foreground, hover, active,
            soft and ring. The docs site applies the result to{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">&lt;html&gt;</code>{" "}
            so portalled overlays inherit it.
          </p>
          <CodeBlock
            filename="accent.tsx"
            code={`import { accentStyle } from "@nphuonha/ui-kit";

<div data-ui="kit" style={accentStyle("#0d9488", "light")}>
  <App />
</div>

// Or generate the variables directly:
import { generateAccentVars } from "@nphuonha/ui-kit";
const vars = generateAccentVars("#0d9488", "dark");`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Dark mode</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Add <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">.dark</code>{" "}
            to the same element as{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">data-ui=&quot;kit&quot;</code>.
            Accent variables should be regenerated for the active mode:
          </p>
          <CodeBlock
            filename="theme.ts"
            code={`const mode = isDark ? "dark" : "light";
const vars = generateAccentVars(accent, mode);

for (const [key, value] of Object.entries(vars)) {
  document.documentElement.style.setProperty(key, value);
}`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Surface lighting</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Solid surfaces get their curve from a top-lit rim and a micro gradient. Use the
            utilities instead of hand-rolling borders and shadows:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-5">
                <code className="text-xs font-semibold text-foreground">surface-curved</code>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Cards, dialogs, popovers and primary buttons.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <code className="text-xs font-semibold text-foreground">surface-curved-soft</code>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Secondary buttons, tabs, alerts, badges and tracks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <code className="text-xs font-semibold text-foreground">surface-curved-pill</code>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Switch thumbs and pill controls.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <code className="text-xs font-semibold text-foreground">surface-inset</code>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Native form fields, where pseudo-elements are unavailable.
                </p>
              </CardContent>
            </Card>
          </div>
          <CodeBlock
            filename="Card example"
            code={`<div className="surface-curved relative rounded-card bg-card shadow-soft">
  ...
</div>`}
          />
        </section>
      </div>
    </div>
  );
}
