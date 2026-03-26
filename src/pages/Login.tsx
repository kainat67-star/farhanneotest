import { useCallback, useState, type FormEvent, type MouseEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Lock,
  Mail,
  Shield,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { signInUser, signInWithGoogle, signOutUser, signUpUser } from "@/lib/auth";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/brand";
import { IntegrationLogos } from "@/components/IntegrationLogos";
import { LoginTrustFooter } from "@/components/LoginTrustFooter";
import { LoginAbstractViz } from "@/components/login/LoginAbstractViz";
import { LoginFloatingStats } from "@/components/login/LoginFloatingStats";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const socialProofCards = [
  {
    icon: BarChart3,
    title: "Unified intelligence",
    body: "ROAS, CPA, and spend across every connected channel in one operational view.",
  },
  {
    icon: Shield,
    title: "Tenant-safe by design",
    body: "Row-level security and scoped credentials keep each workspace isolated.",
  },
  {
    icon: Zap,
    title: "API-first integrations",
    body: "Official platform endpoints—built for auditors and long-term compliance.",
  },
  {
    icon: Globe2,
    title: "Built for global teams",
    body: "Multi-account workflows with timezone-aware reporting patterns.",
  },
] as const;

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function formatAuthError(message: string, code?: string): string {
  const normalized = (code ?? message).toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password. If you are new, create an account first.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Email not confirmed. Check your inbox and confirm your account, then sign in.";
  }
  if (normalized.includes("signup is disabled")) {
    return "Sign-up is disabled in Supabase. Enable Email provider sign-ups in Auth settings.";
  }
  if (normalized.includes("email rate limit exceeded")) {
    return "Too many attempts. Please wait a minute and try again.";
  }
  if (normalized.includes("over_email_send_rate_limit")) {
    return "Too many sign-up emails sent. Please wait a minute before trying again.";
  }

  return message;
}

type LoginLocationState = {
  from?: { pathname: string };
  signupSuccess?: boolean;
};

const inputClass =
  "h-12 rounded-[12px] border-border/70 bg-background/50 pl-11 pr-4 text-[15px] shadow-sm transition-colors focus-visible:ring-primary/30";

const DEFAULT_PANEL_GLOW = { x: 32, y: 38 } as const;

