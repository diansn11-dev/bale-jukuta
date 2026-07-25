"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteVariant } from "./actions";

type Props = {
  id: number;
};

export default function DeleteVariantButton({ id }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Hapus varian ini?")) return;

    startTransition(async () => {
      await deleteVariant(id);
    });
  }

  return (
    <button onClick={handleDelete} disabled={pending} className="text-red-500">
      <Trash2 size={18} />
    </button>
  );
}
