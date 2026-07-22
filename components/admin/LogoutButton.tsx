"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");

    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="
      bg-red-500
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-red-600
      "
    >
      Logout
    </button>
  );
}
