import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import * as React from \"react\";\nimport { Button, Dialog } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  const [open, setOpen] = React.useState(false);\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>Open dialog</Button>\n      <Dialog\n        open={open}\n        onOpenChange={setOpen}\n        title=\"Confirm action\"\n        description=\"This is a solid, borderless dialog surface.\"\n        footer={\n          <>\n            <Button variant=\"secondary\" onClick={() => setOpen(false)}>Cancel</Button>\n            <Button onClick={() => setOpen(false)}>Confirm</Button>\n          </>\n        }\n      >\n        <p className=\"text-sm leading-6 text-muted-foreground\">\n          Dialog content goes here. Use it for focused tasks, confirmations or short forms.\n        </p>\n      </Dialog>\n    </>\n  );\n}",
  "usage": "<Dialog open={open} onOpenChange={setOpen} title=\"Title\">\n  Content\n</Dialog>",
  "examples": {}
};
