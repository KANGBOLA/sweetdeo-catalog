"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function FailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center space-y-4">
      <div className="text-5xl">😞</div>
      <h1 className="text-xl font-bold text-gray-800">결제에 실패했습니다</h1>
      {message && <p className="text-gray-500">{message}</p>}
      {code && (
        <p className="text-xs text-gray-400">오류 코드: {code}</p>
      )}
      <div className="flex gap-3 justify-center pt-2">
        <Link
          href="/checkout"
          className="px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
        >
          다시 시도
        </Link>
        <Link
          href="/cart"
          className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
        >
          장바구니로
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutFailPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
      <Suspense
        fallback={
          <div className="animate-pulse text-gray-400">로딩 중...</div>
        }
      >
        <FailContent />
      </Suspense>
    </div>
  );
}
