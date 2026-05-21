"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Module } from "@/lib/modules";

export default function ModuleCard({ module, i }: { module: Module; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/modules/${module.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-transform duration-300 hover:-translate-y-1"
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: module.accent }}
        />

        <div className="flex items-center justify-between">
          <span
            className="font-mono text-sm font-medium"
            style={{ color: module.accent }}
          >
            {module.index}
          </span>
          <span className="rounded-full bg-haze/40 px-3 py-1 text-xs text-faint">
            {module.duration}
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold">
          {module.title}
        </h3>
        <p className="mt-1 text-sm" style={{ color: module.accent }}>
          {module.subtitle}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">
          {module.summary}
        </p>

        <div className="mt-6 flex items-center justify-between border-t hairline pt-4">
          <div className="flex gap-4">
            {module.facts.slice(0, 2).map((f) => (
              <div key={f.label}>
                <div
                  className="font-display text-base font-bold tabular-nums"
                  style={{ color: module.accent }}
                >
                  {f.value}
                </div>
                <div className="mt-0.5 max-w-[7rem] text-[10px] leading-tight text-faint">
                  {f.label}
                </div>
              </div>
            ))}
          </div>
          <span className="text-lg text-mute transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
