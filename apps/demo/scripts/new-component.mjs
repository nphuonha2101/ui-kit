#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src", "content", "components");

const CATEGORY_ORDER = [
  "Actions",
  "Forms",
  "Overlays",
  "Navigation",
  "Data Display",
  "Feedback",
];

const [slug, title, category] = process.argv.slice(2);

if (!slug || !title || !category) {
  console.error('Usage: npm run new:component -- <slug> "<Title>" <Category>');
  console.error(`Categories: ${CATEGORY_ORDER.join(", ")}`);
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Slug must be kebab-case, e.g. date-picker.");
  process.exit(1);
}

if (!CATEGORY_ORDER.includes(category)) {
  console.error(`Unknown category "${category}". Use one of: ${CATEGORY_ORDER.join(", ")}`);
  process.exit(1);
}

const dir = path.join(contentDir, slug);
if (fs.existsSync(dir)) {
  console.error(`src/content/components/${slug} already exists.`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });

const meta = {
  slug,
  title,
  description: "Describe the component in one sentence.",
  category,
  imports: 'import { Button } from "@nphuonha/ui-kit";',
  examples: [],
};

fs.writeFileSync(
  path.join(dir, "meta.ts"),
  `import type { ComponentMeta } from "@/content/types";

export const meta: ComponentMeta = ${JSON.stringify(meta, null, 2)};
`,
);

fs.writeFileSync(
  path.join(dir, "snippets.ts"),
  `import type { ComponentSnippets } from "@/content/types";

export const snippets: ComponentSnippets = {
  "preview": "",
  "usage": "",
  "examples": {},
};
`,
);

fs.writeFileSync(
  path.join(dir, "demo.tsx"),
  `"use client";

import { Button } from "@nphuonha/ui-kit";

function Demo() {
  return <Button>${title}</Button>;
}

export const demo = Demo;
export const examples = {};
`,
);

execFileSync(process.execPath, ["scripts/gen-content-index.mjs"], {
  cwd: root,
  stdio: "inherit",
});

execFileSync(process.execPath, ["scripts/gen-props.mjs"], {
  cwd: root,
  stdio: "inherit",
});

console.log(`\nCreated src/content/components/${slug}`);
console.log("Next: fill in meta.ts, snippets.ts and demo.tsx.");
console.log("Props are generated from JSDoc on the exported *Props type in packages/ui-kit/src.");
console.log("Run `npm run gen:props` after editing the component API.");
