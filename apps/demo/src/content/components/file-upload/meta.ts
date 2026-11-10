import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = {
  "slug": "file-upload",
  "title": "FileUpload",
  "description": "A drag-and-drop file field with type, size and count validation, image previews and a removable file list.",
  "category": "Forms",
  "imports": "import { FileUpload } from \"@nphuonha/ui-kit\";",
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
