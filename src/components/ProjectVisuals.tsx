"use client";

import { motion, useReducedMotion } from "motion/react";

// ---------------------------------------------------------------------------
// Project visuals
// ---------------------------------------------------------------------------
// No screenshots were supplied for any of these projects, so every visual
// here is a deliberate abstract concept-render in the site's existing line
// art language — not a mockup dressed up to look like a real screenshot.
// Each accepts `active` for its (subtle) hover response and shares a
// 0-0-400-240 viewBox so they drop into row and detail containers alike.
// ---------------------------------------------------------------------------

type VisualProps = { active: boolean };

/** FEATURED — Project Management Tool: a kanban board, one card lifting on hover. */
export function FeaturedVisual({ active }: VisualProps) {
  const columns = [40, 160, 280];
  const cardsByColumn = [
    [70, 110],
    [70, 110, 150],
    [70],
  ];

  return (
    <svg viewBox="0 0 400 240" fill="none" aria-hidden="true" className="h-full w-full">
      {columns.map((x, ci) => (
        <g key={x}>
          <rect x={x} y="30" width="90" height="180" rx="6" stroke="var(--color-workshop-line)" strokeWidth="1.2" />
          {cardsByColumn[ci].map((y, ri) => {
            const isHighlighted = active && ci === 1 && ri === 1;
            return (
              <motion.rect
                key={y}
                x={x + 10}
                width="70"
                height="28"
                rx="4"
                initial={{ y, fill: "var(--color-workshop-panel-raised)", stroke: "var(--color-workshop-line)" }}
                animate={{
                  y: isHighlighted ? y - 6 : y,
                  fill: isHighlighted ? "var(--color-amber)" : "var(--color-workshop-panel-raised)",
                  stroke: isHighlighted ? "var(--color-amber)" : "var(--color-workshop-line)",
                }}
                strokeWidth="1"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

/** GAME — 3D FPS Horror: a dark vignette, reticle, and a dialogue bar. */
export function GameVisual({ active }: VisualProps) {
  return (
    <svg viewBox="0 0 400 240" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <radialGradient id="game-vignette" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="var(--color-workshop-panel)" />
          <stop offset="100%" stopColor="var(--color-workshop-black)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="240" fill="url(#game-vignette)" />

      <motion.g
        animate={{ scale: active ? 1.15 : 1, opacity: active ? 1 : 0.55 }}
        style={{ transformOrigin: "200px 108px" }}
        transition={{ duration: 0.3 }}
      >
        <circle cx="200" cy="108" r="16" stroke="var(--color-amber)" strokeWidth="1.2" />
        <path d="M200,84v14M200,118v14M176,108h14M210,108h14" stroke="var(--color-amber)" strokeWidth="1.2" />
      </motion.g>

      <rect x="40" y="188" width="320" height="34" rx="4" stroke="var(--color-workshop-line)" strokeWidth="1.2" fill="var(--color-workshop-black)" fillOpacity="0.4" />
      <rect x="52" y="198" width="140" height="5" rx="2" fill="var(--color-ivory-dim)" opacity="0.5" />
      <rect x="52" y="208" width="90" height="5" rx="2" fill="var(--color-ivory-dim)" opacity="0.3" />
    </svg>
  );
}

/** NETWORK — Monitoring Dashboard: a small mesh with a live-looking trace. */
const NETWORK_NODES = [
  { x: 60, y: 60 }, { x: 160, y: 40 }, { x: 260, y: 70 }, { x: 340, y: 50 },
  { x: 90, y: 150 }, { x: 210, y: 160 }, { x: 320, y: 145 },
];
const NETWORK_EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [5, 6], [3, 6]];
const TRACE_PATH = "M20,205 L70,195 L110,215 L150,185 L190,200 L230,175 L270,195 L310,180 L380,205";

export function NetworkVisual({ active }: VisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 400 240" fill="none" aria-hidden="true" className="h-full w-full">
      {NETWORK_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NETWORK_NODES[a].x} y1={NETWORK_NODES[a].y}
          x2={NETWORK_NODES[b].x} y2={NETWORK_NODES[b].y}
          stroke="var(--color-workshop-line)" strokeWidth="1"
        />
      ))}
      {NETWORK_NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="4"
          initial={{ fill: "var(--color-signal)", opacity: 0.6 }}
          animate={{ fill: active ? "var(--color-amber)" : "var(--color-signal)", opacity: active ? 1 : 0.6 }}
          transition={{ duration: 0.3, delay: active ? i * 0.05 : 0 }}
        />
      ))}

      <path d="M20,225h360" stroke="var(--color-workshop-line)" strokeWidth="1" />
      <motion.path
        d={TRACE_PATH}
        stroke="var(--color-signal)"
        strokeWidth="1.2"
        initial={false}
        animate={{ pathLength: 1, opacity: active ? 0.9 : 0.45 }}
        transition={
          active && !prefersReducedMotion
            ? { pathLength: { duration: 0.9, ease: "easeInOut" }, opacity: { duration: 0.2 } }
            : { duration: 0.2 }
        }
      />
    </svg>
  );
}

/** PRODUCT — QuickByte: an abstract browser frame with a short ordering list. */
export function ProductVisual({ active }: VisualProps) {
  const items = [70, 96, 122];

  return (
    <svg viewBox="0 0 400 240" fill="none" aria-hidden="true" className="h-full w-full">
      <rect x="60" y="20" width="280" height="200" rx="6" stroke="var(--color-workshop-line)" strokeWidth="1.2" />
      <path d="M60,44h280" stroke="var(--color-workshop-line)" strokeWidth="1.2" />
      <circle cx="74" cy="32" r="2" fill="var(--color-workshop-line)" />

      {items.map((y, i) => (
        <g key={y}>
          <motion.rect
            x="76" y={y} width="180" height="16" rx="3"
            animate={{ opacity: active ? 0.55 : 0.2 }}
            transition={{ duration: 0.3, delay: active ? i * 0.08 : 0 }}
            fill="var(--color-ivory-dim)"
          />
          <motion.circle
            cx="316" cy={y + 8} r="7"
            initial={{ fill: "var(--color-workshop-panel-raised)", stroke: "var(--color-workshop-line)" }}
            animate={{
              fill: active ? "var(--color-amber)" : "var(--color-workshop-panel-raised)",
              stroke: active ? "var(--color-amber)" : "var(--color-workshop-line)",
            }}
            strokeWidth="1"
            transition={{ duration: 0.3, delay: active ? i * 0.08 + 0.05 : 0 }}
          />
        </g>
      ))}
    </svg>
  );
}

/** ML — Breast Tumor Detection: two point clusters with a decision boundary. */
const CLUSTER_A = [{ x: 80, y: 70 }, { x: 110, y: 100 }, { x: 70, y: 120 }, { x: 130, y: 60 }];
const CLUSTER_B = [{ x: 260, y: 150 }, { x: 300, y: 120 }, { x: 320, y: 170 }, { x: 280, y: 190 }];
const BOUNDARY_PATH = "M180,20 C 160,80 220,140 200,220";

export function MLVisual({ active }: VisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 400 240" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M20,20v200M20,220h360" stroke="var(--color-workshop-line)" strokeWidth="1.2" />

      <motion.path
        d={BOUNDARY_PATH}
        stroke="var(--color-signal)"
        strokeWidth="1.2"
        initial={false}
        animate={{ pathLength: 1, opacity: active ? 0.8 : 0.35 }}
        transition={
          active && !prefersReducedMotion
            ? { pathLength: { duration: 0.8, ease: "easeInOut" }, opacity: { duration: 0.2 } }
            : { duration: 0.2 }
        }
      />

      {[...CLUSTER_A, ...CLUSTER_B].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r="4"
          fill="var(--color-amber)"
          animate={{ scale: active ? 1.25 : 1, opacity: active ? 1 : 0.6 }}
          transition={{ duration: 0.3, delay: active ? i * 0.04 : 0 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
    </svg>
  );
}

/** AUTOMATION — a workflow branching from one trigger into parallel outputs. */
const AUTOMATION_TRIGGER = { x: 40, y: 120 };
const AUTOMATION_OUTPUTS = [
  { x: 220, y: 50 }, { x: 220, y: 120 }, { x: 220, y: 190 },
];
const AUTOMATION_ENDS = [
  { x: 360, y: 50 }, { x: 360, y: 120 }, { x: 360, y: 190 },
];

export function AutomationVisual({ active }: VisualProps) {
  const t = 0.3;

  return (
    <svg viewBox="0 0 400 240" fill="none" aria-hidden="true" className="h-full w-full">
      {AUTOMATION_OUTPUTS.map((o, i) => (
        <g key={i}>
          <line x1={AUTOMATION_TRIGGER.x} y1={AUTOMATION_TRIGGER.y} x2={o.x} y2={o.y} stroke="var(--color-workshop-line)" strokeWidth="1" />
          <line x1={o.x} y1={o.y} x2={AUTOMATION_ENDS[i].x} y2={AUTOMATION_ENDS[i].y} stroke="var(--color-workshop-line)" strokeWidth="1" />
        </g>
      ))}

      <circle cx={AUTOMATION_TRIGGER.x} cy={AUTOMATION_TRIGGER.y} r="6" fill="var(--color-signal)" opacity="0.8" />

      {AUTOMATION_OUTPUTS.map((o, i) => (
        <motion.circle
          key={`out-${i}`}
          cx={o.x} cy={o.y} r="5"
          initial={{ fill: "var(--color-workshop-panel-raised)", stroke: "var(--color-ash)" }}
          animate={{
            fill: active ? "var(--color-amber)" : "var(--color-workshop-panel-raised)",
            stroke: active ? "var(--color-amber)" : "var(--color-ash)",
          }}
          strokeWidth="1.2"
          transition={{ duration: t, delay: active ? 0.15 + i * 0.12 : 0 }}
        />
      ))}
      {AUTOMATION_ENDS.map((e, i) => (
        <motion.circle
          key={`end-${i}`}
          cx={e.x} cy={e.y} r="4"
          initial={{ fill: "var(--color-workshop-panel-raised)", stroke: "var(--color-ash)" }}
          animate={{
            fill: active ? "var(--color-amber)" : "var(--color-workshop-panel-raised)",
            stroke: active ? "var(--color-amber)" : "var(--color-ash)",
          }}
          strokeWidth="1.2"
          transition={{ duration: t, delay: active ? 0.3 + i * 0.12 : 0 }}
        />
      ))}
    </svg>
  );
}
