"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  async function updateStatus(value: string) {
    const oldStatus = currentStatus;

    setCurrentStatus(value);

    try {
      setLoading(true);

      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: value,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setCurrentStatus(oldStatus);

        alert(result.error || "Gagal mengubah status pesanan");

        return;
      }

      router.refresh();
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);

      setCurrentStatus(oldStatus);

      alert("Terjadi kesalahan saat mengubah status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={currentStatus}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="
        rounded-xl
        border
        bg-white
        px-4
        py-3
        text-sm
        font-medium
        shadow-sm
        disabled:cursor-not-allowed
        disabled:bg-gray-100
      "
    >
      <option value="pending">Pending</option>

      <option value="processed">Diproses</option>

      <option value="shipped">Dikirim</option>

      <option value="completed">Selesai</option>

      <option value="cancelled">Dibatalkan</option>
    </select>
  );
}
