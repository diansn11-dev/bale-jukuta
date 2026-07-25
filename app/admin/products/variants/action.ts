"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateVariant(id: number, formData: FormData) {
  const variant_type = String(formData.get("variant_type"));

  const weight = String(formData.get("weight"));

  const price = Number(formData.get("price"));

  const stock = Number(formData.get("stock"));

  const { error } = await supabaseAdmin
    .from("product_variants")
    .update({
      variant_type,
      weight,
      price,
      stock,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/produk");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/variants");

  redirect("/admin/products/variants");
}
