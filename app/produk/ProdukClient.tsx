"use client";

import { useMemo, useState } from "react";
import { Search, RotateCcw, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  badge: string | null;
  description: string;
  created_at: string;
};

type Props = {
  products: Product[];
};

export default function ProdukClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    const data = products.filter((product) => {
      const cocokNama = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const cocokKategori =
        category === "Semua" || product.category === category;

      return cocokNama && cocokKategori;
    });

    switch (sortBy) {
      case "murah":
        return [...data].sort((a, b) => a.price - b.price);

      case "mahal":
        return [...data].sort((a, b) => b.price - a.price);

      case "nama":
        return [...data].sort((a, b) => a.name.localeCompare(b.name));

      default:
        return data;
    }
  }, [products, search, category, sortBy]);

  function resetFilter() {
    setSearch("");
    setCategory("Semua");
    setSortBy("default");
  }

  return (
    <main
      className="
    mx-auto
    max-w-7xl
    px-4
    py-8
    sm:px-6
    sm:py-12
  "
    >
      <div className="mb-10 text-center">
        <h1
          className="
    text-2xl
    font-bold
    text-sky-700
    sm:text-4xl
  "
        >
          Produk Bale Juku' Ta'
        </h1>

        <p className="mt-3 text-gray-500">
          Temukan ikan fresh dan frozen terbaik.
        </p>
      </div>

      <div
        className="
    rounded-2xl
    bg-white
    p-4
    shadow-lg
    sm:p-6
  "
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-sky-700 focus:outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="Semua">Semua</option>

            <option value="Fresh">Fresh</option>

            <option value="Frozen">Frozen</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="default">Urutkan</option>

            <option value="murah">Harga Termurah</option>

            <option value="mahal">Harga Termahal</option>

            <option value="nama">Nama A-Z</option>
          </select>

          <button
            onClick={resetFilter}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white transition hover:bg-red-600"
          >
            <RotateCcw size={18} />
            Reset Filter
          </button>
        </div>
      </div>

      <div className="mt-8 mb-6 flex items-center gap-2 text-gray-600">
        <Package size={20} />

        <span>
          <strong>{filteredProducts.length}</strong> Produk ditemukan
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-gray-100 py-20 text-center">
          <Package size={60} className="mx-auto text-gray-400" />

          <h2 className="mt-5 text-2xl font-bold">Produk tidak ditemukan</h2>

          <p className="mt-2 text-gray-500">Coba gunakan kata kunci lain.</p>
        </div>
      ) : (
        <div
          className="
    grid
    grid-cols-2
    gap-3
    sm:gap-5
    xl:grid-cols-4
  "
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
