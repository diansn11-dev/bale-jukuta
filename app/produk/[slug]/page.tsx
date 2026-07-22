import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AddToCartButton from "./AddToCartButton";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/produk" className="text-sky-700 hover:underline">
        ← Kembali ke Produk
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* GAMBAR */}

        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={500}
          className="w-full rounded-2xl object-cover"
        />

        {/* DETAIL */}

        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

          {product.badge && (
            <span className="mt-3 inline-block rounded-full bg-sky-700 px-4 py-1 text-sm text-white">
              {product.badge}
            </span>
          )}

          <p className="mt-5 text-3xl font-bold text-sky-700">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="mt-6 text-gray-600">{product.description}</p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>Kategori:</strong> {product.category}
            </p>

            <p>
              <strong>Stok:</strong> {product.stock} Kg
            </p>

            <p>
              <strong>Rating:</strong> {"⭐".repeat(product.rating)}
            </p>
          </div>

          <AddToCartButton
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            stock={product.stock ?? 0}
          />

          <a
            href={`https://wa.me/62XXXXXXXXXX?text=Saya ingin membeli ${product.name}`}
            target="_blank"
            className="mt-4 block rounded-xl border border-sky-700 py-4 text-center text-sky-700 transition hover:bg-sky-700 hover:text-white"
          >
            Beli via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
