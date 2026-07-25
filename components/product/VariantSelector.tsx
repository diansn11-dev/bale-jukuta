"use client";

import { useState } from "react";

type Variant = {
  id: number;
  variant_name: string;
  price: number;
  stock: number;
};

type Props = {
  variants: Variant[];
  onChange: (variant: Variant) => void;
};

export default function VariantSelector({ variants, onChange }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Pilih Berat Ayam</h3>

      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => {
            setSelected(variant.id);
            onChange(variant);
          }}
          className={`
            flex w-full items-center justify-between
            rounded-xl border p-4
            transition
            ${
              selected === variant.id
                ? "border-sky-700 bg-sky-50"
                : "border-gray-200"
            }
          `}
        >
          <span>{variant.variant_name}</span>

          <span className="font-bold">
            Rp {variant.price.toLocaleString("id-ID")}
          </span>
        </button>
      ))}
    </div>
  );
}
