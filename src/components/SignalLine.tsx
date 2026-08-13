/**
 * SignalLine
 * ----------
 * The recurring visual signature of the site: a single fine line with a
 * few resting nodes, representing the thread connecting the different
 * disciplines Ahmed works across (web, games, data, automation).
 *
 * Deliberately restrained: one path, a handful of nodes, one of them
 * gently pulsing. No particle fields, no neon glow. Pure CSS animation
 * (no canvas/JS) so it stays effectively free at runtime, and it is fully
 * disabled by the global prefers-reduced-motion rule in globals.css.
 */
export function SignalLine({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M0,120 C 150,60 250,160 400,100 S 650,40 800,110 S 950,150 1000,90"
        fill="none"
        stroke="var(--color-amber)"
        strokeOpacity="0.28"
        strokeWidth="1.25"
      />
      {[
        { cx: 0, cy: 120, pulse: false },
        { cx: 400, cy: 100, pulse: true },
        { cx: 800, cy: 110, pulse: false },
        { cx: 1000, cy: 90, pulse: false },
      ].map((node, i) => (
        <circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.pulse ? 4 : 2.5}
          fill={node.pulse ? "var(--color-amber)" : "var(--color-signal)"}
          opacity={node.pulse ? 0.9 : 0.5}
          className={node.pulse ? "signal-node-pulse" : undefined}
        />
      ))}

      <style>{`
        .signal-node-pulse {
          transform-origin: 400px 100px;
          animation: signal-pulse 4.5s ease-in-out infinite;
        }
        @keyframes signal-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.6); opacity: 0.45; }
        }
      `}</style>
    </svg>
  );
}
