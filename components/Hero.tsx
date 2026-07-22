import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white">
      <div className="max-w-7xl mx-auto py-28 px-6">
        <h1 className="text-5xl font-bold">Ikan Fresh & Frozen Berkualitas</h1>

        <p className="mt-6 text-xl">
          Langsung dari nelayan pilihan dengan kualitas terbaik.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/produk"
            className="bg-white text-sky-700 px-6 py-3 rounded-xl font-semibold"
          >
            Lihat Produk
          </Link>

          <a
            href="https://wa.me/6285111202275"
            className="border border-white px-6 py-3 rounded-xl"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
