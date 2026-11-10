import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Meter } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Meter value={72} label=\"Storage used\" showValue />\n    </div>\n  );\n}",
  "usage": "<Meter\n  value={usage}\n  max={quota}\n  label=\"Storage used\"\n  formatValue={(_, value) => `${value} of ${quota} GB`}\n  showValue\n/>",
  "examples": {
    "meter-thresholds": "import { Meter } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-5\">\n      <Meter value={28} low={40} high={75} optimum={30} label=\"Healthy\" showValue />\n      <Meter value={58} low={40} high={75} optimum={30} label=\"Watch\" showValue />\n      <Meter value={92} low={40} high={75} optimum={30} label=\"Over quota\" showValue />\n    </div>\n  );\n}",
    "meter-sizes": "import { Meter } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-5\">\n      <Meter value={4.2} max={10} size=\"sm\" label=\"Upload\" showValue formatValue={(_, value) => `${value} GB`} />\n      <Meter value={7.8} max={10} label=\"Storage\" showValue formatValue={(_, value) => `${value} GB of 10 GB`} />\n      <Meter value={1250} max={2000} size=\"lg\" label=\"Monthly requests\" showValue formatValue={(_, value) => value.toLocaleString()} />\n    </div>\n  );\n}"
  }
};
