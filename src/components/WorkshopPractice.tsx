"use client";

import { motion } from "motion/react";
import { practiceDisciplines } from "@/lib/content";
import { PracticeModule } from "./PracticeModule";
import { SignalConnector } from "./SignalConnector";
import { WebModule, GameModule, DataModule, AutomationModule } from "./DisciplineModules";
import { staggerContainer } from "@/lib/motion";

const RENDERERS = {
  web: (active: boolean) => <WebModule active={active} />,
  games: (active: boolean) => <GameModule active={active} />,
  data: (active: boolean) => <DataModule active={active} />,
  automation: (active: boolean) => <AutomationModule active={active} />,
} as const;

/**
 * WorkshopPractice
 * -----------------
 * The four disciplines, connected — not four generic cards. The same
 * signal connector from the hero runs behind the row on desktop, tying
 * the stations together; each one is a small working system in its own
 * right, understandable at rest and demonstrable on hover.
 */
export function WorkshopPractice() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(0.1)}
      className="relative"
    >
      <SignalConnector className="pointer-events-none absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 lg:block" />

      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {practiceDisciplines.map((discipline) => (
          <PracticeModule
            key={discipline.id}
            label={discipline.label}
            description={discipline.description}
            render={RENDERERS[discipline.id]}
          />
        ))}
      </div>
    </motion.div>
  );
}
