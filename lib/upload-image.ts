import { supabaseAdmin } from "@/lib/supabase-admin";

export async function uploadProductImage(file: File) {
  // ==========================
  // VALIDASI FILE
  // ==========================

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("File harus berupa JPG, PNG, atau WEBP");
  }

  // Maksimal 5 MB

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Ukuran gambar maksimal 5MB");
  }

  // ==========================
  // GENERATE FILE NAME
  // ==========================

  const fileExt = file.name.split(".").pop()?.toLowerCase();

  const fileName = `products/${Date.now()}.${fileExt}`;

  // ==========================
  // UPLOAD STORAGE
  // ==========================

  const { data, error } = await supabaseAdmin.storage
    .from("product-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload Image Error:", error);

    throw new Error(error.message);
  }

  // ==========================
  // PUBLIC URL
  // ==========================

  const { data: publicUrl } = supabaseAdmin.storage
    .from("product-images")
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
}
