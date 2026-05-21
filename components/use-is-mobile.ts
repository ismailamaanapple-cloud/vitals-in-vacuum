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
