"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { WorkshopArtifact } from "./WorkshopArtifact";
import { SignalConnector } from "./SignalConnector";
import { WebIcon, GamesIcon, DataIcon, AutomationIcon } from "./workshop-icons";

const ARTIFACTS = [
  { label: "Web", detail: "React · Next.js", Icon: WebIcon },
  { label: "Games", detail: "Unity3D · C#", Icon: GamesIcon },
  { label: "Data & ML", detail: "Python · scikit-learn", Icon: DataIcon },
  { label: "Automation", detail: "n8n", Icon: AutomationIcon },
] as const;

/**
 * WorkshopEnvironment
 * --------------------
 * The hero's visual environment: four small workshop artifacts — one per
 * discipline — tied together by a signal connector, sitting inside a
 * container that drifts a few px toward the cursor (desktop, mouse only).
 * This is the "the environment responds subtly to the visitor's
 * presence" piece — small enough to feel alive, not a gimmick.
 */
export function WorkshopEnvironment() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * 8);
    y.set(relY * 8);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative"
    >
      <SignalConnector className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 sm:block" />

      <motion.div
        style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
        className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {ARTIFACTS.map(({ label, detail, Icon }) => (
          <WorkshopArtifact
            key={label}
            label={label}
            detail={detail}
            icon={<Icon className="h-6 w-6" />}
          />
        ))}
      </motion.div>
    </div>
  );
}
