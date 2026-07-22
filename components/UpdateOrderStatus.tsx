"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  orderId: number;
  currentStatus: string;
};

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Menunggu Diproses",
  },
  {
    value: "processed",
    label: "Sedang Diproses",
  },
  {
    value: "shipped",
    label: "Sedang Dikirim",
  },
  {
    value: "completed",
    label: "Selesai",
  },
  {
    value: "cancelled",
    label: "Dibatalkan",
  },
];

export default function UpdateOrderStatus({ orderId, currentStatus }: Props) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const changed = useMemo(
    () => status !== currentStatus,
    [status, currentStatus],
  );

  async function updateStatus() {
    if (!changed) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gagal memperbarui status.");
      }

      router.refresh();

      alert("Status pesanan berhasil diperbarui.");
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Update Status Pesanan</h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <select
          value={status}
          disabled={loading}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {STATUS_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={updateStatus}
          disabled={!changed || loading}
          className="rounded-xl bg-sky-700 px-6 py-3 font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Menyimpan..." : "Update Status"}
        </button>
      </div>
    </div>
  );
}