export default function Login() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = (location.state as LoginLocationState | null) ?? {};
  const from = routeState.from?.pathname ?? "/";
  const showSignupSuccess = Boolean(routeState.signupSuccess);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [panelGlow, setPanelGlow] = useState(() => ({ ...DEFAULT_PANEL_GLOW }));

  const handlePanelPointerMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const w = rect.width || 1;
    const h = rect.height || 1;
    setPanelGlow({
      x: ((e.clientX - rect.left) / w) * 100,
      y: ((e.clientY - rect.top) / h) * 100,
    });
  }, []);

  const handlePanelPointerLeave = useCallback(() => {
    setPanelGlow({ x: DEFAULT_PANEL_GLOW.x, y: DEFAULT_PANEL_GLOW.y });
  }, []);

  if (loading) {
    return null;
  }

  if (currentUser) {
    return <Navigate to={from} replace />;
  }

  const handleGoToLogin = () => {
    navigate("/login", {
      replace: true,
      ...(routeState.from ? { state: { from: routeState.from } } : {}),
    });
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const { error: oauthError } = await signInWithGoogle(`${window.location.origin}/`);
      if (oauthError) {
        toast.error("Google sign-in failed", { description: oauthError.message });
        setGoogleLoading(false);
      }
    } catch (err) {
      toast.error("Google sign-in failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await signUpUser(trimmed, password);
        if (signUpError) {
          setError(formatAuthError(signUpError.message, signUpError.code));
          return;
        }

        const { error: signOutError } = await signOutUser();
        if (signOutError) {
          toast.error("Account created, but we couldn't end your session.", {
            description: signOutError.message,
          });
        }
        setMode("signin");
        navigate("/login", {
          replace: true,
          state: {
            from: routeState.from ?? { pathname: from },
            signupSuccess: true,
          },
        });
        return;
      } else {
        const { user, error: signInError } = await signInUser(trimmed, password);
        if (signInError) {
          setError(formatAuthError(signInError.message, signInError.code));
          return;
        }
        if (!user) {
          setError("Could not sign in. Please try again.");
          return;
        }
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Check your Supabase configuration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="login-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden />
      <div className="login-page-grain" aria-hidden />

      <div className="relative z-10 flex w-full flex-1 flex-col lg:flex-row min-h-0">
        {/* Brand + social proof panel */}
        <motion.div
          className="relative flex flex-1 flex-col justify-between overflow-hidden border-b border-border/40 px-4 py-8 sm:px-8 sm:py-10 md:px-12 lg:min-h-0 lg:border-b-0 lg:border-r lg:py-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onMouseMove={handlePanelPointerMove}
          onMouseLeave={handlePanelPointerLeave}
        >
          <div className="login-brand-bg absolute inset-0 -z-20" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-300 ease-out"
            style={{
              background: `radial-gradient(min(720px, 92vw) circle at ${panelGlow.x}% ${panelGlow.y}%, hsl(var(--primary) / 0.15), transparent 56%)`,
            }}
            aria-hidden
          />
          <LoginAbstractViz />

          <div className="relative z-10 flex flex-col gap-10">
            <Link to="/login" className="inline-flex items-center gap-3 w-fit group">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25 shadow-lg shadow-primary/10">
                <Activity className="h-5 w-5 text-primary" strokeWidth={2.2} />
                <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-60" />
              </div>
              <div>
                <span className="block text-lg font-bold tracking-tight leading-none">{SITE_NAME}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {SITE_TAGLINE}
                </span>
              </div>
            </Link>

            <div className="relative z-10 w-full min-h-[200px] sm:min-h-[220px]">
              <LoginFloatingStats />
              <div className="relative z-10 max-w-lg space-y-4">
                <motion.h1
                  className="relative text-[1.65rem] font-extrabold leading-[1.12] tracking-tight sm:text-3xl sm:leading-[1.1] lg:text-4xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.45 }}
                >
                  <span className="clarity-glow-breathe inline-block">
                    <span className="gradient-text">Clarity</span>
                  </span>
                  <span className="text-foreground"> for every ad dollar.</span>
                </motion.h1>
                <p className="text-sm text-muted-foreground leading-relaxed">{SITE_DESCRIPTION}</p>
              </div>
            </div>

            <section aria-labelledby="social-proof-heading" className="max-w-xl">
              <h2 id="social-proof-heading" className="sr-only">
                Why teams choose Lumina
              </h2>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Trusted operations
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {socialProofCards.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    className="login-social-proof-card"
                  >
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section aria-labelledby="integrations-heading" className="max-w-2xl">
              <h2 id="integrations-heading" className="sr-only">
                Supported integrations
              </h2>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-4">
                Supported integrations
              </p>
              <IntegrationLogos />
            </section>
          </div>

          <p className="relative z-10 mt-10 text-[11px] text-muted-foreground/80 lg:hidden">
            Crafted for modern growth teams.
          </p>
        </motion.div>

        {/* Form column */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-5 sm:py-12 md:px-10">
          <div className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 flex items-center gap-2 sm:right-8 sm:top-8">
            <ThemeToggle />
          </div>

          <motion.div
            className="w-full max-w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-bold tracking-tight">
                {showSignupSuccess ? "You’re all set" : "Welcome back"}
              </h2>
              {!showSignupSuccess && (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {mode === "signin"
                    ? "Sign in to continue to your workspace."
                    : "Create your account to get started."}
                </p>
              )}
            </div>

            {showSignupSuccess ? (
              <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-primary/12 text-primary ring-1 ring-primary/20">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <p className="text-sm font-semibold text-foreground leading-snug">Account Created Successfully</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your account has been created.
                      <br />
                      Please sign in to continue.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleGoToLogin}
                  className="login-primary-cta h-12 w-full rounded-[12px] border-0 font-semibold text-primary-foreground gap-2 hover:opacity-[0.97]"
                >
                  Go to Login
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={googleLoading || submitting}
                    onClick={() => void handleGoogleSignIn()}
                    className="h-12 w-full rounded-[12px] border-border/60 bg-background/50 text-[15px] font-medium shadow-sm hover:bg-accent/40"
                  >
                    <GoogleGlyph className="mr-3 h-5 w-5 shrink-0" />
                    {googleLoading ? "Connecting…" : "Sign in with Google"}
                  </Button>

                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center" aria-hidden>
                      <span className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
                      <span className="bg-[hsl(var(--card))] px-3 text-muted-foreground">or email</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        aria-hidden
                      />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(inputClass)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Label htmlFor="password" className="text-xs font-medium">
                        Password
                      </Label>
                      <button
                        type="button"
                        className="text-[11px] font-medium text-primary hover:underline"
                        onClick={() => {}}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        aria-hidden
                      />
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cn(inputClass)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={(v) => setRemember(v === true)}
                    />
                    <Label htmlFor="remember" className="text-xs font-normal cursor-pointer leading-none">
                      Keep me signed in on this device
                    </Label>
                  </div>

                  {error && (
                    <p className="text-xs text-destructive font-medium" role="alert">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting || googleLoading}
                    className={cn(
                      "login-primary-cta h-12 w-full rounded-[12px] border-0 font-semibold text-primary-foreground gap-2 shadow-lg hover:opacity-[0.97] disabled:opacity-50",
                      mode === "signin" && "login-cta-shine",
                    )}
                  >
                    {submitting ? (
                      mode === "signin" ? (
                        "Signing in…"
                      ) : (
                        "Creating account…"
                      )
                    ) : (
                      <>
                        {mode === "signin" ? "Enter dashboard" : "Create account"}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode((prev) => (prev === "signin" ? "signup" : "signin"));
                      setError(null);
                    }}
                    className="w-full text-center text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {mode === "signin"
                      ? "New here? Create an account"
                      : "Already have an account? Sign in"}
                  </button>
                </form>
              </div>
            )}

            {!showSignupSuccess && (
              <p className="mt-6 text-center text-[11px] text-muted-foreground leading-relaxed">
                By continuing you agree to our{" "}
                <Link to="/terms" className="login-card-legal-link">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="login-card-legal-link">
                  Privacy Policy
                </Link>
                .
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <LoginTrustFooter />
    </div>
  );
}
