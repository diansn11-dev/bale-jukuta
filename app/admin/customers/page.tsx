import { Users, Phone, MapPin } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function CustomersPage() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("customer_name, customer_phone, customer_address")
    .order("created_at", {
      ascending: false,
    });

  const customers = Array.from(
    new Map(
      (orders ?? [])
        .filter((item) => item.customer_phone)
        .map((item) => [item.customer_phone, item]),
    ).values(),
  );

  return (
    <main className="space-y-6">
      {/* HEADER */}

      <section
        className="
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-sky-700
          "
        >
          Pelanggan
        </h1>

        <p className="mt-2 text-gray-500">Data pelanggan Bale Juku' Ta'</p>
      </section>

      {/* CUSTOMER LIST */}

      <section
        className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-3
        "
      >
        {customers.map((customer, index) => (
          <div
            key={index}
            className="
          rounded-3xl
          border
          bg-white
          p-5
          shadow-sm
          "
          >
            <div className="flex items-center gap-3">
              <div
                className="
              rounded-full
              bg-sky-100
              p-3
              text-sky-700
              "
              >
                <Users size={22} />
              </div>

              <h2 className="font-bold">{customer.customer_name}</h2>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <p className="flex gap-2">
                <Phone size={16} />
                {customer.customer_phone}
              </p>

              <p className="flex gap-2">
                <MapPin size={16} />
                {customer.customer_address}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
