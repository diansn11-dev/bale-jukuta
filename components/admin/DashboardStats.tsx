"use client";

import {
  Package,
  ShoppingCart,
  Wallet,
  Users,
  Clock3,
  Truck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import StatCard from "./StatCard";

type DashboardStatsProps = {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
};

export default function DashboardStats({
  totalProducts,
  totalOrders,
  totalCustomers,
  totalRevenue,
  todayOrders,
  todayRevenue,
  pendingOrders,
  processingOrders,
  completedOrders,
  cancelledOrders,
}: DashboardStatsProps) {
  return (
    <section
      className="
        grid
        grid-cols-2
        gap-3
        sm:gap-4
        lg:grid-cols-4
        lg:gap-6
      "
    >
      <StatCard
        title="Produk"
        value={totalProducts}
        icon={Package}
        color="bg-blue-100 text-blue-700"
        description="Ikan tersedia"
      />

      <StatCard
        title="Pesanan"
        value={totalOrders}
        icon={ShoppingCart}
        color="bg-indigo-100 text-indigo-700"
        description="Total order"
      />

      <StatCard
        title="Omzet"
        value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
        icon={Wallet}
        color="bg-green-100 text-green-700"
        description="Selesai"
        trend="up"
      />

      <StatCard
        title="Pelanggan"
        value={totalCustomers}
        icon={Users}
        color="bg-purple-100 text-purple-700"
        description="Pelanggan"
      />

      {/* STATUS ORDER */}

      <StatCard
        title="Hari Ini"
        value={todayOrders}
        icon={ShoppingCart}
        color="bg-cyan-100 text-cyan-700"
        description={`Rp ${todayRevenue.toLocaleString("id-ID")}`}
      />

      <StatCard
        title="Pending"
        value={pendingOrders}
        icon={Clock3}
        color="bg-yellow-100 text-yellow-700"
        description="Menunggu"
      />

      <StatCard
        title="Diproses"
        value={processingOrders}
        icon={Truck}
        color="bg-orange-100 text-orange-700"
        description="Berjalan"
      />

      <StatCard
        title="Selesai"
        value={completedOrders}
        icon={CheckCircle2}
        color="bg-emerald-100 text-emerald-700"
        description="Berhasil"
        trend="up"
      />

      <StatCard
        title="Batal"
        value={cancelledOrders}
        icon={XCircle}
        color="bg-red-100 text-red-700"
        description="Dibatalkan"
        trend="down"
      />
    </section>
  );
}
