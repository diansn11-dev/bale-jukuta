import { supabaseAdmin } from "@/lib/supabase-admin";

export async function uploadProductImage(file: File) {
  // ==========================
  // VALIDASI FILE
  // ==========================

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("File harus berupa JPG, PNG, atau WEBP");
  }

  // Maksimal 10 MB

  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("Ukuran gambar maksimal 10MB");
  }

  // ==========================
  // GENERATE FILE NAME
  // ==========================

  const fileExt = file.name.split(".").pop()?.toLowerCase();

  const fileName = `products/${Date.now()}.${fileExt}`;

  // ==========================
  // CONVERT FILE
  // ==========================

  const arrayBuffer = await file.arrayBuffer();

  // ==========================
  // UPLOAD STORAGE
  // ==========================

  const buffer = Buffer.from(await file.arrayBuffer());

  console.log("UPLOAD FILE:", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  const { data, error } = await supabaseAdmin.storage
    .from("product-images")
    .upload(fileName, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.log("SUPABASE UPLOAD ERROR:", error);

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
