"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { experience } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ExperienceItem } from "./ExperienceItem";

/**
 * ExperienceSection
 * -------------------
 * The career path as a signal running top to bottom rather than a plain
 * bulleted list — a faint base line with an amber line filling in behind
 * it as the visitor scrolls, and each role's node lighting up in turn.
 */
export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);

  return (
    <section
      id="experience"
      className="container-workshop section-padding relative z-10 border-t border-workshop-line"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
        className="flex flex-col gap-6"
      >
        <motion.p variants={fadeUp} className="text-label text-signal">
          Experience
        </motion.p>
        <motion.p variants={fadeUp} className="text-body max-w-2xl text-balance sm:text-lg">
          Five roles, running in parallel more often than not — trainee
          software engineer by day, building games and automations on the
          side since 2021.
        </motion.p>
      </motion.div>

      <div ref={trackRef} className="relative mt-12 sm:mt-16">
        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-workshop-line" aria-hidden="true" />
        <motion.div
          aria-hidden="true"
          className="absolute left-[6px] top-2 bottom-2 w-px origin-top bg-amber"
          style={{ scaleY: lineScale }}
        />

        <div className="flex flex-col gap-10 sm:gap-12">
          {experience.map((exp) => (
            <ExperienceItem key={`${exp.role}-${exp.org}`} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
