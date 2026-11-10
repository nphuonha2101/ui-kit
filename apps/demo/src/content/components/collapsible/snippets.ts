import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "import { Checkbox, Collapsible } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Collapsible\n        title=\"Advanced filters\"\n        description=\"Narrow the result set before searching.\"\n      >\n        <div className=\"flex flex-col gap-2.5\">\n          <Checkbox label=\"Has attachments\" />\n          <Checkbox label=\"Created this week\" />\n          <Checkbox label=\"Shared with me\" />\n        </div>\n      </Collapsible>\n    </div>\n  );\n}",
  "usage": "<Collapsible title=\"Details\" defaultOpen>\n  <p>Panel content.</p>\n</Collapsible>",
  "examples": {
    "collapsible-separated": "import { Collapsible } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto flex w-full max-w-sm flex-col gap-3\">\n      <Collapsible variant=\"separated\" title=\"Billing address\" description=\"Saved for invoices\">\n        <p>12 Nguyễn Huệ, District 1, Ho Chi Minh City</p>\n      </Collapsible>\n      <Collapsible variant=\"separated\" title=\"Shipping address\" description=\"Default delivery address\">\n        <p>45 Lê Lợi, District 1, Ho Chi Minh City</p>\n      </Collapsible>\n    </div>\n  );\n}",
    "collapsible-plain": "import { Collapsible } from \"@nphuonha/ui-kit\";\n\nexport function Example() {\n  return (\n    <div className=\"mx-auto w-full max-w-sm\">\n      <Collapsible variant=\"plain\" title=\"What is included?\" defaultOpen>\n        <p className=\"text-sm leading-relaxed text-muted-foreground\">\n          Every component ships with compiled ESM, TypeScript declarations and the shared token layer.\n        </p>\n      </Collapsible>\n    </div>\n  );\n}"
  }
};
