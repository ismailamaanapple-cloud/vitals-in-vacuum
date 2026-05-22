"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Torus, Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useInView } from "../use-in-view";

type Variant =
  | "heart"
  | "bone"
  | "brain"
  | "radiation"
  | "mind"
  | "immune"
  | "mission";

function Core({ color, variant }: { color: string; variant: Variant }) {
  const mesh = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, dt) => {
    t.current += dt;
    if (!mesh.current) return;
    mesh.current.rotation.y += dt * 0.25;
    mesh.current.rotation.x += dt * 0.08;
    // pulse for "heart" variant
    const pulse =
      variant === "heart"
        ? 1 + Math.sin(t.current * 2.4) * 0.06
        : 1 + Math.sin(t.current * 1.1) * 0.02;
    mesh.current.scale.setScalar(pulse);
  });

  const geom = variant === "bone" ? [1.5, 3] : [1.6, 3];
  const distort =
    variant === "brain"
      ? 0.55
      : variant === "mind"
        ? 0.5
        : variant === "immune"
          ? 0.45
          : variant === "radiation"
            ? 0.4
            : variant === "mission"
              ? 0.35
              : 0.3;
  const speed =
    variant === "heart"
      ? 2.5
      : variant === "mind"
        ? 2
        : variant === "immune"
          ? 1.8
          : 1.5;

  return (
    <Icosahedron ref={mesh} args={geom as [number, number]}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.25}
        metalness={0.4}
        distort={distort}
        speed={speed}
      />
    </Icosahedron>
  );
}

function Particles({ color, count }: { color: string; count: number }) {
  const group = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.06;
  });

  return (
    <points ref={group}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Rings({ color, variant }: { color: string; variant: Variant }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.4;
    if (b.current) b.current.rotation.x += dt * 0.3;
  });
  if (variant !== "radiation") return null;
  return (
    <group>
      <Torus ref={a} args={[2.6, 0.012, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </Torus>
      <Torus ref={b} args={[3.1, 0.012, 16, 100]} rotation={[Math.PI / 3, 0.5, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

export default function ModuleVisual({
  color,
  variant,
}: {
  color: string;
  variant: Variant;
}) {
  const [ref, inView] = useInView<HTMLDivElement>("100px");
  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 4]} intensity={2} />
          <pointLight position={[-4, -3, -2]} intensity={1.4} color={color} />
          <Stars radius={80} depth={40} count={800} factor={3} fade speed={0.6} />
          <Core color={color} variant={variant} />
          <Particles color={color} count={350} />
          <Rings color={color} variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
