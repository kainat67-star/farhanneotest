import { getSupabase } from "@/lib/supabaseClient";

type MetricAggRow = {
  spend: number | null;
  revenue: number | null;
  conversions: number | null;
  cpa: number | null;
  roas: number | null;
};

/**
 * Fetch metric rows for all campaigns owned by `userId` (RLS also enforces access).
 */
async function fetchMetricsForUser(userId: string): Promise<MetricAggRow[]> {
  const supabase = getSupabase();
  const { data: campaigns, error: campError } = await supabase
    .from("campaigns")
    .select("id")
    .eq("user_id", userId);

  if (campError) throw campError;
  const ids = (campaigns ?? []).map((c) => c.id);
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("campaign_metrics")
    .select("spend, revenue, conversions, cpa, roas")
    .in("campaign_id", ids);

  if (error) throw error;
  return (data ?? []) as MetricAggRow[];
}

function num(v: number | null | undefined): number {
  if (v === null || v === undefined) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function getTotalSpend(userId: string): Promise<number> {
  const rows = await fetchMetricsForUser(userId);
  return rows.reduce((sum, r) => sum + num(r.spend), 0);
}

export async function getTotalRevenue(userId: string): Promise<number> {
  const rows = await fetchMetricsForUser(userId);
  return rows.reduce((sum, r) => sum + num(r.revenue), 0);
}

export async function getTotalConversions(userId: string): Promise<number> {
  const rows = await fetchMetricsForUser(userId);
  return rows.reduce((sum, r) => sum + num(r.conversions), 0);
}

/**
 * Simple mean of non-null CPA values across metric rows for the user.
 */
export async function getAverageCPA(userId: string): Promise<number | null> {
  const rows = await fetchMetricsForUser(userId);
  const cpas = rows.map((r) => r.cpa).filter((c): c is number => c !== null && c !== undefined);
  if (cpas.length === 0) return null;
  const sum = cpas.reduce((a, c) => a + num(c), 0);
  return sum / cpas.length;
}

/**
 * Revenue / spend across all fetched rows (portfolio ROAS). Returns null if spend is 0.
 */
export async function getROAS(userId: string): Promise<number | null> {
  const rows = await fetchMetricsForUser(userId);
  const spend = rows.reduce((sum, r) => sum + num(r.spend), 0);
  const revenue = rows.reduce((sum, r) => sum + num(r.revenue), 0);
  if (spend === 0) return null;
  return revenue / spend;
}
