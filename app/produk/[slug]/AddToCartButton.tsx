"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
};

export default function AddToCartButton({
  id,
  name,
  image,
  price,
  stock,
}: Props) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (stock <= 0) {
      alert("Stok produk habis");
      return;
    }

    addToCart({
      id,
      name,
      image,
      price,
      quantity: 1,
      stock,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={stock <= 0}
      className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white transition-all duration-300 ${
        stock <= 0
          ? "cursor-not-allowed bg-gray-400"
          : added
            ? "bg-green-600 hover:bg-green-700"
            : "bg-sky-700 hover:bg-sky-800"
      }`}
    >
      {added ? (
        <>
          <Check size={20} />
          Ditambahkan
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          Tambah ke Keranjang
        </>
      )}
    </button>
  );
}
