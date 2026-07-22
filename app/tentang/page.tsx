export const metadata = {
  title: "Tentang Bale Juku' Ta'",
  description:
    "Kenali Bale Juku' Ta', penyedia ikan fresh dan frozen berkualitas.",
};

import Image from "next/image";
import { Fish, ShieldCheck, HeartHandshake } from "lucide-react";

export default function TentangPage() {
  return (
    <main>
      {/* HEADER */}

      <section className="bg-sky-700 text-white py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold">Tentang Bale Juku' Ta'</h1>

          <p className="mt-4 text-lg text-sky-100">
            Menyediakan ikan fresh dan frozen berkualitas untuk keluarga
            Indonesia.
          </p>
        </div>
      </section>

      {/* CERITA USAHA */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <Image
            src="/banner-ikan.jpg"
            alt="Bale Juku Ta"
            width={600}
            height={400}
            className="rounded-3xl object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold">Tentang Kami</h2>

            <p className="mt-5 leading-relaxed text-gray-600">
              Bale Juku' Ta' merupakan usaha yang menyediakan ikan segar dan
              frozen dengan kualitas terbaik. Kami berkomitmen menghadirkan
              hasil laut pilihan yang bersih, berkualitas, dan mudah didapatkan
              oleh pelanggan.
            </p>

            <p className="mt-4 leading-relaxed text-gray-600">
              Dengan menjaga kualitas produk dan pelayanan, kami ingin menjadi
              pilihan utama masyarakat dalam memenuhi kebutuhan ikan
              sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN */}

      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Keunggulan Kami</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 text-center shadow">
              <Fish size={40} className="mx-auto text-sky-700" />

              <h3 className="mt-4 font-bold">Ikan Berkualitas</h3>

              <p className="mt-2 text-gray-500">Dipilih dari ikan terbaik.</p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow">
              <ShieldCheck size={40} className="mx-auto text-sky-700" />

              <h3 className="mt-4 font-bold">Fresh & Frozen</h3>

              <p className="mt-2 text-gray-500">
                Tersedia ikan segar dan beku.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 text-center shadow">
              <HeartHandshake size={40} className="mx-auto text-sky-700" />

              <h3 className="mt-4 font-bold">Pelayanan Terbaik</h3>

              <p className="mt-2 text-gray-500">
                Melayani pelanggan dengan baik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-sky-700 p-8 text-white">
            <h2 className="text-2xl font-bold">Visi</h2>

            <p className="mt-4">
              Menjadi penyedia ikan berkualitas yang dipercaya masyarakat.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold">Misi</h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
              <li>Menyediakan ikan berkualitas.</li>

              <li>Menjaga kesegaran produk.</li>

              <li>Memberikan pelayanan terbaik.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
