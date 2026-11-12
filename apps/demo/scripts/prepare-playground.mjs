#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const demoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(demoRoot, "..", "..");
const publicDir = path.join(demoRoot, "public");
const playgroundDir = path.join(publicDir, "playground");

function findPackageDir(name) {
  for (const base of [repoRoot, demoRoot]) {
    const dir = path.join(base, "node_modules", name);
    if (fs.existsSync(path.join(dir, "package.json"))) return dir;
  }
  throw new Error(`Cannot find ${name}. Run npm install first.`);
}

function prepareMonaco() {
  const source = path.join(findPackageDir("monaco-editor"), "min", "vs");
  const target = path.join(publicDir, "monaco", "vs");
  const version = JSON.parse(
    fs.readFileSync(path.join(findPackageDir("monaco-editor"), "package.json"), "utf8"),
  ).version;
  const stamp = path.join(publicDir, "monaco", ".version");

  if (
    fs.existsSync(target) &&
    fs.existsSync(stamp) &&
    fs.readFileSync(stamp, "utf8").trim() === version
  ) {
    return;
  }

  fs.rmSync(path.join(publicDir, "monaco"), { recursive: true, force: true });
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
  fs.writeFileSync(stamp, `${version}\n`);
  console.log(`Copied Monaco ${version} to public/monaco/vs`);
}

function readTypeFile(packageName, relativePath) {
  const packageDir = findPackageDir(packageName);
  return fs.readFileSync(path.join(packageDir, relativePath), "utf8");
}

function rewriteDeclarationSpecifiers(content) {
  return content
    .replace(/(from\s+["'][^"']+)\.js(["'])/g, "$1$2")
    .replace(/(import\(\s*["'][^"']+)\.js(["']\s*\))/g, "$1$2");
}

function collectDeclarationFiles(root, prefix, rewrite = false) {
  const files = [];
  if (!fs.existsSync(root)) return files;

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".d.ts")) {
        const relative = path.relative(root, fullPath).split(path.sep).join("/");
        const content = fs.readFileSync(fullPath, "utf8");
        files.push({
          path: `file:///${prefix}/${relative}`,
          content: rewrite ? rewriteDeclarationSpecifiers(content) : content,
        });
      }
    }
  }

  walk(root);
  return files;
}

function ensureKitDist() {
  const kitDir = path.join(repoRoot, "packages", "ui-kit");
  const declaration = path.join(kitDir, "dist", "index.d.ts");
  if (fs.existsSync(declaration)) return;

  console.log("Kit declarations missing; building @nphuonha/ui-kit first…");
  execFileSync("npm", ["run", "build", "-w", "@nphuonha/ui-kit"], {
    cwd: repoRoot,
    stdio: "inherit",
  });
}

function prepareTypes() {
  ensureKitDist();
  const reactDir = findPackageDir("@types/react");
  const reactDomDir = findPackageDir("@types/react-dom");
  const kitDist = path.join(repoRoot, "packages", "ui-kit", "dist");
  const baseUiStubs = fs.readFileSync(
    path.join(demoRoot, "scripts", "playground-externals.d.ts.txt"),
    "utf8",
  );

  const files = [
    {
      path: "file:///node_modules/@types/react/package.json",
      content: fs.readFileSync(path.join(reactDir, "package.json"), "utf8"),
    },
    ...["index.d.ts", "global.d.ts", "jsx-runtime.d.ts", "jsx-dev-runtime.d.ts"].map(
      (file) => ({
        path: `file:///node_modules/@types/react/${file}`,
        content: fs.readFileSync(path.join(reactDir, file), "utf8"),
      }),
    ),
    ...fs
      .readdirSync(reactDomDir)
      .filter((file) => file.endsWith(".d.ts"))
      .map((file) => ({
        path: `file:///node_modules/@types/react-dom/${file}`,
        content: fs.readFileSync(path.join(reactDomDir, file), "utf8"),
      })),
    {
      path: "file:///node_modules/csstype/index.d.ts",
      content: readTypeFile("csstype", "index.d.ts"),
    },
    {
      path: "file:///node_modules/clsx/index.d.ts",
      content: readTypeFile("clsx", "clsx.d.ts"),
    },
    {
      path: "file:///node_modules/class-variance-authority/index.d.ts",
      content: readTypeFile("class-variance-authority", "dist/index.d.ts"),
    },
    {
      path: "file:///node_modules/class-variance-authority/types.d.ts",
      content: readTypeFile("class-variance-authority", "dist/types.d.ts"),
    },
    {
      path: "file:///node_modules/sonner/index.d.ts",
      content: readTypeFile("sonner", "dist/index.d.ts"),
    },
    {
      path: "file:///node_modules/react-hook-form/index.d.ts",
      content: 'export * from "./dist/index";',
    },
    ...collectDeclarationFiles(
      path.join(findPackageDir("react-hook-form"), "dist"),
      "node_modules/react-hook-form/dist",
    ),
    {
      path: "file:///playground-externals.d.ts",
      content: baseUiStubs,
    },
    {
      path: "file:///node_modules/@nphuonha/ui-kit/index.d.ts",
      content: 'export * from "./dist/index";',
    },
    ...collectDeclarationFiles(
      kitDist,
      "node_modules/@nphuonha/ui-kit/dist",
      true,
    ),
  ];

  fs.writeFileSync(
    path.join(playgroundDir, "types.json"),
    JSON.stringify({ files }),
  );
  console.log(`Wrote playground types (${files.length} files).`);
}

async function buildRuntime() {
  await build({
    entryPoints: [path.join(demoRoot, "scripts", "playground-runtime-entry.ts")],
    bundle: true,
    format: "iife",
    globalName: "KitPlaygroundRuntime",
    platform: "browser",
    target: ["es2020"],
    minify: true,
    sourcemap: false,
    outfile: path.join(playgroundDir, "runtime.js"),
    alias: {
      "@nphuonha/ui-kit": path.join(repoRoot, "packages", "ui-kit", "src", "index.ts"),
    },
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    jsx: "automatic",
    logLevel: "warning",
  });

  const size = fs.statSync(path.join(playgroundDir, "runtime.js")).size;
  console.log(`Built playground runtime (${Math.round(size / 1024)} kB).`);
}

fs.mkdirSync(playgroundDir, { recursive: true });
prepareMonaco();
prepareTypes();
await buildRuntime();
