import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// GitHub Pages URL is case-sensitive — must match repo name exactly: "CaseFlow"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/CaseFlow" : "");

const nextConfig: NextConfig = {
  output: "export",          // Static HTML export for GitHub Pages
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,       // GitHub Pages needs trailing slashes
  images: {
    unoptimized: true,       // Required for static export (no Image Optimization API)
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
