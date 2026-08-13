"use client";

import { motion } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import { person } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SignalArrival } from "./SignalArrival";
import { MagneticButton } from "./MagneticButton";

/**
 * ContactSection
 * ---------------
 * The emotional ending, not a "let's work together" banner. The signal
 * from the hero arrives, settles, and the same identity that opened the
 * portfolio closes it — name, role, one line, and the real ways to
 * reach him. Nothing new is introduced here; everything on the page
 * already earned this moment.
 */
export function ContactSection() {
  return (
    <section id="contact" className="container-workshop section-padding relative z-10 border-t border-workshop-line">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.12)}
        className="flex flex-col items-start gap-8"
      >
        <motion.p variants={fadeUp} className="text-label text-signal">
          Contact
        </motion.p>

        <motion.div variants={fadeUp}>
          <SignalArrival className="h-8 w-40" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-2">
          <span className="text-display text-ivory">{person.name}</span>
          <span className="text-label text-ivory-dim">{person.roleLine}</span>
        </motion.div>

        <motion.p variants={fadeUp} className="text-body max-w-md text-balance sm:text-lg">
          If something here resonates, I&rsquo;d like to hear from you.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
          <MagneticButton
            href={`mailto:${person.email}`}
            className="btn btn-primary text-button"
          >
            <Mail size={16} />
            Email
          </MagneticButton>
          <MagneticButton
            href={person.links.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-button"
          >
            GitHub
            <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton
            href={person.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-button"
          >
            LinkedIn
            <ArrowUpRight size={16} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
