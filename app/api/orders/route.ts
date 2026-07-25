import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type CartItem = {
  id: number;
  productId?: number;

  variantId?: number;
  variantType?: string;
  weight?: string;

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

      delivery_method,

      payment_method,
      payment_status,

      items,
    } = body;

    // ==========================
    // VALIDASI
    // ==========================

    if (
      !customer_name ||
      !customer_phone ||
      !payment_method ||
      !delivery_method ||
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

    if (delivery_method === "Diantar" && !customer_address) {
      return NextResponse.json(
        {
          success: false,
          error: "Alamat pengiriman wajib diisi.",
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
      // ======================
      // AYAM (VARIANT)
      // ======================

      if (item.variantId) {
        const { data: variant, error } = await supabaseAdmin
          .from("product_variants")
          .select("id,weight,stock")
          .eq("id", item.variantId)
          .single();

        if (error || !variant) {
          return NextResponse.json(
            {
              success: false,
              error: `Varian ${item.name} tidak ditemukan.`,
            },
            { status: 404 },
          );
        }

        if (variant.stock < item.quantity) {
          return NextResponse.json(
            {
              success: false,
              error: `Stok ${item.name} (${variant.weight}) hanya ${variant.stock} ekor.`,
            },
            { status: 400 },
          );
        }

        continue;
      }

      // ======================
      // IKAN
      // ======================

      const { data: product, error } = await supabaseAdmin
        .from("products")
        .select("id,name,stock")
        .eq("id", item.productId ?? item.id)
        .single();

      if (error || !product) {
        return NextResponse.json(
          {
            success: false,
            error: `Produk ${item.name} tidak ditemukan.`,
          },
          { status: 404 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            error: `Stok ${item.name} hanya ${product.stock} Kg.`,
          },
          { status: 400 },
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

        customer_address:
          delivery_method === "Pickup" ? null : customer_address,

        note,

        total_price,

        status: "pending",

        delivery_method,

        payment_method: payment_method ?? "Transfer Bank",

        payment_status: payment_method === "COD" ? "cod" : "pending",
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

      product_id: item.productId ?? item.id,

      variant_id: item.variantId ?? null,

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
      // =========================
      // AYAM
      // =========================

      if (item.variantId) {
        const { data: variant } = await supabaseAdmin
          .from("product_variants")
          .select("stock")
          .eq("id", item.variantId)
          .single();

        await supabaseAdmin
          .from("product_variants")
          .update({
            stock: Number(variant?.stock ?? 0) - item.quantity,
          })
          .eq("id", item.variantId);

        continue;
      }

      // =========================
      // IKAN
      // =========================

      const { data: product } = await supabaseAdmin
        .from("products")
        .select("stock")
        .eq("id", item.productId ?? item.id)
        .single();

      await supabaseAdmin
        .from("products")
        .update({
          stock: Number(product?.stock ?? 0) - item.quantity,
        })
        .eq("id", item.productId ?? item.id);
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
