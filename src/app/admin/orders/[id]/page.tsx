"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import type { Order, OrderItem, OrderStatus } from "@/lib/supabase/types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "대기",
  paid: "결제완료",
  confirmed: "확인",
  shipping: "배송중",
  delivered: "배송완료",
  cancelled: "취소",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  shipping: "bg-purple-100 text-purple-700",
  delivered: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "paid",
  "confirmed",
  "shipping",
  "delivered",
];

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("admin-token")
      : null;

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          sessionStorage.removeItem("admin-token");
          router.push("/admin/login");
          return;
        }

        const data = await res.json();
        setOrder(data.order);
        setItems(data.items ?? []);
      } catch (error) {
        console.error("Fetch order error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, token, router]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!token || updating) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Status update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-500">주문을 찾을 수 없습니다</p>
          <Link
            href="/admin/orders"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="text-gray-400 hover:text-gray-600"
          >
            ← 목록
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            주문 상세
          </h1>
        </div>

        {/* 주문 정보 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-lg text-gray-800">
              {order.order_number}
            </span>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[order.status]}`}
            >
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">고객명</span>
              <p className="font-medium text-gray-800">
                {order.customer_name}
              </p>
            </div>
            <div>
              <span className="text-gray-500">전화번호</span>
              <p className="font-medium text-gray-800">
                {order.customer_phone}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">배송 주소</span>
              <p className="font-medium text-gray-800">
                {order.customer_address}
              </p>
            </div>
            <div>
              <span className="text-gray-500">주문일시</span>
              <p className="font-medium text-gray-800">
                {new Date(order.created_at).toLocaleString("ko-KR")}
              </p>
            </div>
            <div>
              <span className="text-gray-500">결제수단</span>
              <p className="font-medium text-gray-800">
                {order.payment_method ?? "-"}
              </p>
            </div>
          </div>
        </div>

        {/* 주문 상품 */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
          <h2 className="font-bold text-gray-800">주문 상품</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-gray-600">
                {item.product_name} x {item.quantity}
              </span>
              <span className="font-medium text-gray-800">
                {item.subtotal.toLocaleString("ko-KR")}원
              </span>
            </div>
          ))}
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="font-medium text-gray-600">합계</span>
            <span className="text-xl font-bold text-gray-900">
              {order.total_amount.toLocaleString("ko-KR")}원
            </span>
          </div>
        </div>

        {/* 상태 변경 */}
        {order.status !== "cancelled" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
            <h2 className="font-bold text-gray-800">상태 변경</h2>
            <div className="flex flex-wrap gap-2">
              {STATUS_FLOW.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  disabled={updating || order.status === s}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    order.status === s
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
              <button
                onClick={() => handleStatusChange("cancelled")}
                disabled={updating}
                className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors"
              >
                주문 취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
