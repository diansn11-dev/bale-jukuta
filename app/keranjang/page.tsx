"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function KeranjangPage() {
  const router = useRouter();

  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();

  const [nama, setNama] = useState("");
  const [nomor, setNomor] = useState("");
  const [alamat, setAlamat] = useState("");
  const [catatan, setCatatan] = useState("");

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const nomorWhatsAppToko = "6285111202275";

  async function checkoutWhatsApp() {
    if (cart.length === 0) {
      alert("Keranjang masih kosong");
      return;
    }

    if (!nama || !nomor || !alamat) {
      alert("Lengkapi nama, nomor WhatsApp, dan alamat");
      return;
    }

    if (!/^08\d{8,13}$/.test(nomor)) {
      alert("Nomor WhatsApp tidak valid.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer_name: nama,
          customer_phone: nomor,
          customer_address: alamat,
          note: catatan,
          total_price: total,
          items: cart,
        }),
      });

      const result = await response.json();

      if (!result.success || !result.order?.id) {
        console.error(result.error);

        alert("Pesanan gagal disimpan");
        return;
      }

      const pesanWhatsApp = `

Halo Bale Juku' Ta' 👋

Saya ingin melakukan pemesanan.


====================
DATA PEMBELI
====================

Nama:
${nama}

Nomor WhatsApp:
${nomor}

Alamat:
${alamat}


====================
DETAIL PESANAN
====================

${cart
  .map(
    (item, index) =>
      `${index + 1}. ${item.name}

Jumlah:
${item.quantity} Kg

Harga/Kg:
Rp ${item.price.toLocaleString("id-ID")}

Subtotal:
Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`,
  )
  .join("\n\n")}



====================
TOTAL
====================

Rp ${total.toLocaleString("id-ID")}


Nomor Pesanan:
#${result.order.id}


Catatan:
${catatan || "-"}


Terima kasih.

Bale Juku' Ta'
`;

      clearCart();

      setNama("");
      setNomor("");
      setAlamat("");
      setCatatan("");

      window.open(
        `https://wa.me/${nomorWhatsAppToko}?text=${encodeURIComponent(
          pesanWhatsApp,
        )}`,
        "_blank",
      );

      router.push(`/checkout/sukses?id=${result.order.id}`);
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <p className="text-gray-500">Keranjang masih kosong</p>
        </div>
      ) : (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold">{item.name}</h2>

                <p className="font-semibold text-sky-700">
                  Rp {item.price.toLocaleString("id-ID")} / Kg
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="rounded-lg bg-gray-200 p-2"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="font-bold">{item.quantity} Kg</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="rounded-lg bg-gray-200 p-2"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="rounded-xl bg-red-500 p-3 text-white"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">Data Pembeli</h2>

            <div className="space-y-4">
              <input
                placeholder="Nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

              <input
                placeholder="Nomor WhatsApp"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

              <textarea
                placeholder="Alamat pengiriman"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

              <textarea
                placeholder="Catatan pesanan"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full rounded-xl border p-3"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-sky-700 p-6 text-white">
            <h2 className="text-2xl font-bold">
              Total: Rp {total.toLocaleString("id-ID")}
            </h2>

            <button
              onClick={checkoutWhatsApp}
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold disabled:bg-gray-400"
            >
              <MessageCircle size={22} />

              {loading ? "Menyimpan Pesanan..." : "Checkout via WhatsApp"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
