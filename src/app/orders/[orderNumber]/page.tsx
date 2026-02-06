"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import type { Order, OrderItem, OrderStatus } from "@/lib/supabase/types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  confirmed: "주문 확인",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "주문 취소",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "text-yellow-600",
  paid: "text-blue-600",
  confirmed: "text-emerald-600",
  shipping: "text-purple-600",
  delivered: "text-gray-600",
  cancelled: "text-red-600",
};

export default function OrderLookupPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderNumber)
        .single();

      if (orderError || !orderData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data: itemsData } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderData.id);

      setOrder(orderData as Order);
      setItems((itemsData as OrderItem[]) ?? []);
      setLoading(false);
    }

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">주문 조회 중...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md text-center space-y-4">
          <div className="text-5xl">🔍</div>
          <h1 className="text-xl font-bold text-gray-800">
            주문을 찾을 수 없습니다
          </h1>
          <p className="text-gray-500">주문번호를 다시 확인해주세요</p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">주문 조회</h1>
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            홈으로
          </Link>
        </div>

        {order && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-lg text-gray-800">
                  {order.order_number}
                </span>
                <span
                  className={`font-semibold ${STATUS_COLORS[order.status]}`}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </div>

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">주문일</span>
                  <span className="text-gray-800">
                    {new Date(order.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">수령인</span>
                  <span className="text-gray-800">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">배송지</span>
                  <span className="text-gray-800 text-right max-w-[60%]">
                    {order.customer_address}
                  </span>
                </div>
              </div>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}
