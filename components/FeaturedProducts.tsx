import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section
      className="
    mx-auto
    max-w-7xl
    px-4
    py-10
    sm:px-6
    sm:py-16
  "
    >
      <h2
        className="
    mb-3
    text-2xl
    font-bold
    text-center
    sm:text-3xl
  "
      >
        Produk Terlaris
      </h2>

      <p className="text-center text-gray-600 mb-10">
        Pilihan ikan favorit pelanggan Bale Juku' Ta'.
      </p>

      <div
        className="
    grid
    grid-cols-2
    gap-3
    sm:gap-5
    lg:grid-cols-3
  "
      >
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
