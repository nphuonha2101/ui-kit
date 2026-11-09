import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { ButtonLink } from "@nphuonha/ui-kit";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

export function Example() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <ButtonLink href="/docs">Get started</ButtonLink>
      <ButtonLink href="/docs/components" variant="secondary">
        Browse components
      </ButtonLink>
      <ButtonLink href="/docs/theming" variant="outline" endIcon={ArrowRightIcon}>
        Theming
      </ButtonLink>
      <ButtonLink
        href="https://github.com/nphuonha2101/ui-kit"
        target="_blank"
        rel="noreferrer"
        variant="ghost"
        endIcon={ArrowUpRightIcon}
      >
        GitHub
      </ButtonLink>
    </div>
  );
}`,
  "usage": `import { ButtonLink } from "@nphuonha/ui-kit";

<ButtonLink href="/docs" variant="secondary">
  Read the docs
</ButtonLink>`,
  "examples": {
    "button-link-next": `import Link from "next/link";
import { ButtonLink } from "@nphuonha/ui-kit";

<ButtonLink render={<Link href="/docs/installation" />} variant="soft">
  Next.js Link
</ButtonLink>`,
  },
};
