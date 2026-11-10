"use client";

import { Badge, PreviewCard } from "@nphuonha/ui-kit";

function PreviewCardDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <PreviewCard
        trigger={
          <a
            href="#profile"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            @ana.duarte
          </a>
        }
      >
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            AD
          </span>
          <div>
            <p className="text-sm font-semibold">Ana Duarte</p>
            <p className="text-xs text-muted-foreground">Product designer · Lisbon</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Designing calm, accessible interfaces for developer tools.
            </p>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}

function PreviewCardIssueDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center">
      <PreviewCard
        trigger={
          <a
            href="#ui-142"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            UI-142 · Combobox filtering
          </a>
        }
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">UI-142</p>
            <Badge variant="primary">In progress</Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Match labels as well as values and keep the selected option visible
            while filtering.
          </p>
        </div>
      </PreviewCard>
    </div>
  );
}

function PreviewCardTopDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm justify-center py-12">
      <PreviewCard
        side="top"
        trigger={
          <a
            href="#release"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Release notes
          </a>
        }
      >
        <p className="text-sm font-semibold">v0.9.0</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Combobox, Menu, OTP Field and the rest of the new form primitives.
        </p>
      </PreviewCard>
    </div>
  );
}

export const demo = PreviewCardDemo;
export const examples = {
  "preview-card-issue": PreviewCardIssueDemo,
  "preview-card-top": PreviewCardTopDemo,
};
