"use client";

import { Button, Input, Popover } from "@nphuonha/ui-kit";

function PopoverDemo() {
  return (
    <Popover
      trigger={<Button variant="outline">Open popover</Button>}
      title="Stay in the loop"
      description="Get product updates in your inbox."
    >
      <div className="flex flex-col gap-2">
        <Input placeholder="you@example.com" type="email" />
        <Button size="sm">Subscribe</Button>
      </div>
    </Popover>
  );
}

export const demo = PopoverDemo;
export const examples = {};
