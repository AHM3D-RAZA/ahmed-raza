"use client";

import { motion, useReducedMotion, useSpring, useMotionValue } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// motion's own event types (onDrag, onAnimationStart, ...) conflict with
// the plain DOM equivalents, so they're excluded here — not needed for a
// CTA button/link.
type ConflictingHandlers =
  | "children"
  | "className"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
} & (
  | ({ as?: "a" } & Omit<ComponentPropsWithoutRef<"a">, ConflictingHandlers>)
  | ({ as: "button" } & Omit<ComponentPropsWithoutRef<"button">, ConflictingHandlers>)
);

/**
 * MagneticButton
 * --------------
 * A button/link that drifts a few pixels toward the cursor on hover, then
 * springs back on leave. Reserved for a handful of primary calls to
 * action — not a default button behavior. Renders as a plain, unanimated
 * element under prefers-reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 12,
  as = "a",
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  if (prefersReducedMotion) {
    if (as === "button") {
      return (
        <button className={className} {...(props as ComponentPropsWithoutRef<"button">)}>
          {children}
        </button>
      );
    }
    return (
      <a className={className} {...(props as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const style = { x: springX, y: springY };

  if (as === "button") {
    return (
      <motion.button
        className={className}
        style={style}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...(props as Omit<ComponentPropsWithoutRef<"button">, ConflictingHandlers>)}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.a
      className={className}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...(props as Omit<ComponentPropsWithoutRef<"a">, ConflictingHandlers>)}
    >
      {children}
    </motion.a>
  );
}
