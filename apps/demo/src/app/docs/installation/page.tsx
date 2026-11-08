import type { Metadata } from "next";
import { CheckCircleIcon, InfoIcon } from "@/components/icons";
import { Alert, Card, CardContent } from "@nphuonha/ui-kit";
import { AgentCopyButton } from "@/components/docs/agent-copy-button";
import { CodeBlock } from "@/components/docs/code-block";
import { PageHeader } from "@/components/docs/page-header";
import { INSTALLATION_AGENT_PROMPT } from "@/content/llms";

export const metadata: Metadata = { title: "Installation" };

export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Installation"
        description="Add the package, import the stylesheet and scope the tokens. The published package ships compiled ESM and types, so it works with Next.js, Vite, Remix and other React 19 bundlers."
        action={<AgentCopyButton text={INSTALLATION_AGENT_PROMPT} />}
      />

      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Requirements</h2>
          <ul className="flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
            {[
              "React 19 and React DOM 19",
              "Next.js 15+ or another React 19 bundler",
              "Tailwind CSS 4",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircleIcon size={16} className="mt-0.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">1. Install the package</h2>
          <CodeBlock code="npm install @nphuonha/ui-kit" language="bash" filename="Terminal" />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">2. Import the stylesheet</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Import the styles once at the root of your app. The file includes Tailwind, the
            structural layer and the theme tokens.
          </p>
          <CodeBlock
            filename="app/layout.tsx"
            code={`import "@nphuonha/ui-kit/styles.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-ui="kit">
      <body>{children}</body>
    </html>
  );
}`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">3. Use a component</h2>
          <CodeBlock
            filename="app/page.tsx"
            code={`import { Button, Field, Input } from "@nphuonha/ui-kit";

export default function Page() {
  return (
    <div data-ui="kit" className="flex max-w-sm flex-col gap-4">
      <Field label="Email">
        <Input placeholder="you@example.com" type="email" />
      </Field>
      <Button>Continue</Button>
    </div>
  );
}`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Scope and portals</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Tokens live under <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">[data-ui=&quot;kit&quot;]</code>.
            Put the attribute on <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">&lt;html&gt;</code>{" "}
            so portalled overlays (dialog, sheet, popover, select) inherit the same tokens.
          </p>
          <Card>
            <CardContent className="flex items-start gap-3 pt-5 text-sm leading-6 text-muted-foreground">
              <InfoIcon size={18} className="mt-0.5 shrink-0 text-primary" />
              <p>
                If you prefer a scoped wrapper, add{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">data-ui=&quot;kit&quot;</code>{" "}
                to a wrapper and also to your portal root, or use the{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">container</code>{" "}
                prop where the primitive supports it.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-[-0.025em]">Dark mode</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Toggle the <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">dark</code>{" "}
            class on the element that also has{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">data-ui=&quot;kit&quot;</code>.
          </p>
          <CodeBlock
            filename="Theme toggle"
            code={`document.documentElement.classList.toggle("dark", isDark);`}
          />
          <Alert variant="info" title="No provider required">
            The kit is CSS-first. A theme provider is only useful for persisting the preference
            and applying accent variables; this documentation site includes a small example.
          </Alert>
        </section>
      </div>
    </div>
  );
}
