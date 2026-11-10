export interface BuildInfo {
  packageVersion: string;
  deployId: string;
  commit: string;
  builtAt: string;
}

/**
 * Injected by `next.config.ts` at build time. Values are inlined by Next for
 * both server and client components, so this module is safe to import anywhere.
 */
export const buildInfo: BuildInfo = {
  packageVersion: process.env.NEXT_PUBLIC_KIT_VERSION ?? "0.0.0",
  deployId: process.env.NEXT_PUBLIC_DEPLOY_ID ?? "dev",
  commit: process.env.NEXT_PUBLIC_COMMIT_SHA ?? "dev",
  builtAt: process.env.NEXT_PUBLIC_BUILD_TIME ?? "",
};

export const versionLabel = `v${buildInfo.packageVersion}`;
