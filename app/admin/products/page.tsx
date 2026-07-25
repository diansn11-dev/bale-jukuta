import { supabaseAdmin } from "@/lib/supabase-admin";
import Image from "next/image";
import Link from "next/link";

import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  // =========================
  // PRODUCTS
  // =========================

  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      image,
      price,
      stock,
      pricing_type,
      category,
      badge,
      created_at
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);

    throw new Error("Gagal mengambil data produk");
  }

  // =========================
  // VARIANTS
  // =========================

  const { data: variants } = await supabaseAdmin
    .from("product_variants")
    .select("id, product_id");

  const variantCount = (productId: number) =>
    variants?.filter((v) => v.product_id === productId).length ?? 0;

  function formatPrice(price: number | string) {
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Produk</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola seluruh produk Bale Juku' Ta'
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-xl bg-sky-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-sky-800"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Produk</th>

                <th className="p-4 text-left">Harga</th>

                <th className="p-4 text-left">Stok</th>

                <th className="p-4 text-left">Kategori</th>

                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {products?.length ? (
                products.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    {/* PRODUK */}

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-gray-100">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                              -
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold">{product.name}</p>

                          <p className="text-xs text-gray-500">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* HARGA */}

                    <td className="p-4">
                      {product.pricing_type === "variant" ? (
                        <div>
                          <p className="font-semibold text-orange-600">
                            Varian Berat
                          </p>

                          <p className="text-xs text-gray-500">
                            {variantCount(product.id)} varian
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold">
                            {formatPrice(product.price)}
                          </p>

                          <p className="text-xs text-gray-500">per Kg</p>
                        </div>
                      )}
                    </td>

                    {/* STOK */}

                    <td className="p-4">
                      {product.pricing_type === "variant"
                        ? "-"
                        : `${product.stock} kg`}
                    </td>

                    {/* KATEGORI */}

                    <td className="p-4">{product.category ?? "-"}</td>

                    {/* AKSI */}

                    <td className="p-4">
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/produk/${product.slug}`}
                          className="text-green-600 hover:underline"
                        >
                          Lihat
                        </Link>

                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>

                        {product.pricing_type === "variant" && (
                          <Link
                            href={`/admin/products/${product.id}/variants`}
                            className="text-orange-600 hover:underline"
                          >
                            Varian
                          </Link>
                        )}

                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
