"use client";

import Link from "next/link";

export default function SponsorCTA() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-10 text-white text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold">
        SWEETDEO를 후원해주세요
      </h2>
      <p className="mt-3 text-emerald-100 max-w-lg mx-auto">
        오픈소스 이커머스 프로젝트를 응원하고, 더 나은 제품 개발에 함께해주세요.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="https://github.com/sponsors/KANGBOLA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          GitHub Sponsors
        </a>
        <Link
          href="/sponsor"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
        >
          후원 티어 보기
        </Link>
      </div>
    </section>
  );
}
