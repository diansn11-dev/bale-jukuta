"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Fish,
  ShoppingCart,
  Users,
  BarChart3,
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
          sticky
          top-0
          z-30
          flex
          h-16
          items-center
          justify-between
          bg-white
          px-4
          shadow-sm
          md:hidden
        "
      >
        <h1
          className="
            text-lg
            font-bold
            text-sky-700
          "
        >
          Bale Juku' Ta'
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="
            rounded-xl
            p-2
            hover:bg-gray-100
          "
        >
          <Menu size={25} />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-sm
            md:hidden
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          bg-white
          shadow-xl
          transition-transform
          duration-300

          md:sticky
          md:translate-x-0

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* BRAND */}
        <div
          className="
            flex
            h-20
            items-center
            justify-between
            border-b
            px-6
          "
        >
          <div>
            <h1
              className="
                text-xl
                font-bold
                text-sky-700
              "
            >
              Bale Juku' Ta'
            </h1>

            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>

          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={22} />
          </button>
        </div>

        {/* MENU */}
        <nav
          className="
            flex-1
            space-y-2
            p-5
          "
        >
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => setOpen(false)}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  text-gray-600
                  transition

                  hover:bg-sky-50
                  hover:text-sky-700
                "
              >
                <Icon
                  size={21}
                  className="
                    transition
                    group-hover:scale-110
                  "
                />

                <span
                  className="
                    font-medium
                  "
                >
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div
          className="
            border-t
            p-5
          "
        >
          <p
            className="
              text-xs
              text-gray-400
            "
          >
            © Bale Juku' Ta'
          </p>
        </div>
      </aside>
    </>
  );
}
