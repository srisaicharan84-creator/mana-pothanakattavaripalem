import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = "citizen" | "admin";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // 1. Read the profile row for this user
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  // 2. Ask the database directly whether this user is an admin
  //    (uses your is_admin() SQL function)
  const { data: isAdminResult, error: rpcError } =
    await supabase.rpc("is_admin");

  // 3. Print everything to the browser console so problems are visible
  console.log("[profile] auth user id:", user.id);
  console.log("[profile] row from database:", profile);
  console.log("[profile] is_admin() result:", isAdminResult);
  if (profileError) {
    console.error("[profile] profiles read error:", profileError.message);
  }
  if (rpcError) {
    console.error("[profile] is_admin() error:", rpcError.message);
  }

  // 4. Decide the role: admin if the row says "admin" OR is_admin() says true
  const roleFromRow = String(profile?.role ?? "")
    .trim()
    .toLowerCase();
  const role: UserRole =
    roleFromRow === "admin" || isAdminResult === true ? "admin" : "citizen";

  return {
    id: user.id,
    full_name:
      profile?.full_name ||
      (user.user_metadata?.full_name as string | undefined) ||
      "Resident",
    email: profile?.email || user.email || "",
    role,
  };
}