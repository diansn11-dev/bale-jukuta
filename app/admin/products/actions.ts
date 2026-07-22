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

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 2 MB.");
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
}

// ========================================
// CREATE PRODUCT
// ========================================

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  const slug = generateSlug(name);

  const price = validateNumber(String(formData.get("price")), "Harga");

  const stock = validateNumber(String(formData.get("stock")), "Stok");

  const category = String(formData.get("category") ?? "");

  const rating = Number(formData.get("rating") ?? 5);

  const badge = String(formData.get("badge") ?? "");

  const description = String(formData.get("description") ?? "");

  const imageFile = formData.get("image") as File | null;

  if (!name) {
    throw new Error("Nama produk wajib diisi.");
  }

  if (price <= 0) {
    throw new Error("Harga harus lebih dari 0.");
  }

  if (stock < 0) {
    throw new Error("Stok tidak boleh negatif.");
  }

  validateImage(imageFile);

  const { data: exist } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (exist) {
    throw new Error("Produk dengan nama tersebut sudah ada.");
  }

  let image = "";

  if (imageFile && imageFile.size > 0) {
    image = await uploadProductImage(imageFile);
  }

  const { error } = await supabaseAdmin.from("products").insert({
    name,
    slug,
    price,
    stock,
    category,
    rating,
    badge,
    description,
    image,
  });

  if (error) {
    throw error;
  }

  await refreshPages();

  redirect("/admin/products");
}

// ========================================
// UPDATE PRODUCT
// ========================================

export async function updateProduct(id: number, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  const slug = generateSlug(name);

  const price = validateNumber(String(formData.get("price")), "Harga");

  const stock = validateNumber(String(formData.get("stock")), "Stok");

  const category = String(formData.get("category") ?? "");

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

  const updateData: Record<string, unknown> = {
    name,
    slug,
    price,
    stock,
    category,
    rating,
    badge,
    description,
  };

  if (imageFile && imageFile.size > 0) {
    const image = await uploadProductImage(imageFile);

    updateData.image = image;

    await deleteImage(current?.image);
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (error) {
    throw error;
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
