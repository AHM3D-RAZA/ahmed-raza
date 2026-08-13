"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * SignalArrival
 * -------------
 * The visual bookend to the hero's SignalLine. Where the opening signal
 * was ambient and searching, this one arrives: a single line draws in
 * from the left and settles into one steady node — quieter than
 * anything else on the page, on purpose. The node keeps a slow, low-
 * amplitude pulse afterward, just enough to read as "still active."
 */
export function SignalArrival({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 40"
      className={`pointer-events-none select-none ${className}`}
    >
      <motion.path
        d="M0,20 C 60,8 120,32 180,20"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="1.2"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="180"
        cy="20"
        r="3.5"
        fill="var(--color-amber)"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : 0.9 }}
        className={prefersReducedMotion ? undefined : "signal-arrival-pulse"}
        style={{ transformOrigin: "180px 20px" }}
      />

      <style>{`
        .signal-arrival-pulse {
          animation: signal-arrival-pulse 4s ease-in-out 1.2s infinite;
        }
        @keyframes signal-arrival-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
      `}</style>
    </svg>
  );
}
