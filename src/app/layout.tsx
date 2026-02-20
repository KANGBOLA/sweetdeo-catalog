import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME ?? "SWEETDEO";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetdeo.netlify.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export const metadata: Metadata = {
  title: {
    default: `${brandName} - 4FREE 데오드란트 | 무알코올 무파라벤 무향료 무알루미늄`,
    template: `%s | ${brandName}`,
  },
  description:
    "피부에 순한 4가지 FREE 데오드란트 컬렉션. 무알코올, 무파라벤, 무향료, 무알루미늄 성분의 안전한 데오드란트를 만나보세요. 스프레이, 롤온, 스틱, 크림 타입 제공.",
  keywords: [
    "데오드란트",
    "4FREE",
    "무알코올",
    "무파라벤",
    "무향료",
    "무알루미늄",
    "저자극",
    "민감성피부",
    "SWEETDEO",
    "스프레이",
    "롤온",
    "스틱",
    "크림",
  ],
  authors: [{ name: "SWEETDEO Team", url: siteUrl }],
  creator: "KANGBOLA",
  publisher: brandName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: brandName,
    title: `${brandName} - 4FREE 데오드란트 컬렉션`,
    description:
      "피부에 순한 4가지 FREE 데오드란트. 무알코올, 무파라벤, 무향료, 무알루미늄 안전 성분만 사용합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandName} - 4FREE 데오드란트`,
    description:
      "피부에 순한 4가지 FREE 데오드란트 컬렉션",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: brandName,
    description: "피부에 순한 4가지 FREE 데오드란트 컬렉션",
    url: siteUrl,
    priceRange: "$$",
    currenciesAccepted: "KRW",
    paymentAccepted: "Credit Card, Bank Transfer, KakaoPay, Naver Pay",
  };

  return (
    <html lang="ko">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
