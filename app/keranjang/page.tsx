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

  const [deliveryMethod, setDeliveryMethod] = useState("Diantar");

  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const nomorWhatsAppToko = "6285111202275";

  async function checkoutWhatsApp() {
    if (cart.length === 0) {
      alert("Keranjang masih kosong");
      return;
    }

    if (!nama || !nomor) {
      alert("Lengkapi nama dan nomor WhatsApp");
      return;
    }

    if (deliveryMethod === "Diantar" && !alamat) {
      alert("Alamat pengiriman wajib diisi.");
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

          delivery_method: deliveryMethod,

          payment_method: paymentMethod,
          payment_status: "pending",

          items: cart,
        }),
      });

      const result = await response.json();

      if (!result.success || !result.order?.id) {
        console.error(result.error);

        alert("Pesanan gagal disimpan");
        return;
      }

      const jam = new Date().getHours();

      const pesanWhatsApp = `Halo Admin Bale Juku' Ta'.

Saya telah melakukan pemesanan melalui website Bale Juku' Ta'.

*Data Pembeli*

Nama : ${nama}
WhatsApp : ${nomor}

*Pengiriman*

Metode : ${deliveryMethod}

${
  deliveryMethod === "Diantar"
    ? `Alamat :
${alamat}`
    : "Pesanan akan diambil langsung di toko."
}

*Metode Pembayaran*

${paymentMethod}

*Detail Pesanan*

${cart
  .map(
    (item, index) => `${index + 1}. ${item.name}
${item.variantType ? `   Jenis  : ${item.variantType}` : ""}
${item.weight ? `   Berat  : ${item.weight}` : ""}
   Jumlah : ${item.quantity} ${item.weight ? "Ekor" : "Kg"}
   Harga  : Rp ${item.price.toLocaleString("id-ID")}${item.weight ? " / Ekor" : " / Kg"}
`,
  )
  .join("\n")}

*Catatan*

${catatan || "-"}

*Informasi*

Harga yang tercantum merupakan harga produk saat pemesanan.

Total pembayaran akhir, ongkos kirim (jika ada), serta ketersediaan produk akan dikonfirmasi kembali oleh Admin Bale Juku' Ta' sebelum proses pembayaran dan pengiriman.

Terima kasih telah berbelanja di Bale Juku' Ta'. 🐟`;

      clearCart();

      setNama("");
      setNomor("");
      setAlamat("");
      setCatatan("");

      const whatsappUrl = `https://wa.me/${nomorWhatsAppToko}?text=${encodeURIComponent(
        pesanWhatsApp,
      )}`;

      // simpan id pesanan untuk halaman sukses
      sessionStorage.setItem("last_order_id", String(result.order.id));

      // langsung buka WhatsApp (lebih stabil di mobile)
      window.location.href = whatsappUrl;
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
              key={item.variantId ?? item.id}
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

                {item.weight && (
                  <div className="mt-1 space-y-1 text-sm text-gray-500">
                    <p>
                      Berat :
                      <span className="ml-1 font-medium">{item.weight}</span>
                    </p>

                    {item.variantType && (
                      <p>
                        Jenis :
                        <span className="ml-1 font-medium">
                          {item.variantType}
                        </span>
                      </p>
                    )}

                    <p>
                      Stok tersedia :
                      <span className="ml-1 font-medium">
                        {item.stock} Ekor
                      </span>
                    </p>
                  </div>
                )}

                <p className="font-semibold text-sky-700">
                  Rp {item.price.toLocaleString("id-ID")}
                  {item.weight ? " / Ekor" : " / Kg"}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.variantId ?? item.id)}
                    className="rounded-lg bg-gray-200 p-2"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="font-bold">
                    {item.quantity} {item.weight ? "Ekor" : "Kg"}
                  </span>

                  <button
                    onClick={() => increaseQty(item.variantId ?? item.id)}
                    className="rounded-lg bg-gray-200 p-2"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.variantId ?? item.id)}
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

              {deliveryMethod === "Diantar" && (
                <textarea
                  placeholder="Alamat pengiriman"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full rounded-xl border p-3"
                />
              )}

              <textarea
                placeholder="Catatan pesanan"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

              <div className="space-y-3">
                <label className="block text-sm font-semibold">
                  Metode Pengambilan
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    name="delivery"
                    value="Diantar"
                    checked={deliveryMethod === "Diantar"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />

                  <span>🚚 Diantar ke alamat</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    name="delivery"
                    value="Pickup"
                    checked={deliveryMethod === "Pickup"}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  />

                  <span>🏪 Ambil di Toko (Pickup)</span>
                </label>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold">
                  Metode Pembayaran
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="Transfer Bank"
                    checked={paymentMethod === "Transfer Bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>🏦 Transfer Bank</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="QRIS"
                    checked={paymentMethod === "QRIS"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 QRIS</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💵 COD (Bayar di Tempat)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-sky-700 p-6 text-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-lg">
                <span>Subtotal Belanja</span>

                <span className="font-bold">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              {deliveryMethod === "Diantar" && (
                <>
                  <div className="flex items-center justify-between">
                    <span>Ongkir</span>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
                      Menunggu konfirmasi Admin
                    </span>
                  </div>

                  <div className="border-t border-white/30 pt-3">
                    <div className="flex items-center justify-between text-2xl font-bold">
                      <span>Total Sementara</span>

                      <span>Rp {total.toLocaleString("id-ID")}</span>
                    </div>

                    <p className="mt-2 text-sm text-white/80">
                      *Total akhir akan ditambahkan ongkos kirim setelah alamat
                      dikonfirmasi oleh Admin.
                    </p>
                  </div>
                </>
              )}

              {deliveryMethod === "Pickup" && (
                <div className="border-t border-white/30 pt-3">
                  <div className="flex items-center justify-between text-2xl font-bold">
                    <span>Total</span>

                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>

                  <p className="mt-2 text-sm text-white/80">
                    Pengambilan dilakukan langsung di toko sehingga tidak
                    dikenakan ongkos kirim.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={checkoutWhatsApp}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold transition hover:bg-green-600 disabled:bg-gray-400"
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
