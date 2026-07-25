import Link from "next/link";
import { Fish, Snowflake, Drumstick } from "lucide-react";

const categories = [
  {
    name: "Fresh",
    icon: Fish,
    href: "/produk?kategori=Fresh",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "Frozen",
    icon: Snowflake,
    href: "/produk?kategori=Frozen",
    color: "bg-sky-100 text-sky-700",
  },
];

export default function Category() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Kategori Produk</h2>

        <p className="mt-2 text-gray-500">
          Pilih kategori produk yang Anda inginkan.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              href={category.href}
              className="
    group
    flex
    h-52
    w-52
    flex-col
    items-center
    justify-center
    rounded-3xl
    border
    bg-white
    p-8
    text-center
    shadow-sm
    transition-all
    hover:-translate-y-2
    hover:border-sky-500
    hover:shadow-xl
  "
            >
              <div
                className={`
      flex
      h-24
      w-24
      items-center
      justify-center
      rounded-full
      ${category.color}
      transition
      group-hover:scale-110
    `}
              >
                <Icon size={45} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                {category.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
