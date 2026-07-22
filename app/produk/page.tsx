import { supabase } from "@/lib/supabase";
import ProdukClient from "./ProdukClient";

export default async function ProdukPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return <div className="p-10 text-center">Gagal mengambil data produk</div>;
  }

  return <ProdukClient products={products ?? []} />;
}
