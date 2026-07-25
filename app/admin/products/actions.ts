"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { uploadProductImage } from "@/lib/upload-image";

// ========================================
// HELPER
// ========================================

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function validateNumber(value: string, field: string) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    throw new Error(`${field} tidak valid.`);
  }

  return number;
}

function validateImage(file: File | null) {
  if (!file || file.size === 0) return;

  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!allowed.includes(file.type)) {
    throw new Error("Format gambar harus JPG, PNG, atau WEBP.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 10 MB.");
  }
}

async function deleteImage(url?: string | null) {
  if (!url) return;

  const imagePath = url.split("/product-images/")[1];

  if (!imagePath) return;

  const { error } = await supabaseAdmin.storage
    .from("product-images")
    .remove([imagePath]);

  if (error) {
    console.error("Delete Image:", error);
  }
}

async function refreshPages() {
  revalidatePath("/");
  revalidatePath("/produk");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/[id]/edit", "page");
  revalidatePath("/admin/products/[id]/variants", "page");
  revalidatePath("/admin/products/variants");
}

// ========================================
// CREATE PRODUCT
// ========================================

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  const category = String(formData.get("category") ?? "");

  const slug = generateSlug(`${name}-${category}`);

  const isChicken = category === "Ayam Fresh" || category === "Ayam Frozen";

  const ayamType = category === "Ayam Frozen" ? "Frozen" : "Fresh";

  const delivery_type = String(formData.get("delivery_type") ?? "ready");

  const rating = Number(formData.get("rating") ?? 5);

  const badge = String(formData.get("badge") ?? "");

  const description = String(formData.get("description") ?? "");

  const imageFile = formData.get("image") as File | null;

  const stock = validateNumber(String(formData.get("stock") ?? 0), "Stok");

  // ==============================
  // HARGA PRODUK
  // ==============================

  let price = 0;

  if (!isChicken) {
    price = validateNumber(String(formData.get("price") ?? 0), "Harga");
  }

  if (!name) {
    throw new Error("Nama produk wajib diisi.");
  }

  validateImage(imageFile);

  // ==============================
  // CEK DUPLIKAT
  // ==============================

  const { data: exist } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (exist) {
    throw new Error("Produk dengan nama tersebut sudah ada.");
  }

  // ==============================
  // UPLOAD IMAGE
  // ==============================

  let image = "";

  if (imageFile && imageFile.size > 0) {
    image = await uploadProductImage(imageFile);
  }

  // ==============================
  // INSERT PRODUCT
  // ==============================

  const { data: product, error } = await supabaseAdmin
    .from("products")
    .insert({
      name,
      slug,
      category,

      price,

      stock,

      rating,

      badge,

      description,

      image,

      delivery_type,
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    throw new Error(error.message);
  }

  // =====================================
  // AUTO CREATE VARIANT AYAM
  // =====================================

  if (isChicken) {
    const ayamVariants = [
      {
        product_id: product.id,
        variant_type: ayamType,
        weight: "0.9 - 1 kg",
        price: Number(formData.get("price_09")),
        stock,
      },

      {
        product_id: product.id,
        variant_type: ayamType,
        weight: "1 - 1.1 kg",
        price: Number(formData.get("price_11")),
        stock,
      },

      {
        product_id: product.id,
        variant_type: ayamType,
        weight: "1.4 - 1.5 kg",
        price: Number(formData.get("price_14")),
        stock,
      },
    ];

    const { error: variantError } = await supabaseAdmin
      .from("product_variants")
      .insert(ayamVariants);

    if (variantError) {
      console.error("CREATE VARIANT ERROR:", variantError);

      throw new Error(variantError.message);
    }
  }

  await refreshPages();

  redirect("/admin/products");
}

// ========================================
// UPDATE PRODUCT
// ========================================

export async function updateProduct(id: number, formData: FormData) {
  const category = String(formData.get("category") ?? "");

  const isChicken = category === "Ayam Fresh" || category === "Ayam Frozen";

  const isFish = category === "Ikan Fresh" || category === "Ikan Frozen";

  const name = String(formData.get("name") ?? "").trim();

  const slugInput = String(formData.get("slug") ?? "").trim();

  const slug = slugInput
    ? generateSlug(slugInput)
    : generateSlug(`${name}-${category}`);

  const delivery_type = String(formData.get("delivery_type") ?? "ready");

  const pricing_type = String(formData.get("pricing_type") ?? "per_kg");

  let price = 0;

  if (!isChicken) {
    price = validateNumber(String(formData.get("price") ?? 0), "Harga");
  }

  const stock = validateNumber(String(formData.get("stock") ?? "0"), "Stok");

  const rating = Number(formData.get("rating") ?? 5);

  const badge = String(formData.get("badge") ?? "");

  const description = String(formData.get("description") ?? "");

  const imageFile = formData.get("image") as File | null;

  validateImage(imageFile);

  const { data: current } = await supabaseAdmin
    .from("products")
    .select("image")
    .eq("id", id)
    .single();

  const { data: duplicate } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .maybeSingle();

  if (duplicate) {
    throw new Error("Slug sudah digunakan.");
  }

  const updateData: any = {
    name,
    slug,
    category,

    pricing_type,
    delivery_type,

    rating,
    badge,

    description,
  };

  if (!isChicken) {
    updateData.price = price;
    updateData.stock = stock;
  }

  if (imageFile && imageFile.size > 0) {
    const image = await uploadProductImage(imageFile);

    Object.assign(updateData, {
      image,
    });

    await deleteImage(current?.image);
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    throw new Error(error.message);
  }

  // =================================
  // UPDATE AYAM VARIANT
  // =================================

  if (isChicken) {
    const variantCount = Number(formData.get("variant_count") ?? 0);

    for (let i = 0; i < variantCount; i++) {
      const variantId = Number(formData.get(`variant_id_${i}`));

      const { error: variantError } = await supabaseAdmin
        .from("product_variants")
        .update({
          variant_type: category === "Ayam Frozen" ? "Frozen" : "Fresh",

          weight: String(formData.get(`weight_${i}`)),

          price: Number(formData.get(`price_${i}`)),

          stock: Number(formData.get(`stock_${i}`)),
        })
        .eq("id", variantId);

      if (variantError) {
        console.error("UPDATE VARIANT ERROR:", variantError);
        throw new Error(variantError.message);
      }
    }
  }

  await refreshPages();

  redirect("/admin/products");
}

// ========================================
// DELETE PRODUCT
// ========================================

export async function deleteProduct(id: number) {
  const { data: product } = await supabaseAdmin
    .from("products")
    .select("image")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) {
    throw error;
  }

  await deleteImage(product?.image);

  await refreshPages();

  redirect("/admin/products");
}

// ========================================
// UPDATE AYAM VARIANT
// ========================================

export async function updateChickenVariant(id: number, formData: FormData) {
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  if (Number.isNaN(price)) {
    throw new Error("Harga tidak valid");
  }

  if (Number.isNaN(stock)) {
    throw new Error("Stok tidak valid");
  }

  const { error } = await supabaseAdmin
    .from("product_variants")
    .update({
      price,
      stock,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath("/produk");
  revalidatePath("/");
  revalidatePath("/admin/products/variants");
}
