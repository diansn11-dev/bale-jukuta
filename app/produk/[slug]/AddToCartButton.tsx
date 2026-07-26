"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;

  variantId?: number;
  weight?: string;

  hasVariant?: boolean;
  slug?: string;
};

export default function AddToCartButton({
  id,
  name,
  image,
  price,
  stock,
  variantId,
  weight,
  hasVariant = false,
  slug,
}: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleClick() {
    // Produk memiliki varian tetapi belum dipilih
    if (hasVariant && !variantId) {
      router.push(`/produk/${slug}`);
      return;
    }

    addToCart({
      id: variantId ?? id,
      productId: id,
      variantId,
      weight,
      name,
      image,
      price,
      stock,
      quantity: 1,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!hasVariant && stock <= 0}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-sky-700 text-lg font-bold text-white transition hover:bg-sky-800 disabled:bg-gray-300"
    >
      <ShoppingCart size={20} />

      {hasVariant && !variantId
        ? "Pilih Berat"
        : stock > 0
          ? "Tambah ke Keranjang"
          : "Stok Habis"}
    </button>
  );
}
