import { Link } from "react-router-dom";
import { LEGAL_ENTITY_NAME, SUPPORT_EMAIL } from "@/lib/brand";

export function LoginTrustFooter() {
  return (
    <footer className="relative z-10 mt-auto w-full border-t border-border/40 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 sm:py-5 md:px-10">
        <p className="text-center text-[11px] leading-relaxed text-muted-foreground/90 md:text-left">
          <span className="whitespace-nowrap">© 2026 {LEGAL_ENTITY_NAME}. All rights reserved.</span>
          <span className="mx-2 hidden text-border md:inline" aria-hidden>
            |
          </span>
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:mt-0 md:inline md:gap-x-3">
            <Link to="/privacy" className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              Privacy Policy
            </Link>
            <span className="text-border" aria-hidden>
              |
            </span>
            <Link to="/terms" className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              Terms of Service
            </Link>
            <span className="text-border" aria-hidden>
              |
            </span>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Lumina%20support`}
              className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Contact Support
            </a>
          </span>
        </p>
        <p className="mt-2 text-center text-[10px] text-muted-foreground/70 md:text-left">
          Our{" "}
          <Link to="/privacy" className="underline-offset-2 hover:underline text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>{" "}
          describes how we use Google Ads API data and protect your information.
        </p>
      </div>
    </footer>
  );
}
