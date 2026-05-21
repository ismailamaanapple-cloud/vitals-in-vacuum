"use client";

import { motion } from "framer-motion";
import type { DeepDive } from "@/lib/modules";

export default function DeepDiveSection({
  data,
  accent,
}: {
  data: DeepDive;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] glass p-7 sm:p-12">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full opacity-[0.12] blur-[100px]"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: accent }}
          >
            Deep dive
          </span>
          <span className="h-px flex-1 bg-[color-mix(in_oklab,var(--color-ink)_10%,transparent)]" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {data.title}
        </motion.h2>

        <div className="mt-7 max-w-3xl space-y-5">
          {data.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="leading-relaxed text-mute sm:text-[1.05rem]"
            >
              {i === 0 ? (
                <>
                  <span
                    className="float-left mr-2 mt-1 font-display text-5xl font-bold leading-[0.7]"
                    style={{ color: accent }}
                  >
                    {p.charAt(0)}
                  </span>
                  {p.slice(1)}
                </>
              ) : (
                p
              )}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}
