"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gameTechnologies } from "@/lib/content";
import { duration } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Signal Run
// ---------------------------------------------------------------------------
// A small canvas game, not a game engine — plain requestAnimationFrame,
// plain 2D context, entities kept in refs so the render loop never has to
// wait on React. The only React state is what the HUD actually needs to
// display (score, best, and which screen is showing).
//
// Colors are read from the site's own CSS custom properties at open time
// rather than hardcoded, so the game can never drift from the design
// system it's reusing.
// ---------------------------------------------------------------------------

const WIDTH = 360;
const HEIGHT = 560;
const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 14;
const PLAYER_Y = HEIGHT - 54;
const PLAYER_SPEED = 260; // logical px / second
const ITEM_SIZE = 34;
const BEST_SCORE_KEY = "signal-run-best-score";

type Item = {
  id: number;
  x: number;
  y: number;
  kind: "tech" | "obstacle";
  label: string;
};

type GameColors = {
  bg: string;
  panel: string;
  line: string;
  ivory: string;
  ivoryDim: string;
  amber: string;
  amberBright: string;
  signal: string;
  ash: string;
};

function readColors(): GameColors {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    bg: read("--color-workshop-black", "#14120e"),
    panel: read("--color-workshop-panel", "#1c1811"),
    line: read("--color-workshop-line", "#2c2619"),
    ivory: read("--color-ivory", "#f2ece0"),
    ivoryDim: read("--color-ivory-dim", "#b8b0a0"),
    amber: read("--color-amber", "#c9963f"),
    amberBright: read("--color-amber-bright", "#e0b567"),
    signal: read("--color-signal", "#6f8f85"),
    ash: read("--color-ash", "#6b6455"),
  };
}

function fallSpeedFor(score: number) {
  return Math.min(340, 110 + score * 1.1);
}
function spawnIntervalFor(score: number) {
  return Math.max(380, 950 - score * 3.5);
}
function obstacleChanceFor(score: number) {
  return Math.min(0.32, 0.12 + score * 0.0009);
}

