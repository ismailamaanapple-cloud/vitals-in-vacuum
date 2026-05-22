"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "./use-is-mobile";

const HeroScene = dynamic(() => import("./three/hero-scene"), { ssr: false });

/* Cheap, GPU-friendly CSS space backdrop — used on mobile (no WebGL) and as
   the instant first-paint background on desktop before the 3D scene mounts.
   Uses pre-baked radial gradients only — NO filter:blur (very costly on
   mobile to rasterize a large blurred layer). */
function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: [
          // nebula glows (soft via gradient falloff, not filter)
          "radial-gradient(55vh 55vh at 92% 6%, rgba(77,139,255,0.16), transparent 62%)",
          "radial-gradient(48vh 48vh at -6% 94%, rgba(176,107,255,0.14), transparent 62%)",
          // Earth orb
          "radial-gradient(circle at 78% 50%, #4d8bff 0, #0a2a6b 9%, transparent 16%)",
          // faint static stars
          "radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.7), transparent 100%)",
          "radial-gradient(1.5px 1.5px at 70% 62%, rgba(207,224,255,0.6), transparent 100%)",
          "radial-gradient(1.5px 1.5px at 42% 82%, rgba(255,255,255,0.6), transparent 100%)",
          "radial-gradient(1.5px 1.5px at 86% 24%, rgba(207,224,255,0.55), transparent 100%)",
          "radial-gradient(1.5px 1.5px at 55% 14%, rgba(255,255,255,0.6), transparent 100%)",
        ].join(","),
      }}
    />
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Only run WebGL on desktop, and only after first paint (faster load, no SSR mismatch).
  const showWebGL = mounted && !isMobile;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background: CSS backdrop everywhere, 3D layered on top for desktop */}
      <div className="absolute inset-0 z-0">
        <HeroBackdrop />
        {showWebGL && (
          <div className="absolute inset-0">
            <HeroScene />
          </div>
        )}
      </div>

      {/* gradient vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-void/40 via-transparent to-void" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_40%,transparent_30%,var(--color-void)_85%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-mute">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan" />
            Interactive atlas · Space medicine
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl sm:leading-[0.95]">
            What microgravity
            <br />
            does to the
            <span className="text-gradient"> human body</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Leaving gravity behind reshapes nearly every physiological system —
            from the heart to the skeleton to the mind. A free, interactive
            atlas of how astronauts adapt, what it costs them, and the medicine
            that keeps them alive.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#modules"
              className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-105"
            >
              Explore the modules
            </Link>
            <Link
              href="/modules/cardiovascular"
              className="rounded-xl glass px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-haze/40"
            >
              Start with the heart →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-faint"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-faint/40 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-faint"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
