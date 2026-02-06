"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { clientEnv } from "@/config/env";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">로딩 중...</div>
      </div>
    );
  }

  const currency = clientEnv.currency === "KRW" ? "원" : clientEnv.currency;

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">장바구니</h1>
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            쇼핑 계속하기
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
            <div className="text-5xl">🛒</div>
            <p className="text-gray-500">장바구니가 비어있습니다</p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
            >
              제품 둘러보기
            </Link>
          </div>
        ) : (
          <>
            {/* 장바구니 아이템 목록 */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
                >
                  {/* 제품 정보 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product.category}
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {item.product.price.toLocaleString("ko-KR")}
                      {currency}
                    </p>
                  </div>

                  {/* 수량 조절 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      aria-label="수량 줄이기"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      aria-label="수량 늘리기"
                    >
                      +
                    </button>
                  </div>

                  {/* 소계 */}
                  <div className="text-right w-24">
                    <p className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString(
                        "ko-KR"
                      )}
                      {currency}
                    </p>
                  </div>

                  {/* 삭제 */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="삭제"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 요약 및 주문 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium text-gray-600">총 금액</span>
                <span className="font-bold text-gray-900 text-xl">
                  {totalPrice().toLocaleString("ko-KR")}
                  {currency}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  전체 삭제
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-full font-medium text-center hover:bg-emerald-600 transition-colors"
                >
                  주문하기
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
