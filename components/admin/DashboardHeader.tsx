import Link from "next/link";
import { ShoppingCart, Plus, CalendarDays } from "lucide-react";

import LogoutButton from "./LogoutButton";

type Props = {
  adminName?: string;
};

export default function DashboardHeader({ adminName = "Admin" }: Props) {
  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section
      className="
        rounded-2xl
        bg-white
        border
        shadow-sm
        p-4
        md:p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}
        <div>
          <h1
            className="
              text-xl
              font-bold
              text-gray-800

              md:text-2xl
            "
          >
            Selamat Datang, {adminName} 👋
          </h1>

          <p
            className="
              mt-1
              max-w-xl
              text-sm
              text-gray-500
            "
          >
            Kelola produk ikan, pesanan pelanggan, dan laporan Bale Juku' Ta'.
          </p>

          <div
            className="
              mt-3
              inline-flex
              items-center
              gap-2

              rounded-full
              bg-sky-50
              px-3
              py-1.5

              text-xs
              font-medium
              text-sky-700
            "
          >
            <CalendarDays size={15} />

            {today}
          </div>
        </div>

        {/* ACTION */}
        <div
          className="
            flex
            flex-wrap
            gap-2

            lg:justify-end
          "
        >
          <Link
            href="/admin/products/new"
            className="
              flex
              items-center
              gap-2

              rounded-xl
              bg-emerald-600

              px-4
              py-2.5

              text-sm
              font-semibold
              text-white

              transition
              hover:bg-emerald-700
            "
          >
            <Plus size={17} />
            Produk
          </Link>

          <Link
            href="/admin/orders"
            className="
              flex
              items-center
              gap-2

              rounded-xl
              bg-sky-700

              px-4
              py-2.5

              text-sm
              font-semibold
              text-white

              transition
              hover:bg-sky-800
            "
          >
            <ShoppingCart size={17} />
            Pesanan
          </Link>

          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
