import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/config/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const password = auth.slice(7);
  return password === getServerEnv().adminPassword;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const [orderResult, itemsResult] = await Promise.all([
    supabase.from("orders").select("*").eq("id", id).single(),
    supabase.from("order_items").select("*").eq("order_id", id),
  ]);

  if (orderResult.error) {
    return NextResponse.json(
      { error: "주문을 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    order: orderResult.data,
    items: itemsResult.data ?? [],
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const validStatuses = [
    "pending",
    "paid",
    "confirmed",
    "shipping",
    "delivered",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
    return NextResponse.json(
      { error: "유효하지 않은 상태입니다" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: order, error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { error: "주문 상태 변경에 실패했습니다" },
      { status: 500 }
    );
  }

  return NextResponse.json({ order });
}
