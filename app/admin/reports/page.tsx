import Link from "next/link";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { getAdminUser } from "@/lib/auth";

type Props = {
  searchParams: Promise<{
    period?: string;
  }>;
};

type Order = {
  id: number;
  customer_name: string | null;
  status: string;
  total_price: number | string | null;
  created_at: string;
};

export default async function ReportsPage({ searchParams }: Props) {
  // ==========================
  // ADMIN PROTECTION
  // ==========================

  const user = await getAdminUser();

  if (!user) {
    redirect("/login");
  }

  // ==========================
  // SEARCH PARAM
  // ==========================

  const { period } = await searchParams;

  const selectedPeriod = period ?? "all";

  // ==========================
  // GET ORDERS
  // ==========================

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      customer_name,
      status,
      total_price,
      created_at
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const orders = (data ?? []) as Order[];

  // ==========================
  // FILTER
  // ==========================

  const now = new Date();

  const filteredOrders = orders.filter((order) => {
    const date = new Date(order.created_at);

    switch (selectedPeriod) {
      case "today":
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

      case "week": {
        const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

        return diff >= 0 && diff <= 7;
      }

      case "month":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

      default:
        return true;
    }
  });

  // ==========================
  // STATISTIC
  // ==========================

  const totalOrders = filteredOrders.length;

  const completedOrders = filteredOrders.filter(
    (item) => item.status === "completed",
  ).length;

  const pendingOrders = filteredOrders.filter(
    (item) => item.status === "pending",
  ).length;

  const cancelledOrders = filteredOrders.filter(
    (item) => item.status === "cancelled",
  ).length;

  const totalRevenue = filteredOrders
    .filter((item) => item.status === "completed")
    .reduce((total, item) => {
      return total + Number(item.total_price ?? 0);
    }, 0);

  function rupiah(value: number) {
    return `Rp ${value.toLocaleString("id-ID")}`;
  }

  function statusBadge(status: string) {
    const config = {
      completed: {
        text: "Selesai",
        className: "bg-green-100 text-green-700",
      },
      pending: {
        text: "Pending",
        className: "bg-yellow-100 text-yellow-700",
      },
      processed: {
        text: "Diproses",
        className: "bg-blue-100 text-blue-700",
      },
      shipped: {
        text: "Dikirim",
        className: "bg-purple-100 text-purple-700",
      },
      cancelled: {
        text: "Dibatalkan",
        className: "bg-red-100 text-red-700",
      },
    } as const;

    const item = config[status as keyof typeof config] ?? {
      text: status,
      className: "bg-gray-100 text-gray-700",
    };

    return (
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}
      >
        {item.text}
      </span>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">Laporan Penjualan</h1>

        <p className="text-gray-500">Ringkasan transaksi Bale Juku' Ta'</p>

        {/* FILTER */}

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            ["all", "Semua"],
            ["today", "Hari Ini"],
            ["week", "7 Hari"],
            ["month", "Bulan Ini"],
          ].map(([key, label]) => (
            <Link
              key={key}
              href={`/admin/reports?period=${key}`}
              className={`rounded-xl px-5 py-3 transition ${
                selectedPeriod === key
                  ? "bg-sky-700 text-white"
                  : "border bg-white hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* EXPORT */}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/api/admin/reports/excel"
            className="
              rounded-xl
              bg-green-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-green-700
            "
          >
            📥 Export Excel
          </a>

          <button
            disabled
            className="
              cursor-not-allowed
              rounded-xl
              bg-gray-400
              px-5
              py-3
              font-semibold
              text-white
            "
          >
            📄 Export PDF (Segera Hadir)
          </button>
        </div>
      </div>

      {/* STATISTIK */}

      <section
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <Card title="Total Pesanan" value={totalOrders} />

        <Card title="Pesanan Selesai" value={completedOrders} />

        <Card title="Pending" value={pendingOrders} />

        <Card title="Dibatalkan" value={cancelledOrders} />
      </section>

      {/* TOTAL PENDAPATAN */}

      <section
        className="
          rounded-2xl
          bg-sky-700
          p-8
          text-white
        "
      >
        <p className="text-lg">Total Pendapatan</p>

        <h2 className="mt-3 text-5xl font-bold">{rupiah(totalRevenue)}</h2>
      </section>

      {/* TABEL */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
          shadow-sm
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-16 p-4 text-center">No</th>

                <th className="p-4 text-left">Tanggal</th>

                <th className="p-4 text-left">Pelanggan</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      p-8
                      text-center
                      text-gray-500
                    "
                  >
                    Belum ada transaksi.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className="
                        border-t
                        transition
                        hover:bg-gray-50
                      "
                  >
                    <td className="p-4 text-center">{index + 1}</td>

                    <td className="p-4">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>

                    <td className="p-4 font-medium">
                      {order.customer_name ?? "-"}
                    </td>

                    <td className="p-4 text-center">
                      {statusBadge(order.status)}
                    </td>

                    <td
                      className="
                          p-4
                          text-right
                          font-bold
                          text-sky-700
                        "
                    >
                      {rupiah(Number(order.total_price ?? 0))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <p
        className="
          text-sm
          font-medium
          text-gray-500
        "
      >
        {title}
      </p>

      <h2
        className="
          mt-3
          text-4xl
          font-bold
          text-sky-700
        "
      >
        {value}
      </h2>
    </div>
  );
}
