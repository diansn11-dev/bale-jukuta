import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Search,
  ShoppingCart,
  Clock3,
  PackageCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getAdminUser } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

import OrderStatusSelect from "@/components/OrderStatusSelect";

type Props = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 20;

const STATUS = {
  PENDING: "pending",
  PROCESSING: "diproses",
  SHIPPED: "dikirim",
  COMPLETED: "completed",
  FINISHED: "selesai",
  CANCELLED: "cancelled",
};

export default async function AdminOrdersPage({ searchParams }: Props) {
  // ==========================
  // AUTH
  // ==========================

  const user = await getAdminUser();

  if (!user) {
    redirect("/login");
  }

  // ==========================
  // URL PARAMS
  // ==========================

  const params = (await searchParams) ?? {};

  const keyword = params.q?.trim() ?? "";

  const status = params.status ?? "";

  const page = Math.max(Number(params.page ?? "1"), 1);

  const from = (page - 1) * PAGE_SIZE;

  const to = from + PAGE_SIZE - 1;

  // ==========================
  // QUERY
  // ==========================

  let query = supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      customer_name,
      customer_phone,
      customer_address,
      total_price,
      status,
      created_at
    `,
      { count: "exact" },
    )
    .order("created_at", {
      ascending: false,
    });

  if (keyword) {
    query = query.ilike("customer_name", `%${keyword}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data: orders, error, count } = await query.range(from, to);

  if (error) {
    console.error(error);

    return (
      <main className="mx-auto max-w-7xl p-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">
            Gagal memuat pesanan
          </h1>

          <p className="mt-3 text-red-600">{error.message}</p>
        </div>
      </main>
    );
  }

  // ==========================
  // DASHBOARD SUMMARY
  // ==========================

  const totalOrders = count ?? 0;

  const pendingOrders =
    orders?.filter((o) => o.status === STATUS.PENDING).length ?? 0;

  const processingOrders =
    orders?.filter((o) => o.status === STATUS.PROCESSING).length ?? 0;

  const completedOrders =
    orders?.filter(
      (o) => o.status === STATUS.COMPLETED || o.status === STATUS.FINISHED,
    ).length ?? 0;

  const cancelledOrders =
    orders?.filter((o) => o.status === STATUS.CANCELLED).length ?? 0;

  // ==========================
  // FORMATTERS
  // ==========================

  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const totalPages = Math.max(Math.ceil(totalOrders / PAGE_SIZE), 1);

  // ==========================
  // PAGE
  // ==========================

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-8">
      {/* ========================== */}
      {/* HEADER */}
      {/* ========================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-sky-700">Order Management</h1>

          <p className="mt-2 text-gray-500">
            Kelola seluruh pesanan pelanggan Bale Juku' Ta'.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="rounded-xl border bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800"
          >
            Refresh
          </Link>
        </div>
      </div>

      {/* ========================== */}
      {/* SUMMARY */}
      {/* ========================== */}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Pesanan</p>

          <h2 className="mt-3 flex items-center gap-2 text-3xl font-bold">
            <ShoppingCart size={28} className="text-sky-700" />
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>

          <h2 className="mt-3 flex items-center gap-2 text-3xl font-bold text-yellow-600">
            <Clock3 size={28} />
            {pendingOrders}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Diproses</p>

          <h2 className="mt-3 flex items-center gap-2 text-3xl font-bold text-blue-600">
            <PackageCheck size={28} />
            {processingOrders}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Selesai</p>

          <h2 className="mt-3 flex items-center gap-2 text-3xl font-bold text-green-600">
            <CheckCircle2 size={28} />
            {completedOrders}
          </h2>
        </div>
      </section>

      {/* ========================== */}
      {/* SEARCH & FILTER */}
      {/* ========================== */}

      <form method="GET" className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="q"
              defaultValue={keyword}
              placeholder="Cari nama pelanggan..."
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-sky-500"
            />
          </div>

          <div className="lg:col-span-3">
            <select
              name="status"
              defaultValue={status}
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-sky-500"
            >
              <option value="">Semua Status</option>

              <option value="pending">Pending</option>

              <option value="diproses">Diproses</option>

              <option value="dikirim">Dikirim</option>

              <option value="completed">Completed</option>

              <option value="selesai">Selesai</option>

              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <div className="flex gap-3 lg:col-span-3">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white transition hover:bg-sky-800"
            >
              Cari
            </button>

            <Link
              href="/admin/orders"
              className="rounded-xl border px-5 py-3 transition hover:bg-gray-50"
            >
              Reset
            </Link>
          </div>
        </div>
      </form>

      {/* ========================== */}
      {/* TABLE */}
      {/* ========================== */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="p-4 text-left">Invoice</th>
                <th className="p-4 text-left">Pelanggan</th>
                <th className="p-4 text-left">WhatsApp</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Tanggal</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => {
                  const statusColor =
                    order.status === STATUS.PENDING
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === STATUS.PROCESSING
                        ? "bg-blue-100 text-blue-700"
                        : order.status === STATUS.SHIPPED
                          ? "bg-purple-100 text-purple-700"
                          : order.status === STATUS.COMPLETED ||
                              order.status === STATUS.FINISHED
                            ? "bg-green-100 text-green-700"
                            : order.status === STATUS.CANCELLED
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700";

                  return (
                    <tr
                      key={order.id}
                      className="border-b transition hover:bg-sky-50"
                    >
                      <td className="p-4 font-semibold whitespace-nowrap">
                        INV-
                        {new Date(order.created_at)
                          .toISOString()
                          .slice(0, 10)
                          .replace(/-/g, "")}
                        -{String(order.id).padStart(4, "0")}
                      </td>

                      <td className="p-4">
                        <div className="font-semibold">
                          {order.customer_name ?? "-"}
                        </div>

                        <div className="text-xs text-gray-500">
                          {order.customer_address ?? "-"}
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {order.customer_phone ?? "-"}
                      </td>

                      <td className="p-4 font-semibold text-sky-700 whitespace-nowrap">
                        {rupiah.format(Number(order.total_price ?? 0))}
                      </td>

                      <td className="p-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
                          >
                            {order.status ?? "-"}
                          </span>

                          <OrderStatusSelect
                            orderId={order.id}
                            currentStatus={order.status}
                          />
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                        {order.created_at
                          ? dateFormatter.format(new Date(order.created_at))
                          : "-"}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-800"
                          >
                            Detail
                          </Link>

                          {order.customer_phone && (
                            <a
                              href={`https://wa.me/${String(
                                order.customer_phone,
                              ).replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
                            >
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <ShoppingCart
                      size={52}
                      className="mx-auto mb-4 text-gray-300"
                    />

                    <h3 className="text-lg font-semibold">Belum ada pesanan</h3>

                    <p className="mt-2 text-gray-500">
                      Pesanan pelanggan akan muncul di halaman ini.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Halaman {page} dari {totalPages}
          </p>

          <div className="flex gap-2">
            <Link
              href={`/admin/orders?page=${Math.max(
                page - 1,
                1,
              )}&q=${encodeURIComponent(keyword)}&status=${status}`}
              className={`rounded-lg border px-4 py-2 ${
                page === 1
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-gray-50"
              }`}
            >
              Sebelumnya
            </Link>

            <Link
              href={`/admin/orders?page=${Math.min(
                page + 1,
                totalPages,
              )}&q=${encodeURIComponent(keyword)}&status=${status}`}
              className={`rounded-lg border px-4 py-2 ${
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-gray-50"
              }`}
            >
              Berikutnya
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
