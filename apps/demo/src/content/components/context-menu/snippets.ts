import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { ContextMenu } from \"@nphuonha/ui-kit\";\nimport { PencilSimpleIcon, CopyIcon, TrashIcon } from \"@phosphor-icons/react\";\n\nexport function Example() {\n  return (\n    <ContextMenu\n      items={[\n        { label: \"Edit\", icon: PencilSimpleIcon, shortcut: \"E\" },\n        { label: \"Duplicate\", icon: CopyIcon },\n        { type: \"separator\" },\n        { label: \"Delete\", icon: TrashIcon, danger: true },\n      ]}\n    >\n      Right-click here\n    </ContextMenu>\n  );\n}",
  "usage": "<ContextMenu\n  items={[\n    { label: \"Edit\", onSelect: edit },\n    { label: \"Delete\", danger: true, onSelect: remove },\n  ]}\n>\n  Right-click here\n</ContextMenu>",
  "examples": {
    "context-menu-submenu": "import { ContextMenu } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <ContextMenu\n      items={[\n        {\n          type: \"submenu\",\n          label: \"Share\",\n          items: [{ label: \"Copy link\" }, { label: \"Email\" }],\n        },\n        { type: \"separator\" },\n        { label: \"Download\" },\n      ]}\n    >\n      Right-click here\n    </ContextMenu>\n  );\n}"
  }
};
