"use client";

import { useRef, useState, useCallback } from "react";
import type { SliderData, Module } from "@/lib/modules";
import CompareVisual from "./compare-visual";
import { useInView } from "../use-in-view";

const EARTH_ACCENT = "#5dffc2";

export default function BeforeAfter({
  data,
  accent,
  variant,
}: {
  data: SliderData;
  accent: string;
  variant: Module["visual"];
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [rootRef, inView] = useInView<HTMLDivElement>("200px");

  const move = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  }, []);

  return (
    <div ref={rootRef}>
      <div
        ref={ref}
        className="relative aspect-[3/4] w-full select-none overflow-hidden rounded-3xl border hairline sm:aspect-[16/10]"
        onMouseMove={(e) => dragging.current && move(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => dragging.current && move(e.touches[0].clientX)}
        onTouchEnd={() => (dragging.current = false)}
        onTouchCancel={() => (dragging.current = false)}
      >
        {/* SPACE side (full background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-abyss to-void">
          <Panel
            label={data.spaceLabel}
            headline={data.space.headline}
            accent={accent}
            align="right"
            variant={variant}
            side="space"
            play={inView}
          />
        </div>

        {/* EARTH side (clipped) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0b2a4a] to-[#06121f]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Panel
            label={data.earthLabel}
            headline={data.earth.headline}
            accent={EARTH_ACCENT}
            align="left"
            variant={variant}
            side="earth"
            play={inView}
          />
        </div>

        {/* Handle — touch-none so dragging it doesn't scroll the page */}
        <div
          className="absolute inset-y-0 z-20 w-0.5 cursor-ew-resize touch-none"
          style={{ left: `${pos}%`, background: accent }}
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
        >
          {/* enlarged invisible hit area for fingers */}
          <span className="absolute inset-y-0 left-1/2 w-12 -translate-x-1/2" />
          <div
            className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glow-ring"
            style={{ background: "var(--color-void)", borderColor: accent }}
          >
            <span className="text-sm" style={{ color: accent }}>
              ◂▸
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-faint">{data.caption}</p>

      {/* Detail readout — always visible, side by side */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <DetailColumn
          label={data.earthLabel}
          headline={data.earth.headline}
          points={data.earth.points}
          accent={EARTH_ACCENT}
        />
        <DetailColumn
          label={data.spaceLabel}
          headline={data.space.headline}
          points={data.space.points}
          accent={accent}
        />
      </div>
    </div>
  );
}

function Panel({
  label,
  headline,
  accent,
  align,
  variant,
  side,
  play,
}: {
  label: string;
  headline: string;
  accent: string;
  align: "left" | "right";
  variant: Module["visual"];
  side: "earth" | "space";
  play: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col p-5 sm:p-7">
      {/* Label chip */}
      <div className={align === "right" ? "self-end" : "self-start"}>
        <span
          className="rounded-full px-3 py-1 font-mono text-xs font-medium"
          style={{ background: `${accent}22`, color: accent }}
        >
          {label}
        </span>
      </div>

      {/* Animated figure — only mounted (and animating) while in view */}
      <div className="pointer-events-none flex flex-1 items-center justify-center py-2">
        <div className="h-full max-h-[230px] w-full max-w-[230px]">
          {play && <CompareVisual variant={variant} side={side} color={accent} />}
        </div>
      </div>

      {/* Headline */}
      <h4
        className={`font-display text-base font-semibold leading-snug sm:text-xl ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {headline}
      </h4>
    </div>
  );
}

function DetailColumn({
  label,
  headline,
  points,
  accent,
}: {
  label: string;
  headline: string;
  points: string[];
  accent: string;
}) {
  return (
    <div className="rounded-2xl border hairline bg-deep/40 p-5">
      <span
        className="font-mono text-[11px] font-medium uppercase tracking-wide"
        style={{ color: accent }}
      >
        {label}
      </span>
      <h4 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">
        {headline}
      </h4>
      <ul className="mt-3 space-y-1.5 text-sm text-mute">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span style={{ color: accent }}>•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
