"use client";

import { motion, useReducedMotion } from "motion/react";

// ---------------------------------------------------------------------------
// Discipline modules
// ---------------------------------------------------------------------------
// Each module is a small, self-contained scene that reads clearly at rest —
// per the phase's interaction rule, nobody has to hover anything to
// understand what it represents. Activating it (hover/focus/tap, handled
// by the parent PracticeModule) plays a short, discipline-specific
// animation: an interface rendering, a character clearing an obstacle, a
// model fitting a trend line, a workflow ticking through its nodes.
//
// All four share a 160x96 viewBox and the same restrained stroke language
// as the rest of the workshop iconography.
// ---------------------------------------------------------------------------

type ModuleProps = { active: boolean };

/** WEB — a small interface that renders its content when activated. */
export function WebModule({ active }: ModuleProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = prefersReducedMotion ? 0 : 0.35;

  return (
    <svg viewBox="0 0 160 96" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="8" y="8" width="144" height="80" rx="4" stroke="var(--color-workshop-line)" strokeWidth="1.2" />
      <path d="M8 22h144" stroke="var(--color-workshop-line)" strokeWidth="1.2" />
      <circle cx="16" cy="15" r="1.4" fill="var(--color-workshop-line)" />

      <motion.rect
        x="18" y="32" width="70" height="8" rx="2"
        fill="var(--color-ivory-dim)"
        animate={{ opacity: active ? 0.9 : 0.22 }}
        transition={{ duration: t, delay: active ? 0 : 0 }}
      />
      <motion.rect
        x="18" y="48" width="124" height="6" rx="2"
        fill="var(--color-ivory-dim)"
        animate={{ opacity: active ? 0.6 : 0.16 }}
        transition={{ duration: t, delay: active ? 0.1 : 0 }}
      />
      <motion.rect
        x="18" y="58" width="98" height="6" rx="2"
        fill="var(--color-ivory-dim)"
        animate={{ opacity: active ? 0.6 : 0.16 }}
        transition={{ duration: t, delay: active ? 0.18 : 0 }}
      />
      <motion.rect
        x="18" y="70" width="36" height="10" rx="2"
        initial={{ fill: "var(--color-workshop-panel)", stroke: "var(--color-workshop-line)" }}
        animate={{
          fill: active ? "var(--color-amber)" : "var(--color-workshop-panel)",
          stroke: active ? "var(--color-amber)" : "var(--color-workshop-line)",
        }}
        strokeWidth="1"
        transition={{ duration: t, delay: active ? 0.26 : 0 }}
      />
    </svg>
  );
}

/** GAMES — a small character that clears an obstacle in a loop while active. */
export function GameModule({ active }: ModuleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 160 96" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M8 80h144" stroke="var(--color-workshop-line)" strokeWidth="1.2" />
      <rect x="112" y="66" width="10" height="14" fill="none" stroke="var(--color-ash)" strokeWidth="1.2" />

      <motion.rect
        width="12" height="12" rx="2"
        fill="var(--color-amber)"
        initial={{ x: 20, y: 68 }}
        animate={
          active && !prefersReducedMotion
            ? { x: [20, 60, 100, 130], y: [68, 40, 40, 68] }
            : { x: 20, y: 68 }
        }
        transition={
          active && !prefersReducedMotion
            ? { duration: 1.3, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }
            : { duration: 0.25 }
        }
      />
    </svg>
  );
}

/** DATA & ML — a small scatter with a trend line that redraws on activation. */
const DATA_POINTS = [
  { x: 26, y: 62 },
  { x: 52, y: 46 },
  { x: 78, y: 54 },
  { x: 104, y: 32 },
  { x: 130, y: 24 },
];
const TREND_PATH = "M26,62 L52,46 L78,54 L104,32 L130,24";

export function DataModule({ active }: ModuleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 160 96" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M16 16v64M16 80h134" stroke="var(--color-workshop-line)" strokeWidth="1.2" />

      <motion.path
        d={TREND_PATH}
        stroke="var(--color-signal)"
        strokeWidth="1.3"
        initial={false}
        animate={{ pathLength: 1, opacity: active ? 0.85 : 0.4 }}
        transition={
          active && !prefersReducedMotion
            ? { pathLength: { duration: 0.7, ease: "easeInOut" }, opacity: { duration: 0.2 } }
            : { duration: 0.2 }
        }
      />

      {DATA_POINTS.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2.6"
          fill="var(--color-amber)"
          initial={false}
          animate={
            active && !prefersReducedMotion
              ? { scale: [1, 1.5, 1], opacity: 1 }
              : { scale: 1, opacity: 0.7 }
          }
          transition={{ duration: 0.4, delay: active ? i * 0.08 : 0 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
    </svg>
  );
}

/** AUTOMATION — a small node chain that ticks through its steps in sequence. */
const AUTOMATION_NODES = [24, 64, 104, 144];

export function AutomationModule({ active }: ModuleProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = prefersReducedMotion ? 0 : 0.3;

  return (
    <svg viewBox="0 0 160 96" fill="none" aria-hidden="true" className="h-full w-full">
      {AUTOMATION_NODES.slice(0, -1).map((cx, i) => (
        <line
          key={i}
          x1={cx}
          y1="48"
          x2={AUTOMATION_NODES[i + 1]}
          y2="48"
          stroke="var(--color-workshop-line)"
          strokeWidth="1.2"
        />
      ))}
      {AUTOMATION_NODES.map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="48"
          r="5.5"
          initial={{ fill: "var(--color-workshop-panel)", stroke: "var(--color-ash)" }}
          animate={{
            fill: active ? "var(--color-amber)" : "var(--color-workshop-panel)",
            stroke: active ? "var(--color-amber)" : "var(--color-ash)",
          }}
          strokeWidth="1.3"
          transition={{ duration: t, delay: active ? i * 0.16 : 0 }}
        />
      ))}
    </svg>
  );
}
