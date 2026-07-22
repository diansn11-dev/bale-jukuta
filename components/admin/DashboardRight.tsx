"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Package, ArrowRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  stock: number | string;
  price?: number | string;
  image?: string | null;
};

type Props = {
  products: Product[];
};

export default function DashboardRight({ products }: Props) {
  function formatPrice(price?: number | string) {
    return `Rp ${Number(price ?? 0).toLocaleString("id-ID")}`;
  }

  function getStockBadge(stock: number) {
    if (stock <= 2) {
      return {
        text: "Kritis",
        color: "bg-red-100 text-red-700",
      };
    }

    if (stock <= 5) {
      return {
        text: "Menipis",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: "Aman",
      color: "bg-green-100 text-green-700",
    };
  }

  return (
    <aside className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={20} className="text-orange-600" />

          <h2 className="text-lg font-semibold">Stok Hampir Habis</h2>
        </div>

        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          Lihat Semua
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center">
            <Package size={40} className="mx-auto mb-3 text-gray-300" />

            <p className="text-sm text-gray-500">
              Semua stok produk masih aman.
            </p>
          </div>
        ) : (
          products.map((product) => {
            const stock = Number(product.stock);
            const badge = getStockBadge(stock);

            return (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-2xl border p-3 transition hover:shadow-md"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>

                  {product.price !== undefined && (
                    <p className="text-sm text-gray-500">
                      {formatPrice(product.price)}
                    </p>
                  )}

                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${
                        stock <= 2
                          ? "bg-red-500"
                          : stock <= 5
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(stock * 10, 100)}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Sisa stok: <strong>{stock}</strong>
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${badge.color}`}
                >
                  {badge.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
