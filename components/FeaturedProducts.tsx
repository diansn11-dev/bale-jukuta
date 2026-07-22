import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-3 text-center text-3xl font-bold">Produk Terlaris</h2>

      <p className="mb-10 text-center text-gray-600">
        Pilihan ikan favorit pelanggan Bale Juku' Ta'.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
