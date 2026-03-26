import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { tryGetSupabase } from "@/lib/supabaseClient";

type AuthState = {
  currentUser: User | null;
  /** Same as `currentUser?.id` — use as `user_id` for Supabase queries. */
  userId: string | null;
  loading: boolean;
};

const AuthStateContext = createContext<AuthState | null>(null);

/**
 * Single Supabase auth listener for the app. Wrap the tree inside `BrowserRouter` if children use routing.
 */
export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = tryGetSupabase();
    if (!supabase) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      userId: currentUser?.id ?? null,
      loading,
    }),
    [currentUser, loading],
  );

  return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
}

/**
 * `userId` / `currentUser.id` is the `user_id` for RLS-backed tables (`ad_accounts`, `campaigns`, etc.).
 */
// eslint-disable-next-line react-refresh/only-export-components -- hook + provider pair
export function useAuth(): AuthState {
  const ctx = useContext(AuthStateContext);
  if (!ctx) {
    throw new Error("useAuth must be used within SupabaseAuthProvider");
  }
  return ctx;
}
