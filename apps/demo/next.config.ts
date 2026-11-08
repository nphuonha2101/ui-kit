import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nphuonha/ui-kit"],
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
