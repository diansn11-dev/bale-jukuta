export const metadata = {
  title: "Kontak Bale Juku' Ta'",
  description: "Hubungi Bale Juku' Ta' untuk pemesanan ikan fresh dan frozen.",
};

import { MessageCircle, MapPin, Clock, Phone, Mail } from "lucide-react";

import { FaInstagram } from "react-icons/fa";

export default function KontakPage() {
  return (
    <main>
      {/* HEADER */}

      <section className="bg-sky-700 py-16 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold">Hubungi Bale Juku' Ta'</h1>

          <p className="mt-4 text-sky-100">
            Kami siap membantu kebutuhan ikan fresh dan frozen Anda.
          </p>
        </div>
      </section>

      {/* INFORMASI KONTAK */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* KIRI */}

          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <MessageCircle className="text-green-500" size={35} />

              <div>
                <h2 className="font-bold text-xl">WhatsApp</h2>

                <a
                  href="https://wa.me/6285111202275"
                  target="_blank"
                  className="text-gray-600 hover:text-green-600"
                >
                  0851-1120-2275
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <FaInstagram className="text-pink-500" size={35} />

              <div>
                <h2 className="font-bold text-xl">Instagram</h2>

                <p className="text-gray-600">@balejukuta</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <Mail className="text-red-500" size={35} />

              <div>
                <h2 className="font-bold text-xl">Email</h2>

                <a
                  href="mailto:emailkamu@gmail.com"
                  className="text-gray-600 hover:text-red-500"
                >
                  balejukuta@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow">
              <Clock className="text-sky-700" size={35} />

              <div>
                <h2 className="font-bold text-xl">Jam Operasional</h2>

                <p className="text-gray-600">
                  Setiap Hari
                  <br />
                  08.00 - 21.00 WITA
                </p>
              </div>
            </div>
          </div>

          {/* KANAN */}

          <div className="mt-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Lokasi Kami
            </h2>

            <div className="overflow-hidden rounded-2xl border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.990636872446!2d119.4967296!3d-5.1052078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefd619c1dd449%3A0x6b7d3e142b6cf7df!2sMABES%20KIMAX%20MAKASSAR!5e0!3m2!1sid!2sid!4v1784706536291!5m2!1sid!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title="Lokasi Bale Juku' Ta'"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
