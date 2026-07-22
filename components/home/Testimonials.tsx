import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Andi Pratama",
    city: "Makassar",
    comment:
      "Ikannya sangat segar, kualitas premium, pengiriman cepat, dan pelayanannya ramah. Sangat puas belanja di Bale Juku' Ta'.",
  },
  {
    name: "Siti Rahma",
    city: "Gowa",
    comment:
      "Sudah beberapa kali membeli ikan frozen di sini. Selalu fresh dan harganya lebih murah dibanding tempat lain.",
  },
  {
    name: "Muhammad Rizal",
    city: "Maros",
    comment:
      "Website mudah digunakan, checkout lewat WhatsApp sangat praktis. Produk datang dalam kondisi dingin dan segar.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-14 text-center">
          <span className="rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700">
            Testimoni Pelanggan
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-800">
            Apa Kata Pelanggan Kami?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Kepuasan pelanggan adalah prioritas utama Bale Juku' Ta'.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Rating */}

              <div className="mb-5 flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Isi */}

              <p className="leading-8 text-gray-600">"{item.comment}"</p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-700 text-lg font-bold text-white">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>

                  <p className="text-sm text-gray-500">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistik */}

        <div className="mt-20 grid gap-6 rounded-3xl bg-sky-700 p-10 text-center text-white md:grid-cols-4">
          <div>
            <h3 className="text-4xl font-bold">1000+</h3>
            <p className="mt-2 text-sky-100">Pelanggan</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">5000+</h3>
            <p className="mt-2 text-sky-100">Pesanan</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">99%</h3>
            <p className="mt-2 text-sky-100">Pelanggan Puas</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">4.9★</h3>
            <p className="mt-2 text-sky-100">Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
