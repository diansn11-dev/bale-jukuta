import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  const supabase = await createClient();

  // ======================
  // CEK LOGIN USER
  // ======================

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // ======================
  // CEK ROLE PROFILE
  // ======================

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  if (profile.role !== "admin") {
    return null;
  }

  return user;
}
