import Link from "next/link";
import { MapPin, Phone, Clock, Fish } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-slate-900 text-gray-300">
      <div className="mx-auto max-w-7xl max-w-7xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Fish className="h-7 w-7 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">
                Bale Juku&apos; Ta&apos;
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Menyediakan ikan segar dan frozen berkualitas dengan harga
              terjangkau untuk kebutuhan rumah tangga, restoran, dan usaha
              kuliner.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Menu</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  href="/produk"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Produk
                </Link>
              </li>

              <li>
                <Link
                  href="/tentang"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>

              <li>
                <Link
                  href="/kontak"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Informasi</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-cyan-400" />
                <span>Jl Kapasa Raya</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-400" />
                <span>081511202275</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-cyan-400" />
                <span>Setiap Hari • 07.00 - 20.00 WITA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Bale Juku&apos; Ta&apos;. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
