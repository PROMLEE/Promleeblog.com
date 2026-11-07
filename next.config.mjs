import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
// import withPlaiceholder from "@plaiceholder/next";
// import withImages from "next-images";
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/translations/**/*.mdx"],
  },
  outputFileTracingExcludes: {
    "/*": ["./content/translations/**/*.draft.mdx", "./content/translations/**/*.source.json"],
    "/api/**": ["./content/translations/**"],
  },
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 31536000, // 1년
    unoptimized: true,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.promleeblog.com/:path*",
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    workerThreads: false, // 비활성화하여 빌드 중 동시 요청 제한
  },
};

// Keep development artifacts separate from builds running in the same checkout.
export default (phase) => ({
  ...nextConfig,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});
