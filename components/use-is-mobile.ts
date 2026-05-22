"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on small / coarse-pointer screens.
 * Initialized synchronously on the client (these consumers are client-only),
 * so heavy components read the correct value on first paint without remounting.
 */
export function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}

/**
 * True when we should minimize continuous animation: on mobile/touch devices
 * (limited GPU/CPU) or when the user prefers reduced motion. Used to make
 * decorative infinite framer-motion loops static so the main thread stays free.
 */
export function useReducedEffects() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 820px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );

  useEffect(() => {
    const small = window.matchMedia("(max-width: 820px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(small.matches || rm.matches);
    onChange();
    small.addEventListener("change", onChange);
    rm.addEventListener("change", onChange);
    return () => {
      small.removeEventListener("change", onChange);
      rm.removeEventListener("change", onChange);
    };
  }, []);

  return reduced;
}
