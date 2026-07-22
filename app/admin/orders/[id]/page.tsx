import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Package,
  CheckCircle2,
} from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase-admin";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const orderId = Number(id);

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
 *,
 order_items(
    id,
    product_name,
    quantity,
    price,
    subtotal
 )
`,
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return (
      <div className="rounded-xl bg-white p-6">Pesanan tidak ditemukan</div>
    );
  }

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
          <div>
            <h1
              className="
text-3xl
font-bold
text-sky-700
"
            >
              Detail Pesanan #{order.id}
            </h1>

            <p className="mt-2 text-gray-500">Informasi transaksi pelanggan</p>
          </div>

          <Link
            href="/admin/orders"
            className="
flex
items-center
gap-2
rounded-xl
border
px-4
py-3
"
          >
            <ArrowLeft size={18} />
            Kembali
          </Link>
        </div>
      </section>

      {/* CUSTOMER */}

      <section
        className="
grid
gap-5
md:grid-cols-3
"
      >
        <div className="rounded-2xl bg-white border p-5">
          <User className="text-sky-700" />

          <h3 className="mt-3 font-bold">Nama</h3>

          <p>{order.customer_name}</p>
        </div>

        <div className="rounded-2xl bg-white border p-5">
          <Phone className="text-sky-700" />

          <h3 className="mt-3 font-bold">WhatsApp</h3>

          <p>{order.customer_phone}</p>
        </div>

        <div className="rounded-2xl bg-white border p-5">
          <MapPin className="text-sky-700" />

          <h3 className="mt-3 font-bold">Alamat</h3>

          <p>{order.customer_address}</p>
        </div>
      </section>

      {/* STATUS */}

      <section
        className="
rounded-2xl
border
bg-white
p-5
"
      >
        <h2 className="mb-3 font-bold">Status Pesanan</h2>

        <OrderStatusSelect orderId={order.id} status={order.status} />
      </section>

      {/* ITEM */}

      <section
        className="
rounded-3xl
border
bg-white
p-6
"
      >
        <div
          className="
flex
items-center
gap-2
mb-5
"
        >
          <Package />

          <h2 className="text-xl font-bold">Produk Dibeli</h2>
        </div>

        <div
          className="
space-y-4
"
        >
          {order.order_items?.map((item: any) => (
            <div
              key={item.id}
              className="
rounded-2xl
bg-gray-50
p-4
"
            >
              <div
                className="
flex
justify-between
"
              >
                <h3 className="font-bold">{item.product_name}</h3>

                <p>{item.quantity} Kg</p>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Harga/Kg: Rp {Number(item.price).toLocaleString("id-ID")}
              </div>

              <div className="font-semibold mt-2">
                Subtotal: Rp {Number(item.subtotal).toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOTAL */}

      <section
        className="
rounded-3xl
bg-sky-700
p-6
text-white
"
      >
        <h2 className="text-xl">Total Pembayaran</h2>

        <p
          className="
mt-2
text-3xl
font-bold
"
        >
          Rp {Number(order.total_price).toLocaleString("id-ID")}
        </p>
      </section>
    </main>
  );
}
