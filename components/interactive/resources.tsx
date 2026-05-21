"use client";

import { motion } from "framer-motion";

export type Resource = {
  source: string;
  title: string;
  blurb: string;
  href: string;
  accent: string;
};

export default function Resources({ items }: { items: Resource[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <motion.a
          key={r.title}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-30"
            style={{ background: r.accent }}
          />
          <div className="relative flex items-center justify-between">
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-wide"
              style={{ color: r.accent }}
            >
              {r.source}
            </span>
            <span
              className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: r.accent }}
            >
              ↗
            </span>
          </div>
          <h3 className="relative mt-4 font-display text-xl font-bold leading-snug tracking-tight text-ink">
            {r.title}
          </h3>
          <p className="relative mt-2 flex-1 text-sm leading-relaxed text-mute">
            {r.blurb}
          </p>
        </motion.a>
      ))}
    </div>
  );
}
