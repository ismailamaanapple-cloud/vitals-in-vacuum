"use client";

import { motion } from "framer-motion";
import type { Countermeasure } from "@/lib/modules";

export default function Countermeasures({
  items,
  accent,
}: {
  items: Countermeasure[];
  accent: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl border hairline bg-deep/40 p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <motion.span
            className="absolute inset-x-0 top-0 h-0.5 origin-left"
            style={{ background: accent }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
          />
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide"
            style={{
              background: `color-mix(in oklab, ${accent} 16%, transparent)`,
              color: accent,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {c.status}
          </span>
          <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">
            {c.title}
          </h3>
          <p className="mt-3 flex-1 leading-relaxed text-mute">{c.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
