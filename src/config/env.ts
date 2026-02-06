// 클라이언트에서 사용 가능한 설정 (NEXT_PUBLIC_ 접두사)
export const clientEnv = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME ?? "SWEETDEO",
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? "KRW",
  itemsPerPage: Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE ?? 16),
  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  // Toss Payments
  tossClientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? "",
  // Google Analytics
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
} as const;

// 서버에서만 사용 가능한 설정 (API Route, Server Component 등)
export function getServerEnv() {
  return {
    apiSecretKey: process.env.API_SECRET_KEY ?? "",
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    tossSecretKey: process.env.TOSS_SECRET_KEY ?? "",
    adminPassword: process.env.ADMIN_PASSWORD ?? "sweetdeo-admin",
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
