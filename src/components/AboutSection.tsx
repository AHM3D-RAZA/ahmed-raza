"use client";

import { motion } from "motion/react";
import { bio } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { WorkshopPractice } from "./WorkshopPractice";

export function AboutSection() {
  return (
    <section id="about" className="container-workshop section-padding relative z-10 border-t border-workshop-line">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
        className="flex flex-col gap-6"
      >
        <motion.p variants={fadeUp} className="text-label text-signal">
          About
        </motion.p>
        <motion.p variants={fadeUp} className="text-body max-w-2xl text-balance sm:text-lg">
          {bio}
        </motion.p>
      </motion.div>

      <div className="mt-14 sm:mt-16">
        <WorkshopPractice />
      </div>
    </section>
  );
}
