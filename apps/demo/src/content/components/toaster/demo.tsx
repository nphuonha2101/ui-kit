"use client";

import { Button, toast } from "@nphuonha/ui-kit";

function ToasterDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() => toast("Saved", { description: "Your changes are live." })}
      >
        Default toast
      </Button>
      <Button variant="secondary" onClick={() => toast.success("Success toast")}>Success</Button>
      <Button variant="secondary" onClick={() => toast.error("Error toast")}>Error</Button>
    </div>
  );
}

function ToastPromiseDemo() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        toast.promise(
          new Promise<void>((resolve) => window.setTimeout(resolve, 1600)),
          {
            loading: "Saving…",
            success: "Saved",
            error: "Could not save",
          },
        );
      }}
    >
      Promise toast
    </Button>
  );
}

export const demo = ToasterDemo;
export const examples = {
  "toast-promise": ToastPromiseDemo,
};
