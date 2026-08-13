"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { person } from "@/lib/content";
import { duration, easeSettle } from "@/lib/motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const GAME_LINK = { label: "Game", href: "#game" };

/**
 * Handles every nav click itself rather than relying on the browser's
 * native hash-jump — explicit and deterministic, so it can't be thrown
 * off by animation-driven layout shifts (e.g. the mobile menu collapsing
 * at the same moment a hash jump would otherwise fire).
 */
function scrollToSection(e: MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const id = href.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 w-full">
      <div className="container-workshop flex items-center justify-between py-6">
        <a
          href="#top"
          onClick={(e) => scrollToSection(e, "#top")}
          className="flex flex-col leading-none"
        >
          <span className="font-display text-lg tracking-tight text-ivory">
            {person.name}
          </span>
          <span className="text-technical mt-1 hidden sm:block">
            {person.role}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-nav relative text-ivory-dim transition-colors duration-150 hover:text-amber-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li aria-hidden="true" className="h-3 w-px bg-workshop-line" />
            <li>
              <a
                href={GAME_LINK.href}
                onClick={(e) => scrollToSection(e, GAME_LINK.href)}
                className="text-technical rounded-full border border-workshop-line px-2.5 py-1 text-signal transition-colors duration-150 hover:border-amber/40 hover:text-amber-bright"
              >
                {GAME_LINK.label}
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ivory transition-colors hover:text-amber sm:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: duration.base, ease: easeSettle }}
            className="overflow-hidden border-t border-workshop-line bg-workshop-black sm:hidden"
          >
            <ul className="container-workshop flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-workshop-line py-1">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      const id = link.href.slice(1);
                      // Wait for the menu's own collapse animation to
                      // finish before scrolling, so the two animations
                      // don't fight over the page's layout mid-transition.
                      window.setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, duration.base * 1000);
                    }}
                    className="text-nav block py-3 text-ivory-dim transition-colors hover:text-amber-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="py-1">
                <a
                  href={GAME_LINK.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    const id = GAME_LINK.href.slice(1);
                    window.setTimeout(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, duration.base * 1000);
                  }}
                  className="text-technical inline-block py-3 text-signal transition-colors hover:text-amber-bright"
                >
                  {GAME_LINK.label}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
