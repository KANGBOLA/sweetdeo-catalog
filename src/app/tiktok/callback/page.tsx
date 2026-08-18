"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function CallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center space-y-4">
      {code ? (
        <>
          <div className="text-5xl">✅</div>
          <h1 className="text-xl font-bold text-gray-800">TikTok 로그인 성공</h1>
          <p className="text-sm text-gray-500">
            인증 코드를 정상적으로 전달받았습니다. 이 코드는 서버에서 액세스 토큰으로
            교환되어 콘텐츠 게시에 사용됩니다.
          </p>
          <p className="text-xs text-gray-400 break-all bg-gray-50 rounded-lg p-3">
            code: {code}
          </p>
        </>
      ) : error ? (
        <>
          <div className="text-5xl">😞</div>
          <h1 className="text-xl font-bold text-gray-800">TikTok 로그인 실패</h1>
          <p className="text-sm text-gray-500">{errorDescription ?? error}</p>
        </>
      ) : (
        <p className="text-gray-400">인증 정보를 기다리는 중...</p>
      )}
      <Link
        href="/tiktok/login"
        className="inline-block px-6 py-2.5 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
      >
        돌아가기
      </Link>
    </div>
  );
}

export default function TikTokCallbackPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
      <Suspense
        fallback={<div className="animate-pulse text-gray-400">로딩 중...</div>}
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
}
