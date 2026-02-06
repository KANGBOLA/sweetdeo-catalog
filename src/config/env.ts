// 클라이언트에서 사용 가능한 설정 (NEXT_PUBLIC_ 접두사)
export const clientEnv = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? "SWEETDEO",
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? "KRW",
  itemsPerPage: Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE ?? 16),
} as const;

// 서버에서만 사용 가능한 설정 (API Route, Server Component 등)
export function getServerEnv() {
  return {
    apiSecretKey: process.env.API_SECRET_KEY ?? "",
    database: {
      url: process.env.DATABASE_URL ?? "",
      host: process.env.DATABASE_HOST ?? "localhost",
      port: Number(process.env.DATABASE_PORT ?? 5432),
      name: process.env.DATABASE_NAME ?? "sweetdeo",
      user: process.env.DATABASE_USER ?? "",
      password: process.env.DATABASE_PASSWORD ?? "",
    },
  } as const;
}
