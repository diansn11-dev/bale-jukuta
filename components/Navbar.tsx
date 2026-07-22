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

  return (
    <nav className="sticky top-0 z-50 bg-sky-700 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Bale Juku' Ta'"
            width={90}
            height={90}
            className="rounded-full"
          />

          <span className="text-2xl font-bold">Bale Juku' Ta'</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="flex items-center gap-2 hover:text-sky-200">
            <Home size={18} />
            Beranda
          </Link>

          <Link
            href="/produk"
            className="flex items-center gap-2 hover:text-sky-200"
          >
            <Fish size={18} />
            Produk
          </Link>

          <Link
            href="/tentang"
            className="flex items-center gap-2 hover:text-sky-200"
          >
            <Info size={18} />
            Tentang
          </Link>

          <Link
            href="/kontak"
            className="flex items-center gap-2 hover:text-sky-200"
          >
            <Phone size={18} />
            Kontak
          </Link>

          <Link
            href="/cek-pesanan"
            className="flex items-center gap-2 hover:text-sky-200"
          >
            <ClipboardCheck size={18} />
            Cek Pesanan
          </Link>

          {/* Keranjang */}
          <Link href="/keranjang" className="relative">
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/keranjang" className="relative">
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="border-t border-sky-600 bg-sky-700 md:hidden">
          <Link
            href="/"
            className="block px-6 py-4 hover:bg-sky-600"
            onClick={() => setIsOpen(false)}
          >
            🏠 Beranda
          </Link>

          <Link
            href="/produk"
            className="block px-6 py-4 hover:bg-sky-600"
            onClick={() => setIsOpen(false)}
          >
            🐟 Produk
          </Link>

          <Link
            href="/tentang"
            className="block px-6 py-4 hover:bg-sky-600"
            onClick={() => setIsOpen(false)}
          >
            ℹ️ Tentang
          </Link>

          <Link
            href="/kontak"
            className="block px-6 py-4 hover:bg-sky-600"
            onClick={() => setIsOpen(false)}
          >
            📞 Kontak
          </Link>

          <Link
            href="/cek-pesanan"
            className="block px-6 py-4 hover:bg-sky-600"
            onClick={() => setIsOpen(false)}
          >
            📦 Cek Pesanan
          </Link>
        </div>
      )}
    </nav>
  );
}
