import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getAdminUser } from "@/lib/auth";
import { sendWhatsApp } from "@/lib/send-whatsapp";

const allowedStatuses = [
  "pending",
  "processed",
  "shipped",
  "completed",
  "cancelled",
];

function statusText(status: string) {
  switch (status) {
    case "pending":
      return "Menunggu Diproses";

    case "processed":
      return "Sedang Diproses";

    case "shipped":
      return "Sedang Dikirim";

    case "completed":
      return "Selesai";

    case "cancelled":
      return "Dibatalkan";

    default:
      return status;
  }
}

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
    // ======================
    // CEK ADMIN
    // ======================

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

    const { status } = await request.json();

    // ======================
    // VALIDASI STATUS
    // ======================

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Status tidak valid.",
        },
        {
          status: 400,
        },
      );
    }

    // ======================
    // AMBIL ORDER
    // ======================

    const { data: oldOrder, error: getError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (getError || !oldOrder) {
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

    // ======================
    // UPDATE STATUS
    // ======================

    const { data: order, error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // ======================
    // WHATSAPP
    // ======================

    if (order.customer_phone) {
      const pesan = `Halo ${order.customer_name} 👋

Pesanan Anda di Bale Juku' Ta' telah diperbarui.

📦 Nomor Pesanan
#${order.id}

📌 Status
${statusText(order.status)}

💰 Total
Rp ${Number(order.total_price ?? 0).toLocaleString("id-ID")}

Terima kasih telah berbelanja di Bale Juku' Ta' 🐟`;

      try {
        await sendWhatsApp(order.customer_phone, pesan);
      } catch (error) {
        console.error("WhatsApp gagal:", error);
      }
    }

    return NextResponse.json({
      success: true,

      order,

      message: "Status berhasil diperbarui.",
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
