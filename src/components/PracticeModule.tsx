"use client";

import { useState, type ReactNode } from "react";
import { fadeUp } from "@/lib/motion";
import { motion } from "motion/react";

/**
 * PracticeModule
 * ---------------
 * A single station in the workshop practice grid. Renders in a fully
 * legible resting state (label, one-line description, and the module's
 * own idle visual) — activation is a reward for hovering/focusing/tapping,
 * never a requirement for understanding the section.
 */
export function PracticeModule({
  label,
  description,
  render,
}: {
  label: string;
  description: string;
  render: (active: boolean) => ReactNode;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      aria-pressed={active}
      aria-label={`${label} — ${description}`}
      className="group flex flex-col gap-4 rounded-lg border border-workshop-line bg-workshop-panel/60 p-5 text-left transition-colors duration-150 hover:border-amber/40 focus-visible:border-amber/40 sm:p-6"
    >
      <div className="h-24 sm:h-28">{render(active)}</div>
      <div className="flex flex-col gap-1">
        <span className="text-subheading">{label}</span>
        <span className="text-technical">{description}</span>
      </div>
    </motion.button>
  );
}
