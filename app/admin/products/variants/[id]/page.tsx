import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { updateVariant } from "../actions";

export default async function EditVariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: variant } = await supabaseAdmin
    .from("product_variants")
    .select(
      `
      *,
      products(name)
    `,
    )
    .eq("id", Number(id))
    .single();

  if (!variant) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Varian Ayam</h1>

          <p className="text-gray-500">{variant.products?.name}</p>
        </div>

        <Link
          href="/admin/products/variants"
          className="rounded-xl border px-5 py-3 hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <form
          action={updateVariant.bind(null, variant.id)}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">Jenis</label>

            <select
              name="variant_type"
              defaultValue={variant.variant_type}
              className="w-full rounded-xl border p-3"
            >
              <option value="Fresh">Fresh</option>

              <option value="Frozen">Frozen</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">Berat</label>

            <input
              name="weight"
              defaultValue={variant.weight}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Harga</label>

              <input
                type="number"
                name="price"
                defaultValue={variant.price}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Stok</label>

              <input
                type="number"
                name="stock"
                defaultValue={variant.stock}
                className="w-full rounded-xl border p-3"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
