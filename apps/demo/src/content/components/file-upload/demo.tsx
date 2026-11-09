"use client";

import * as React from "react";
import { FileUpload } from "@nphuonha/ui-kit";

const MAX_SIZE = 5 * 1024 * 1024;

function FileUploadDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <FileUpload
        label="Attachments"
        description="PDF or images, up to 5 MB each."
        accept="image/*,.pdf"
        maxSize={MAX_SIZE}
        maxFiles={5}
      />
    </div>
  );
}

function FileUploadControlledDemo() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <FileUpload
        label="Project files"
        files={files}
        onFilesChange={setFiles}
        maxFiles={4}
        maxSize={MAX_SIZE}
      />
      <p className="text-xs text-muted-foreground">
        {files.length} of 4 files selected.
      </p>
    </div>
  );
}

function FileUploadImagesDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <FileUpload
        label="Cover images"
        accept="image/*"
        maxFiles={6}
        maxSize={MAX_SIZE}
        title="Drop images here or browse"
        hint="PNG, JPG or WEBP · Up to 6 files"
      />
    </div>
  );
}

function FileUploadSingleDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <FileUpload
        label="Signed contract"
        description="Upload one PDF copy of the signed agreement."
        accept=".pdf"
        multiple={false}
        maxSize={MAX_SIZE}
      />
    </div>
  );
}

export const demo = FileUploadDemo;
export const examples = {
  "file-upload-controlled": FileUploadControlledDemo,
  "file-upload-images": FileUploadImagesDemo,
  "file-upload-single": FileUploadSingleDemo,
};
