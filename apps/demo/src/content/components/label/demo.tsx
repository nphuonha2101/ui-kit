"use client";

import { Input, Label } from "@nphuonha/ui-kit";

function LabelDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="demo-label-email">Email</Label>
      <Input id="demo-label-email" placeholder="you@example.com" />
      <p className="mt-1 text-xs text-muted-foreground">
        Labels can also show a required mark.
      </p>
    </div>
  );
}

export const demo = LabelDemo;
export const examples = {};
