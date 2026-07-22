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
      {/* MOBILE HEADER */}

      <div
        className="
  sticky
  top-0
  z-30
  flex
  h-14
  items-center
  justify-between
  bg-white
  px-4
  shadow
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
            rounded-lg
            p-2
            hover:bg-gray-100
          "
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY MOBILE */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
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
          h-screen
          w-64
          bg-white
          shadow-xl
          transition-transform
          duration-300

          md:static
          md:translate-x-0

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER SIDEBAR */}

        <div
          className="
          flex
          items-center
          justify-between
          border-b
          p-5
        "
        >
          <h1
            className="
            text-xl
            font-bold
            text-sky-700
          "
          >
            Bale Juku' Ta'
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="
              md:hidden
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* MENU */}

        <nav
          className="
          space-y-2
          p-4
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
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-gray-700
                  transition
                  hover:bg-sky-50
                  hover:text-sky-700
                "
              >
                <Icon size={20} />

                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
