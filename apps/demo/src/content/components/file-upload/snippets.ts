import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": `import { FileUpload } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <div className="w-full max-w-md">
      <FileUpload
        label="Attachments"
        description="PDF or images, up to 5 MB each."
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
        maxFiles={5}
      />
    </div>
  );
}`,
  "usage": `<FileUpload label="Attachments" accept="image/*,.pdf" maxSize={5 * 1024 * 1024} />`,
  "examples": {
    "file-upload-controlled": `"use client";

import * as React from "react";
import { FileUpload } from "@nphuonha/ui-kit";

export function Example() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FileUpload
        label="Project files"
        files={files}
        onFilesChange={setFiles}
        maxFiles={4}
        maxSize={5 * 1024 * 1024}
      />
      <p className="text-xs text-muted-foreground">
        {files.length} of 4 files selected.
      </p>
    </div>
  );
}`,
    "file-upload-images": `import { FileUpload } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <FileUpload
      label="Cover images"
      accept="image/*"
      maxFiles={6}
      maxSize={5 * 1024 * 1024}
      title="Drop images here or browse"
      hint="PNG, JPG or WEBP · Up to 6 files"
    />
  );
}`,
    "file-upload-single": `import { FileUpload } from "@nphuonha/ui-kit";

export function Example() {
  return (
    <FileUpload
      label="Signed contract"
      description="Upload one PDF copy of the signed agreement."
      accept=".pdf"
      multiple={false}
      maxSize={5 * 1024 * 1024}
    />
  );
}`,
  },
};
