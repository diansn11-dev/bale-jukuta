"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  orderId: number;
  currentStatus: string;
};

const statuses = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "processed",
    label: "Diproses",
  },
  {
    value: "shipped",
    label: "Dikirim",
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

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);

  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    const oldStatus = status;

    setStatus(newStatus);

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setStatus(oldStatus);

        alert(result.error ?? "Gagal update status");

        return;
      }

      router.refresh();
    } catch (error) {
      setStatus(oldStatus);

      alert("Terjadi kesalahan saat update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="
        rounded-lg
        border
        px-3
        py-2
        font-semibold
        disabled:opacity-50
      "
    >
      {statuses.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
