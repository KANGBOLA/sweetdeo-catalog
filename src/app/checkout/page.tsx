"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { clientEnv } from "@/config/env";
import { gtag } from "@/lib/gtag";
import { loadTossPayments, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const widgetsRef = useRef<TossPaymentsWidgets | null>(null);
  const paymentMethodRendered = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !items.length || !clientEnv.tossClientKey) return;

    async function initWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientEnv.tossClientKey);
        const widgets = tossPayments.widgets({
          customerKey: "ANONYMOUS",
        });
        widgetsRef.current = widgets;

        await widgets.setAmount({
          currency: "KRW",
          value: totalPrice(),
        });

        if (!paymentMethodRendered.current) {
          await widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          });
          paymentMethodRendered.current = true;
        }
      } catch (error) {
        console.error("Toss widgets init error:", error);
      }
    }

    initWidgets();
  }, [mounted, items.length, totalPrice]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const currency = clientEnv.currency === "KRW" ? "원" : clientEnv.currency;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // 1. 주문 생성
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_address: form.address,
          items: items.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            product_price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        alert(orderData.error || "주문 생성에 실패했습니다");
        setLoading(false);
        return;
      }

      // GA 이벤트
      gtag.event("begin_checkout", {
        currency: "KRW",
        value: totalPrice(),
        items: items.map((item) => ({
          item_id: String(item.product.id),
          item_name: item.product.name,
          item_category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });

      // 2. Toss 결제 요청
      if (widgetsRef.current) {
        await widgetsRef.current.requestPayment({
          orderId: orderData.orderNumber,
          orderName:
            items.length === 1
              ? items[0].product.name
              : `${items[0].product.name} 외 ${items.length - 1}건`,
          customerName: form.name,
          customerMobilePhone: form.phone.replace(/-/g, ""),
          successUrl: `${clientEnv.siteUrl}/checkout/success`,
          failUrl: `${clientEnv.siteUrl}/checkout/fail`,
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("결제 처리 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">주문서</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 배송 정보 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-800 text-lg">배송 정보</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  전화번호
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="010-1234-5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  배송 주소
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="서울특별시 강남구..."
                />
              </div>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            <h2 className="font-bold text-gray-800 text-lg">주문 상품</h2>
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium text-gray-800">
                  {(item.product.price * item.quantity).toLocaleString("ko-KR")}
                  {currency}
                </span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="font-medium text-gray-600">총 결제 금액</span>
              <span className="text-xl font-bold text-gray-900">
                {totalPrice().toLocaleString("ko-KR")}
                {currency}
              </span>
            </div>
          </div>

          {/* Toss 결제 위젯 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4">결제 수단</h2>
            <div id="payment-method" />
          </div>

          {/* 결제 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-500 text-white rounded-full font-bold text-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "처리 중..." : `${totalPrice().toLocaleString("ko-KR")}${currency} 결제하기`}
          </button>
        </form>
      </div>
    </div>
  );
}
