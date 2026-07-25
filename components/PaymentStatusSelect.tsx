"use client";

import { useRouter } from "next/navigation";

export default function PaymentStatusSelect({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) {
  const router = useRouter();

  async function updatePayment(value: string) {
    await fetch(`/api/admin/orders/${orderId}/payment`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        payment_status: value,
      }),
    });

    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={(e) => updatePayment(e.target.value)}
      className="
rounded-xl
border
px-3
py-2
text-sm
"
    >
      <option value="pending">Belum Bayar</option>

      <option value="paid">Sudah Bayar</option>

      <option value="cod">COD</option>
    </select>
  );
}
