/**
 * Atmosphere
 * ----------
 * The base environment of the workshop — not the workshop itself yet
 * (that's later phases). Three quiet layers, in order:
 *
 *  1. A warm vignette suggesting an overhead light source (depth/lighting).
 *  2. A near-invisible grain texture so large flat dark areas don't look
 *     like a flat color fill (atmospheric texture).
 *  3. A single faint, slow-drifting signal line (the connective motif,
 *     ambient rather than a focal element here).
 *
 * Pure CSS/SVG, no canvas, no JS animation loop — effectively free at
 * runtime. Fixed behind all page content.
 */
export function Atmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Vignette — soft warm glow, top-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(201, 150, 63, 0.07), transparent 70%)",
        }}
      />

      {/* Ambient signal — one faint line drifting very slowly */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.14]"
      >
        <path
          d="M-100,620 C 250,520 450,700 750,560 S 1150,420 1500,540 S 1750,600 1900,500"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="1"
          className="atmosphere-drift"
        />
      </svg>

      {/* Grain — extremely subtle, breaks up flat color fields */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <style>{`
        .atmosphere-drift {
          animation: atmosphere-drift 40s ease-in-out infinite;
        }
        @keyframes atmosphere-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-2%); }
        }
      `}</style>
    </div>
  );
}
