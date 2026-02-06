"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Order, OrderStatus } from "@/lib/supabase/types";

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

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("admin-token")
      : null;

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }

    async function fetchOrders() {
      try {
        const params = filter !== "all" ? `?status=${filter}` : "";
        const res = await fetch(`/api/admin/orders${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          sessionStorage.removeItem("admin-token");
          router.push("/admin/login");
          return;
        }

        const data = await res.json();
        setOrders(data.orders ?? []);
      } catch (error) {
        console.error("Fetch orders error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token, filter, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">주문 관리</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin-token");
              router.push("/admin/login");
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            로그아웃
          </button>
        </div>

        {/* 상태 필터 */}
        <div className="flex flex-wrap gap-2">
          {(
            ["all", ...Object.keys(STATUS_LABELS)] as (OrderStatus | "all")[]
          ).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === s
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "전체" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* 주문 목록 */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500">주문이 없습니다</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="block bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-800">
                        {order.order_number}
                      </span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}
                      >
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.customer_name} · {order.customer_phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {order.total_amount.toLocaleString("ko-KR")}원
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
