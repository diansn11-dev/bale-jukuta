"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;

  // Variant ayam
  variantId?: number;
  weight?: string;
};

export default function AddToCartButton({
  id,
  name,
  image,
  price,
  stock,
  variantId,
  weight,
}: Props) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      // variant punya ID sendiri
      id: variantId ?? id,

      // produk utama
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
      disabled={stock <= 0}
      onClick={handleAddToCart}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-sky-700 text-lg font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      <ShoppingCart size={20} />

      {stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
    </button>
  );
}
