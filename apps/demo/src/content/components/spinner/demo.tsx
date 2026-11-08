"use client";

import { Button, Spinner } from "@nphuonha/ui-kit";

function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4 text-muted-foreground">
        <Spinner size={14} />
        <Spinner />
        <Spinner size={24} />
      </div>
      <Button loading>Loading…</Button>
    </div>
  );
}

export const demo = SpinnerDemo;
export const examples = {};
