export default function StatsSection() {
  const stats = [
    ["500+", "Pelanggan"],
    ["25+", "Jenis Ikan"],
    ["1000+", "Pesanan"],
    ["100%", "Fresh"],
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-8 px-6">
        {stats.map(([number, title]) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-8 text-center shadow"
          >
            <h2 className="text-5xl font-bold text-sky-700">{number}</h2>

            <p className="mt-3">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
