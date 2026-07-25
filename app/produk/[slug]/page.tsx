import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Star, Truck, PackageCheck, Clock3, ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase";

import AddToCartButton from "./AddToCartButton";
import ProductVariantSelector from "./ProductVariantSelector";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;

  // =========================
  // GET PRODUCT
  // =========================

  const { data: product } = await supabase
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
    .eq("slug", slug)
    .single();

  if (!product) {
    notFound();
  }

  // =========================
  // RELATED PRODUCTS
  // =========================

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  // =========================
  // STATUS
  // =========================

  const isAyam =
    product.category === "Ayam Fresh" || product.category === "Ayam Frozen";

  const isPreOrder = product.delivery_type === "preorder";

  const isIkanFresh = product.category === "Ikan Fresh";

  const isIkanFrozen = product.category === "Ikan Frozen";

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* BACK */}

      <Link href="/produk" className="font-medium text-sky-700 hover:underline">
        ← Kembali ke Produk
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* IMAGE */}

        <div>
          <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={700}
              priority
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* DETAIL */}

        <div>
          {/* BADGE */}

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
              {product.category}
            </span>

            {product.badge && (
              <span className="rounded-full bg-red-500 px-4 py-1 text-sm font-semibold text-white">
                🔥 {product.badge}
              </span>
            )}

            {isPreOrder ? (
              <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
                ⏳ Pre Order H+1
              </span>
            ) : (
              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                🚚 Ready Stock
              </span>
            )}
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-800">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />

            <span>{product.rating}/5</span>
          </div>

          {/* PRICE */}

          <div className="mt-7 rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500 p-6 text-white shadow-xl">
            <p className="text-sm uppercase tracking-widest text-sky-100">
              Harga
            </p>

            {isAyam ? (
              <>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Pilih Berat Ayam
                </h2>

                <p className="mt-2 text-sky-100">Harga mengikuti ukuran ayam</p>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-5xl font-extrabold">
                  Rp {product.price.toLocaleString("id-ID")}
                </h2>

                <p className="mt-2 text-sky-100">per Kg</p>
              </>
            )}
          </div>

          {/* INFO */}

          <div className="mt-8 space-y-4 rounded-2xl border bg-gray-50 p-6">
            <div className="flex items-center gap-3">
              <PackageCheck className="text-green-600" />

              <span>
                {isAyam ? (
                  <span>Pilih berat ayam untuk melihat stok tersedia.</span>
                ) : (
                  <span>
                    Stok tersedia
                    <strong> {product.stock} Kg</strong>
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isPreOrder ? (
                <Clock3 className="text-orange-500" />
              ) : (
                <Truck className="text-sky-600" />
              )}

              <span>
                {isPreOrder
                  ? "Pengiriman dilakukan H+1 setelah produk diproses."
                  : "Ready Stock dan dapat dikirim hari ini."}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-600" />

              <span>Dijamin segar, higienis dan berkualitas.</span>
            </div>
          </div>

          {/* ========================= */}
          {/* INFORMASI AYAM */}
          {/* ========================= */}

          {isAyam && (
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <h3 className="font-bold text-orange-700">🍗 Informasi Ayam</h3>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>✅ Pilihan berat sesuai ukuran ayam.</li>

                <li>✅ Harga mengikuti berat ayam.</li>

                <li>🧼 Dibersihkan dan dikemas higienis.</li>

                <li>🚚 Siap dikirim sesuai jenis produk.</li>
              </ul>
            </div>
          )}

          {/* ========================= */}
          {/* INFORMASI IKAN FRESH */}
          {/* ========================= */}

          {isIkanFresh && (
            <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
              <h3 className="font-bold text-cyan-700">
                🐟 Informasi Ikan Fresh
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>✅ Ikan segar pilihan.</li>

                <li>🧊 Disimpan menggunakan es.</li>

                <li>🚚 Pengiriman cepat.</li>

                <li>💯 Kualitas premium.</li>
              </ul>
            </div>
          )}

          {/* ========================= */}
          {/* INFORMASI IKAN FROZEN */}
          {/* ========================= */}

          {isIkanFrozen && (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h3 className="font-bold text-blue-700">
                ❄️ Informasi Ikan Frozen
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>✅ Dibekukan setelah proses.</li>

                <li>❄️ Kualitas tetap terjaga.</li>

                <li>📦 Kemasan higienis.</li>

                <li>🚚 Ready Stock.</li>
              </ul>
            </div>
          )}

          {/* ========================= */}
          {/* ACTION */}
          {/* ========================= */}

          <div className="mt-8 space-y-4">
            {isAyam ? (
              <ProductVariantSelector
                product={{
                  id: product.id,

                  name: product.name,

                  image: product.image,
                }}
                variants={product.product_variants ?? []}
              />
            ) : (
              <AddToCartButton
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                stock={product.stock}
              />
            )}

            <a
              href={`https://wa.me/6285111202275?text=${encodeURIComponent(
                `Halo Admin Bale Juku' Ta'. Saya ingin memesan ${product.name}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-2xl bg-green-600 text-lg font-bold text-white hover:bg-green-700"
            >
              💬 Pesan via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* DESCRIPTION */}
      {/* ========================= */}

      <div className="mt-12 rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Deskripsi Produk
        </h2>

        <div className="whitespace-pre-line leading-8 text-gray-600">
          {product.description}
        </div>
      </div>

      {/* ========================= */}
      {/* PAYMENT */}
      {/* ========================= */}

      <div className="mt-8 rounded-3xl border bg-gradient-to-r from-sky-50 to-blue-50 p-8">
        <h2 className="text-2xl font-bold text-sky-700">Metode Pembayaran</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow">
            <div className="text-3xl">🏦</div>

            <h3 className="mt-3 font-bold">Transfer Bank</h3>

            <p className="mt-2 text-sm text-gray-500">
              Pembayaran melalui rekening bank.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <div className="text-3xl">📱</div>

            <h3 className="mt-3 font-bold">QRIS</h3>

            <p className="mt-2 text-sm text-gray-500">
              Praktis menggunakan aplikasi pembayaran.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow">
            <div className="text-3xl">💬</div>

            <h3 className="mt-3 font-bold">Konfirmasi WhatsApp</h3>

            <p className="mt-2 text-sm text-gray-500">
              Kirim bukti pembayaran.
            </p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* RELATED */}
      {/* ========================= */}

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Produk Serupa
              </h2>

              <p className="mt-2 text-gray-500">
                Produk lain yang mungkin Anda sukai.
              </p>
            </div>

            <Link
              href="/produk"
              className="font-semibold text-sky-700 hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,

                  slug: item.slug,

                  name: item.name,

                  image: item.image,

                  price: item.price,

                  stock: item.stock,

                  category: item.category,

                  delivery_type: item.delivery_type,

                  badge: item.badge,

                  rating: item.rating ?? 5,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
