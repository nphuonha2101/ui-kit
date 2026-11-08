"use client";

import { Button } from "@nphuonha/ui-kit";
import { PlusIcon } from "@phosphor-icons/react";

function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" startIcon={PlusIcon}>New item</Button>
        <Button loading>Loading</Button>
        <Button shape="pill">Pill action</Button>
      </div>
    </div>
  );
}

function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button shape="pill">Pill</Button>
      <Button shape="pill" variant="secondary">Pill secondary</Button>
    </div>
  );
}

export const demo = ButtonDemo;
export const examples = {
  "button-sizes": ButtonSizesDemo,
};
