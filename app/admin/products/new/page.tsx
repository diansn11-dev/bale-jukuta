"use client";

import Link from "next/link";
import { useState } from "react";
import { createProduct } from "../actions";

export default function AddProductPage() {
  const [category, setCategory] = useState("");

  const isChicken = category === "Ayam Fresh" || category === "Ayam Frozen";

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tambah Produk</h1>

          <p className="mt-1 text-sm text-gray-500">
            Tambahkan produk baru Bale Juku' Ta'
          </p>
        </div>

        <Link
          href="/admin/products"
          className="rounded-xl border px-5 py-3 hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      {/* FORM */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <form action={createProduct} className="space-y-6">
          {/* NAMA */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Nama Produk
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Contoh: Ayam"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {/* SLUG */}

          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>

            <input
              type="text"
              name="slug"
              placeholder="ayam-fresh"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {/* KATEGORI */}

          <div>
            <label className="mb-2 block text-sm font-medium">Kategori</label>

            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="">Pilih Kategori</option>

              <option value="Ikan Fresh">🐟 Ikan Fresh</option>

              <option value="Ikan Frozen">❄️ Ikan Frozen</option>

              <option value="Ayam Fresh">🍗 Ayam Fresh</option>

              <option value="Ayam Frozen">❄️ Ayam Frozen</option>
            </select>
          </div>

          {/* HARGA + STOK AYAM */}

          {isChicken ? (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 space-y-5">
              <h2 className="text-lg font-bold text-orange-700">
                🐔 Harga Ayam Sesuai Berat
              </h2>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Harga 0.9 - 1 Kg
                </label>

                <input
                  type="number"
                  name="price_09"
                  required
                  placeholder="37000"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Harga 1 - 1.1 Kg
                </label>

                <input
                  type="number"
                  name="price_11"
                  required
                  placeholder="41000"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Harga 1.4 - 1.5 Kg
                </label>

                <input
                  type="number"
                  name="price_14"
                  required
                  placeholder="55000"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Total Stok Ayam (Ekor)
                </label>

                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  placeholder="20"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Harga / Kg
                </label>

                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  placeholder="35000"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Stok / Kg
                </label>

                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  placeholder="20"
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>
            </div>
          )}

          {/* DELIVERY */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Jenis Pengiriman
            </label>

            <select
              name="delivery_type"
              required
              className="w-full rounded-xl border bg-white px-4 py-3"
            >
              <option value="ready">🚚 Ready Stock</option>

              <option value="preorder">⏳ Pre Order</option>
            </select>
          </div>

          {/* RATING */}

          <div>
            <label className="mb-2 block text-sm font-medium">Rating</label>

            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              defaultValue={5}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {/* BADGE */}

          <div>
            <label className="mb-2 block text-sm font-medium">Badge</label>

            <input
              type="text"
              name="badge"
              placeholder="Best Seller"
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {/* DESKRIPSI */}

          <div>
            <label className="mb-2 block text-sm font-medium">Deskripsi</label>

            <textarea
              name="description"
              rows={5}
              required
              className="w-full rounded-xl border px-4 py-3"
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

            <p className="mt-2 text-xs text-gray-500">Maksimal 10 MB</p>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
}
