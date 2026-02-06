import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/config/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다" },
        { status: 400 }
      );
    }

    const { tossSecretKey } = getServerEnv();
    const encoded = Buffer.from(`${tossSecretKey}:`).toString("base64");

    // Toss Payments 결제 확인 API 호출
    const tossResponse = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encoded}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      }
    );

    const tossData = await tossResponse.json();

    if (!tossResponse.ok) {
      console.error("Toss confirm error:", tossData);
      return NextResponse.json(
        { error: tossData.message || "결제 확인에 실패했습니다" },
        { status: 400 }
      );
    }

    // Supabase 주문 상태 업데이트
    const supabase = getSupabaseAdmin();
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        payment_key: paymentKey,
        payment_method: tossData.method ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("order_number", orderId);

    if (updateError) {
      console.error("Order update error:", updateError);
      return NextResponse.json(
        { error: "주문 상태 업데이트에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, payment: tossData });
  } catch (error) {
    console.error("Payment confirm error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
