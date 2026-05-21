"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observes an element and reports whether it's near the viewport.
 * Used to pause expensive work (WebGL render loops, infinite SVG animation)
 * while a component is scrolled out of view.
 *
 * Starts `true` so content paints immediately before the observer attaches.
 */
export function useInView<T extends HTMLElement>(rootMargin = "150px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
