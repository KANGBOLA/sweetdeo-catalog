"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { gtag } from "@/lib/gtag";

function SuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [orderNumber, setOrderNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setErrorMessage("결제 정보가 올바르지 않습니다");
      return;
    }

    async function confirmPayment() {
      try {
        const res = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setErrorMessage(data.error || "결제 확인에 실패했습니다");
          return;
        }

        setOrderNumber(orderId!);
        setStatus("success");
        clearCart();

        gtag.event("purchase", {
          transaction_id: orderId,
          value: Number(amount),
          currency: "KRW",
        });
      } catch {
        setStatus("error");
        setErrorMessage("결제 확인 중 오류가 발생했습니다");
      }
    }

    confirmPayment();
  }, [searchParams, clearCart]);

  if (status === "loading") {
    return (
      <div className="text-center space-y-4">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-500">결제를 확인하고 있습니다...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center space-y-4">
        <div className="text-5xl">❌</div>
        <h1 className="text-xl font-bold text-gray-800">결제 확인 실패</h1>
        <p className="text-gray-500">{errorMessage}</p>
        <Link
          href="/cart"
          className="inline-block px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
        >
          장바구니로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center space-y-4">
      <div className="text-5xl">✅</div>
      <h1 className="text-xl font-bold text-gray-800">
        주문이 완료되었습니다!
      </h1>
      <p className="text-gray-500">
        주문번호:{" "}
        <span className="font-mono font-bold text-gray-800">
          {orderNumber}
        </span>
      </p>
      <p className="text-sm text-gray-400">
        주문번호로 배송 현황을 조회할 수 있습니다
      </p>
      <div className="flex gap-3 justify-center pt-2">
        <Link
          href={`/orders/${orderNumber}`}
          className="px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
        >
          주문 조회
        </Link>
        <Link
          href="/"
          className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
      <Suspense
        fallback={
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-gray-500">로딩 중...</p>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
