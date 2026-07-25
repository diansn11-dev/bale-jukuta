"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  delivery_type?: string;
  badge?: string | null;
  rating: number;

  product_variants?: {
    id: number;
    weight: string;
    price: number;
    stock: number;
  }[];
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const isChicken = product.category.includes("Ayam");
  const isFish = product.category.includes("Ikan");

  const isFresh = product.category.includes("Fresh");
  const isFrozen = product.category.includes("Frozen");

  const isPreOrder = product.delivery_type === "preorder";

  const hasVariant =
    product.product_variants && product.product_variants.length > 0;

  const variantStock =
    product.product_variants?.reduce(
      (total, variant) => total + variant.stock,
      0,
    ) ?? 0;

  const displayStock = hasVariant ? variantStock : product.stock;

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      {/* IMAGE */}

      <Link href={`/produk/${product.slug}`}>
        <div
          className="
            relative
            h-28
            w-full
            overflow-hidden
            xs:h-32
            sm:h-52
          "
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="
              object-cover
              transition
              duration-300
              group-hover:scale-105
            "
          />

          <div className="absolute left-2 top-2 flex flex-col gap-2">
            {isFresh && (
              <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white shadow">
                FRESH
              </span>
            )}

            {isFrozen && (
              <span className="rounded-full bg-sky-600 px-2 py-1 text-[10px] font-bold text-white shadow">
                FROZEN
              </span>
            )}

            {(hasVariant ? variantStock : product.stock) <= 0 ? (
              <span className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white shadow">
                STOK HABIS
              </span>
            ) : isPreOrder ? (
              <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white shadow">
                PRE ORDER H+1
              </span>
            ) : (
              <span className="rounded-full bg-green-600 px-2 py-1 text-[10px] font-bold text-white shadow">
                READY STOCK
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* CONTENT */}

      <div
        className="
          p-2.5
          sm:p-5
        "
      >
        <h3
          className="
            line-clamp-1
            text-xs
            font-bold
            text-gray-800
            sm:line-clamp-2
            sm:text-lg
          "
        >
          {product.name}
        </h3>

        {product.category && (
          <p
            className="
              mt-1
              text-[10px]
              text-gray-500
              sm:text-xs
            "
          >
            {product.category}
          </p>
        )}

        {/* RATING */}

        <div
          className="
            mt-1
            flex
            items-center
            gap-1
          "
        >
          <Star
            size={11}
            className="fill-yellow-400 text-yellow-400 sm:size-[13px]"
          />

          <span
            className="
              text-[10px]
              text-gray-500
              sm:text-xs
            "
          >
            {product.rating ?? 5}
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-1">
          <p
            className="
              text-sm
              font-bold
              text-sky-700
              sm:text-xl
            "
          >
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p
            className="
              text-[9px]
              text-gray-400
              sm:text-[11px]
            "
          >
            /Kg
          </p>

          <div className="mt-3 rounded-lg bg-gray-50 p-2 text-[11px] text-gray-600">
            {isChicken && isFresh && (
              <>
                <p>🍗 Dipotong & Dibersihkan</p>
                <p>🚚 Pengiriman H+1</p>
              </>
            )}

            <p className="mt-2 text-xs font-medium text-gray-500">
              Stok :
              <span className="font-bold text-sky-700">
                {isChicken ? `${displayStock} Ekor` : `${displayStock} Kg`}
              </span>
            </p>

            {isChicken && isFrozen && (
              <>
                {product.stock > 0 && (
                  <>
                    <p>❄️ Ready Stock</p>
                    <p>🧊 Langsung Dikirim</p>
                  </>
                )}
              </>
            )}

            {isFish && isFresh && (
              <>
                <p>🐟 Hasil Tangkapan Segar</p>
                <p>🚚 Siap Dikirim</p>
              </>
            )}

            {isFish && isFrozen && (
              <>
                <p>🧊 Dibekukan Berkualitas</p>

                {product.stock > 0 && <p>🚚 Ready Stock</p>}
              </>
            )}
          </div>
        </div>

        {/* BUTTON */}

        <button
          onClick={() => {
            if (hasVariant) {
              window.location.href = `/produk/${product.slug}`;
              return;
            }

            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
              stock: product.stock ?? 0,
            });
          }}
          disabled={hasVariant ? false : (product.stock ?? 0) <= 0}
          className="
    mt-2
    flex
    w-full
    items-center
    justify-center
    gap-1
    rounded-lg
    bg-sky-700
    py-2
    text-[10px]
    font-semibold
    text-white
    sm:py-2.5
    sm:text-sm
  "
        >
          <ShoppingCart size={13} />

          {hasVariant
            ? "Pilih Berat"
            : product.stock > 0
              ? "+ Keranjang"
              : "Stok Habis"}
        </button>
      </div>
    </div>
  );
}
