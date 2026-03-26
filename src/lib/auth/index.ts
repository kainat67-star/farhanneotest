import type { AuthError, Session, User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabaseClient";

export type SignUpResult = {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
};

export type SignInResult = {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
};

/**
 * Register a new user. `user.id` is the foreign key for `ad_accounts`, `campaigns`, etc.
 */
export async function signUpUser(email: string, password: string): Promise<SignUpResult> {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });
  return {
    user: data.user,
    session: data.session,
    error,
  };
}

export async function signInUser(email: string, password: string): Promise<SignInResult> {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return {
    user: data.user,
    session: data.session,
    error,
  };
}

export async function signOutUser(): Promise<{ error: AuthError | null }> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * OAuth sign-in with Google (configure provider in Supabase Dashboard → Authentication → Providers).
 * Redirects the browser to Google, then back to `redirectTo`.
 */
export async function signInWithGoogle(redirectTo?: string): Promise<{ error: AuthError | null }> {
  const supabase = getSupabase();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo ?? `${origin}/`,
    },
  });
  return { error };
}

/**
 * Current user from the session (validates JWT with Supabase).
 * Returns `null` if not signed in.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}
