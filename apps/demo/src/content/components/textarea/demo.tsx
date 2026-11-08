"use client";

import { Field, Textarea } from "@nphuonha/ui-kit";

function TextareaDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Field label="Message" description="Markdown is supported.">
        <Textarea placeholder="Write something..." />
      </Field>
    </div>
  );
}

export const demo = TextareaDemo;
export const examples = {};
