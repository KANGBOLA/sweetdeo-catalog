import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/config/env";
import { getSupabaseAdmin } from "@/lib/supabase/server";

function checkAuth(request: NextRequest): boolean {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const password = auth.slice(7);
  return password === getServerEnv().adminPassword;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { error: "주문 목록 조회에 실패했습니다" },
      { status: 500 }
    );
  }

  return NextResponse.json({ orders });
}
