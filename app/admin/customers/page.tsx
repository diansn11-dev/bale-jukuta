import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function CustomersPage() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select(
      `
      customer_name,
      customer_phone,
      customer_address,
      total_price,
      created_at
    `,
    )
    .order("created_at", { ascending: false });

  const customers = new Map();

  orders?.forEach((order) => {
    const key = order.customer_phone;

    if (!customers.has(key)) {
      customers.set(key, {
        name: order.customer_name,
        phone: order.customer_phone,
        address: order.customer_address,
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: order.created_at,
      });
    }

    const c = customers.get(key);

    c.totalOrders += 1;
    c.totalSpent += order.total_price;

    if (new Date(order.created_at) > new Date(c.lastOrder)) {
      c.lastOrder = order.created_at;
    }
  });

  const customerList = [...customers.values()];

  const totalRevenue = customerList.reduce((a, b) => a + b.totalSpent, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manajemen Pelanggan</h1>

        <p className="text-gray-500 mt-2">
          Daftar seluruh pelanggan Bale Juku' Ta'
        </p>
      </div>

      {/* Statistik */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white shadow p-6">
          <p className="text-gray-500">Total Pelanggan</p>

          <h2 className="text-4xl font-bold text-sky-600 mt-3">
            {customerList.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <p className="text-gray-500">Total Pesanan</p>

          <h2 className="text-4xl font-bold text-green-600 mt-3">
            {orders?.length ?? 0}
          </h2>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <p className="text-gray-500">Total Omzet</p>

          <h2 className="text-3xl font-bold text-orange-600 mt-3">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </h2>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white shadow rounded-xl p-5">
        <input
          placeholder="Cari pelanggan..."
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="text-left p-4">Nama</th>

              <th className="text-left p-4">WhatsApp</th>

              <th className="text-left p-4">Alamat</th>

              <th className="text-center p-4">Pesanan</th>

              <th className="text-right p-4">Total Belanja</th>
            </tr>
          </thead>

          <tbody>
            {customerList.length == 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-10 text-gray-500">
                  Belum ada pelanggan
                </td>
              </tr>
            ) : (
              customerList.map((customer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{customer.name}</td>

                  <td className="p-4">{customer.phone}</td>

                  <td className="p-4">{customer.address}</td>

                  <td className="text-center p-4">{customer.totalOrders}</td>

                  <td className="text-right p-4 font-semibold text-green-700">
                    Rp {customer.totalSpent.toLocaleString("id-ID")}
                  </td>

                  <td className="text-center p-4">
                    <Link
                      target="_blank"
                      href={`https://wa.me/${customer.phone.replace(
                        /^0/,
                        "62",
                      )}`}
                      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      WhatsApp
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
