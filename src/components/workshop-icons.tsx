// ---------------------------------------------------------------------------
// Workshop artifact icons
// ---------------------------------------------------------------------------
// Deliberately hand-drawn and abstract rather than pulled from an icon
// library — these represent the four disciplines as small technical
// objects in the workshop, not generic UI iconography. Single stroke
// weight, currentColor, no fills except small accent dots.
// ---------------------------------------------------------------------------
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Web — an interface frame with a cursor, standing in for the browser/app. */
export function WebIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="4.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8.5h18" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.2 11.2l4.6 4.6-1.9.4-.5 1.9-2.2-6.9z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Games — a d-pad silhouette with a single action button. */
export function GamesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 5.5h6v3h3v6h-3v3H9v-3H6v-6h3v-3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="6" r="1.3" fill="currentColor" />
    </svg>
  );
}

/** Data & ML — bars with a trend line running through them. */
export function DataIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 19V13M9.5 19V8.5M14.5 19V14.5M19.5 19V5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.5 11.5L9.5 7L14.5 12.5L19.5 4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  );
}

/** Automation — three connected nodes, the workshop's signal in miniature. */
export function AutomationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.3 16.8L11.2 7.6M12.8 7.6L17.7 16.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="5" cy="18" r="1.7" fill="currentColor" />
      <circle cx="12" cy="6" r="1.7" fill="currentColor" />
      <circle cx="19" cy="18" r="1.7" fill="currentColor" />
    </svg>
  );
}

/** Terminal — a small device frame with a prompt, for the hidden game's discovery artifact. */
export function TerminalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 10l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 15h4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Joystick — an arcade stick with a fire button, marking the hidden mini-game. */
export function JoystickIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="4" r="2.1" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M7 11h10l1.6 8.5H5.4L7 11z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="15.2" cy="14.8" r="1.1" fill="currentColor" />
    </svg>
  );
}
