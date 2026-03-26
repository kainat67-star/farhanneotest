import { getSupabase } from "@/lib/supabaseClient";
import type { AdAccountRow } from "@/lib/database/types";

export async function getUserAdAccounts(userId: string): Promise<AdAccountRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("ad_accounts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdAccountRow[];
}
