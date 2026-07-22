import { Fish, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export default function Features() {
  const data = [
    {
      icon: Fish,
      title: "Fresh Setiap Hari",
    },
    {
      icon: ShieldCheck,
      title: "Kualitas Premium",
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
    },
    {
      icon: BadgeCheck,
      title: "Harga Terbaik",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-6 px-6">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-8 text-center shadow hover:shadow-xl transition"
            >
              <Icon size={48} className="mx-auto text-sky-700" />

              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
