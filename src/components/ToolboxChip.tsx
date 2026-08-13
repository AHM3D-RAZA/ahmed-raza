"use client";

import { useState } from "react";
import { motion } from "motion/react";

/**
 * ToolboxChip
 * -----------
 * One technology. Not a badge for its own sake — a real, focusable
 * button that lights up on hover/focus and stays lit while selected.
 * Selecting one of the four signature technologies (handled by the
 * parent) also drives the preview stage; every other chip still gets
 * the same tactile response, just without a side effect.
 */
export function ToolboxChip({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = selected || hovered;

  return (
    <motion.button
      type="button"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onSelect}
      aria-pressed={selected}
      className="text-meta rounded-sm border px-2.5 py-1 transition-colors duration-150"
      initial={{ borderColor: "var(--color-workshop-line)", color: "var(--color-ivory-dim)" }}
      animate={{
        borderColor: lit ? "var(--color-amber)" : "var(--color-workshop-line)",
        color: lit ? "var(--color-amber-bright)" : "var(--color-ivory-dim)",
      }}
      transition={{ duration: 0.15 }}
    >
      {label}
    </motion.button>
  );
}
