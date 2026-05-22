"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Icosahedron, Sphere } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { useInView } from "../use-in-view";

function Earth() {
  const core = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (core.current) core.current.rotation.y += dt * 0.08;
    if (wire.current) wire.current.rotation.y -= dt * 0.04;
  });

  return (
    <group>
      {/* Ocean core */}
      <Sphere ref={core} args={[2, 32, 32]}>
        <meshStandardMaterial
          color="#0a2a6b"
          emissive="#0b3d91"
          emissiveIntensity={0.35}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>
      {/* Data wireframe shell (low detail — it's decorative) */}
      <Icosahedron ref={wire} args={[2.06, 2]}>
        <meshBasicMaterial
          color="#38e1ff"
          wireframe
          transparent
          opacity={0.18}
        />
      </Icosahedron>
      {/* Atmosphere glow (single layer) */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial
          color="#4d8bff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function Station() {
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (orbit.current) orbit.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={orbit} rotation={[0.5, 0, 0.3]}>
      <group position={[3.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.18, 0.18, 0.5]} />
          <meshStandardMaterial color="#e8ecff" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* solar panels */}
        <mesh position={[-0.45, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.35]} />
          <meshStandardMaterial color="#161f4a" emissive="#4d8bff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.45, 0, 0]}>
          <boxGeometry args={[0.6, 0.02, 0.35]} />
          <meshStandardMaterial color="#161f4a" emissive="#4d8bff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* A drifting EVA astronaut built from primitives. */
function Astronaut({
  scale = 1,
  spin = 0.25,
  suit = "#eef2ff",
}: {
  scale?: number;
  spin?: number;
  suit?: string;
}) {
  const body = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (body.current) {
      body.current.rotation.y += dt * spin;
      body.current.rotation.z += dt * spin * 0.4;
    }
  });

  const suitMat = (
    <meshStandardMaterial color={suit} roughness={0.55} metalness={0.15} />
  );

  return (
    <group ref={body} scale={scale}>
      {/* Helmet */}
      <mesh position={[0, 0.62, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        {suitMat}
      </mesh>
      {/* Visor */}
      <mesh position={[0, 0.62, 0.16]}>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial
          color="#0a1130"
          emissive="#38e1ff"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.1, 0]}>
        <capsuleGeometry args={[0.26, 0.42, 8, 16]} />
        {suitMat}
      </mesh>
      {/* Life-support backpack */}
      <mesh position={[0, 0.12, -0.26]}>
        <boxGeometry args={[0.4, 0.5, 0.18]} />
        <meshStandardMaterial color="#c2cbe8" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Chest control accent */}
      <mesh position={[0, 0.2, 0.27]}>
        <boxGeometry args={[0.16, 0.12, 0.04]} />
        <meshStandardMaterial color="#161f4a" emissive="#5dffc2" emissiveIntensity={0.6} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.4, 0.18, 0]} rotation={[0, 0, 0.9]}>
        <capsuleGeometry args={[0.1, 0.42, 6, 12]} />
        {suitMat}
      </mesh>
      <mesh position={[0.4, 0.12, 0.1]} rotation={[0.4, 0, -1.2]}>
        <capsuleGeometry args={[0.1, 0.42, 6, 12]} />
        {suitMat}
      </mesh>
      {/* Legs */}
      <mesh position={[-0.16, -0.42, 0.04]} rotation={[0.25, 0, 0.18]}>
        <capsuleGeometry args={[0.12, 0.46, 6, 12]} />
        {suitMat}
      </mesh>
      <mesh position={[0.18, -0.44, -0.05]} rotation={[-0.3, 0, -0.12]}>
        <capsuleGeometry args={[0.12, 0.46, 6, 12]} />
        {suitMat}
      </mesh>
    </group>
  );
}

/* Astronaut that slowly drifts across the scene and loops back. */
function DriftingAstronaut({
  start,
  drift,
  period,
  scale,
  spin,
  suit,
}: {
  start: [number, number, number];
  drift: [number, number, number];
  period: number;
  scale: number;
  spin: number;
  suit?: string;
}) {
  const g = useRef<THREE.Group>(null);
  const t = useRef(Math.random() * period);
  useFrame((_, dt) => {
    t.current = (t.current + dt) % period;
    const p = t.current / period;
    if (g.current) {
      g.current.position.set(
        start[0] + drift[0] * p,
        start[1] + drift[1] * p,
        start[2] + drift[2] * p,
      );
    }
  });
  return (
    <group ref={g}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <Astronaut scale={scale} spin={spin} suit={suit} />
      </Float>
    </group>
  );
}

