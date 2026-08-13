"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

/**
 * Reveal
 * ------
 * The standard way content enters the screen, whether that's on mount
 * (`trigger="mount"`, e.g. hero content) or on scroll into view
 * (`trigger="scroll"`, the default — for anything below the fold).
 *
 * When the visitor prefers reduced motion, content renders in its final
 * state immediately — no fade, no motion, no delay.
 */
export function Reveal({
  children,
  as: Component = motion.div,
  variants = fadeUp,
  trigger = "scroll",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: typeof motion.div | typeof motion.section | typeof motion.span;
  variants?: Variants;
  trigger?: "scroll" | "mount";
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const triggerProps =
    trigger === "scroll"
      ? { whileInView: "visible", viewport: { once: true, margin: "-80px" } }
      : { animate: "visible" };

  return (
    <Component
      className={className}
      initial="hidden"
      {...triggerProps}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
