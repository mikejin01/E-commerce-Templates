import type { NextConfig } from "next";

// Set to "/<repo-name>" when deploying to a GitHub Pages project site.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Static export — the demos are static data + client-side carts, no server needed.
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // next/image doesn't prefix basePath onto unoptimized srcs; the loader does.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
