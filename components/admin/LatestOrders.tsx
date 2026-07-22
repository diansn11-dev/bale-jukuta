"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  ShoppingBag,
} from "lucide-react";

type Order = {
  id: number;
  customer_name?: string | null;
  total_price?: number | string | null;
  status?: string | null;
  created_at?: string | null;
};

type Props = {
  orders: Order[];
};

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function LatestOrders({ orders }: Props) {
  function price(value: any) {
    return currency.format(Number(value ?? 0));
  }

  function date(value?: string | null) {
    if (!value) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  }

  function status(value?: string | null) {
    switch (value) {
      case "pending":
        return {
          text: "Pending",
          icon: Clock3,
          color: "bg-yellow-100 text-yellow-700",
        };

      case "diproses":
      case "processing":
        return {
          text: "Diproses",
          icon: PackageCheck,
          color: "bg-blue-100 text-blue-700",
        };

      case "dikirim":
      case "shipped":
        return {
          text: "Dikirim",
          icon: Truck,
          color: "bg-purple-100 text-purple-700",
        };

      case "completed":
      case "selesai":
        return {
          text: "Selesai",
          icon: CheckCircle2,
          color: "bg-green-100 text-green-700",
        };

      case "cancelled":
      case "dibatalkan":
        return {
          text: "Batal",
          icon: XCircle,
          color: "bg-red-100 text-red-700",
        };

      default:
        return {
          text: "-",
          icon: Clock3,
          color: "bg-gray-100 text-gray-600",
        };
    }
  }

  return (
    <section
      className="
rounded-2xl
border
bg-white
p-4
shadow-sm

md:p-6
"
    >
      {/* HEADER */}

      <div
        className="
mb-5
flex
items-center
justify-between
"
      >
        <div>
          <h2
            className="
text-lg
font-bold
text-gray-800
"
          >
            Pesanan Terbaru
          </h2>

          <p
            className="
text-sm
text-gray-500
"
          >
            Order pelanggan terbaru
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="
flex
items-center
gap-1
text-sm
font-semibold
text-sky-700
"
        >
          Lihat
          <ArrowRight size={16} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div
          className="
py-10
text-center
text-gray-500
"
        >
          <ShoppingBag size={40} className="mx-auto mb-3" />
          Belum ada pesanan
        </div>
      ) : (
        <>
          {/* MOBILE CARD */}

          <div
            className="
space-y-3
md:hidden
"
          >
            {orders.slice(0, 10).map((order) => (
              <div
                key={order.id}
                className="
rounded-xl
border
p-4
"
              >
                <div
                  className="
flex
justify-between
"
                >
                  <div>
                    <h3
                      className="
font-semibold
text-gray-800
"
                    >
                      {order.customer_name ?? "Pelanggan"}
                    </h3>

                    <p
                      className="
text-xs
text-gray-400
"
                    >
                      {date(order.created_at)}
                    </p>
                  </div>

                  <span
                    className="
font-bold
text-sky-700
"
                  >
                    {price(order.total_price)}
                  </span>
                </div>

                <div className="mt-3">
                  {(() => {
                    const s = status(order.status);
                    const Icon = s.icon;

                    return (
                      <span
                        className={`
inline-flex
items-center
gap-2
rounded-full
px-3
py-1
text-xs
font-medium

${s.color}
`}
                      >
                        <Icon size={14} />

                        {s.text}
                      </span>
                    );
                  })()}
                </div>

                <Link
                  href={`/admin/orders/${order.id}`}
                  className="
mt-3
flex
items-center
justify-center
gap-2

rounded-lg

bg-sky-700
py-2

text-sm
font-semibold
text-white
"
                >
                  Detail
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE */}

          <div
            className="
hidden
overflow-x-auto
md:block
"
          >
            <table
              className="
w-full
text-sm
"
            >
              <thead>
                <tr
                  className="
border-b
text-left
text-gray-500
"
                >
                  <th className="py-3">Pelanggan</th>

                  <th>Total</th>

                  <th>Status</th>

                  <th>Tanggal</th>

                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 10).map((order) => {
                  const s = status(order.status);
                  const Icon = s.icon;

                  return (
                    <tr
                      key={order.id}
                      className="
border-b
hover:bg-sky-50
"
                    >
                      <td className="py-4 font-medium">
                        {order.customer_name ?? "Pelanggan"}
                      </td>

                      <td>{price(order.total_price)}</td>

                      <td>
                        <span
                          className={`
inline-flex
items-center
gap-2
rounded-full
px-3
py-1
text-xs

${s.color}
`}
                        >
                          <Icon size={14} />

                          {s.text}
                        </span>
                      </td>

                      <td className="text-gray-500">
                        {date(order.created_at)}
                      </td>

                      <td className="text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="
rounded-lg
bg-sky-700
px-3
py-2
text-xs
font-semibold
text-white
"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
