"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  ShoppingBag,
} from "lucide-react";

type Order = {
  id: number;
  customer_name?: string | null;
  name?: string | null;
  total_price?: number | string | null;
  status?: string | null;
  created_at?: string | null;
};

type LatestOrdersProps = {
  orders: Order[];
};

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function LatestOrders({ orders }: LatestOrdersProps) {
  function formatPrice(value?: number | string | null) {
    return currency.format(Number(value ?? 0));
  }

  function formatDate(date?: string | null) {
    if (!date) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  function getStatus(status?: string | null) {
    switch (status) {
      case "pending":
        return {
          text: "Pending",
          color: "bg-yellow-100 text-yellow-700",
          icon: Clock3,
        };

      case "diproses":
      case "processing":
        return {
          text: "Diproses",
          color: "bg-blue-100 text-blue-700",
          icon: PackageCheck,
        };

      case "dikirim":
      case "shipped":
        return {
          text: "Dikirim",
          color: "bg-purple-100 text-purple-700",
          icon: Truck,
        };

      case "completed":
      case "selesai":
        return {
          text: "Selesai",
          color: "bg-green-100 text-green-700",
          icon: CheckCircle2,
        };

      case "cancelled":
      case "dibatalkan":
        return {
          text: "Dibatalkan",
          color: "bg-red-100 text-red-700",
          icon: XCircle,
        };

      default:
        return {
          text: status ?? "-",
          color: "bg-gray-100 text-gray-700",
          icon: Clock3,
        };
    }
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pesanan Terbaru</h2>

          <p className="mt-1 text-sm text-gray-500">
            Daftar pesanan terbaru pelanggan.
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
        >
          Lihat Semua
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Empty */}
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-12 text-center">
          <ShoppingBag size={46} className="mx-auto mb-4 text-gray-300" />

          <h3 className="font-semibold text-gray-700">Belum ada pesanan</h3>

          <p className="mt-2 text-sm text-gray-500">
            Pesanan pelanggan akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-4 font-semibold">Pelanggan</th>

                <th className="pb-4 font-semibold">Total</th>

                <th className="pb-4 font-semibold">Status</th>

                <th className="pb-4 font-semibold">Tanggal</th>

                <th className="pb-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const status = getStatus(order.status);
                const Icon = status.icon;

                return (
                  <tr
                    key={order.id}
                    className="border-b transition hover:bg-sky-50"
                  >
                    <td className="py-4 font-medium text-gray-900">
                      {order.customer_name ?? order.name ?? "Pelanggan"}
                    </td>

                    <td className="py-4">{formatPrice(order.total_price)}</td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
                      >
                        <Icon size={14} />
                        {status.text}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>

                    <td className="py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                      >
                        Detail
                        <ArrowRight size={15} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
