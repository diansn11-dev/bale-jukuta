import { Search, ShoppingCart, MessageCircle, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Pilih Produk",
    description:
      "Jelajahi koleksi ikan fresh, ikan frozen, ayam fresh, dan ayam frozen pilihan dengan kualitas premium, kesegaran terjamin, diproses secara higienis, dan siap menjadi sajian terbaik untuk keluarga Anda.",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Masukkan ke Keranjang",
    description:
      "Tambahkan produk yang diinginkan ke keranjang belanja dengan jumlah yang sesuai.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Checkout via WhatsApp",
    description:
      "Isi data pembeli lalu lanjutkan pemesanan melalui WhatsApp dengan mudah.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Pesanan Diproses",
    description:
      "Admin kami akan memproses pesanan dan mengirimkan produk secepat mungkin.",
  },
];

export default function HowToOrder() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700">
            Cara Pemesanan
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-800">
            Lengkapi Kebutuhan Dapur dengan Ikan & Ayam Berkualitas
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-500">
            Hanya empat langkah sederhana untuk mendapatkan ikan segar
            berkualitas dari Bale Juku' Ta'.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Garis desktop */}
          <div className="absolute left-0 right-0 top-16 hidden h-1 bg-sky-100 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative text-center">
                  {/* Nomor */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-sky-700 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mt-10 flex h-28 w-28 items-center justify-center rounded-full bg-sky-50 shadow-lg transition duration-300 hover:scale-110 hover:bg-sky-700 hover:text-white">
                    <Icon size={42} />
                  </div>

                  {/* Judul */}
                  <h3 className="mt-8 text-2xl font-bold text-slate-800">
                    {step.title}
                  </h3>

                  {/* Deskripsi */}
                  <p className="mt-4 leading-7 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
