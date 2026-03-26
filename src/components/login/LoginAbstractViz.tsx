/**
 * Decorative chart + orb layer for the login hero (no real data).
 */
export function LoginAbstractViz() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-[6%] -translate-x-1/2 md:top-[10%]">
        <div className="login-lumina-orb-wrap">
          <div className="login-lumina-orb" />
          <div className="login-lumina-orb-ring" />
        </div>
      </div>
      <svg
        className="absolute -right-4 top-[22%] h-[min(280px,55vw)] w-[min(420px,95vw)] opacity-[0.35] md:right-0 md:top-[18%] md:h-[320px] md:w-[480px] md:opacity-45"
        viewBox="0 0 480 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="login-viz-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(160 84% 42% / 0.45)" />
            <stop offset="100%" stopColor="hsl(160 84% 42% / 0)" />
          </linearGradient>
          <linearGradient id="login-viz-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(160 84% 38% / 0.2)" />
            <stop offset="50%" stopColor="hsl(160 84% 48% / 0.9)" />
            <stop offset="100%" stopColor="hsl(160 70% 55% / 0.35)" />
          </linearGradient>
          <filter id="login-viz-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g opacity="0.9">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1="40"
              y1={52 + i * 40}
              x2="440"
              y2={52 + i * 40}
              stroke="hsl(0 0% 100% / 0.06)"
              strokeWidth="1"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line
              key={`v-${i}`}
              x1={48 + i * 42}
              y1="48"
              x2={48 + i * 42}
              y2="248"
              stroke="hsl(0 0% 100% / 0.04)"
              strokeWidth="1"
            />
          ))}
        </g>
        <path
          d="M48 200 L120 168 L192 188 L264 120 L336 140 L408 88 L432 100"
          stroke="url(#login-viz-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#login-viz-glow)"
        />
        <path
          d="M48 200 L120 168 L192 188 L264 120 L336 140 L408 88 L432 100 L432 248 L48 248 Z"
          fill="url(#login-viz-area)"
        />
        <circle cx="264" cy="120" r="5" fill="hsl(160 84% 52%)" opacity="0.95" />
        <circle cx="408" cy="88" r="4" fill="hsl(160 84% 48%)" opacity="0.85" />
      </svg>
    </div>
  );
}
