import { supabaseAdmin } from "@/lib/supabase-admin";
import DeleteVariantButton from "./DeleteVariantButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VariantPage({ params }: Props) {
  const { id } = await params;

  const { data: variants } = await supabaseAdmin
    .from("product_variants")
    .select("*")
    .eq("product_id", Number(id));

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Variant Produk</h1>

      <div className="space-y-3">
        {variants?.map((variant) => (
          <div
            key={variant.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <p className="font-semibold">{variant.variant_name}</p>

              <p>
                Rp
                {variant.price.toLocaleString()}
              </p>
            </div>

            <DeleteVariantButton id={variant.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
