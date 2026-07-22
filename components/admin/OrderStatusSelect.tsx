"use client";

import { useRouter } from "next/navigation";

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) {
  const router = useRouter();

  async function updateStatus(value: string) {
    await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: value,
      }),
    });

    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="
rounded-xl
border
px-4
py-3
"
    >
      <option value="pending">Pending</option>

      <option value="diproses">Diproses</option>

      <option value="dikirim">Dikirim</option>

      <option value="completed">Selesai</option>

      <option value="cancelled">Dibatalkan</option>
    </select>
  );
}
