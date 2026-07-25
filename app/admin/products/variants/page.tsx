import { supabase } from "@/lib/supabase";
import EditVariantForm from "./EditVariantForm";

export default async function ChickenVariantsPage() {
  const { data: variants } = await supabase
    .from("product_variants")
    .select(
      `
      id,
      variant_type,
      weight,
      price,
      stock,
      products(
        id,
        name
      )
      `,
    )
    .order("variant_type");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">🐔 Varian Ayam</h1>

        <p className="text-gray-500">Kelola harga, berat dan stok ayam</p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-sky-50">
            <tr>
              <th className="p-4 text-left">Jenis</th>

              <th className="p-4 text-left">Berat</th>

              <th className="p-4 text-left">Harga</th>

              <th className="p-4 text-left">Stok</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {variants?.map((item: any) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-semibold">{item.variant_type}</td>

                <td className="p-4">{item.weight}</td>

                <td className="p-4 font-bold text-sky-700">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>

                <td className="p-4">{item.stock} ekor</td>

                <td className="p-4">
                  <EditVariantForm
                    id={item.id}
                    price={item.price}
                    stock={item.stock}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
