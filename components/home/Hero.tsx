import Image from "next/image";
import Link from "next/link";
import { Fish, Drumstick, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-900 via-sky-700 to-sky-500 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        {/* LEFT */}

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm">
            🐟 Fresh Seafood & 🍗 Fresh Chicken
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight lg:text-6xl">
            Bale Juku' Ta'
          </h1>

          <p className="mt-4 text-xl text-sky-100">
            Ikan Segar, Ikan Frozen, Ayam Fresh dan Ayam Frozen langsung dari
            supplier terpercaya.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/produk"
              className="rounded-2xl bg-white px-6 py-4 font-bold text-sky-700 transition hover:scale-105"
            >
              Lihat Produk
            </Link>

            <a
              href="https://wa.me/6285111202275"
              target="_blank"
              className="rounded-2xl border border-white px-6 py-4 font-bold transition hover:bg-white hover:text-sky-700"
            >
              Hubungi Kami
            </a>
          </div>

          {/* FITUR */}

          <div className="mt-10 grid grid-cols-2 gap-5">
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
              <Fish size={28} />
              <div>
                <p className="font-bold">Ikan Fresh</p>
                <p className="text-sm text-sky-100">Siap Masak</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
              <Drumstick size={28} />
              <div>
                <p className="font-bold">Ayam Fresh</p>
                <p className="text-sm text-sky-100">Dibersihkan H+1</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
              <Truck size={28} />
              <div>
                <p className="font-bold">Pengiriman</p>
                <p className="text-sm text-sky-100">Cepat & Aman</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
              <ShieldCheck size={28} />
              <div>
                <p className="font-bold">Kualitas</p>
                <p className="text-sm text-sky-100">Terjamin</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="relative flex items-center justify-end">
          <Image
            src="/hero-fishchick.png"
            alt="Bale Juku' Ta'"
            width={6000}
            height={1000}
            priority
            className="h-auto w-full max-w-[950px] object-contain lg:scale-125"
          />
        </div>
      </div>
    </section>
  );
}
