import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "file-upload",
  "title": "FileUpload",
  "description": "A drag-and-drop file field with type, size and count validation, image previews and a removable file list.",
  "category": "Forms",
  "imports": "import { FileUpload } from \"@nphuonha/ui-kit\";",
  "props": [
    {
      "name": "name",
      "type": "string",
      "description": "Name of the underlying file input for native form submission."
    },
    {
      "name": "files",
      "type": "File[]",
      "description": "Controlled file list."
    },
    {
      "name": "defaultFiles",
      "type": "File[]",
      "description": "Initial files for uncontrolled usage."
    },
    {
      "name": "onFilesChange",
      "type": "(files: File[]) => void",
      "description": "Called with the next file list after adding or removing files."
    },
    {
      "name": "onBlur",
      "type": "FocusEventHandler<HTMLButtonElement>",
      "description": "Blur handler for react-hook-form."
    },
    {
      "name": "onReject",
      "type": "(rejections: FileRejection[]) => void",
      "description": "Called when files fail the type, size or count checks."
    },
    {
      "name": "accept",
      "type": "string",
      "description": "Native accept filter, such as \"image/*,.pdf\"."
    },
    {
      "name": "multiple",
      "type": "boolean",
      "default": "true",
      "description": "Allows more than one file. When false, a new file replaces the current one."
    },
    {
      "name": "maxFiles",
      "type": "number",
      "description": "Maximum number of files."
    },
    {
      "name": "maxSize",
      "type": "number",
      "description": "Maximum size per file in bytes."
    },
    {
      "name": "disabled",
      "type": "boolean",
      "description": "Disables selecting, dropping and removing files."
    },
    {
      "name": "label",
      "type": "ReactNode",
      "description": "Visible label."
    },
    {
      "name": "description",
      "type": "ReactNode",
      "description": "Helper text."
    },
    {
      "name": "error",
      "type": "ReactNode",
      "description": "Error message and invalid state."
    },
    {
      "name": "required",
      "type": "boolean",
      "description": "Marks the field as required and sets the native input's required flag."
    },
    {
      "name": "title",
      "type": "ReactNode",
      "description": "Dropzone prompt."
    },
    {
      "name": "hint",
      "type": "ReactNode",
      "description": "Dropzone hint. Defaults to a summary of accept, maxSize and maxFiles."
    },
    {
      "name": "icon",
      "type": "IconComponent",
      "description": "Dropzone icon. Defaults to the kit upload icon."
    },
    {
      "name": "showPreviews",
      "type": "boolean",
      "default": "true",
      "description": "Shows image thumbnails for image files."
    }
  ],
  "examples": [
    {
      "title": "Controlled list",
      "description": "Keep the files in state to submit them, show a counter or upload them yourself.",
      "demoKey": "file-upload-controlled"
    },
    {
      "title": "Images only",
      "description": "Combine accept with previews for a media uploader.",
      "demoKey": "file-upload-images"
    },
    {
      "title": "Single file",
      "description": "Use multiple={false} to replace the current file instead of appending.",
      "demoKey": "file-upload-single"
    }
  ]
};
