"use client";

import Link from "next/link";
import { ButtonLink } from "@nphuonha/ui-kit";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";

function ButtonLinkDemo() {
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
}

function ButtonLinkNextDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <ButtonLink render={<Link href="/docs/installation" />} variant="soft">
        Next.js Link
      </ButtonLink>
      <ButtonLink href="/docs/components" shape="pill">
        Native anchor
      </ButtonLink>
    </div>
  );
}

export const demo = ButtonLinkDemo;
export const examples = {
  "button-link-next": ButtonLinkNextDemo,
};
