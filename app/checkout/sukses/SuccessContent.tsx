"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <CheckCircle size={70} className="mx-auto mb-5 text-green-500" />

        <h1 className="text-3xl font-bold text-sky-700">Pesanan Berhasil!</h1>

        <p className="mt-4 text-gray-600">
          Terima kasih sudah berbelanja di Bale Juku' Ta'. Pesanan Anda sedang
          diproses.
        </p>

        <div className="my-6 rounded-xl bg-sky-100 p-5">
          <p className="text-gray-600">Nomor Pesanan</p>

          <p className="mt-2 text-3xl font-bold text-sky-700">#{id ?? "-"}</p>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Simpan nomor pesanan ini untuk mengecek status pesanan.
        </p>

        <Link
          href={`/cek-pesanan?id=${id ?? ""}`}
          className="block rounded-xl bg-sky-700 py-3 font-bold text-white transition hover:bg-sky-800"
        >
          Cek Pesanan
        </Link>

        <Link
          href="/produk"
          className="mt-3 block rounded-xl border border-sky-700 py-3 font-bold text-sky-700 transition hover:bg-sky-50"
        >
          Belanja Lagi
        </Link>
      </div>
    </main>
  );
}
