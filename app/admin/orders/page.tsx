import Link from "next/link";
import {
  ShoppingBag,
  Clock3,
  PackageCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase-admin";

function getStatus(status: string) {
  switch (status) {
    case "pending":
      return {
        text: "Menunggu",
        color: "bg-yellow-100 text-yellow-700",
        icon: Clock3,
      };

    case "diproses":
      return {
        text: "Diproses",
        color: "bg-blue-100 text-blue-700",
        icon: PackageCheck,
      };

    case "completed":
    case "selesai":
      return {
        text: "Selesai",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle2,
      };

    case "cancelled":
      return {
        text: "Dibatalkan",
        color: "bg-red-100 text-red-700",
        icon: XCircle,
      };

    default:
      return {
        text: status,
        color: "bg-gray-100 text-gray-700",
        icon: Clock3,
      };
  }
}

export default async function OrdersPage() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

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
          Pesanan Pelanggan
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola semua transaksi Bale Juku' Ta'
        </p>
      </section>

      {/* LIST */}

      <section
        className="
grid
gap-5
"
      >
        {orders?.map((order) => {
          const status = getStatus(order.status);

          const Icon = status.icon;

          return (
            <div
              key={order.id}
              className="
rounded-3xl
border
bg-white
p-5
shadow-sm
"
            >
              <div
                className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
"
              >
                {/* DATA */}

                <div>
                  <h2
                    className="
text-lg
font-bold
text-gray-800
"
                  >
                    {order.customer_name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {order.customer_phone}
                  </p>

                  <p className="mt-2 font-semibold">
                    Rp {Number(order.total_price).toLocaleString("id-ID")}
                  </p>
                </div>

                {/* STATUS */}

                <div>
                  <span
                    className={`
inline-flex
items-center
gap-2
rounded-full
px-4
py-2
text-sm
font-semibold
${status.color}
`}
                  >
                    <Icon size={16} />

                    {status.text}
                  </span>
                </div>
              </div>

              <div
                className="
mt-5
flex
flex-col
gap-3
border-t
pt-4
text-sm
text-gray-500
md:flex-row
md:justify-between
"
              >
                <p>📍 {order.customer_address}</p>

                <Link
                  href={`/admin/orders/${order.id}`}
                  className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-sky-700
px-5
py-3
font-semibold
text-white
hover:bg-sky-800
"
                >
                  Detail
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
