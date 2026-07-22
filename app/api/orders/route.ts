import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer_name,
      customer_phone,
      customer_address,
      note,
      total_price,
      items,
    } = body;

    // ==========================
    // VALIDASI
    // ==========================

    if (
      !customer_name ||
      !customer_phone ||
      !customer_address ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Data pesanan belum lengkap.",
        },
        {
          status: 400,
        },
      );
    }

    // ==========================
    // VALIDASI STOK
    // ==========================

    for (const item of items as CartItem[]) {
      const { data: product, error } = await supabaseAdmin
        .from("products")
        .select("id,name,stock")
        .eq("id", item.id)
        .single();

      if (error || !product) {
        return NextResponse.json(
          {
            success: false,
            error: `Produk ${item.name} tidak ditemukan.`,
          },
          {
            status: 404,
          },
        );
      }

      if (Number(product.stock) < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Stok ${product.name} hanya tersisa ${product.stock} Kg.`,
          },
          {
            status: 400,
          },
        );
      }
    }

    // ==========================
    // SIMPAN ORDER
    // ==========================

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name,
        customer_phone,
        customer_address,
        note,
        total_price,
        status: "pending",
      })
      .select()
      .single();

    if (orderError || !order) {
      throw orderError;
    }

    // ==========================
    // SIMPAN ORDER ITEMS
    // ==========================

    const orderItems = (items as CartItem[]).map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemError) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);

      throw itemError;
    }

    // ==========================
    // KURANGI STOK
    // ==========================

    for (const item of items as CartItem[]) {
      const { data: product } = await supabaseAdmin
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      await supabaseAdmin
        .from("products")
        .update({
          stock: Number(product?.stock ?? 0) - item.quantity,
        })
        .eq("id", item.id);
    }

    // ==========================
    // RESPONSE
    // ==========================

    return NextResponse.json({
      success: true,
      message: "Pesanan berhasil dibuat.",
      order,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message ?? "Terjadi kesalahan server.",
      },
      {
        status: 500,
      },
    );
  }
}
