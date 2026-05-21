"use client";

import dynamic from "next/dynamic";
import type { ModuleVisual as ModuleVisualVariant } from "@/lib/modules";

const ModuleVisual = dynamic(() => import("./three/module-visual"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-haze/20" />,
});

export default function ModuleHeroVisual({
  color,
  variant,
}: {
  color: string;
  variant: ModuleVisualVariant;
}) {
  return <ModuleVisual color={color} variant={variant} />;
}
