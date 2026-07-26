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
    // AMBIL DATA ORDER
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
    // KIRIM WHATSAPP
    // ======================

    console.log("ORDER DATA UNTUK WA:", {
      id: order.id,
      name: order.customer_name,
      phone: order.customer_phone,
    });

    if (order.customer_phone) {
      const pesan = `Halo ${order.customer_name} 👋

Pesanan Anda di Bale Juku' Ta' telah diperbarui.

📦 Nomor Pesanan
#${order.id}

📌 Status Pesanan
${statusText(order.status)}

💰 Total Pesanan
Rp ${Number(order.total_price ?? 0).toLocaleString("id-ID")}

Terima kasih telah berbelanja di Bale Juku' Ta' 🐟`;

      try {
        console.log("MENGIRIM WHATSAPP...");

        console.log("DATA CUSTOMER WA:", {
          nama: order.customer_name,
          nomor_database: order.customer_phone,
        });

        const result = await sendWhatsApp(order.customer_phone, pesan);

        console.log("HASIL FONNTE:", result);
      } catch (error) {
        console.error("WhatsApp gagal:", error);
      }
    } else {
      console.log("CUSTOMER PHONE KOSONG");
    }

    // ======================
    // RESPONSE
    // ======================

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
