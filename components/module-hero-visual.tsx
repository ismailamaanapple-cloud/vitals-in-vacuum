"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ModuleVisual as ModuleVisualVariant } from "@/lib/modules";
import { useIsMobile } from "./use-is-mobile";

const ModuleVisual = dynamic(() => import("./three/module-visual"), {
  ssr: false,
  loading: () => <OrbFallback color="#4d8bff" />,
});

/* Lightweight CSS orb — shown on mobile (no WebGL) and while the 3D loads. */
function OrbFallback({ color }: { color: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-48 w-48 sm:h-60 sm:w-60">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${color} 0%, #0a1130 60%, #03061a 100%)`,
            boxShadow: `0 0 80px -12px ${color}`,
          }}
        />
        <div
          className="absolute inset-[-10%] rounded-full border opacity-30"
          style={{ borderColor: color }}
        />
      </div>
    </div>
  );
}

export default function ModuleHeroVisual({
  color,
  variant,
}: {
  color: string;
  variant: ModuleVisualVariant;
}) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || isMobile) return <OrbFallback color={color} />;
  return <ModuleVisual color={color} variant={variant} />;
}
