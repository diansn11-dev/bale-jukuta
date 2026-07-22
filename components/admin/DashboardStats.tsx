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
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Produk"
        value={totalProducts}
        icon={Package}
        color="bg-blue-100 text-blue-700"
        description="Produk tersedia"
      />

      <StatCard
        title="Total Pesanan"
        value={totalOrders}
        icon={ShoppingCart}
        color="bg-indigo-100 text-indigo-700"
        description="Seluruh pesanan"
      />

      <StatCard
        title="Total Pelanggan"
        value={totalCustomers}
        icon={Users}
        color="bg-purple-100 text-purple-700"
        description="Pelanggan unik"
      />

      <StatCard
        title="Total Omzet"
        value={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
        icon={Wallet}
        color="bg-green-100 text-green-700"
        description="Pesanan selesai"
        trend="up"
      />

      <StatCard
        title="Pesanan Hari Ini"
        value={todayOrders}
        icon={ShoppingCart}
        color="bg-cyan-100 text-cyan-700"
        description={`Omzet hari ini Rp ${todayRevenue.toLocaleString("id-ID")}`}
      />

      <StatCard
        title="Menunggu Proses"
        value={pendingOrders}
        icon={Clock3}
        color="bg-yellow-100 text-yellow-700"
        description="Status Pending"
      />

      <StatCard
        title="Sedang Diproses"
        value={processingOrders}
        icon={Truck}
        color="bg-orange-100 text-orange-700"
        description="Sedang diproses"
      />

      <StatCard
        title="Pesanan Selesai"
        value={completedOrders}
        icon={CheckCircle2}
        color="bg-emerald-100 text-emerald-700"
        description="Berhasil selesai"
        trend="up"
      />

      <StatCard
        title="Pesanan Dibatalkan"
        value={cancelledOrders}
        icon={XCircle}
        color="bg-red-100 text-red-700"
        description="Order dibatalkan"
        trend="down"
      />
    </section>
  );
}
