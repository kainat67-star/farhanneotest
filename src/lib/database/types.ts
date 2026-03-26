/** Supported ad platforms (matches DB CHECK constraints). */
export type AdPlatform =
  | "google_ads"
  | "meta_ads"
  | "tiktok_ads"
  | "snapchat_ads"
  | "x_ads";

export type AdAccountRow = {
  id: string;
  user_id: string;
  platform: AdPlatform;
  account_id: string;
  account_name: string;
  access_token: string | null;
  refresh_token: string | null;
  created_at: string;
};

export type AdAccountInsert = {
  id?: string;
  user_id: string;
  platform: AdPlatform;
  account_id: string;
  account_name: string;
  access_token?: string | null;
  refresh_token?: string | null;
  created_at?: string;
};

export type AdAccountUpdate = Partial<Omit<AdAccountRow, "id" | "user_id">>;

export type CampaignRow = {
  id: string;
  user_id: string;
  platform: AdPlatform;
  account_id: string;
  campaign_id: string;
  campaign_name: string;
  status: string;
  daily_budget: number | null;
  created_at: string;
};

export type CampaignInsert = {
  id?: string;
  user_id: string;
  platform: AdPlatform;
  account_id: string;
  campaign_id: string;
  campaign_name: string;
  status: string;
  daily_budget?: number | null;
  created_at?: string;
};

export type CampaignMetricRow = {
  id: string;
  campaign_id: string;
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number | null;
  cpa: number | null;
  roas: number | null;
};

export type CampaignMetricInsert = {
  id?: string;
  campaign_id: string;
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr?: number | null;
  cpa?: number | null;
  roas?: number | null;
};

export type CampaignMetricUpdate = Partial<
  Omit<CampaignMetricRow, "id" | "campaign_id">
>;

/** Supabase generated types hook — use with `createClient<Database>()`. */
export type Database = {
  public: {
    Tables: {
      ad_accounts: {
        Row: AdAccountRow;
        Insert: AdAccountInsert;
        Update: AdAccountUpdate;
        Relationships: [];
      };
      campaigns: {
        Row: CampaignRow;
        Insert: CampaignInsert;
        Update: Partial<CampaignInsert>;
        Relationships: [];
      };
      campaign_metrics: {
        Row: CampaignMetricRow;
        Insert: CampaignMetricInsert;
        Update: CampaignMetricUpdate;
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
