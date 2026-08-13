"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Experience } from "@/lib/content";

const dotVariants: Variants = {
  hidden: { backgroundColor: "var(--color-workshop-panel)", borderColor: "var(--color-workshop-line)" },
  visible: { backgroundColor: "var(--color-amber)", borderColor: "var(--color-amber)" },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * ExperienceItem
 * ---------------
 * One role on the timeline. The node dot and the role details activate
 * together as the item scrolls into view — the "signal" reaching that
 * point in the career path.
 */
export function ExperienceItem({ exp }: { exp: Experience }) {
  const prefersReducedMotion = useReducedMotion();
  const transition = { duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex gap-6"
    >
      <div className="relative z-10 mt-1.5 flex-shrink-0">
        <motion.span
          variants={dotVariants}
          transition={transition}
          className="block h-3.5 w-3.5 rounded-full border-2"
        />
      </div>

      <motion.div variants={contentVariants} transition={transition} className="flex flex-col gap-2 pb-2">
        <span className="text-technical">{exp.period}</span>
        <span className="text-subheading">{exp.role}</span>
        <span className="text-meta">{exp.org}</span>
        <ul className="mt-1 flex flex-col gap-1.5">
          {exp.points.map((point) => (
            <li key={point} className="text-body text-sm sm:text-base">
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
