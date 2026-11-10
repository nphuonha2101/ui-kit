"use client";

import { Checkbox, Collapsible } from "@nphuonha/ui-kit";

function CollapsibleDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Collapsible
        title="Advanced filters"
        description="Narrow the result set before searching."
      >
        <div className="flex flex-col gap-2.5">
          <Checkbox label="Has attachments" />
          <Checkbox label="Created this week" />
          <Checkbox label="Shared with me" />
        </div>
      </Collapsible>
    </div>
  );
}

function CollapsibleSeparatedDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Collapsible
        variant="separated"
        title="Billing address"
        description="Saved for invoices"
      >
        <p>12 Nguyễn Huệ, District 1, Ho Chi Minh City</p>
      </Collapsible>
      <Collapsible
        variant="separated"
        title="Shipping address"
        description="Default delivery address"
      >
        <p>45 Lê Lợi, District 1, Ho Chi Minh City</p>
      </Collapsible>
    </div>
  );
}

function CollapsiblePlainDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Collapsible variant="plain" title="What is included?" defaultOpen>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Every component ships with compiled ESM, TypeScript declarations and
          the shared token layer.
        </p>
      </Collapsible>
    </div>
  );
}

export const demo = CollapsibleDemo;
export const examples = {
  "collapsible-separated": CollapsibleSeparatedDemo,
  "collapsible-plain": CollapsiblePlainDemo,
};
