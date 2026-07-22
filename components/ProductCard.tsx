"use client";

import Image from "next/image";
import Link from "next/link";

import { Star, Fish, ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  category: string;
  badge: string | null;
  rating: number;
  stock: number;
};

export default function ProductCard({
  id,
  slug,
  name,
  image,
  price,
  category,
  badge,
  rating,
  stock,
}: Product) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (stock === 0) return;

    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
      stock,
    });

    alert(`${name} berhasil ditambahkan ke keranjang`);
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* GAMBAR */}
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={500}
          height={400}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* BADGE */}
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      {/* DETAIL */}
      <div className="p-5">
        {/* KATEGORI */}
        <div className="mb-2 flex items-center gap-2 text-gray-500">
          <Fish size={18} />
          <span>{category}</span>
        </div>

        {/* NAMA */}
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>

        {/* RATING */}
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* HARGA */}
        <p className="mt-4 text-2xl font-bold text-sky-700">
          Rp {price.toLocaleString("id-ID")}
        </p>

        {/* STOK */}
        <div className="mt-3">
          {stock > 0 ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              ✓ Stok tersedia ({stock} Kg)
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
              ✕ Stok habis
            </span>
          )}
        </div>

        {/* BUTTON DETAIL */}
        <Link
          href={`/produk/${slug}`}
          className="mt-5 block rounded-xl bg-sky-700 py-3 text-center font-semibold text-white transition hover:bg-sky-800"
        >
          Lihat Detail
        </Link>

        {/* BUTTON CART */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition ${
            stock > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          <ShoppingCart size={20} />

          {stock > 0 ? "Tambah Keranjang" : "Stok Habis"}
        </button>
      </div>
    </div>
  );
}
