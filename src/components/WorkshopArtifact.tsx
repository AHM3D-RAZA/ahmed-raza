"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { duration, easeStandard, fadeUp } from "@/lib/motion";

/**
 * WorkshopArtifact
 * ----------------
 * One small object in the workshop environment. At rest it's quiet —
 * muted icon, label only. On hover/focus/tap it illuminates: the icon
 * and label warm to amber, and a short technical detail (the actual
 * tools involved) fades in beneath.
 *
 * A real <button> for keyboard and screen-reader access — this isn't a
 * decorative div with a click handler bolted on.
 */
export function WorkshopArtifact({
  label,
  detail,
  icon,
}: {
  label: string;
  detail: string;
  icon: ReactNode;
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
      className="group flex flex-col items-center gap-3 rounded-lg border border-workshop-line bg-workshop-panel/70 px-4 py-5 text-center transition-colors sm:px-5 sm:py-6"
      style={{
        borderColor: active ? "var(--color-amber)" : undefined,
        transitionDuration: `${duration.fast}s`,
        transitionTimingFunction: `cubic-bezier(${easeStandard.join(",")})`,
      }}
    >
      <span
        className="transition-colors"
        style={{
          color: active ? "var(--color-amber-bright)" : "var(--color-ivory-dim)",
          transitionDuration: `${duration.fast}s`,
        }}
      >
        {icon}
      </span>

      <span className="flex flex-col items-center gap-1">
        <span
          className="text-technical transition-colors"
          style={{
            color: active ? "var(--color-ivory)" : "var(--color-ash)",
            transitionDuration: `${duration.fast}s`,
          }}
        >
          {label}
        </span>
        <motion.span
          initial={false}
          animate={{ opacity: active ? 1 : 0, height: active ? "auto" : 0 }}
          transition={{ duration: duration.fast }}
          className="overflow-hidden text-technical"
          style={{ color: "var(--color-ash)" }}
        >
          {detail}
        </motion.span>
      </span>
    </motion.button>
  );
}
