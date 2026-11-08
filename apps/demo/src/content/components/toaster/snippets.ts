import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Button, Toaster, toast } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <>\n      <Toaster />\n      <div className=\"flex flex-wrap items-center justify-center gap-2\">\n        <Button\n          variant=\"secondary\"\n          onClick={() => toast(\"Saved\", { description: \"Your changes are live.\" })}\n        >\n          Default toast\n        </Button>\n        <Button variant=\"secondary\" onClick={() => toast.success(\"Success toast\")}>\n          Success\n        </Button>\n        <Button variant=\"secondary\" onClick={() => toast.error(\"Error toast\")}>\n          Error\n        </Button>\n      </div>\n    </>\n  );\n}",
  "usage": "import { Toaster, toast } from \"@nphuonha/ui-kit\";\n\n<Toaster theme=\"dark\" />\ntoast.success(\"Saved\");",
  "examples": {
    "toast-promise": "import { Button, toast } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <Button\n      variant=\"secondary\"\n      onClick={() => {\n        toast.promise(\n          new Promise<void>((resolve) => window.setTimeout(resolve, 1600)),\n          {\n            loading: \"Saving…\",\n            success: \"Saved\",\n            error: \"Could not save\",\n          },\n        );\n      }}\n    >\n      Promise toast\n    </Button>\n  );\n}"
  }
};
