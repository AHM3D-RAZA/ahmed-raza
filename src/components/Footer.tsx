import { person } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-workshop-line">
      <div className="container-workshop flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-technical">
          {person.name} — {year}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={`mailto:${person.email}`}
            className="text-nav text-ivory-dim transition-colors hover:text-amber-bright"
          >
            Email
          </a>
          <a
            href={person.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-nav text-ivory-dim transition-colors hover:text-amber-bright"
          >
            GitHub
          </a>
          <a
            href={person.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-nav text-ivory-dim transition-colors hover:text-amber-bright"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
