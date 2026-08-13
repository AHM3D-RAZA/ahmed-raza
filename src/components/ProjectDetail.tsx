"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import type { WorkProject } from "@/lib/content";
import { duration, easeSettle, fadeUp, staggerContainer } from "@/lib/motion";
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
 * ProjectDetail
 * -------------
 * The "entering the artifact" experience: the row's visual (matched by
 * layoutId) morphs into the larger detail view instead of a modal
 * appearing from nothing. Only the fields the project actually has are
 * rendered — Overview and Technology always show, What I Built /
 * Interesting Part / Result / Links only when the resume supports them.
 */
export function ProjectDetail({
  project,
  onClose,
}: {
  project: WorkProject;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const Visual = VISUALS[project.treatment];
  const [mounted, setMounted] = useState(false);

  // Portals need a client-mounted DOM to render into — this flips true
  // right after the first client render.
  useEffect(() => {
    // document.body isn't available during SSR, so detecting "we're on
    // the client now" genuinely has to happen in an effect — same
    // justified case as IntroLoader's session-storage check.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Focus the close button once the portal-rendered DOM actually exists.
  useEffect(() => {
    if (mounted) closeRef.current?.focus();
  }, [mounted]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      className="fixed inset-0 z-50 overflow-y-auto bg-workshop-black/96 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : duration.fast }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="container-workshop relative py-16 sm:py-20">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project detail"
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-md text-ivory-dim transition-colors hover:text-amber sm:right-8 sm:top-8"
        >
          <X size={22} />
        </button>

        <motion.div
          layoutId={`project-visual-${project.id}`}
          transition={{ duration: prefersReducedMotion ? 0 : duration.slow, ease: easeSettle }}
          className="h-64 overflow-hidden rounded-md bg-workshop-black/40 sm:h-96"
        >
          <Visual active={true} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08)}
          className="mt-10 flex max-w-2xl flex-col gap-8"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <span className="text-label text-signal">{project.category}</span>
            <h2 className="text-heading text-ivory">{project.name}</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-label text-ash">Overview</span>
            <p className="text-body sm:text-lg">{project.description}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-label text-ash">What I Built</span>
            <ul className="flex flex-col gap-1.5">
              {project.whatIBuilt.map((point) => (
                <li key={point} className="text-body">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <span className="text-label text-ash">Technology</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-meta rounded-sm border border-workshop-line px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {project.interestingDetail && (
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <span className="text-label text-ash">Interesting Part</span>
              <p className="text-body">{project.interestingDetail}</p>
            </motion.div>
          )}

          {project.result && (
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <span className="text-label text-ash">Result</span>
              <p className="text-body">{project.result}</p>
            </motion.div>
          )}

          {project.url && (
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <span className="text-label text-ash">Links</span>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-nav text-amber-bright"
              >
                View project ↗
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
}
