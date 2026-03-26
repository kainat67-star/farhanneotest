import { getSupabase } from "@/lib/supabaseClient";
import type { CampaignMetricInsert, CampaignMetricRow, CampaignRow } from "@/lib/database/types";

export async function getCampaigns(userId: string): Promise<CampaignRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CampaignRow[];
}

export async function getCampaignMetrics(campaignId: string): Promise<CampaignMetricRow[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("campaign_metrics")
    .select("*")
    .eq("campaign_id", campaignId)
    .order("date", { ascending: true });

  if (error) throw error;
  return (data ?? []) as CampaignMetricRow[];
}

export async function insertCampaignMetrics(
  data: CampaignMetricInsert,
): Promise<CampaignMetricRow> {
  const supabase = getSupabase();
  const { data: row, error } = await supabase
    .from("campaign_metrics")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return row as CampaignMetricRow;
}
