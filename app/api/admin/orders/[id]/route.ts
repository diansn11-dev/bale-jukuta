import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// ==========================
// GET DETAIL ORDER
// ==========================

export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        *,
        order_items (*)
        `,
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error: any) {
    console.error("GET ORDER ERROR:", error);

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

// ==========================
// UPDATE STATUS ORDER
// ==========================

export async function PATCH(request: Request, { params }: Props) {
  try {
    const { id } = await params;

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: "Status wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    // Update status

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .update({
        status,
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
    });
  } catch (error: any) {
    console.error("UPDATE STATUS ERROR:", error);

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
