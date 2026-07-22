import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET ORDERS ERROR:", error);
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.error("API ADMIN ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message ?? "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      },
    );
  }
}
