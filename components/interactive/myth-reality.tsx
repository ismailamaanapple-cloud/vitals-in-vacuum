"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Misconception } from "@/lib/modules";

function Card({ data, accent }: { data: Misconception; accent: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((v) => !v)}
      className="group relative h-64 w-full text-left [perspective:1400px] sm:h-60"
      aria-label="Reveal the reality"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front — the myth */}
        <div className="absolute inset-0 flex flex-col rounded-3xl border hairline bg-deep/50 p-6 [backface-visibility:hidden]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            Myth
          </span>
          <p className="mt-3 flex-1 font-display text-base font-semibold leading-snug text-ink sm:text-lg">
            &ldquo;{data.myth}&rdquo;
          </p>
          <span
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium"
            style={{ color: accent }}
          >
            Tap to reveal the reality
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>

        {/* Back — the reality */}
        <div
          className="absolute inset-0 flex flex-col rounded-3xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            background: `color-mix(in oklab, ${accent} 14%, var(--color-panel))`,
            border: `1px solid color-mix(in oklab, ${accent} 40%, transparent)`,
          }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: accent }}
          >
            Reality
          </span>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">{data.reality}</p>
          <span className="mt-4 text-xs font-medium text-mute">
            ← Tap to flip back
          </span>
        </div>
      </motion.div>
    </button>
  );
}

export default function MythReality({
  items,
  accent,
}: {
  items: Misconception[];
  accent: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((m, i) => (
        <motion.div
          key={m.myth}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <Card data={m} accent={accent} />
        </motion.div>
      ))}
    </div>
  );
}
