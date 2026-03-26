/**
 * Decorative glass mini-stats behind the login hero headline (pointer-events: none).
 */
export function LoginFloatingStats() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-visible select-none" aria-hidden>
      <div className="login-floating-stat login-floating-stat--1 top-[8%] left-[2%] sm:left-[6%]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">Blended</p>
        <p className="text-sm font-bold tabular-nums tracking-tight text-foreground/88">ROAS 4.2×</p>
        <p className="text-[9px] text-muted-foreground/55">Last 30d</p>
      </div>
      <div className="login-floating-stat login-floating-stat--2 top-[4%] right-[4%] sm:right-[12%] sm:top-[12%]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">WoW</p>
        <p className="text-sm font-bold tabular-nums tracking-tight text-emerald-400/90">Clicks +12%</p>
        <p className="text-[9px] text-muted-foreground/55">Organic lift</p>
      </div>
      <div className="login-floating-stat login-floating-stat--3 top-[38%] left-[12%] sm:left-[20%]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">Efficiency</p>
        <p className="text-sm font-bold tabular-nums tracking-tight text-foreground/88">CPA −9%</p>
        <p className="text-[9px] text-muted-foreground/55">vs. target</p>
      </div>
    </div>
  );
}
