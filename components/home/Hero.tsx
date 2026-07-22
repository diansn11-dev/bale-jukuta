import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Phone,
  Fish,
  ShieldCheck,
  Truck,
  BadgeDollarSign,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2b63] via-[#0f4c97] to-[#2196f3]">
      {/* Background Blur */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* ========================= */}
        {/* KIRI */}
        {/* ========================= */}

        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">
            <Fish size={18} />
            FRESH & FROZEN
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
            Ikan Segar
            <br />
            Berkualitas
            <br />
            Langsung dari Laut
          </h1>

          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Bale Juku' Ta' menyediakan berbagai pilihan ikan segar dan frozen
            berkualitas dengan harga terbaik untuk keluarga, restoran, maupun
            usaha kuliner.
          </p>

          {/* BUTTON */}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/produk"
              className="flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-sky-700 shadow-xl transition hover:scale-105"
            >
              <ShoppingBag size={22} />
              Belanja Sekarang
            </Link>

            <Link
              href="/kontak"
              className="flex items-center gap-3 rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-sky-700"
            >
              <Phone size={22} />
              Hubungi Kami
            </Link>
          </div>

          {/* FITUR */}

          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <Fish className="text-cyan-300" />
              <div>
                <p className="font-semibold">Ikan Segar</p>
                <p className="text-sm text-blue-100">Hasil tangkapan terbaik</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="text-cyan-300" />
              <div>
                <p className="font-semibold">Berkualitas</p>
                <p className="text-sm text-blue-100">Dijamin fresh</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="text-cyan-300" />
              <div>
                <p className="font-semibold">Pengiriman</p>
                <p className="text-sm text-blue-100">Cepat & Aman</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BadgeDollarSign className="text-cyan-300" />
              <div>
                <p className="font-semibold">Harga</p>
                <p className="text-sm text-blue-100">Terjangkau</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* KANAN */}
        {/* ========================= */}

        <div className="relative flex justify-center">
          <div className="absolute h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

          <Image
            src="/hero-fish.png"
            alt="Ikan Segar Bale Juku Ta"
            width={900}
            height={700}
            priority
            className="relative z-10 w-full max-w-[700px] drop-shadow-[0_30px_40px_rgba(0,0,0,.35)]"
          />
        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="block w-full text-slate-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        fill="currentColor"
      >
        <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32V120H1360C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120H0Z" />
      </svg>
    </section>
  );
}
