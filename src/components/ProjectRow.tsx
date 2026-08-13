"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { WorkProject } from "@/lib/content";
import { fadeUp } from "@/lib/motion";
import {
  FeaturedVisual,
  GameVisual,
  NetworkVisual,
  ProductVisual,
  MLVisual,
  AutomationVisual,
} from "./ProjectVisuals";

const VISUALS = {
  featured: FeaturedVisual,
  game: GameVisual,
  network: NetworkVisual,
  product: ProductVisual,
  ml: MLVisual,
  automation: AutomationVisual,
} as const;

/**
 * ProjectRow
 * ----------
 * One project as an artifact rather than a card: a visual on one side,
 * category/name/description/tech on the other, alternating sides down
 * the list for editorial rhythm. The featured project (treatment ===
 * "featured") gets a full-width, taller centerpiece treatment instead.
 *
 * Hovering brightens the visual, reveals the tech tags, and pulses the
 * small signal dot by the category label. Clicking opens the shared-
 * layout detail experience (see ProjectDetail) — the visual morphs into
 * place rather than a modal appearing from nothing.
 */
export function ProjectRow({
  project,
  reversed = false,
  onOpen,
}: {
  project: WorkProject;
  reversed?: boolean;
  onOpen: (id: string) => void;
}) {
  const [active, setActive] = useState(false);
  const Visual = VISUALS[project.treatment];
  const featured = project.treatment === "featured";

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => onOpen(project.id)}
      className={`group grid w-full gap-6 rounded-lg border border-workshop-line bg-workshop-panel/50 p-5 text-left transition-colors duration-150 hover:border-amber/40 focus-visible:border-amber/40 sm:p-6 ${
        featured
          ? "grid-cols-1"
          : `grid-cols-1 sm:grid-cols-2 sm:items-center ${reversed ? "sm:[&>*:first-child]:order-2" : ""}`
      }`}
    >
      <motion.div
        layoutId={`project-visual-${project.id}`}
        className={`overflow-hidden rounded-md bg-workshop-black/40 ${featured ? "h-56 sm:h-72" : "h-44 sm:h-52"}`}
      >
        <Visual active={active} />
      </motion.div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <motion.span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-signal"
            animate={{ opacity: active ? 1 : 0.4, scale: active ? 1.3 : 1 }}
            transition={{ duration: 0.25 }}
          />
          <span className="text-label text-signal">
            {featured ? "Featured — " : ""}
            {project.category}
          </span>
        </div>

        <p className="text-heading text-ivory">{project.name}</p>
        <p className="text-body max-w-lg">{project.description}</p>

        <motion.div
          className="flex flex-wrap gap-2 pt-1"
          animate={{ opacity: active ? 1 : 0.55 }}
          transition={{ duration: 0.25 }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-meta rounded-sm border border-workshop-line px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.button>
  );
}
