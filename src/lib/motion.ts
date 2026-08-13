// ---------------------------------------------------------------------------
// Motion system
// ---------------------------------------------------------------------------
// Mirrors the timing/easing tokens defined in globals.css so JS-driven
// animation (motion/react) and CSS transitions stay in lockstep. Sections
// should import variants from here instead of writing one-off animation
// objects, so the whole site settles with the same physics.
//
// Nothing here is applied globally — these are building blocks later
// phases opt into per-element.
// ---------------------------------------------------------------------------
import type { Transition, Variants } from "motion/react";

export const duration = {
  fast: 0.15,
  base: 0.35,
  slow: 0.65,
  loader: 0.9,
} as const;

// cubic-bezier(0.16, 1, 0.3, 1) — a confident "settle", used for anything
// entering the screen (reveals, panel transitions, the intro loader).
export const easeSettle = [0.16, 1, 0.3, 1] as const;

// cubic-bezier(0.65, 0, 0.35, 1) — a symmetric ease, used for anything that
// reverses in place (hover states, toggles).
export const easeStandard = [0.65, 0, 0.35, 1] as const;

export const transitionSettle: Transition = {
  duration: duration.base,
  ease: easeSettle,
};

/** Simple opacity fade — for content that shouldn't visibly move. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionSettle },
};

/** The default reveal: a short rise + fade. Use for headings, paragraphs,
 *  cards — anything entering the viewport or mounting in. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitionSettle },
};

/** Horizontal variant of fadeUp, for content entering from the side
 *  (e.g. a workshop object sliding into its resting position). */
export const slideIn: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: transitionSettle },
};

/** Subtle scale-in — for smaller elements (nodes, icons, tags) where a
 *  full slide would feel heavy. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transitionSettle },
};

/** Wrap a group of children with this on the parent, and give each child
 *  one of the variants above — children reveal in sequence rather than
 *  all at once. */
export const staggerContainer = (staggerDelay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/** Standard hover lift for interactive workshop objects — a small rise,
 *  never a bounce. Spread onto a motion element's whileHover/whileTap. */
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: duration.fast, ease: easeStandard } },
  whileTap: { y: 0, scale: 0.98, transition: { duration: duration.fast, ease: easeStandard } },
};
