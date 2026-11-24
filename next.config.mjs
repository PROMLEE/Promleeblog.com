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
      // 공개 읽기 API는 Vercel CDN에서 캐시해 함수 호출과 Fast Origin Transfer를 줄인다.
      // 편집 API(/api/edit, /api/tags/addtags 등)와 POST·PATCH·DELETE는 대상에서 제외한다.
      ...[
        "/api/main/:path*",
        "/api/post/:path*",
        "/api/tags",
        "/api/tags/postlink",
      ].map((source) => ({
        source,
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=600, stale-while-revalidate=86400",
          },
        ],
      })),
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
