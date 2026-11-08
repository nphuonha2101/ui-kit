"use client";

import { Badge, Separator } from "@nphuonha/ui-kit";

function SeparatorDemo() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-card bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between text-sm">
        <span>Storage</span>
        <span className="text-muted-foreground">64%</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-sm">
        <span>Members</span>
        <span className="text-muted-foreground">12</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-sm">
        <span>Plan</span>
        <Badge variant="primary">Pro</Badge>
      </div>
    </div>
  );
}

export const demo = SeparatorDemo;
export const examples = {};
