import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, items, total } = body;

    // CEK STOK TERBARU

    for (const item of items) {
      const { data: product, error } = await supabaseAdmin
        .from("products")
        .select("id,name,stock")
        .eq("id", item.id)
        .single();

      if (error || !product) {
        return NextResponse.json(
          {
            message: `Produk ${item.name} tidak ditemukan`,
          },
          {
            status: 400,
          },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            message: `Stok ${product.name} tersisa ${product.stock} Kg`,
          },
          {
            status: 400,
          },
        );
      }
    }

    // KURANGI STOK

    for (const item of items) {
      const { data: product, error } = await supabaseAdmin
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (error || !product) {
        return NextResponse.json(
          {
            message: `Produk ${item.name} tidak ditemukan`,
          },
          {
            status: 400,
          },
        );
      }

      await supabaseAdmin
        .from("products")
        .update({
          stock: product.stock - item.quantity,
        })
        .eq("id", item.id);
    }

    // SIMPAN ORDER

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: customer.name,

        phone: customer.phone,

        address: customer.address,

        total,

        status: "pending",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // SIMPAN ITEM ORDER

    const orderItems = items.map((item: any) => ({
      order_id: order.id,

      product_id: item.id,

      product_name: item.name,

      quantity: item.quantity,

      price: item.price,
    }));

    await supabaseAdmin.from("order_items").insert(orderItems);

    return NextResponse.json({
      success: true,

      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },

      {
        status: 500,
      },
    );
  }
}
