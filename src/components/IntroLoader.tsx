"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { duration, easeSettle } from "@/lib/motion";

const SEEN_KEY = "workshop-intro-seen";

/**
 * IntroLoader
 * -----------
 * A short "powering on" transition — a signal node arrives, then a line
 * draws out from it, then the overlay clears. Not a progress bar: nothing
 * here claims to represent real loading progress, because there's nothing
 * substantial to wait for. It's a deliberate, timed reveal — under a
 * second — that gives the first paint some ceremony instead of a blank
 * flash.
 *
 * Shows once per browser session (sessionStorage) and is skipped entirely
 * under prefers-reduced-motion.
 */
export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Runs before paint, so a repeat visit or reduced-motion never flashes
  // the overlay before hiding it.
  useLayoutEffect(() => {
    const alreadySeen =
      typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY);
    if (alreadySeen || prefersReducedMotion) {
      // Reading sessionStorage/media-query state isn't available during
      // render (SSR has no window), so this genuinely has to happen in an
      // effect — this is the "sync from an external system on mount" case
      // the lint rule's own docs carve out.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SEEN_KEY, "1");
    }, duration.loader * 1000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-workshop-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast * 3, ease: easeSettle }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              className="h-2 w-2 rounded-full bg-amber"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: duration.base, ease: easeSettle }}
            />
            <motion.span
              className="h-px w-20 origin-center bg-amber"
              style={{ opacity: 0.4 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: duration.base, delay: 0.2, ease: easeSettle }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
