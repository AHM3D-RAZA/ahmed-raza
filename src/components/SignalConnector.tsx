"use client";

import { useReducedMotion } from "motion/react";

/**
 * SignalConnector
 * ----------------
 * The line that ties the four workshop artifacts together — the same
 * "signal" motif as the ambient background and hero signature, scaled
 * down to do actual connective work here. One faint line, four resting
 * nodes at the artifact positions, and a single pulse traveling the
 * length of it on a slow loop.
 *
 * Desktop composition only (hidden by the parent below `sm:`) — on
 * mobile the artifacts stand on their own without the connecting line,
 * per the phase's mobile-simplification guidance.
 */
const PATH_D = "M50,20 C 116,0 116,40 150,20 S 216,40 250,20 S 316,0 350,20";

export function SignalConnector({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 40"
      preserveAspectRatio="none"
      className={className}
    >
      <path id="workshop-connector-path" d={PATH_D} fill="none" stroke="var(--color-workshop-line)" strokeWidth="1" />

      {[50, 150, 250, 350].map((cx) => (
        <circle key={cx} cx={cx} cy={20} r={2} fill="var(--color-signal)" opacity={0.55} />
      ))}

      {!prefersReducedMotion && (
        <circle r="2.5" fill="var(--color-amber)">
          <animateMotion dur="7s" repeatCount="indefinite">
            <mpath href="#workshop-connector-path" />
          </animateMotion>
        </circle>
      )}
    </svg>
  );
}
