import type { NextConfig } from 'next';

// On GitHub Pages a project site is served from https://<user>.github.io/<repo>/,
// so assets must be prefixed with the repo name. The deploy workflow sets
// PAGES_BASE_PATH to the repo name; locally it's empty so dev/build stay at root.
const base = process.env.PAGES_BASE_PATH ? `/${process.env.PAGES_BASE_PATH}` : '';

const nextConfig: NextConfig = {
  output: 'export', // fully static site -> ./out (works on GitHub Pages)
  trailingSlash: true, // each route resolves as /route/index.html
  images: { unoptimized: true }, // no Image Optimization server on Pages
  basePath: base,
  assetPrefix: base || undefined,
};

export default nextConfig;
