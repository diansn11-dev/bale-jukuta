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
  const stats = [
    {
      title: "Produk",
      value: totalProducts,
      desc: "Ikan tersedia",
      icon: Package,
      color: "blue",
    },

    {
      title: "Pesanan",
      value: totalOrders,
      desc: "Total order",
      icon: ShoppingCart,
      color: "indigo",
    },

    {
      title: "Pelanggan",
      value: totalCustomers,
      desc: "Customer",
      icon: Users,
      color: "purple",
    },

    {
      title: "Omzet",
      value: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
      desc: "Selesai",
      icon: Wallet,
      color: "green",
    },

    {
      title: "Hari Ini",
      value: todayOrders,
      desc: `Rp ${todayRevenue.toLocaleString("id-ID")}`,
      icon: ShoppingCart,
      color: "cyan",
    },

    {
      title: "Pending",
      value: pendingOrders,
      desc: "Menunggu",
      icon: Clock3,
      color: "yellow",
    },

    {
      title: "Diproses",
      value: processingOrders,
      desc: "Berjalan",
      icon: Truck,
      color: "orange",
    },

    {
      title: "Selesai",
      value: completedOrders,
      desc: "Berhasil",
      icon: CheckCircle2,
      color: "emerald",
    },

    {
      title: "Batal",
      value: cancelledOrders,
      desc: "Dibatalkan",
      icon: XCircle,
      color: "red",
    },
  ];

  return (
    <section
      className="
        grid
        grid-cols-2
        gap-3

        md:grid-cols-3

        xl:grid-cols-4

        md:gap-5
      "
    >
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </section>
  );
}
