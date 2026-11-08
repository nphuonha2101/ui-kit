"use client";

import * as React from "react";
import { Button, Dialog } from "@nphuonha/ui-kit";

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        description="This is a solid, borderless dialog surface."
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="text-sm leading-6 text-muted-foreground">
          Dialog content goes here. Use it for focused tasks, confirmations or short forms.
        </p>
      </Dialog>
    </>
  );
}

export const demo = DialogDemo;
export const examples = {};
