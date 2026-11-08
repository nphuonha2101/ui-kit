#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src", "content", "components");
const check = process.argv.includes("--check");

const CATEGORY_ORDER = [
  "Actions",
  "Forms",
  "Overlays",
  "Navigation",
  "Data Display",
  "Feedback",
];

const folders = fs
  .readdirSync(contentDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

function camelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function readMeta(slug) {
  const file = path.join(contentDir, slug, "meta.ts");
  const source = fs.readFileSync(file, "utf8");
  const title = source.match(/"title":\s*"([^"]+)"/)?.[1];
  const category = source.match(/"category":\s*"([^"]+)"/)?.[1];
  const metaSlug = source.match(/"slug":\s*"([^"]+)"/)?.[1];
  const demoKeys = [...source.matchAll(/"demoKey":\s*"([^"]+)"/g)].map((match) => match[1]);
  if (!title || !category || !metaSlug) {
    throw new Error(`Could not parse metadata in ${file}`);
  }
  if (metaSlug !== slug) {
    throw new Error(`Slug mismatch in ${file}: expected "${slug}", got "${metaSlug}"`);
  }
  if (!CATEGORY_ORDER.includes(category)) {
    throw new Error(`Unknown category "${category}" in ${file}`);
  }
  const demoFile = path.join(contentDir, slug, "demo.tsx");
  if (!fs.existsSync(demoFile)) throw new Error(`Missing demo.tsx in ${slug}`);
  const demoSource = fs.readFileSync(demoFile, "utf8");
  if (!/export const demo\b/.test(demoSource) || !/export const examples\b/.test(demoSource)) {
    throw new Error(`demo.tsx in ${slug} must export "demo" and "examples"`);
  }

  const snippetsFile = path.join(contentDir, slug, "snippets.ts");
  if (!fs.existsSync(snippetsFile)) throw new Error(`Missing snippets.ts in ${slug}`);
  const snippetsSource = fs.readFileSync(snippetsFile, "utf8");
  if (!/"preview"\s*:/.test(snippetsSource) || !/"usage"\s*:/.test(snippetsSource)) {
    throw new Error(`snippets.ts in ${slug} must define "preview" and "usage"`);
  }
  for (const key of demoKeys) {
    if (!snippetsSource.includes(`"${key}"`)) {
      throw new Error(`Missing snippets example "${key}" in ${slug}/snippets.ts`);
    }
    if (!demoSource.includes(`"${key}"`)) {
      throw new Error(`Missing demo example "${key}" in ${slug}/demo.tsx`);
    }
  }
  return { slug, title, category, demoKeys };
}

const entries = folders
  .map(readMeta)
  .sort((a, b) => {
    const categoryDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    return categoryDiff !== 0 ? categoryDiff : a.title.localeCompare(b.title);
  });

const metaImports = entries
  .map(({ slug }) => {
    const name = camelCase(slug);
    return `import { meta as ${name}Meta } from "./${slug}/meta";`;
  })
  .join("\n");

const metaEntries = entries.map(({ slug }) => `  ${camelCase(slug)}Meta,`).join("\n");

const indexSource = `${metaImports}

import type { ComponentCategory, ComponentMeta } from "@/content/types";

export const registry: ComponentMeta[] = [
${metaEntries}
];

export const categories: ComponentCategory[] = ${JSON.stringify(CATEGORY_ORDER, null, 2)};

export const searchIndex = registry.map(({ slug, title, description, category }) => ({
  slug,
  title,
  description,
  category,
}));

export const componentGroups = categories.map((category) => ({
  category,
  components: registry.filter((entry) => entry.category === category),
}));

export function getComponent(slug: string) {
  return registry.find((entry) => entry.slug === slug);
}
`;

const snippetImports = entries
  .map(({ slug }) => {
    const name = camelCase(slug);
    return `import { snippets as ${name}Snippets } from "./${slug}/snippets";`;
  })
  .join("\n");

const snippetEntries = entries
  .map(({ slug }) => `  "${slug}": ${camelCase(slug)}Snippets,`)
  .join("\n");

const snippetsMapSource = `import type { ComponentSnippets } from "@/content/types";

${snippetImports}

const snippetsMap: Record<string, ComponentSnippets> = {
${snippetEntries}
};

export function getSnippets(slug: string) {
  return snippetsMap[slug];
}
`;

const demoImports = entries
  .map(({ slug }) => {
    const name = camelCase(slug);
    return `const ${name}Demo = dynamic(() => import("./${slug}/demo").then((module) => module.demo));`;
  })
  .join("\n");

const demoEntries = entries
  .map(({ slug }) => `  "${slug}": ${camelCase(slug)}Demo,`)
  .join("\n");

const exampleImports = [];
const exampleEntries = [];
for (const entry of entries) {
  const name = camelCase(entry.slug);
  for (const key of entry.demoKeys) {
    const exampleName = `${name}${camelCase(key)}Example`;
    exampleImports.push(
      `const ${exampleName} = dynamic(() =>\n  import("./${entry.slug}/demo").then((module) => module.examples["${key}"]),\n);`,
    );
    exampleEntries.push(`  "${key}": ${exampleName},`);
  }
}

const demoMapSource = `"use client";

import type * as React from "react";
import dynamic from "next/dynamic";

${demoImports}

${exampleImports.join("\n")}

export const demoMap: Record<string, React.ComponentType> = {
${demoEntries}
};

export const exampleMap: Record<string, React.ComponentType> = {
${exampleEntries.join("\n")}
};

export function ComponentDemo({ slug }: { slug: string }) {
  const Demo = demoMap[slug];
  return Demo ? <Demo /> : null;
}

export function ExampleDemo({ demoKey }: { demoKey: string }) {
  const Demo = exampleMap[demoKey];
  return Demo ? <Demo /> : null;
}
`;

const outputs = [
  ["index.ts", indexSource],
  ["snippets-map.ts", snippetsMapSource],
  ["demo-map.tsx", demoMapSource],
];

let mismatch = false;
for (const [file, expected] of outputs) {
  const target = path.join(contentDir, file);
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
  if (current !== expected) {
    if (check) {
      console.error(`Out of date: src/content/components/${file}`);
      mismatch = true;
    } else {
      fs.writeFileSync(target, expected);
      console.log(`Updated src/content/components/${file}`);
    }
  }
}

if (mismatch) {
  console.error("Run `npm run gen:content` to regenerate the content indexes.");
  process.exit(1);
}

if (!check) {
  console.log(`Content indexes are up to date (${entries.length} components).`);
}
