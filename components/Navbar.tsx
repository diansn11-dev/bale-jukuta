"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Fish,
  Info,
  Phone,
  ClipboardCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    {
      name: "Beranda",
      href: "/",
      icon: Home,
    },
    {
      name: "Produk",
      href: "/produk",
      icon: Fish,
    },
    {
      name: "Tentang",
      href: "/tentang",
      icon: Info,
    },
    {
      name: "Kontak",
      href: "/kontak",
      icon: Phone,
    },
    {
      name: "Cek Pesanan",
      href: "/cek-pesanan",
      icon: ClipboardCheck,
    },
  ];

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-sky-700
        text-white
        shadow-lg
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
        "
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
          "
        >
          <Image
            src="/logo.png"
            alt="Bale Juku Ta'"
            width={42}
            height={42}
            className="
              rounded-full
              object-cover
              sm:h-12
              sm:w-12
            "
          />

          <span
            className="
              text-base
              font-bold
              sm:text-xl
            "
          >
            Bale Juku' Ta'
          </span>
        </Link>

        {/* DESKTOP MENU */}

        <div
          className="
            hidden
            items-center
            gap-6
            md:flex
          "
        >
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  hover:text-sky-200
                "
              >
                <Icon size={17} />

                {item.name}
              </Link>
            );
          })}

          {/* CART */}

          <Link
            href="/keranjang"
            className="
              relative
            "
          >
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-xs
                  font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE */}

        <div
          className="
            flex
            items-center
            gap-4
            md:hidden
          "
        >
          <Link href="/keranjang" className="relative">
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-[10px]
                  font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              rounded-lg
              p-1
              hover:bg-sky-600
            "
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      {isOpen && (
        <div
          className="
            border-t
            border-sky-600
            bg-sky-700
            px-4
            py-3
            md:hidden
          "
        >
          <div
            className="
              space-y-1
            "
          >
            {menus.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    hover:bg-sky-600
                  "
                >
                  <Icon size={18} />

                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
