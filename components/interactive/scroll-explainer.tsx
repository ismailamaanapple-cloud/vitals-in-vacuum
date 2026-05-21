"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import type { ScrollStep } from "@/lib/modules";

export default function ScrollExplainer({
  steps,
  accent,
}: {
  steps: ScrollStep[];
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={containerRef} className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Sticky animated panel */}
      <div className="lg:sticky lg:top-28 lg:h-fit">
        <div className="relative overflow-hidden rounded-3xl glass p-7">
          {/* accent aura — opacity-only so the blur isn't re-rasterized each frame */}
          <motion.div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{ background: accent }}
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-faint">
                Walkthrough
              </span>
              {/* pulsing live dot */}
              <span className="flex items-center gap-2">
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{ background: accent }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-faint">LIVE</span>
              </span>
            </div>

            {/* Big animated phase number + tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <div className="font-mono text-sm" style={{ color: accent }}>
                  {steps[active].tag}
                </div>
                <div className="mt-1 flex items-end gap-1 font-display font-bold leading-none">
                  <span className="text-7xl tabular-nums" style={{ color: accent }}>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="mb-1 text-2xl tabular-nums text-ink/20">
                    /{String(steps.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                  {steps[active].title}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Overall progress bar */}
            <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-haze/40">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-full"
                style={{ background: accent, width: "100%", scaleX: progress }}
              />
            </div>

            {/* Vertical step nav — fills the column */}
            <ol className="mt-7 space-y-1">
              {steps.map((step, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={i}>
                    <div
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-300"
                      style={{
                        background: on
                          ? `color-mix(in oklab, ${accent} 12%, transparent)`
                          : "transparent",
                      }}
                    >
                      <span className="relative mt-0.5 flex h-4 w-4 flex-none items-center justify-center">
                        <span
                          className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                          style={{
                            background: on || done ? accent : "transparent",
                            border: `1.5px solid ${on || done ? accent : "#5b6594"}`,
                            boxShadow: on ? `0 0 10px ${accent}` : "none",
                          }}
                        />
                        {on && (
                          <motion.span
                            layoutId="step-ring"
                            className="absolute inset-[-4px] rounded-full"
                            style={{ border: `1.5px solid ${accent}` }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div
                          className="font-mono text-[10px] uppercase tracking-wider"
                          style={{ color: on ? accent : "#5b6594" }}
                        >
                          {step.tag}
                        </div>
                        <div
                          className={`truncate text-sm transition-colors ${
                            on ? "text-ink" : done ? "text-mute" : "text-faint"
                          }`}
                        >
                          {step.title}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-16 sm:space-y-24">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            initial={{ opacity: 0.25, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl glass p-6 sm:p-8"
          >
            {/* accent edge that animates in */}
            <motion.span
              className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
              style={{ background: accent }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              transition={{ duration: 0.5 }}
            />
            <div className="font-mono text-xs" style={{ color: accent }}>
              {step.tag}
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {step.title}
            </h3>
            <p className="mt-4 leading-relaxed text-mute">{step.body}</p>
            {step.stat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-6 inline-flex items-baseline gap-3 rounded-2xl bg-haze/30 px-5 py-3"
              >
                <span
                  className="font-display text-3xl font-bold tabular-nums"
                  style={{ color: accent }}
                >
                  {step.stat.value}
                </span>
                <span className="text-sm text-mute">{step.stat.label}</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
