import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Button, Input, Popover } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <Popover\n      trigger={<Button variant=\"outline\">Open popover</Button>}\n      title=\"Stay in the loop\"\n      description=\"Get product updates in your inbox.\"\n    >\n      <div className=\"flex flex-col gap-2\">\n        <Input placeholder=\"you@example.com\" type=\"email\" />\n        <Button size=\"sm\">Subscribe</Button>\n      </div>\n    </Popover>\n  );\n}",
  "usage": "<Popover trigger={<Button>Open</Button>} title=\"Title\">\n  Content\n</Popover>",
  "examples": {}
};
