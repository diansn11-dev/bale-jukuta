import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-3">Produk Terlaris</h2>

      <p className="text-center text-gray-600 mb-10">
        Pilihan ikan favorit pelanggan Bale Juku' Ta'.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.slug}
            id={product.id}
            slug={product.slug}
            name={product.name}
            image={product.image}
            price={product.price}
            stock={product.stock}
            category={product.category}
            badge={product.badge}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
}
