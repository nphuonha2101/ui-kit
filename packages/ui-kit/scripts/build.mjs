import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const tsc = require.resolve("typescript/bin/tsc");

fs.rmSync("dist", { recursive: true, force: true });
execFileSync(process.execPath, [tsc, "-p", "tsconfig.build.json"], { stdio: "inherit" });

fs.cpSync("src/styles", "dist/styles", { recursive: true });
fs.copyFileSync("src/styles.css", "dist/styles.css");

function rewrite(file) {
  if (!file.endsWith(".js") && !file.endsWith(".d.ts")) return;
  const dir = path.dirname(file);
  const source = fs.readFileSync(file, "utf8");
  const next = source.replace(
    /((?:from|import)\s*["'])(\.\.?\/[^"']+)(["'])/g,
    (match, prefix, specifier, suffix) => {
      const base = path.resolve(dir, specifier);
      let resolved = specifier;
      if (fs.existsSync(`${base}.js`)) resolved = `${specifier}.js`;
      else if (fs.existsSync(path.join(base, "index.js"))) resolved = `${specifier}/index.js`;
      else if (fs.existsSync(`${base}.css`)) resolved = `${specifier}.css`;
      return `${prefix}${resolved}${suffix}`;
    },
  );
  if (next !== source) fs.writeFileSync(file, next);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else rewrite(full);
  }
}

walk("dist");
console.error("Built dist (ESM + declarations + styles).");
