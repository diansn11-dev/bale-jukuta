import { supabaseAdmin } from "@/lib/supabase-admin";
import Image from "next/image";
import Link from "next/link";

import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
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
  category,
  badge,
  created_at
`,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Products Error:", error);

    throw new Error("Gagal mengambil data produk");
  }

  function formatPrice(price: string | number) {
    const value = Number(String(price).replace(/[^0-9]/g, ""));

    return `Rp ${value.toLocaleString("id-ID")}`;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            Kelola Produk
          </h1>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Daftar produk ikan Bale Juku' Ta'
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="
            rounded-xl
            bg-sky-700
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-800
            text-center
          "
        >
          + Tambah Produk
        </Link>
      </div>

      {/* TABLE */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
          shadow-sm
        "
      >
        <div className="overflow-x-auto">
          <table
            className="
              w-full
              text-sm
            "
          >
            <thead
              className="
                bg-gray-50
              "
            >
              <tr>
                <th className="p-4 text-left">Produk</th>

                <th className="p-4 text-left">Harga</th>

                <th className="p-4 text-left">Stok</th>

                <th className="p-4 text-left">Kategori</th>

                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >
                    {/* PRODUK */}

                    <td className="p-4">
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            relative
                            h-14
                            w-14
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                          "
                        >
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="56px"
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
                                text-xs
                                text-gray-400
                              "
                            >
                              -
                            </div>
                          )}
                        </div>

                        <div>
                          <p
                            className="
                              font-semibold
                            "
                          >
                            {product.name}
                          </p>

                          <p
                            className="
                              text-xs
                              text-gray-500
                            "
                          >
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* HARGA */}

                    <td className="p-4">{formatPrice(product.price)}</td>

                    {/* STOK */}

                    <td className="p-4">{product.stock}</td>

                    {/* KATEGORI */}

                    <td className="p-4">{product.category ?? "-"}</td>

                    {/* AKSI */}

                    <td className="p-4">
                      <div
                        className="
                          flex
                          flex-wrap
                          gap-3
                        "
                      >
                        <Link
                          href={`/produk/${product.slug}`}
                          className="
                            text-green-600
                            hover:underline
                          "
                        >
                          Lihat
                        </Link>

                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="
                            text-blue-600
                            hover:underline
                          "
                        >
                          Edit
                        </Link>

                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      p-8
                      text-center
                      text-gray-500
                    "
                  >
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
