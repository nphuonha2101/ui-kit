"use client";

import * as React from "react";
import { Button, Field, Input, Select, Sheet } from "@nphuonha/ui-kit";

function SheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="right"
        title="Filters"
        description="Narrow down the results."
        footer={<Button onClick={() => setOpen(false)}>Apply</Button>}
      >
        <div className="flex flex-col gap-4">
          <Field label="Search">
            <Input placeholder="Type a keyword..." />
          </Field>
          <Field label="Status">
            <Select
              options={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "archived", label: "Archived" },
              ]}
              defaultValue="all"
            />
          </Field>
        </div>
      </Sheet>
    </>
  );
}

export const demo = SheetDemo;
export const examples = {};
