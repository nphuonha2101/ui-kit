import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import type { NextConfig } from "next";

function readKitVersion() {
  try {
    const file = path.resolve(process.cwd(), "../../packages/ui-kit/package.json");
    const pkg = JSON.parse(fs.readFileSync(file, "utf8")) as { version?: string };
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function readCommit() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execFileSync("git", ["rev-parse", "--short=7", "HEAD"], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "dev";
  }
}

const kitVersion = readKitVersion();
const commit = readCommit();
const builtAt = new Date().toISOString();
const deployId = `${builtAt.slice(0, 10).replaceAll("-", ".")}-${commit}`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nphuonha/ui-kit"],
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_KIT_VERSION: kitVersion,
    NEXT_PUBLIC_COMMIT_SHA: commit,
    NEXT_PUBLIC_BUILD_TIME: builtAt,
    NEXT_PUBLIC_DEPLOY_ID: deployId,
  },
};

export default nextConfig;
