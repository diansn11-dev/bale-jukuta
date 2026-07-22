"use client";

import { deleteProduct } from "@/app/admin/products/actions";

type Props = {
  id: number;
};

export default function DeleteProductButton({ id }: Props) {
  function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");

    if (!confirmDelete) {
      e.preventDefault();
    }
  }

  return (
    <form action={deleteProduct.bind(null, id)} onSubmit={handleDelete}>
      <button type="submit" className="text-red-600 hover:underline">
        Hapus
      </button>
    </form>
  );
}
