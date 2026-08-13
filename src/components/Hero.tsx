"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { person } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { WorkshopEnvironment } from "./WorkshopEnvironment";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // As the visitor scrolls past the hero, the environment (not the text)
  // fades and drifts down slightly — the signal moving deeper into the
  // page rather than the section abruptly cutting off. Bound to native
  // scroll, never hijacked; a no-op under reduced motion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const environmentOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.25]
  );
  const environmentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 56]
  );

  // Mount-reveal variant collapses to a no-op when reduced motion is
  // preferred, so the tree stays identical either way.
  const textVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeUp;

  return (
    <motion.section
      id="top"
      ref={sectionRef}
      className="container-workshop relative z-10 flex flex-col gap-12 pt-8 pb-28 sm:pt-12 sm:pb-36"
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.12)}
    >
      <motion.p variants={textVariants} className="text-label text-signal">
        {person.roleLine}
      </motion.p>

      <motion.h1 variants={textVariants} className="text-display max-w-3xl text-ivory">
        {person.name}
      </motion.h1>

      <motion.p variants={textVariants} className="text-body max-w-xl text-balance sm:text-lg">
        {person.heroTagline}
      </motion.p>

      <motion.div variants={textVariants}>
        <motion.div style={{ opacity: environmentOpacity, y: environmentY }}>
          <WorkshopEnvironment />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
