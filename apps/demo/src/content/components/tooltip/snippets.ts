import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { IconButton, Tooltip } from \"@nphuonha/ui-kit\";\nimport {\n  CopyIcon,\n  MagnifyingGlassIcon,\n  ShareIcon,\n} from \"@phosphor-icons/react\";\n\nexport function Example() {\n  return (\n    <div className=\"flex flex-wrap items-center justify-center gap-3\">\n      <Tooltip content=\"Search documentation\">\n        <IconButton aria-label=\"Search\">\n          <MagnifyingGlassIcon size={18} />\n        </IconButton>\n      </Tooltip>\n      <Tooltip content=\"Copy to clipboard\">\n        <IconButton aria-label=\"Copy\" variant=\"secondary\">\n          <CopyIcon size={18} />\n        </IconButton>\n      </Tooltip>\n      <Tooltip content=\"Share with your team\">\n        <IconButton aria-label=\"Share\" variant=\"outline\">\n          <ShareIcon size={18} />\n        </IconButton>\n      </Tooltip>\n    </div>\n  );\n}",
  "usage": "<Tooltip content=\"Copy to clipboard\">\n  <IconButton aria-label=\"Copy\">...</IconButton>\n</Tooltip>",
  "examples": {}
};
