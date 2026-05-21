"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = {
  tag: string;
  clock: string;
  title: string;
  body: string;
  systems: { label: string; detail: string }[];
  accent: string;
};

const PHASES: Phase[] = [
  {
    tag: "T-0",
    clock: "Launch",
    title: "Three G's, then nothing",
    body: "Ascent pins the crew into their seats at up to ~3G as the vehicle accelerates. Within minutes the engines cut off — and gravity, for the body's purposes, simply disappears. The adaptation clock starts ticking immediately.",
    systems: [
      { label: "Cardiovascular", detail: "Blood begins shifting headward as the hydrostatic gradient vanishes" },
      { label: "Vestibular", detail: "Otoliths lose their 'down' reference within seconds" },
    ],
    accent: "#ffb23e",
  },
  {
    tag: "Hours – Days",
    clock: "Early orbit",
    title: "The body recalibrates",
    body: "Fluid floods the upper body, producing puffy faces and bird-legs. The majority of crew feel space motion sickness as vision and balance disagree. The kidneys respond by dumping fluid, and plasma volume falls fast.",
    systems: [
      { label: "Cardiovascular", detail: "~2 L fluid shift headward; plasma volume drops 10–15%" },
      { label: "Neuro-vestibular", detail: "60–70% develop space motion sickness; most adapt in 2–4 days" },
    ],
    accent: "#38e1ff",
  },
  {
    tag: "Weeks – Months",
    clock: "Long-duration",
    title: "Slow structural change",
    body: "The quiet, cumulative damage of spaceflight. Weight-bearing bone dissolves, antigravity muscles waste, the eye remodels under chronic pressure, and radiation accumulates with no atmosphere to absorb it.",
    systems: [
      { label: "Musculoskeletal", detail: "1–1.5% bone density lost per month; up to 20% muscle volume" },
      { label: "Neuro-ocular", detail: "Over 60% of long-duration crew develop SANS findings" },
      { label: "Radiation", detail: "Dose climbs toward 50–100× the sea-level background" },
    ],
    accent: "#b06bff",
  },
  {
    tag: "Return",
    clock: "Re-entry",
    title: "Standing up again",
    body: "Back under gravity with low plasma volume, a deconditioned baroreflex, a smaller heart and a confused inner ear, even standing is a challenge. Re-adaptation to gravity is its own physiological transition — a critical risk for a crew landing on Mars alone.",
    systems: [
      { label: "Cardiovascular", detail: "60–80% of crew show post-flight orthostatic intolerance" },
      { label: "Vestibular", detail: "Vertigo and gait instability as the brain re-weights gravity" },
    ],
    accent: "#5dffc2",
  },
];

export default function MissionTimeline() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active];

  return (
    <div className="relative overflow-hidden rounded-[2rem] glass p-6 sm:p-10">
      {/* Phase selector */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-[14px] hidden h-px bg-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] sm:block" />
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PHASES.map((p, i) => {
            const on = i === active;
            return (
              <button
                key={p.tag}
                onClick={() => setActive(i)}
                className="group flex flex-col items-start text-left"
              >
                <span
                  className="mb-3 h-3 w-3 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: on ? p.accent : "#5b6594",
                    background: on ? p.accent : "transparent",
                    boxShadow: on ? `0 0 16px ${p.accent}` : "none",
                  }}
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-widest transition-colors"
                  style={{ color: on ? p.accent : "#5b6594" }}
                >
                  {p.tag}
                </span>
                <span
                  className={`mt-0.5 text-sm font-medium transition-colors ${
                    on ? "text-ink" : "text-faint group-hover:text-mute"
                  }`}
                >
                  {p.clock}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr]"
        >
          <div>
            <h3
              className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: phase.accent }}
            >
              {phase.title}
            </h3>
            <p className="mt-4 leading-relaxed text-mute">{phase.body}</p>
          </div>

          <div className="flex flex-col gap-3">
            {phase.systems.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="rounded-2xl border border-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] bg-deep/40 p-4"
              >
                <div
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: phase.accent }}
                >
                  {s.label}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-mute">
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
