import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import Image from "next/image";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  const { data: product, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Get Product Error:", error);
  }

  if (!product) {
    return (
      <div className="rounded-xl bg-white p-6">Produk tidak ditemukan</div>
    );
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
            Edit Produk
          </h1>

          <p className="text-sm text-gray-500">
            Perbarui data ikan Bale Juku' Ta'
          </p>
        </div>

        <Link
          href="/admin/products"
          className="
            rounded-xl
            border
            px-5
            py-3
            hover:bg-gray-50
          "
        >
          Kembali
        </Link>
      </div>

      {/* FORM */}

      <div
        className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
      >
        <form
          action={updateProduct.bind(null, product.id)}
          className="space-y-5"
        >
          {/* NAMA */}

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Nama Ikan
            </label>

            <input
              name="name"
              required
              defaultValue={product.name}
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
              placeholder="Contoh: Kakap Lodi"
            />
          </div>

          {/* HARGA & STOK */}

          <div
            className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
          "
          >
            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
              "
              >
                Harga / Kg
              </label>

              <input
                type="number"
                name="price"
                min="0"
                required
                defaultValue={product.price}
                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                "
              />
            </div>

            <div>
              <label
                className="
                mb-2
                block
                text-sm
                font-medium
              "
              >
                Stok / Kg
              </label>

              <input
                type="number"
                name="stock"
                min="0"
                required
                defaultValue={product.stock}
                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                "
              />
            </div>
          </div>

          {/* CATEGORY */}

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Kategori
            </label>

            <select
              name="category"
              defaultValue={product.category}
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            >
              <option value="Fresh">Fresh</option>

              <option value="Frozen">Frozen</option>
            </select>
          </div>

          {/* BADGE */}

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Label Produk
            </label>

            <select
              name="badge"
              defaultValue={product.badge}
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            >
              <option value="">Tidak Ada</option>

              <option value="Terlaris">Terlaris</option>

              <option value="Promo">Promo</option>

              <option value="Fresh">Fresh</option>

              <option value="Best Seller">Best Seller</option>
            </select>
          </div>

          {/* DESKRIPSI */}

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Deskripsi
            </label>

            <textarea
              name="description"
              required
              defaultValue={product.description}
              rows={5}
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
              placeholder="Deskripsi ikan..."
            />
          </div>

          {/* FOTO LAMA */}

          {product.image && (
            <div>
              <p className="mb-2 text-sm">Foto Saat Ini</p>

              <div
                className="
                relative
                h-40
                w-40
                overflow-hidden
                rounded-xl
              "
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* FOTO BARU */}

          <div>
            <label
              className="
              mb-2
              block
              text-sm
              font-medium
            "
            >
              Ganti Foto (Opsional)
            </label>

            <input
              type="file"
              name="image"
              accept="
                image/png,
                image/jpeg,
                image/webp
              "
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="
              rounded-xl
              bg-sky-700
              px-6
              py-3
              font-semibold
              text-white
              hover:bg-sky-800
            "
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
