import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Set NEXT_PUBLIC_BASE_PATH env var to "" for custom domains or root deployments
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/caseflow" : "");

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
