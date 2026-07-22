"use client";

import { useState } from "react";

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type Order = {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  note: string;
  total_price: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
};

export default function CekPesananPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function checkOrder() {
    if (!orderId || !phone) {
      setError("Nomor pesanan dan WhatsApp wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const cleanOrderId = orderId.replace("#", "");

      const response = await fetch("/api/check-order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          order_id: cleanOrderId,
          customer_phone: phone,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Pesanan tidak ditemukan.");

        return;
      }

      setOrder(result.order);
    } catch {
      setError("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  }

  function statusBadge(status: string) {
    switch (status) {
      case "pending":
        return (
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
            Menunggu Diproses
          </span>
        );

      case "processed":
        return (
          <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
            Sedang Diproses
          </span>
        );

      case "shipped":
        return (
          <span className="rounded-full bg-purple-100 px-4 py-2 text-purple-700">
            Sedang Dikirim
          </span>
        );

      case "completed":
        return (
          <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
            Selesai
          </span>
        );

      case "cancelled":
        return (
          <span className="rounded-full bg-red-100 px-4 py-2 text-red-700">
            Dibatalkan
          </span>
        );

      default:
        return status;
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-sky-700">Cek Pesanan</h1>

      <div className="rounded-2xl bg-white p-6 shadow">
        <input
          className="mb-4 w-full rounded-xl border p-3"
          placeholder="Nomor Pesanan (contoh: 7 atau #7)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-xl border p-3"
          placeholder="Nomor WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={checkOrder}
          disabled={loading}
          className="rounded-xl bg-sky-700 px-6 py-3 font-bold text-white disabled:bg-gray-400"
        >
          {loading ? "Mencari..." : "Cek Pesanan"}
        </button>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>

      {order && (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-3xl font-bold text-sky-700">
            Pesanan #{order.id}
          </h2>

          <div className="mt-4 space-y-2">
            <p>
              <b>Status:</b> {statusBadge(order.status)}
            </p>

            <p>
              <b>Nama:</b> {order.customer_name}
            </p>

            <p>
              <b>Alamat:</b> {order.customer_address}
            </p>

            <p>
              <b>Tanggal:</b>{" "}
              {new Date(order.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <p>
              <b>Jam:</b>{" "}
              {new Date(order.created_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              WITA
            </p>
          </div>

          <hr className="my-6" />

          <h3 className="text-xl font-bold">Detail Produk</h3>

          {order.order_items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-3">
              <span>
                {item.product_name}
                <br />
                {item.quantity} Kg
              </span>

              <span className="font-semibold">
                Rp {item.subtotal.toLocaleString("id-ID")}
              </span>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total</p>

            <p className="text-3xl font-bold text-sky-700">
              Rp {order.total_price.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
