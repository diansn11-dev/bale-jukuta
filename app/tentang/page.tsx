export const metadata = {
  title: "Tentang Bale Juku' Ta'",
  description:
    "Kenali Bale Juku' Ta', penyedia ikan fresh, ikan frozen, ayam fresh, dan ayam frozen berkualitas.",
};

import Image from "next/image";
import { Fish, ShieldCheck, HeartHandshake } from "lucide-react";

export default function TentangPage() {
  return (
    <main>
      {/* HEADER */}

      <section className="bg-sky-700 py-16 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold">Tentang Bale Juku' Ta'</h1>

          <p className="mt-4 text-lg text-sky-100">
            Menyediakan ikan fresh, ikan frozen, ayam fresh, dan ayam frozen
            berkualitas untuk memenuhi kebutuhan keluarga Anda.
          </p>
        </div>
      </section>

      {/* TENTANG KAMI */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Image
            src="/hero-5.png"
            alt="Bale Juku' Ta'"
            width={600}
            height={400}
            className="rounded-3xl object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold">Tentang Kami</h2>

            <p className="mt-5 leading-relaxed text-gray-600">
              <strong>Bale Juku' Ta'</strong> adalah penyedia produk pangan
              berkualitas yang menghadirkan pilihan ikan fresh, ikan frozen,
              ayam fresh, dan ayam frozen dengan standar mutu terbaik. Kami
              berkomitmen menyediakan produk yang segar, higienis, berkualitas,
              dan aman dikonsumsi sehingga setiap pelanggan dapat berbelanja
              dengan nyaman dan penuh kepercayaan.
            </p>

            <p className="mt-4 leading-relaxed text-gray-600">
              Dengan mengutamakan kualitas produk, pelayanan yang ramah, serta
              proses pemesanan yang mudah, Bale Juku' Ta' hadir sebagai solusi
              praktis untuk memenuhi kebutuhan bahan makanan keluarga, mulai
              dari kebutuhan harian hingga berbagai acara spesial.
            </p>

            <p className="mt-4 leading-relaxed text-gray-600">
              Kepuasan pelanggan adalah prioritas kami. Kami percaya bahwa
              produk berkualitas dan pelayanan terbaik akan membangun hubungan
              yang baik serta kepercayaan yang berkelanjutan.
            </p>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}

      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">
            Mengapa Memilih Bale Juku' Ta'?
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Fish size={42} className="mx-auto text-sky-700" />

              <h3 className="mt-4 text-xl font-bold">Produk Berkualitas</h3>

              <p className="mt-2 text-gray-500">
                Menyediakan ikan dan ayam pilihan yang segar, higienis, dan
                berkualitas untuk memenuhi kebutuhan keluarga Anda.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <ShieldCheck size={42} className="mx-auto text-sky-700" />

              <h3 className="mt-4 text-xl font-bold">Fresh & Frozen</h3>

              <p className="mt-2 text-gray-500">
                Tersedia pilihan ikan fresh, ikan frozen, ayam fresh, dan ayam
                frozen yang siap memenuhi berbagai kebutuhan Anda.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <HeartHandshake size={42} className="mx-auto text-sky-700" />

              <h3 className="mt-4 text-xl font-bold">Pelayanan Terpercaya</h3>

              <p className="mt-2 text-gray-500">
                Mengutamakan pelayanan yang ramah, proses pemesanan yang mudah,
                dan pengiriman yang cepat serta aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* VISI */}

          <div className="rounded-3xl bg-sky-700 p-8 text-white">
            <h2 className="text-2xl font-bold">Visi</h2>

            <p className="mt-5 leading-relaxed">
              Menjadi penyedia produk ikan dan ayam berkualitas yang terpercaya,
              profesional, serta menjadi pilihan utama masyarakat dalam memenuhi
              kebutuhan pangan segar dan frozen.
            </p>
          </div>

          {/* MISI */}

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Misi</h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-gray-600">
              <li>
                Menyediakan ikan fresh, ikan frozen, ayam fresh, dan ayam frozen
                dengan kualitas terbaik.
              </li>

              <li>
                Menjaga kesegaran, kebersihan, dan keamanan setiap produk yang
                dipasarkan.
              </li>

              <li>
                Memberikan pelayanan yang cepat, ramah, dan profesional kepada
                setiap pelanggan.
              </li>

              <li>
                Menghadirkan pengalaman belanja yang mudah melalui layanan
                online maupun offline.
              </li>

              <li>
                Membangun kepercayaan pelanggan melalui kualitas produk dan
                pelayanan yang konsisten.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
