import Link from "next/link";
import { Fish, Snowflake, ShieldCheck, Truck, Star, Waves } from "lucide-react";

const categories = [
  {
    title: "Ikan Fresh",
    description: "Langsung dari nelayan setiap hari.",
    icon: Fish,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Ikan Frozen",
    description: "Tetap segar dengan kualitas terbaik.",
    icon: Snowflake,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Produk Terlaris",
    description: "Pilihan favorit pelanggan.",
    icon: Star,
    color: "from-yellow-500 to-amber-500",
  },
];

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-white to-sky-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-14 text-center">
          <span className="rounded-full bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-700">
            Kategori Produk
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-800">
            Pilihan Produk Bale Juku' Ta'
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Kami menyediakan berbagai pilihan ikan fresh dan frozen dengan
            kualitas terbaik langsung dari laut Indonesia.
          </p>
        </div>

        {/* Grid */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href="/produk"
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div
                  className={`h-3 w-full bg-gradient-to-r ${category.color}`}
                />

                <div className="p-8">
                  <div
                    className={`mb-6 inline-flex rounded-2xl bg-gradient-to-r p-5 text-white ${category.color}`}
                  >
                    <Icon size={34} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 transition group-hover:text-sky-700">
                    {category.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-gray-500">
                    {category.description}
                  </p>

                  <div className="mt-8 flex items-center font-semibold text-sky-700">
                    Lihat Produk
                    <span className="ml-2 transition group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
