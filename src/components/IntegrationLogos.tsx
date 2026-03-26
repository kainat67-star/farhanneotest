import type { CSSProperties, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function LogoWrap({
  children,
  className,
  index,
}: {
  children: ReactNode;
  className?: string;
  index: number;
}) {
  const dur = 4.4 + (index % 5) * 0.42;
  const delay = index * 0.52;
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "login-logo-float-outer flex cursor-default items-center justify-center rounded-xl px-1 py-1 outline-none",
            "transition-opacity hover:opacity-100 opacity-[0.92]",
            "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
          style={
            {
              "--logo-dur": `${dur}s`,
              "--logo-delay": `${delay}s`,
            } as CSSProperties
          }
          tabIndex={0}
        >
          <div className="login-logo-inner flex items-center justify-center">{children}</div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs font-medium border-border/60">
        Official API Integration
      </TooltipContent>
    </Tooltip>
  );
}

function GoogleAdsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" className={className} aria-hidden fill="none">
      <text
        x="0"
        y="27"
        fill="currentColor"
        style={{ fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif", fontSize: 20, fontWeight: 600 }}
      >
        Google Ads
      </text>
    </svg>
  );
}

function MetaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 40" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M18 28c-4.4 0-8-3.6-8-8s3.6-8 8-8c2.2 0 4.2.9 5.7 2.4C25.2 12.9 27.2 12 29.5 12c4.4 0 8 3.6 8 8s-3.6 8-8 8c-2.3 0-4.4-1-5.8-2.6-1.5 1.6-3.6 2.6-5.7 2.6z"
      />
      <text
        x="44"
        y="27"
        fill="currentColor"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700 }}
      >
        Meta
      </text>
    </svg>
  );
}

function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden>
      <text
        x="0"
        y="27"
        fill="currentColor"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700 }}
      >
        TikTok
      </text>
    </svg>
  );
}

function SnapchatLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 168 40" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M20 14c0-3.5 2.8-6.3 6.3-6.3 1.1 0 2.1.3 3 .8.8-2.2 2.8-3.8 5.2-3.8-.1.9-.1 1.8-.1 2.7 3 .4 5.3 3.2 5.3 6.6 0 3.6-3 6.5-6.7 6.6-.2 2.8-2.5 5-5.3 5-.7 0-1.4-.1-2-.4-.7 1.1-2 1.8-3.4 1.8-2.1 0-3.9-1.6-4.2-3.7-3.2-.5-5.5-3.4-5.5-6.8z"
      />
      <text
        x="44"
        y="27"
        fill="currentColor"
        style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, fontWeight: 600 }}
      >
        Snapchat
      </text>
    </svg>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const INTEGRATIONS = [
  { id: "google-ads", label: "Google Ads", node: <GoogleAdsLogo className="h-10 w-[168px] sm:h-11 sm:w-[188px]" /> },
  { id: "meta", label: "Meta", node: <MetaLogo className="h-10 w-[118px] sm:h-11 sm:w-[128px]" /> },
  { id: "tiktok", label: "TikTok", node: <TikTokLogo className="h-10 w-[100px] sm:h-11 sm:w-[108px]" /> },
  { id: "snapchat", label: "Snapchat", node: <SnapchatLogo className="h-10 w-[150px] sm:h-11 sm:w-[164px]" /> },
  { id: "x", label: "X", node: <XLogo className="h-9 w-9 sm:h-10 sm:w-10" /> },
] as const;

/**
 * High-contrast monochrome marks for dark hero backgrounds. Each logo shows
 * “Official API Integration” on hover/focus.
 */
export function IntegrationLogos({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "login-integration-strip flex flex-wrap items-center justify-start gap-x-12 gap-y-8 sm:gap-x-14 md:gap-x-16 lg:gap-x-20",
        className,
      )}
      role="list"
      aria-label="Supported advertising platforms with official API integrations"
    >
      {INTEGRATIONS.map(({ id, label, node }, index) => (
        <div key={id} role="listitem" className="flex items-center" aria-label={label}>
          <LogoWrap index={index}>{node}</LogoWrap>
        </div>
      ))}
    </div>
  );
}
