import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-800 to-sky-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 min-h-[520px] lg:min-h-[580px] flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          {/* Kiri */}
          <div>
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
              🐟 FRESH & FROZEN
            </span>

            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1]">
              Ikan Fresh &
              <br />
              Frozen
              <br />
              Berkualitas
            </h1>

            <p className="mt-5 max-w-lg text-base lg:text-lg text-blue-100">
              Menyediakan berbagai jenis ikan laut segar dan frozen dengan
              kualitas terbaik langsung dari nelayan pilihan.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/produk"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-sky-700 hover:scale-105 transition"
              >
                Lihat Produk
              </Link>

              <a
                href="https://wa.me/6285111202275"
                className="rounded-xl border border-white px-6 py-3 font-semibold hover:bg-white hover:text-sky-700 transition"
              >
                Hubungi Kami
              </a>
            </div>
          </div>

          {/* Kanan */}
          <div className="relative h-[320px] md:h-[380px] lg:h-[430px]">
            <Image
              src="/hero-fish.png"
              alt="Ikan Segar"
              fill
              priority
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
