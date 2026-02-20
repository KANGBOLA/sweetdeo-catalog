"use client";

import Link from "next/link";

const GITHUB_SPONSOR_URL = "https://github.com/sponsors/KANGBOLA";

const tiers = [
  {
    name: "Seed",
    price: "1,000",
    emoji: "🌱",
    description: "SWEETDEO 프로젝트를 응원합니다",
    perks: ["GitHub 스폰서 배지", "감사 메시지"],
  },
  {
    name: "Sprout",
    price: "5,000",
    emoji: "🌿",
    description: "성장하는 오픈소스에 기여합니다",
    perks: ["GitHub 스폰서 배지", "월간 개발 리포트", "Discord 전용 채널"],
    popular: true,
  },
  {
    name: "Bloom",
    price: "10,000",
    emoji: "🌸",
    description: "프로젝트의 꽃을 피웁니다",
    perks: [
      "GitHub 스폰서 배지",
      "월간 개발 리포트",
      "Discord 전용 채널",
      "README 크레딧",
      "신제품 얼리엑세스",
    ],
  },
  {
    name: "Tree",
    price: "50,000",
    emoji: "🌳",
    description: "SWEETDEO의 든든한 기둥이 됩니다",
    perks: [
      "모든 Bloom 혜택",
      "로고/이름 홈페이지 노출",
      "1:1 기술 상담 (월 1회)",
      "커스텀 기능 요청 우선권",
    ],
  },
];

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link href="/" className="text-emerald-200 hover:text-white text-sm mb-4 inline-block">
            &larr; SWEETDEO 홈으로
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4">
            SWEETDEO 스폰서
          </h1>
          <p className="mt-4 text-lg text-emerald-100 max-w-2xl mx-auto">
            오픈소스 이커머스 프로젝트를 후원해주세요.
            여러분의 지원이 더 나은 제품과 코드를 만듭니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={GITHUB_SPONSOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub Sponsors
            </a>
          </div>
        </div>
      </div>

      {/* 후원 티어 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          후원 티어
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 ${
                tier.popular
                  ? "border-emerald-500 shadow-md"
                  : "border-gray-100"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                  POPULAR
                </span>
              )}
              <div className="text-4xl mb-3">{tier.emoji}</div>
              <h3 className="text-lg font-bold text-gray-800">{tier.name}</h3>
              <div className="mt-2">
                <span className="text-2xl font-extrabold text-gray-900">
                  {tier.price}
                </span>
                <span className="text-sm text-gray-500">원/월</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-emerald-500 mt-0.5">&#10003;</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href={GITHUB_SPONSOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 block text-center py-2.5 rounded-full font-medium text-sm transition-colors ${
                  tier.popular
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                후원하기
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 수익 투명성 */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            후원금 사용처
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-4 rounded-xl bg-emerald-50">
              <div className="text-2xl mb-2">&#9881;&#65039;</div>
              <h3 className="font-bold text-gray-800">서버 운영</h3>
              <p className="text-sm text-gray-600 mt-1">
                DB, 호스팅, 도메인 등 인프라 비용
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50">
              <div className="text-2xl mb-2">&#128187;</div>
              <h3 className="font-bold text-gray-800">기능 개발</h3>
              <p className="text-sm text-gray-600 mt-1">
                새로운 기능 및 성능 개선 개발
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50">
              <div className="text-2xl mb-2">&#128218;</div>
              <h3 className="font-bold text-gray-800">오픈소스</h3>
              <p className="text-sm text-gray-600 mt-1">
                커뮤니티 문서화 및 교육 자료 제작
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 풋터 */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; 2026 SWEETDEO. Built with Next.js &amp; Open Source.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="https://github.com/KANGBOLA/sweetdeo-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 transition-colors"
            >
              GitHub
            </a>
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Store
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
