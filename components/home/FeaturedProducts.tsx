import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Heart, Star, ShoppingCart } from "lucide-react";

export default async function FeaturedProducts() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Produk Terlaris
            </h2>

            <div className="mt-2 h-1 w-16 rounded-full bg-sky-600" />
          </div>

          <Link
            href="/produk"
            className="font-semibold text-sky-700 hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gambar */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {product.badge && (
                  <span className="absolute left-4 top-4 z-20 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    {product.badge}
                  </span>
                )}

                <button className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow">
                  <Heart
                    size={18}
                    className="text-slate-400 transition hover:text-red-500"
                  />
                </button>

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Detail */}
              <div className="space-y-3 p-5">
                <h3 className="line-clamp-2 text-xl font-bold text-slate-800">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1">
                  {Array.from({ length: product.rating ?? 5 }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ),
                  )}
                </div>

                <p className="text-2xl font-extrabold text-sky-700">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
                    Stok {product.stock} Kg
                  </span>

                  <span className="text-slate-500">{product.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Link
                    href={`/produk/${product.slug}`}
                    className="rounded-xl border border-sky-700 py-3 text-center font-semibold text-sky-700 transition hover:bg-sky-700 hover:text-white"
                  >
                    Detail
                  </Link>

                  <button className="flex items-center justify-center gap-2 rounded-xl bg-sky-700 py-3 font-semibold text-white transition hover:bg-sky-800">
                    <ShoppingCart size={18} />
                    Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
