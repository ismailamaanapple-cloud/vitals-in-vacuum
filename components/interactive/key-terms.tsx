"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KeyTerm } from "@/lib/modules";

export default function KeyTerms({
  terms,
  accent,
}: {
  terms: KeyTerm[];
  accent: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-3">
      {terms.map((t, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={t.term}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="overflow-hidden rounded-2xl border hairline bg-deep/40"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
            >
              <span
                className="flex h-7 w-7 flex-none items-center justify-center rounded-lg font-mono text-xs font-semibold"
                style={{
                  background: `color-mix(in oklab, ${accent} 18%, transparent)`,
                  color: accent,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-lg font-semibold text-ink">
                {t.term}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex-none text-xl leading-none"
                style={{ color: accent }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 pl-16 leading-relaxed text-mute">
                    {t.definition}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