/* A rocket that lifts off, climbs, then resets — looping. */
function Rocket({
  x,
  z,
  period,
  delay,
  scale = 1,
  flame = "#ffb23e",
}: {
  x: number;
  z: number;
  period: number;
  delay: number;
  scale?: number;
  flame?: string;
}) {
  const g = useRef<THREE.Group>(null);
  const plume = useRef<THREE.Mesh>(null);
  const trail = useRef<THREE.Mesh>(null);
  const t = useRef(delay);

  const baseY = -5;
  const topY = 6;

  useFrame((state, dt) => {
    t.current = (t.current + dt) % period;
    const p = t.current / period; // 0 → 1
    // ease-in acceleration for liftoff
    const climb = p * p;
    if (g.current) {
      g.current.position.y = baseY + climb * (topY - baseY);
      // gentle gravity-turn lean as it climbs
      g.current.rotation.z = -climb * 0.4;
      const fade = p < 0.85 ? 1 : 1 - (p - 0.85) / 0.15;
      g.current.scale.setScalar(scale * fade);
    }
    // flickering exhaust
    const flick = 1 + Math.sin(state.clock.elapsedTime * 30 + delay) * 0.25;
    if (plume.current) plume.current.scale.set(flick, 1 + climb * 0.6, flick);
    if (trail.current) {
      trail.current.scale.set(1, 1 + climb * 8, 1);
      (trail.current.material as THREE.MeshBasicMaterial).opacity =
        0.35 * (1 - p);
    }
  });

  return (
    <group ref={g} position={[x, baseY, z]}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.16, 0.2, 1.1, 12]} />
        <meshStandardMaterial color="#eef2ff" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.16, 0.45, 12]} />
        <meshStandardMaterial color="#38e1ff" emissive="#38e1ff" emissiveIntensity={0.4} />
      </mesh>
      {/* Fins */}
      {[0, Math.PI * 0.66, Math.PI * 1.33].map((r, i) => (
        <mesh key={i} position={[0, -0.5, 0]} rotation={[0, r, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.04]} />
          <meshStandardMaterial color="#b06bff" emissive="#b06bff" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* Exhaust plume */}
      <mesh ref={plume} position={[0, -0.95, 0]}>
        <coneGeometry args={[0.18, 0.9, 12]} />
        <meshBasicMaterial color={flame} transparent opacity={0.9} />
      </mesh>
      {/* Long fading smoke/light trail */}
      <mesh ref={trail} position={[0, -1.6, 0]}>
        <cylinderGeometry args={[0.05, 0.16, 1.4, 8]} />
        <meshBasicMaterial color={flame} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

const ASTRONAUTS = [
  {
    start: [-5.5, -2.2, -1] as [number, number, number],
    drift: [3.5, 4, 1.5] as [number, number, number],
    period: 26,
    scale: 0.62,
    spin: 0.22,
    suit: "#eef2ff",
  },
  {
    start: [5.8, 2.6, -2] as [number, number, number],
    drift: [-3, -4.5, 1] as [number, number, number],
    period: 34,
    scale: 0.42,
    spin: -0.3,
    suit: "#dfe7ff",
  },
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#fff5e8" />
      <pointLight position={[-6, -2, -4]} intensity={1.5} color="#b06bff" />
      <Stars radius={120} depth={60} count={3000} factor={4} saturation={0} fade speed={1} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <Earth />
      </Float>
      <Station />

      {ASTRONAUTS.map((a, i) => (
        <DriftingAstronaut key={i} {...a} />
      ))}

      {/* Rockets lifting off in the distance */}
      <group position={[0, 0, -4]}>
        <Rocket x={-4.4} z={-2} period={9} delay={0} scale={0.85} flame="#ffb23e" />
        <Rocket x={4.8} z={-3} period={11} delay={4} scale={0.7} flame="#ff6b3d" />
      </group>
    </>
  );
}

export default function HeroScene() {
  const [ref, inView] = useInView<HTMLDivElement>("100px");

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
