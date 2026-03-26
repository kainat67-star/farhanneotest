import { getSupabase } from "@/lib/supabaseClient";
import type { AdAccountRow, AdPlatform } from "@/lib/database/types";

export type ConnectAccountInput = {
  userId: string;
  accountId: string;
  accountName: string;
  /** Placeholder until OAuth is wired */
  accessToken?: string | null;
  refreshToken?: string | null;
};

async function insertAdAccount(
  platform: AdPlatform,
  input: ConnectAccountInput,
): Promise<AdAccountRow> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("ad_accounts")
    .insert({
      user_id: input.userId,
      platform,
      account_id: input.accountId,
      account_name: input.accountName,
      access_token: input.accessToken ?? null,
      refresh_token: input.refreshToken ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as AdAccountRow;
}

/** Placeholder: persists a Google Ads–shaped row (OAuth later). */
export function connectGoogleAds(input: ConnectAccountInput): Promise<AdAccountRow> {
  return insertAdAccount("google_ads", input);
}

/** Placeholder: persists a Meta Ads–shaped row (OAuth later). */
export function connectMetaAds(input: ConnectAccountInput): Promise<AdAccountRow> {
  return insertAdAccount("meta_ads", input);
}

/** Placeholder: persists a TikTok Ads–shaped row (OAuth later). */
export function connectTikTokAds(input: ConnectAccountInput): Promise<AdAccountRow> {
  return insertAdAccount("tiktok_ads", input);
}

/** Optional symmetry for remaining platforms (same table + RLS). */
export function connectSnapchatAds(input: ConnectAccountInput): Promise<AdAccountRow> {
  return insertAdAccount("snapchat_ads", input);
}

export function connectXAds(input: ConnectAccountInput): Promise<AdAccountRow> {
  return insertAdAccount("x_ads", input);
}
