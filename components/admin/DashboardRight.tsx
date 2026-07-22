"use client";

import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, ArrowRight, Package } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image?: string | null;
  stock: number;
};

type Props = {
  products: Product[];
};

export default function DashboardRight({ products }: Props) {
  return (
    <section
      className="
rounded-2xl
border
bg-white
p-4
shadow-sm

md:p-5
"
    >
      {/* HEADER */}

      <div
        className="
mb-5
flex
items-center
justify-between
"
      >
        <div
          className="
flex
items-center
gap-3
"
        >
          <div
            className="
flex
h-10
w-10
items-center
justify-center

rounded-xl
bg-red-50
text-red-600
"
          >
            <AlertTriangle size={22} />
          </div>

          <div>
            <h2
              className="
font-bold
text-gray-800
"
            >
              Stok Menipis
            </h2>

            <p
              className="
text-xs
text-gray-500
"
            >
              Perlu segera dicek
            </p>
          </div>
        </div>

        <Link
          href="/admin/products"
          className="
text-sm
font-semibold
text-sky-700
"
        >
          Lihat
        </Link>
      </div>

      {products.length === 0 ? (
        <div
          className="
rounded-xl
bg-green-50
p-5
text-center
"
        >
          <Package
            size={35}
            className="
mx-auto
mb-2
text-green-600
"
          />

          <p
            className="
font-semibold
text-green-700
"
          >
            Semua stok aman
          </p>
        </div>
      ) : (
        <div
          className="
space-y-3
"
        >
          {products.slice(0, 5).map((product) => (
            <div
              key={product.id}
              className="
flex
items-center
gap-3

rounded-xl
border
p-3

transition
hover:bg-gray-50
"
            >
              {/* IMAGE */}

              <div
                className="
relative
h-12
w-12
overflow-hidden
rounded-lg
bg-gray-100
"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="
object-cover
"
                  />
                ) : (
                  <div
                    className="
flex
h-full
items-center
justify-center
text-gray-400
"
                  >
                    🐟
                  </div>
                )}
              </div>

              {/* NAME */}

              <div
                className="
flex-1
"
              >
                <h3
                  className="
line-clamp-1
text-sm
font-semibold
text-gray-800
"
                >
                  {product.name}
                </h3>

                <p
                  className="
text-xs
text-gray-500
"
                >
                  Sisa stok:
                  <span
                    className="
font-bold
text-red-600
"
                  >
                    {" "}
                    {product.stock} Kg
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/admin/products"
        className="
mt-5
flex
items-center
justify-center
gap-2

rounded-xl

bg-sky-700
py-2.5

text-sm
font-semibold
text-white

transition
hover:bg-sky-800
"
      >
        Kelola Produk
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
