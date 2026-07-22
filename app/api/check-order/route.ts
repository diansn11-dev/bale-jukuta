import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const { order_id, customer_phone } = await request.json();

    if (!order_id || !customer_phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Nomor pesanan dan WhatsApp wajib diisi.",
        },
        {
          status: 400,
        },
      );
    }

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        *,
        order_items (
          *
        )
      `,
      )
      .eq("id", order_id)
      .eq("customer_phone", customer_phone)
      .single();

    if (error || !order) {
      return NextResponse.json(
        {
          success: false,
          error: "Pesanan tidak ditemukan.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
