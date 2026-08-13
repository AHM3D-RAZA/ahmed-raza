"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { skills } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ToolboxChip } from "./ToolboxChip";
import { WebModule, GameModule, DataModule, AutomationModule } from "./DisciplineModules";

// Only these four technologies drive the preview stage — the rest of the
// toolbox is understood on its own without needing to be clicked.
const SIGNATURE_PREVIEWS: Record<string, (active: boolean) => React.ReactNode> = {
  React: (active) => <WebModule active={active} />,
  Unity3D: (active) => <GameModule active={active} />,
  Python: (active) => <DataModule active={active} />,
  n8n: (active) => <AutomationModule active={active} />,
};

/**
 * ToolboxSection
 * ---------------
 * The technology list, grouped the way they're actually used — not a
 * wall of repeated badges. Selecting one of four signature technologies
 * (React, Unity3D, Python, n8n) briefly activates the matching workshop
 * visual from the practice section; everything else is understandable
 * from the list alone.
 */
export function ToolboxSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const preview = selected ? SIGNATURE_PREVIEWS[selected] : undefined;

  return (
    <section
      id="skills"
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
          Toolbox
        </motion.p>
        <motion.p variants={fadeUp} className="text-body max-w-2xl text-balance sm:text-lg">
          What&rsquo;s actually on the bench, grouped the way I reach for it.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer(0.08)}
        className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-[1fr_300px] lg:gap-10"
      >
        <div className="flex flex-col gap-8">
          {skills.map((group) => (
            <motion.div key={group.label} variants={fadeUp} className="flex flex-col gap-3">
              <span className="text-label text-ash">{group.label}</span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <ToolboxChip
                    key={item}
                    label={item}
                    selected={selected === item}
                    onSelect={() => setSelected((current) => (current === item ? null : item))}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="flex h-48 flex-col justify-between rounded-lg border border-workshop-line bg-workshop-panel/60 p-5 lg:h-auto"
        >
          <span className="text-label text-signal">Preview</span>

          <div className="flex flex-1 items-center justify-center py-2">
            {preview ? (
              preview(true)
            ) : (
              <motion.span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-signal"
                animate={prefersReducedMotion ? { opacity: 0.5 } : { opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          <span className="text-technical text-center">
            {selected ?? "Select React, Unity3D, Python, or n8n"}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
