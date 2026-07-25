import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getAdminUser } from "@/lib/auth";

const allowedPaymentStatus = ["pending", "paid", "cod"];

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const { payment_status } = await request.json();

    if (!allowedPaymentStatus.includes(payment_status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Status pembayaran tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .update({
        payment_status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      order,
      message: "Status pembayaran berhasil diperbarui",
    });
  } catch (error: any) {
    console.error(error);

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
