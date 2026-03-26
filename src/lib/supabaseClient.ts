import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database/types";

/**
 * Accept both Vite and Next-style public env names.
 * Vite only exposes NEXT_PUBLIC_* if `envPrefix` includes it (set in vite.config.ts).
 */
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient<Database> | null = null;

function assertEnv(): { url: string; key: string } {
  if (!supabaseUrl?.trim() || !supabaseAnonKey?.trim()) {
    throw new Error(
      "Missing Supabase env: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_* equivalents). See .env.example.",
    );
  }
  return { url: supabaseUrl, key: supabaseAnonKey };
}

/**
 * Lazily creates and returns the typed Supabase browser client.
 * Call only after env vars are available (e.g. in browser or tests with mocks).
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!client) {
    const { url, key } = assertEnv();
    client = createClient<Database>(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

/** Reset singleton (e.g. tests). */
export function resetSupabaseClientForTests(): void {
  client = null;
}

/** Returns `null` if env is not configured (avoids throwing during auth bootstrap). */
export function tryGetSupabase(): SupabaseClient<Database> | null {
  try {
    return getSupabase();
  } catch {
    return null;
  }
}
