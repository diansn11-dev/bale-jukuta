import Link from "next/link";
import { createProduct } from "../actions";

export default function AddProductPage() {
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
          <h1 className="text-3xl font-bold text-gray-800">Tambah Produk</h1>

          <p className="mt-1 text-sm text-gray-500">
            Tambahkan produk ikan baru Bale Juku' Ta'
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
        <form action={createProduct} className="space-y-5">
          {/* NAMA */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama Produk
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Contoh: Baronang Susu"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />
          </div>

          {/* SLUG */}

          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>

            <input
              type="text"
              name="slug"
              required
              placeholder="baronang-susu"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />
          </div>

          {/* HARGA + STOK */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <div>
              <label className="mb-2 block text-sm font-medium">Harga</label>

              <input
                type="number"
                name="price"
                required
                placeholder="45000"
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
              <label className="mb-2 block text-sm font-medium">Stok</label>

              <input
                type="text"
                name="stock"
                required
                placeholder="20 kg"
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

          {/* KATEGORI */}

          <div>
            <label className="mb-2 block text-sm font-medium">Kategori</label>

            <input
              type="text"
              name="category"
              required
              placeholder="Ikan Laut"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />
          </div>

          {/* RATING */}

          <div>
            <label className="mb-2 block text-sm font-medium">Rating</label>

            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              defaultValue="5"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />
          </div>

          {/* BADGE */}

          <div>
            <label className="mb-2 block text-sm font-medium">Badge</label>

            <input
              type="text"
              name="badge"
              placeholder="Best Seller"
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />
          </div>

          {/* DESKRIPSI */}

          <div>
            <label className="mb-2 block text-sm font-medium">Deskripsi</label>

            <textarea
              name="description"
              rows={5}
              required
              placeholder="Deskripsi produk ikan..."
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "
            />
          </div>

          {/* FOTO */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Foto Produk
            </label>

            <input
              type="file"
              name="image"
              required
              accept="image/png,image/jpeg,image/webp"
            />

            <p className="mt-2 text-xs text-gray-500">
              Format: JPG, PNG, WEBP. Maksimal 5MB.
            </p>
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
              transition
              hover:bg-sky-800
            "
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
}
