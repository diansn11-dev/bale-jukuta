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
    <header className="rounded-3xl bg-white p-6 shadow-sm border">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-sky-700">
            Selamat Datang, {adminName} 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Kelola produk, pesanan, pelanggan, dan laporan Bale Juku' Ta' dari
            satu dashboard.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm text-sky-700">
            <CalendarDays size={16} />
            {today}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-emerald-700
            "
          >
            <Plus size={18} />
            Tambah Produk
          </Link>

          <Link
            href="/admin/orders"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-sky-700
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-sky-800
            "
          >
            <ShoppingCart size={18} />
            Kelola Pesanan
          </Link>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
