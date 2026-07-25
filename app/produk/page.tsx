import ProdukClient from "./ProdukClient";
import { supabase } from "@/lib/supabase";

type Props = {
  searchParams: Promise<{
    kategori?: string;
  }>;
};

export default async function ProdukPage({ searchParams }: Props) {
  const { kategori } = await searchParams;

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
    *,
    product_variants(
      id,
      weight,
      price,
      stock
    )
  `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  let filteredProducts = products ?? [];

  if (kategori) {
    filteredProducts = filteredProducts.filter((item) =>
      item.category.includes(kategori),
    );
  }

  return <ProdukClient products={filteredProducts} />;
}
