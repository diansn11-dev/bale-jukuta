import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-500" />

      {/* Blur Effect */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Text */}
        <div className="text-white">
          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
            Bale Juku' Ta'
          </span>

          <h2 className="mt-6 text-5xl font-extrabold leading-tight">
            Siap Menikmati
            <br />
            Ikan Segar
            <br />
            Berkualitas?
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-sky-100">
            Kami menyediakan berbagai pilihan ikan fresh dan frozen dengan
            kualitas terbaik langsung dari nelayan terpercaya. Pesan sekarang,
            nikmati kemudahan belanja, dan rasakan kesegarannya di rumah Anda.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/produk"
              className="rounded-xl bg-white px-8 py-4 font-bold text-sky-700 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Belanja Sekarang
            </Link>

            <Link
              href="https://wa.me/6285111202275"
              target="_blank"
              className="flex items-center gap-2 rounded-xl border-2 border-white px-8 py-4 font-bold text-white transition duration-300 hover:bg-white hover:text-sky-700"
            >
              <MessageCircle size={20} />
              WhatsApp
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center">
          <div className="absolute h-[430px] w-[430px] rounded-full bg-white/10 blur-3xl" />

          <Image
            src="/hero-fish.png"
            alt="Fresh Fish"
            width={700}
            height={650}
            priority
            className="relative z-10 w-full max-w-[600px] drop-shadow-[0_35px_45px_rgba(0,0,0,.35)]"
          />

          {/* Floating Card */}
          <div className="absolute bottom-12 left-0 rounded-2xl bg-white p-5 shadow-2xl">
            <p className="text-sm text-slate-500">Kualitas Terjamin</p>

            <h3 className="mt-1 text-2xl font-bold text-slate-800">
              100% Fresh
            </h3>

            <div className="mt-3 flex items-center gap-2 text-sky-700">
              <ArrowRight size={18} />
              <span className="font-semibold">Langsung dari Nelayan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
