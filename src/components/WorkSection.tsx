"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { workProjects } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ProjectRow } from "./ProjectRow";
import { ProjectDetail } from "./ProjectDetail";

export function WorkSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const featured = workProjects.find((p) => p.treatment === "featured");
  const rest = workProjects.filter((p) => p.treatment !== "featured");
  const selectedProject = workProjects.find((p) => p.id === selectedId) ?? null;

  return (
    <section id="work" className="container-workshop section-padding relative z-10 border-t border-workshop-line">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
        className="flex flex-col gap-6"
      >
        <motion.p variants={fadeUp} className="text-label text-signal">
          Selected Work
        </motion.p>
        <motion.p variants={fadeUp} className="text-body max-w-2xl text-balance sm:text-lg">
          A handful of things I&rsquo;ve built end to end — a product, a game,
          a monitoring system, and the models and automations running
          quietly underneath.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.1)}
        className="mt-12 flex flex-col gap-6 sm:mt-14"
      >
        {featured && <ProjectRow project={featured} onOpen={setSelectedId} />}
        {rest.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            reversed={i % 2 === 1}
            onOpen={setSelectedId}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
