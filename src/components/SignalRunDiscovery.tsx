"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { JoystickIcon } from "./workshop-icons";
import { SignalRunGame } from "./SignalRunGame";

/**
 * SignalRunDiscovery
 * -------------------
 * A small, clearly-marked device rather than a banner — but it does now
 * have a (deliberately understated) nav entry pointing at it, so it's
 * reachable without relying purely on a visitor scrolling past it.
 */
export function SignalRunDiscovery() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div id="game" className="container-workshop relative z-10 flex justify-center py-10 sm:py-12">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-md border border-workshop-line bg-workshop-panel/50 px-6 py-4 text-ivory-dim transition-colors duration-150 hover:border-amber/40 hover:text-amber-bright"
      >
        <JoystickIcon className="h-5 w-5 flex-shrink-0 transition-colors duration-150" />
        <span className="text-nav">There&rsquo;s one more thing.</span>
        <motion.span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-amber"
          animate={prefersReducedMotion ? { opacity: 0.7 } : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </button>

      <AnimatePresence>
        {open && <SignalRunGame onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
