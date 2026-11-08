import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { IconButton } from \"@nphuonha/ui-kit\";\nimport {\n  CopyIcon,\n  HeartIcon,\n  MagnifyingGlassIcon,\n  ShareIcon,\n} from \"@phosphor-icons/react\";\n\nexport function Example() {\n  return (\n    <div className=\"flex flex-wrap items-center justify-center gap-2\">\n      <IconButton aria-label=\"Search\">\n        <MagnifyingGlassIcon size={18} />\n      </IconButton>\n      <IconButton aria-label=\"Copy\" variant=\"secondary\">\n        <CopyIcon size={18} />\n      </IconButton>\n      <IconButton aria-label=\"Like\" variant=\"soft\">\n        <HeartIcon size={18} />\n      </IconButton>\n      <IconButton aria-label=\"Share\" variant=\"outline\">\n        <ShareIcon size={18} />\n      </IconButton>\n    </div>\n  );\n}",
  "usage": "<IconButton aria-label=\"Search\" variant=\"secondary\">\n  <MagnifyingGlassIcon size={18} />\n</IconButton>",
  "examples": {}
};
