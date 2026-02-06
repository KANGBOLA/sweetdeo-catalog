import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { CreateOrderInput } from "@/lib/supabase/types";

function generateOrderNumber() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SD${datePart}-${randomPart}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderInput = await request.json();

    if (
      !body.customer_name ||
      !body.customer_phone ||
      !body.customer_address ||
      !body.items?.length
    ) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const orderNumber = generateOrderNumber();
    const totalAmount = body.items.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    );

    // 주문 생성
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        customer_address: body.customer_address,
        total_amount: totalAmount,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return NextResponse.json(
        { error: "주문 생성에 실패했습니다" },
        { status: 500 }
      );
    }

    // 주문 아이템 생성
    const orderItems = body.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity: item.quantity,
      subtotal: item.product_price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items error:", itemsError);
      return NextResponse.json(
        { error: "주문 아이템 생성에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      totalAmount,
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
