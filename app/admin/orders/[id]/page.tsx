import { notFound } from "next/navigation";
import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase-admin";
import OrderStatusSelect from "@/components/OrderStatusSelect";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number | null;
  price: number | null;
  subtotal: number | null;
};

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      *,
      order_items (
        *
      )
      `,
    )
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  function statusStyle(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function statusText(status: string) {
    switch (status) {
      case "pending":
        return "Menunggu Diproses";

      case "processed":
        return "Sedang Diproses";

      case "shipped":
        return "Sedang Dikirim";

      case "completed":
        return "Selesai";

      case "cancelled":
        return "Dibatalkan";

      default:
        return status;
    }
  }

  return (
    <main
      className="
        mx-auto
        max-w-6xl
        space-y-8
        p-10
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              text-sky-700
            "
          >
            Detail Pesanan #{order.id}
          </h1>

          <p className="text-gray-500">Informasi lengkap transaksi pelanggan</p>
        </div>

        <Link
          href="/admin/orders"
          className="
            rounded-xl
            border
            px-5
            py-3
            hover:bg-gray-50
          "
        >
          Kembali
        </Link>
      </div>

      {/* DATA PEMBELI */}

      <section
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow
        "
      >
        <h2
          className="
            mb-5
            text-2xl
            font-bold
          "
        >
          Data Pembeli
        </h2>

        <div className="space-y-3">
          <p>
            <b>Nama :</b> {order.customer_name ?? "-"}
          </p>

          <p>
            <b>WhatsApp :</b> {order.customer_phone ?? "-"}
          </p>

          <p>
            <b>Alamat :</b> {order.customer_address ?? "-"}
          </p>

          <p>
            <b>Status :</b>{" "}
            <span
              className={`
                rounded-full
                px-3
                py-1
                text-sm
                font-semibold
                ${statusStyle(order.status ?? "")}
              `}
            >
              {statusText(order.status ?? "")}
            </span>
          </p>

          <p>
            <b>Catatan :</b> {order.note || "-"}
          </p>

          <p>
            <b>Tanggal :</b>{" "}
            {new Date(order.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p>
            <b>Jam :</b>{" "}
            {new Date(order.created_at).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            WITA
          </p>
        </div>
      </section>

      {/* UPDATE STATUS */}

      <section>
        <h2
          className="
            mb-3
            text-xl
            font-bold
          "
        >
          Update Status Pesanan
        </h2>

        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </section>

      {/* PRODUK */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
          shadow
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-700 text-white">
              <tr>
                <th className="p-4 text-left">Produk</th>

                <th className="p-4 text-center">Qty</th>

                <th className="p-4 text-right">Harga</th>

                <th className="p-4 text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {order.order_items && order.order_items.length > 0 ? (
                (order.order_items as OrderItem[]).map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4 font-medium">{item.product_name}</td>

                    <td className="p-4 text-center">{item.quantity ?? 1} Kg</td>

                    <td className="p-4 text-right">
                      Rp {Number(item.price ?? 0).toLocaleString("id-ID")}
                    </td>

                    <td className="p-4 text-right font-bold">
                      Rp {Number(item.subtotal ?? 0).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="
                      p-8
                      text-center
                      text-gray-500
                    "
                  >
                    Tidak ada produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* TOTAL */}

      <div
        className="
          flex
          justify-end
        "
      >
        <div
          className="
            rounded-xl
            bg-sky-700
            px-8
            py-5
            text-white
          "
        >
          <p className="text-xl font-bold">Total :</p>

          <p className="text-3xl font-bold">
            Rp {Number(order.total_price ?? 0).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </main>
  );
}
