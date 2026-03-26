import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SITE_NAME } from "@/lib/brand";

export function PublicLegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 px-4 py-4 sm:px-5 md:px-8">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
            <Activity className="h-4 w-4 text-primary" strokeWidth={2.2} />
          </span>
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-5 sm:py-10 md:px-8 md:py-14">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground break-words sm:mb-8 sm:text-3xl">
          {title}
        </h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed break-words [&_strong]:text-foreground [&_strong]:font-semibold">
          {children}
        </div>
      </main>
    </div>
  );
}