export function SignalRunGame({ onClose }: { onClose: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  const [screen, setScreen] = useState<"ready" | "playing" | "gameover">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  // Mutable game state lives in refs — the render loop reads/writes these
  // every frame without going through React.
  const screenRef = useRef(screen);
  const scoreRef = useRef(0);
  const playerXRef = useRef((WIDTH - PLAYER_WIDTH) / 2);
  const movingLeftRef = useRef(false);
  const movingRightRef = useRef(false);
  const itemsRef = useRef<Item[]>([]);
  const nextIdRef = useRef(0);
  const timeSinceSpawnRef = useRef(0);
  const particlesRef = useRef<{ x: number; y: number; r: number }[]>([]);
  const colorsRef = useRef<GameColors | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    screenRef.current = screen;
  }, [screen]);

  // Portals need a client-mounted DOM to render into — this flips true
  // right after the first client render.
  useEffect(() => {
    // document.body isn't available during SSR, so detecting "we're on
    // the client now" genuinely has to happen in an effect — same
    // justified case as IntroLoader's session-storage check.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Load best score once, on open.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(BEST_SCORE_KEY);
      // Reading localStorage isn't available during render (no window on
      // the server), so this has to happen in an effect — same justified
      // case as IntroLoader's session-storage check.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setBest(Number(stored) || 0);
    } catch {
      // localStorage unavailable — best score just won't persist.
    }
  }, []);

  function startGame() {
    itemsRef.current = [];
    playerXRef.current = (WIDTH - PLAYER_WIDTH) / 2;
    timeSinceSpawnRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    setScreen("playing");
  }

  function endGame() {
    setScreen("gameover");
    const finalScore = scoreRef.current;
    if (finalScore > best) {
      setBest(finalScore);
      try {
        window.localStorage.setItem(BEST_SCORE_KEY, String(finalScore));
      } catch {
        // best score just won't persist this run
      }
    }
  }

  // Focus the close button once the portal-rendered DOM actually exists.
  useEffect(() => {
    if (mounted) closeRef.current?.focus();
  }, [mounted]);

  // Body scroll lock, Escape to close.
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
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        movingLeftRef.current = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        movingRightRef.current = true;
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") movingLeftRef.current = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") movingRightRef.current = false;
    }
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onClose]);

  // The render loop — runs continuously while the overlay is open, but
  // only moves the player/spawns items/checks collisions in "playing".
  // Depends on `mounted` too: the canvas only exists in the DOM once the
  // portal has rendered on the client.
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    colorsRef.current = readColors();
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 14 }, () => ({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        r: Math.random() * 1.2 + 0.6,
      }));
    }
    let lastTime = performance.now();

    function spawnItem() {
      const isObstacle = Math.random() < obstacleChanceFor(scoreRef.current);
      const label = isObstacle
        ? "×"
        : gameTechnologies[Math.floor(Math.random() * gameTechnologies.length)];
      itemsRef.current.push({
        id: nextIdRef.current++,
        x: Math.random() * (WIDTH - ITEM_SIZE),
        y: -ITEM_SIZE,
        kind: isObstacle ? "obstacle" : "tech",
        label,
      });
    }

    function drawRoundedRect(x: number, y: number, w: number, h: number, r: number) {
      ctx!.beginPath();
      ctx!.moveTo(x + r, y);
      ctx!.arcTo(x + w, y, x + w, y + h, r);
      ctx!.arcTo(x + w, y + h, x, y + h, r);
      ctx!.arcTo(x, y + h, x, y, r);
      ctx!.arcTo(x, y, x + w, y, r);
      ctx!.closePath();
    }

    function tick(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const colors = colorsRef.current!;
      const playing = screenRef.current === "playing";

      // --- update ---------------------------------------------------
      if (playing) {
        if (movingLeftRef.current) playerXRef.current -= PLAYER_SPEED * dt;
        if (movingRightRef.current) playerXRef.current += PLAYER_SPEED * dt;
        playerXRef.current = Math.max(0, Math.min(WIDTH - PLAYER_WIDTH, playerXRef.current));

        timeSinceSpawnRef.current += dt * 1000;
        if (timeSinceSpawnRef.current >= spawnIntervalFor(scoreRef.current)) {
          timeSinceSpawnRef.current = 0;
          spawnItem();
        }

        const speed = fallSpeedFor(scoreRef.current);
        const playerX = playerXRef.current;
        const remaining: Item[] = [];
        for (const item of itemsRef.current) {
          item.y += speed * dt;

          const overlapsPlayer =
            item.y + ITEM_SIZE >= PLAYER_Y &&
            item.y <= PLAYER_Y + PLAYER_HEIGHT &&
            item.x + ITEM_SIZE > playerX &&
            item.x < playerX + PLAYER_WIDTH;

          if (overlapsPlayer) {
            if (item.kind === "obstacle") {
              endGame();
            } else {
              scoreRef.current += 10;
              setScore(scoreRef.current);
            }
            continue; // caught (or hit) — remove either way
          }
          if (item.y < HEIGHT + ITEM_SIZE) remaining.push(item);
        }
        itemsRef.current = remaining;
      }

      if (!prefersReducedMotion) {
        for (const p of particlesRef.current) {
          p.y += 8 * dt;
          if (p.y > HEIGHT) p.y = 0;
        }
      }

      // --- draw -------------------------------------------------------
      ctx!.clearRect(0, 0, WIDTH, HEIGHT);
      ctx!.fillStyle = colors.bg;
      ctx!.fillRect(0, 0, WIDTH, HEIGHT);

      ctx!.fillStyle = colors.signal;
      for (const p of particlesRef.current) {
        ctx!.globalAlpha = 0.25;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      ctx!.font = '600 11px "IBM Plex Mono", monospace';
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const item of itemsRef.current) {
        if (item.kind === "obstacle") {
          ctx!.globalAlpha = 0.7 + Math.random() * 0.3;
          ctx!.strokeStyle = colors.ash;
          ctx!.lineWidth = 1.3;
          drawRoundedRect(item.x, item.y, ITEM_SIZE, ITEM_SIZE, 4);
          ctx!.stroke();
          ctx!.fillStyle = colors.ash;
          ctx!.fillText("×", item.x + ITEM_SIZE / 2, item.y + ITEM_SIZE / 2 + 1);
          ctx!.globalAlpha = 1;
        } else {
          ctx!.fillStyle = colors.panel;
          ctx!.strokeStyle = colors.line;
          ctx!.lineWidth = 1.2;
          drawRoundedRect(item.x, item.y, ITEM_SIZE, ITEM_SIZE, 6);
          ctx!.fill();
          ctx!.stroke();
          ctx!.fillStyle = colors.ivoryDim;
          const label = item.label.length > 6 ? item.label.slice(0, 5) + "\u2026" : item.label;
          ctx!.fillText(label, item.x + ITEM_SIZE / 2, item.y + ITEM_SIZE / 2 + 1);
        }
      }

      // player — a small glowing bar
      ctx!.shadowColor = colors.amber;
      ctx!.shadowBlur = 10;
      ctx!.fillStyle = colors.amber;
      drawRoundedRect(playerXRef.current, PLAYER_Y, PLAYER_WIDTH, PLAYER_HEIGHT, 6);
      ctx!.fill();
      ctx!.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loop reads live refs, not reactive state
  }, [prefersReducedMotion, mounted]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Signal Run"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-workshop-black/97 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : duration.fast }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close Signal Run"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md text-ivory-dim transition-colors hover:text-amber sm:right-6 sm:top-6"
      >
        <X size={22} />
      </button>

      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between px-1" style={{ maxWidth: WIDTH }}>
          <span className="text-label text-signal">Signal Run</span>
          <span className="text-technical">
            SCORE: {score}
            {best > 0 && <span className="ml-3">BEST: {best}</span>}
          </span>
        </div>

        <div className="relative" style={{ width: "100%", maxWidth: WIDTH }}>
          <canvas
            ref={canvasRef}
            style={{ width: "100%", aspectRatio: `${WIDTH} / ${HEIGHT}`, display: "block" }}
            className="rounded-md border border-workshop-line"
          />

          {screen === "playing" && (
            <div className="absolute inset-x-0 bottom-4 flex justify-between px-4">
              <button
                type="button"
                aria-label="Move left"
                onPointerDown={() => (movingLeftRef.current = true)}
                onPointerUp={() => (movingLeftRef.current = false)}
                onPointerLeave={() => (movingLeftRef.current = false)}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-workshop-line bg-workshop-black/60 text-ivory-dim active:border-amber active:text-amber-bright"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                aria-label="Move right"
                onPointerDown={() => (movingRightRef.current = true)}
                onPointerUp={() => (movingRightRef.current = false)}
                onPointerLeave={() => (movingRightRef.current = false)}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-workshop-line bg-workshop-black/60 text-ivory-dim active:border-amber active:text-amber-bright"
              >
                <ChevronRight size={26} />
              </button>
            </div>
          )}

          {screen === "ready" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-md bg-workshop-black/85 px-6 text-center">
              <span className="text-heading text-ivory">Signal Run</span>
              <p className="text-body max-w-xs">
                Catch the tech. Avoid the corrupted signals.
              </p>
              <p className="text-technical">← → or A / D — hold the arrows on mobile</p>
              <button type="button" onClick={startGame} className="btn btn-primary text-button">
                Start
              </button>
            </div>
          )}

          {screen === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md bg-workshop-black/90 px-6 text-center">
              <span className="text-heading text-ivory">Signal Lost</span>
              <p className="text-technical">
                SCORE: {score} &nbsp;·&nbsp; BEST: {best}
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={startGame} className="btn btn-primary text-button">
                  Try Again
                </button>
                <button type="button" onClick={onClose} className="btn btn-ghost text-button">
                  Return to Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>,
    document.body
  );
}
