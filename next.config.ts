import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The OG and Twitter image routes read the font and logo from /assets at request time.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**/*"],
    "/twitter-image": ["./assets/**/*"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
