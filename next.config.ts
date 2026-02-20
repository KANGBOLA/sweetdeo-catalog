import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30일 캐시
  },

  // 번들 최적화
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@supabase/supabase-js",
      "zustand",
    ],
  },

  // 압축 활성화
  compress: true,

  // 성능 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff2|ico|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // 리다이렉트 (www → non-www)
  async redirects() {
    return [];
  },
};

export default nextConfig;
