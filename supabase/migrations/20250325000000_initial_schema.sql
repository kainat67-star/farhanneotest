-- Lumina / Ads Analytics — core schema + RLS
-- Apply in Supabase SQL editor or via Supabase CLI: supabase db push

-- ---------------------------------------------------------------------------
-- ad_accounts: connected ad platform accounts (OAuth tokens stored here later)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ad_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (
    platform IN (
      'google_ads',
      'meta_ads',
      'tiktok_ads',
      'snapchat_ads',
      'x_ads'
    )
  ),
  account_id text NOT NULL,
  account_name text NOT NULL,
  access_token text,
  refresh_token text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, platform, account_id)
);

CREATE INDEX IF NOT EXISTS ad_accounts_user_id_idx ON public.ad_accounts (user_id);

-- ---------------------------------------------------------------------------
-- campaigns
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (
    platform IN (
      'google_ads',
      'meta_ads',
      'tiktok_ads',
      'snapchat_ads',
      'x_ads'
    )
  ),
  account_id text NOT NULL,
  campaign_id text NOT NULL,
  campaign_name text NOT NULL,
  status text NOT NULL DEFAULT 'unknown',
  daily_budget numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, platform, campaign_id)
);

CREATE INDEX IF NOT EXISTS campaigns_user_id_idx ON public.campaigns (user_id);

-- ---------------------------------------------------------------------------
-- campaign_metrics (daily or rolled-up rows per campaign)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.campaign_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES public.campaigns (id) ON DELETE CASCADE,
  date date NOT NULL,
  spend numeric NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  clicks integer NOT NULL DEFAULT 0,
  conversions integer NOT NULL DEFAULT 0,
  revenue numeric NOT NULL DEFAULT 0,
  ctr numeric,
  cpa numeric,
  roas numeric,
  UNIQUE (campaign_id, date)
);

CREATE INDEX IF NOT EXISTS campaign_metrics_campaign_id_idx ON public.campaign_metrics (campaign_id);
CREATE INDEX IF NOT EXISTS campaign_metrics_date_idx ON public.campaign_metrics (date);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE public.ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_metrics ENABLE ROW LEVEL SECURITY;

-- ad_accounts: only owning user
CREATE POLICY "ad_accounts_select_own" ON public.ad_accounts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "ad_accounts_insert_own" ON public.ad_accounts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "ad_accounts_update_own" ON public.ad_accounts
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "ad_accounts_delete_own" ON public.ad_accounts
  FOR DELETE USING (user_id = auth.uid());

-- campaigns: only owning user
CREATE POLICY "campaigns_select_own" ON public.campaigns
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "campaigns_insert_own" ON public.campaigns
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "campaigns_update_own" ON public.campaigns
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "campaigns_delete_own" ON public.campaigns
  FOR DELETE USING (user_id = auth.uid());

-- campaign_metrics: via parent campaign ownership
CREATE POLICY "campaign_metrics_select_own" ON public.campaign_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.id = campaign_metrics.campaign_id
        AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "campaign_metrics_insert_own" ON public.campaign_metrics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.id = campaign_metrics.campaign_id
        AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "campaign_metrics_update_own" ON public.campaign_metrics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.id = campaign_metrics.campaign_id
        AND c.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.id = campaign_metrics.campaign_id
        AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "campaign_metrics_delete_own" ON public.campaign_metrics
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.id = campaign_metrics.campaign_id
        AND c.user_id = auth.uid()
    )
  );
