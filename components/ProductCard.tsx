"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  stock?: number;
  rating?: number;
  badge?: string | null;
  category?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

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

          {product.badge && <span>{product.badge}</span>}
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
        </div>

        {/* BUTTON */}

        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
              stock: product.stock ?? 0,
            })
          }
          disabled={(product.stock ?? 0) <= 0}
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
            transition
            hover:bg-sky-800
            disabled:bg-gray-300
            sm:mt-3
            sm:rounded-xl
            sm:py-2.5
            sm:text-sm
          "
        >
          <ShoppingCart size={13} />

          {(product.stock ?? 0) > 0 ? "Tambah" : "Habis"}
        </button>
      </div>
    </div>
  );
}
