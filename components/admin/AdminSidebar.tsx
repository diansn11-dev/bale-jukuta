"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

import {
  LayoutDashboard,
  Fish,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Produk",
    href: "/admin/products",
    icon: Fish,
  },
  {
    name: "Pesanan",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Pelanggan",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Laporan",
    href: "/admin/reports",
    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-sky-700 text-white shadow-xl">
      {/* Header */}
      <div className="border-b border-sky-600 p-6">
        <h1 className="text-2xl font-bold">Bale Juku' Ta'</h1>

        <p className="mt-1 text-sm text-sky-100">Admin Panel</p>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex-1 space-y-1 px-3">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active =
            pathname === menu.href ||
            (menu.href !== "/admin" && pathname.startsWith(menu.href));

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                flex items-center gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                ${
                  active
                    ? "bg-white text-sky-700 font-semibold shadow"
                    : "text-white hover:bg-sky-600"
                }
              `}
            >
              <Icon size={20} />

              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sky-600 p-5">
        <LogoutButton />

        <p className="mt-4 text-center text-xs text-sky-100">
          Bale Juku' Ta'
          <br />
          Admin System v1.0
        </p>
      </div>
    </aside>
  );
}
