"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClinicalCase } from "@/lib/modules";

export default function ClinicalCaseCard({
  data,
  accent,
}: {
  data: ClinicalCase;
  accent: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked !== null ? data.options[picked] : null;

  return (
    <div className="overflow-hidden rounded-3xl glass">
      <div className="flex items-center gap-3 border-b hairline px-6 py-4 sm:px-8">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
          style={{ background: `${accent}22`, color: accent }}
        >
          ✚
        </span>
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            Clinical case
          </div>
          <div className="font-display font-semibold">{data.title}</div>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="leading-relaxed text-mute">{data.scenario}</p>

          <h4 className="mt-6 font-display text-lg font-semibold">
            {data.question}
          </h4>

          <div className="mt-4 grid gap-3">
            {data.options.map((opt, i) => {
              const isPicked = i === picked;
              const show = picked !== null;
              return (
                <button
                  key={i}
                  onClick={() => picked === null && setPicked(i)}
                  disabled={picked !== null}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    show && opt.correct
                      ? "border-vital/60 bg-vital/10"
                      : show && isPicked && !opt.correct
                        ? "border-ember/60 bg-ember/10"
                        : "hairline hover:border-ink/30 hover:bg-haze/30"
                  } ${picked === null ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className={show && (opt.correct || isPicked) ? "text-ink" : "text-mute"}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {chosen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5"
              >
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{
                    background: chosen.correct ? "#5dffc214" : "#ff6b3d14",
                    color: "var(--color-ink)",
                  }}
                >
                  <span className="font-semibold">
                    {chosen.correct ? "Correct. " : "Not quite. "}
                  </span>
                  <span className="text-mute">{chosen.feedback}</span>
                </div>
                <button
                  onClick={() => setPicked(null)}
                  className="mt-3 text-xs font-medium text-faint underline-offset-4 hover:underline"
                >
                  Reset case
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vitals panel */}
        <div className="rounded-2xl bg-void/40 p-5">
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            Snapshot
          </div>
          <dl className="mt-4 space-y-3">
            {data.vitals.map((v) => (
              <div key={v.label} className="flex items-center justify-between gap-3 border-b hairline pb-2 last:border-0">
                <dt className="text-sm text-mute">{v.label}</dt>
                <dd className="font-mono text-sm font-medium" style={{ color: accent }}>
                  {v.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <AnimatePresence>
        {chosen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t hairline"
          >
            <div className="px-6 py-5 sm:px-8">
              <div className="text-xs font-medium uppercase tracking-widest text-faint">
                Teaching point
              </div>
              <p className="mt-2 text-sm leading-relaxed text-mute">{data.teaching}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
