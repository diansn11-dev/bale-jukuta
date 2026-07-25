"use client";

import { useState } from "react";
import { updateChickenVariant } from "../actions";

type Props = {
  id: number;
  price: number;
  stock: number;
};

export default function EditVariantForm({ id, price, stock }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="
        rounded-lg
        bg-sky-600
        px-4
        py-2
        text-white
        "
      >
        Edit
      </button>

      {open && (
        <form
          action={async (formData) => {
            await updateChickenVariant(id, formData);

            setOpen(false);
          }}
          className="
          mt-3
          space-y-3
          rounded-xl
          border
          bg-gray-50
          p-4
          "
        >
          <div>
            <label className="text-sm">Harga</label>

            <input
              name="price"
              type="number"
              defaultValue={price}
              className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              "
            />
          </div>

          <div>
            <label className="text-sm">Stok</label>

            <input
              name="stock"
              type="number"
              defaultValue={stock}
              className="
              w-full
              rounded-lg
              border
              px-3
              py-2
              "
            />
          </div>

          <button
            type="submit"
            className="
            rounded-lg
            bg-green-600
            px-4
            py-2
            text-white
            "
          >
            Simpan
          </button>
        </form>
      )}
    </div>
  );
}
