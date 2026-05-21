"use client";

import { motion } from "framer-motion";

type Variant =
  | "heart"
  | "bone"
  | "brain"
  | "radiation"
  | "mind"
  | "immune"
  | "mission";
type Side = "earth" | "space";

const SUIT = "#cfd8f5";

/* Drifting fluid particles (used by the cardiovascular body). */
function Flow({
  color,
  dir,
  xs,
}: {
  color: string;
  dir: "up" | "down";
  xs: number[];
}) {
  return (
    <>
      {xs.map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          r={2.6}
          fill={color}
          initial={{ cy: dir === "up" ? 168 : 92, opacity: 0 }}
          animate={{
            cy: dir === "up" ? [168, 60] : [92, 196],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 0.45,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ---------- Cardiovascular: fluid shift & swelling ---------- */
function Body({ side, color }: { side: Side; color: string }) {
  const space = side === "space";
  const headR = space ? 27 : 19;
  const legW = space ? 6 : 14;

  return (
    <g>
      {/* Legs */}
      <line
        x1={101}
        y1={150}
        x2={97}
        y2={214}
        stroke={SUIT}
        strokeWidth={legW}
        strokeLinecap="round"
      />
      <line
        x1={119}
        y1={150}
        x2={123}
        y2={214}
        stroke={SUIT}
        strokeWidth={legW}
        strokeLinecap="round"
      />

      {/* Arms */}
      <line x1={93} y1={84} x2={76} y2={132} stroke={SUIT} strokeWidth={8} strokeLinecap="round" />
      <line x1={127} y1={84} x2={144} y2={132} stroke={SUIT} strokeWidth={8} strokeLinecap="round" />

      {/* Torso */}
      <path
        d="M92 80 Q110 73 128 80 L124 152 Q110 159 96 152 Z"
        fill="#1a2350"
        stroke={SUIT}
        strokeWidth={2}
      />

      {/* Fluid flow */}
      <Flow color={color} dir={space ? "up" : "down"} xs={space ? [105, 115] : [101, 119]} />

      {/* Neck */}
      <rect x={104} y={66} width={12} height={12} fill={SUIT} rx={3} />

      {/* Head (swells & pulses in space) */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={space ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {space && (
          <motion.circle
            cx={110}
            cy={50}
            r={36}
            fill={color}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        )}
        <circle
          cx={110}
          cy={50}
          r={headR}
          fill={space ? color : "#1a2350"}
          fillOpacity={space ? 0.5 : 1}
          stroke={space ? color : SUIT}
          strokeWidth={2.5}
        />
      </motion.g>
    </g>
  );
}

/* ---------- Musculoskeletal: trabecular bone density ---------- */
function Bone({ side, color }: { side: Side; color: string }) {
  const space = side === "space";
  // lattice nodes inside the shaft
  const cols = [88, 100, 112, 124];
  const rows = [78, 96, 114, 132, 150, 168];
  const struts: [number, number, number, number][] = [];
  rows.forEach((y, ri) => {
    cols.forEach((x, ci) => {
      if (ci < cols.length - 1) struts.push([x, y, cols[ci + 1], rows[Math.min(ri + 1, rows.length - 1)]]);
      if (ri < rows.length - 1) struts.push([x, y, x, rows[ri + 1]]);
    });
  });

  return (
    <g>
      {/* Bone outline */}
      <g fill="#1a2350" stroke={SUIT} strokeWidth={2}>
        <circle cx={92} cy={56} r={16} />
        <circle cx={120} cy={56} r={16} />
        <circle cx={92} cy={190} r={16} />
        <circle cx={120} cy={190} r={16} />
        <rect x={84} y={52} width={44} height={142} rx={6} />
      </g>

      {/* Trabecular lattice */}
      <g stroke={color} strokeWidth={space ? 1.4 : 2}>
        {struts.map((s, i) => {
          const dropped = space && i % 2 === 0; // ~half resorbed in space
          if (dropped) {
            return (
              <motion.line
                key={i}
                x1={s[0]}
                y1={s[1]}
                x2={s[2]}
                y2={s[3]}
                animate={{ opacity: [0.25, 0, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, delay: (i % 5) * 0.4 }}
              />
            );
          }
          return (
            <line
              key={i}
              x1={s[0]}
              y1={s[1]}
              x2={s[2]}
              y2={s[3]}
              opacity={space ? 0.55 : 0.9}
            />
          );
        })}
      </g>
    </g>
  );
}

/* ---------- Balance & Vision: the eyeball & optic disc ---------- */
function Eye({ side, color }: { side: Side; color: string }) {
  const space = side === "space";
  return (
    <g>
      {/* Globe — round on Earth, flattened at the back in space */}
      {space ? (
        <path
          d="M150 70 A60 60 0 0 1 150 190 L78 168 Q66 130 78 92 Z"
          fill="#1a2350"
          stroke={color}
          strokeWidth={2.5}
        />
      ) : (
        <circle cx={120} cy={130} r={60} fill="#1a2350" stroke={SUIT} strokeWidth={2.5} />
      )}

      {/* Cornea bulge (front, right side) */}
      <circle cx={172} cy={130} r={14} fill={SUIT} fillOpacity={0.25} stroke={SUIT} strokeWidth={2} />
      <circle cx={170} cy={130} r={6} fill={color} />

      {/* Optic nerve at the back */}
      <line
        x1={space ? 78 : 60}
        y1={130}
        x2={space ? 56 : 40}
        y2={130}
        stroke={SUIT}
        strokeWidth={10}
        strokeLinecap="round"
      />

      {/* Optic disc — flat on Earth, swollen & pulsing in space */}
      {space ? (
        <motion.circle
          cx={80}
          cy={130}
          r={10}
          fill={color}
          animate={{ r: [8, 12, 8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <ellipse cx={62} cy={130} rx={4} ry={9} fill={color} opacity={0.8} />
      )}

      {/* Choroidal folds (space only) */}
      {space &&
        [112, 130, 148].map((y, i) => (
          <motion.path
            key={i}
            d={`M92 ${y} q10 -5 20 0 t20 0`}
            fill="none"
            stroke={color}
            strokeWidth={1.4}
            opacity={0.5}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
    </g>
  );
}

/* ---------- Radiation: shielded vs unshielded ---------- */
function Radiation({ side, color }: { side: Side; color: string }) {
  const space = side === "space";
  const rays = [70, 95, 120, 145, 170];

  return (
    <g>
      {space ? (
        <>
          {/* Unshielded: rays punch straight through a cell */}
          {rays.map((x, i) => (
            <motion.line
              key={i}
              x1={x}
              x2={x}
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ y1: 20, y2: 40, opacity: 0 }}
              animate={{ y1: [20, 210], y2: [40, 230], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.28, ease: "linear" }}
            />
          ))}
          {/* DNA / cell that gets hit */}
          <motion.circle
            cx={120}
            cy={130}
            r={26}
            fill="none"
            stroke={SUIT}
            strokeWidth={2}
            animate={{ stroke: [SUIT, color, SUIT] }}
            transition={{ duration: 1.3, repeat: Infinity }}
          />
          <motion.circle
            cx={120}
            cy={130}
            r={6}
            fill={color}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </>
      ) : (
        <>
          {/* Shielded: magnetosphere arcs deflect the rays */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M40 ${200 - i * 14} Q120 ${120 - i * 18} 200 ${200 - i * 14}`}
              fill="none"
              stroke={color}
              strokeWidth={1.6}
              opacity={0.35 - i * 0.07}
            />
          ))}
          {/* Planet surface */}
          <path d="M30 214 Q120 188 210 214 L210 240 L30 240 Z" fill={color} fillOpacity={0.18} />
          {/* Rays approaching, then deflecting away */}
          {rays.map((x, i) => (
            <motion.circle
              key={i}
              r={2.6}
              fill={color}
              initial={{ cx: x, cy: 16, opacity: 0 }}
              animate={{
                cx: [x, x, x < 120 ? x - 50 : x + 50],
                cy: [16, 120, 70],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
            />
          ))}
        </>
      )}
    </g>
  );
}

/* ---------- Sleep & the Mind: body clock and sleep waves ---------- */
function wavePath(amp: number, freq: number, phase: number, y = 140) {
  const x0 = 70;
  const x1 = 150;
  const steps = 18;
  let d = `M ${x0} ${y}`;
  for (let i = 1; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const yy = y + amp * Math.sin(freq * i + phase);
    d += ` L ${x.toFixed(1)} ${yy.toFixed(1)}`;
  }
  return d;
}

function Mind({ side, color }: { side: Side; color: string }) {
  const space = side === "space";
  // sky arc the suns travel along
  const sunXs = space ? [55, 80, 105, 130, 155, 180] : [110];

  return (
    <g>
      {/* Sky arc */}
      <path d="M40 86 Q110 44 180 86" fill="none" stroke={SUIT} strokeWidth={1.5} opacity={0.3} />

      {/* Sun(s) crossing the sky */}
      {space ? (
        sunXs.map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={86 - Math.sin(((x - 40) / 140) * Math.PI) * 42}
            r={5}
            fill={color}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))
      ) : (
        <motion.circle
          r={7}
          fill={color}
          initial={{ cx: 50, cy: 84 }}
          animate={{ cx: [50, 110, 170], cy: [84, 44, 84], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Head */}
      <circle cx={110} cy={150} r={52} fill="#1a2350" stroke={SUIT} strokeWidth={2.5} />

      {/* Brain activity / sleep waves inside head */}
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        animate={
          space
            ? {
                d: [
                  wavePath(16, 2.2, 0, 150),
                  wavePath(16, 2.2, 1.6, 150),
                  wavePath(16, 2.2, 3.2, 150),
                ],
              }
            : {
                d: [wavePath(5, 0.8, 0, 150), wavePath(5, 0.8, 1.2, 150), wavePath(5, 0.8, 0, 150)],
              }
        }
        transition={{ duration: space ? 0.7 : 3.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Second fainter wave for fullness */}
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        opacity={0.4}
        animate={
          space
            ? { d: [wavePath(11, 1.7, 1, 168), wavePath(11, 1.7, 2.5, 168), wavePath(11, 1.7, 4, 168)] }
            : { d: [wavePath(3, 0.7, 1, 168), wavePath(3, 0.7, 2, 168), wavePath(3, 0.7, 1, 168)] }
        }
        transition={{ duration: space ? 0.9 : 3.6, repeat: Infinity, ease: "linear" }}
      />
    </g>
  );
}

/* ---------- Immune & Infection: balanced vs dysregulated defense ---------- */
function Antibody({ x, y, color, opacity = 1 }: { x: number; y: number; color: string; opacity?: number }) {
  return (
    <g stroke={color} strokeWidth={2.2} strokeLinecap="round" opacity={opacity} fill="none">
      <line x1={x} y1={y} x2={x} y2={y + 9} />
      <line x1={x} y1={y} x2={x - 6} y2={y - 7} />
      <line x1={x} y1={y} x2={x + 6} y2={y - 7} />
    </g>
  );
}

function Virus({ x, y, color, active }: { x: number; y: number; color: string; active: boolean }) {
  const spikes = [0, 60, 120, 180, 240, 300];
  return (
    <motion.g
      animate={active ? { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] } : {}}
      transition={{ duration: 1.4, repeat: Infinity }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {spikes.map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + Math.cos(r) * 7}
            y2={y + Math.sin(r) * 7}
            stroke={color}
            strokeWidth={1.4}
            opacity={active ? 0.9 : 0.4}
          />
        );
      })}
      <circle cx={x} cy={y} r={3.4} fill={color} opacity={active ? 1 : 0.45} />
    </motion.g>
  );
}

function Immune({ side, color }: { side: Side; color: string }) {
  const space = side === "space";
  return (
    <g>
      {/* Central cell */}
      <circle cx={110} cy={128} r={36} fill="#1a2350" stroke={SUIT} strokeWidth={2.5} />
      <circle cx={110} cy={128} r={12} fill={SUIT} fillOpacity={0.2} stroke={SUIT} strokeWidth={1.5} />

      {/* Antibodies patrolling — many on Earth, few/faded in space */}
      {space ? (
        <>
          <Antibody x={150} y={86} color={SUIT} opacity={0.35} />
          <Antibody x={74} y={170} color={SUIT} opacity={0.35} />
        </>
      ) : (
        <>
          <Antibody x={150} y={86} color={color} />
          <Antibody x={70} y={96} color={color} />
          <Antibody x={158} y={156} color={color} />
          <Antibody x={66} y={166} color={color} />
          <Antibody x={110} y={70} color={color} />
        </>
      )}

      {/* Viruses — dormant on Earth, reactivating & spreading in space */}
      {space ? (
        <>
          <Virus x={110} y={128} color={color} active />
          {[
            [150, 100],
            [78, 104],
            [156, 162],
            [80, 168],
            [120, 196],
          ].map(([x, y], i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4 }}
            >
              <Virus x={x} y={y} color={color} active />
            </motion.g>
          ))}
        </>
      ) : (
        <>
          <Virus x={100} y={132} color={SUIT} active={false} />
          <Virus x={120} y={120} color={SUIT} active={false} />
        </>
      )}
    </g>
  );
}

/* ---------- Medicine Far From Earth: the safety net vs autonomy ---------- */
function MedCross({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  const a = 4 * s;
  const b = 11 * s;
  return (
    <g fill={color}>
      <rect x={x - a} y={y - b} width={a * 2} height={b * 2} rx={a} />
      <rect x={x - b} y={y - a} width={b * 2} height={a * 2} rx={a} />
    </g>
  );
}

function Mission({ side, color }: { side: Side; color: string }) {
  const space = side === "space";

  if (!space) {
    return (
      <g>
        {/* Earth surface — help is close */}
        <path d="M20 224 Q110 196 200 224 L200 240 L20 240 Z" fill={color} fillOpacity={0.18} />
        {/* Pulsing care rings */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={110}
            cy={120}
            r={34}
            fill="none"
            stroke={color}
            strokeWidth={2}
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: [0.5, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
        <circle cx={110} cy={120} r={30} fill="#1a2350" stroke={color} strokeWidth={2} />
        <MedCross x={110} y={120} s={1.2} color={color} />
      </g>
    );
  }

  return (
    <g>
      {/* Tiny distant Earth, bottom-left */}
      <circle cx={48} cy={196} r={16} fill="#1a2350" stroke={SUIT} strokeWidth={2} />
      <path d="M36 192 q12 -6 24 0" fill="none" stroke={color} strokeWidth={1.5} opacity={0.6} />

      {/* Lone capsule, top-right */}
      <g>
        <rect x={150} y={54} width={34} height={22} rx={8} fill="#1a2350" stroke={SUIT} strokeWidth={2} />
        <circle cx={167} cy={65} r={5} fill={color} />
        <MedCross x={167} y={94} s={0.7} color={color} />
      </g>

      {/* Long dashed comms line with a slow-traveling signal (delay) */}
      <line x1={60} y1={188} x2={158} y2={70} stroke={SUIT} strokeWidth={1.4} strokeDasharray="4 5" opacity={0.5} />
      <motion.circle
        r={3.6}
        fill={color}
        initial={{ cx: 60, cy: 188 }}
        animate={{ cx: [60, 158], cy: [188, 70], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Delay clock */}
      <g>
        <circle cx={104} cy={138} r={15} fill="#1a2350" stroke={SUIT} strokeWidth={2} />
        <line x1={104} y1={138} x2={104} y2={128} stroke={color} strokeWidth={2} strokeLinecap="round" />
        <motion.line
          x1={104}
          y1={138}
          x2={113}
          y2={138}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
        />
      </g>
    </g>
  );
}

export default function CompareVisual({
  variant,
  side,
  color,
}: {
  variant: Variant;
  side: Side;
  color: string;
}) {
  return (
    <svg
      viewBox="0 0 220 240"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "heart" && <Body side={side} color={color} />}
      {variant === "bone" && <Bone side={side} color={color} />}
      {variant === "brain" && <Eye side={side} color={color} />}
      {variant === "radiation" && <Radiation side={side} color={color} />}
      {variant === "mind" && <Mind side={side} color={color} />}
      {variant === "immune" && <Immune side={side} color={color} />}
      {variant === "mission" && <Mission side={side} color={color} />}
    </svg>
  );
}
