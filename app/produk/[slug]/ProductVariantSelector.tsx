"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

type Variant = {
  id: number;
  weight: string;
  price: number;
  stock: number;
};

type Props = {
  product: {
    id: number;
    name: string;
    image: string;
  };

  variants: Variant[];
};

export default function ProductVariantSelector({ product, variants }: Props) {
  const [selected, setSelected] = useState<Variant | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-bold text-gray-800">
          Pilih Berat Ayam
        </h3>

        <div className="space-y-3">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelected(variant)}
              className={`
                flex w-full items-center justify-between
                rounded-xl border p-4
                transition

                ${
                  selected?.id === variant.id
                    ? "border-sky-600 bg-sky-50"
                    : "bg-white hover:bg-gray-50"
                }
              `}
            >
              <div className="text-left">
                <div className="font-semibold">{variant.weight}</div>

                <div className="text-sm text-gray-500">
                  Stok {variant.stock} ekor
                </div>
              </div>

              <div className="font-bold text-sky-700">
                Rp {variant.price.toLocaleString("id-ID")}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <AddToCartButton
          id={product.id}
          variantId={selected.id}
          weight={selected.weight}
          name={product.name}
          image={product.image}
          price={selected.price}
          stock={selected.stock}
        />
      )}
    </div>
  );
}
