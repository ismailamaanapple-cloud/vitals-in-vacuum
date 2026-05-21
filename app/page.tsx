import Hero from "@/components/hero";
import ModuleCard from "@/components/module-card";
import Reveal from "@/components/interactive/reveal";
import MissionTimeline from "@/components/interactive/mission-timeline";
import FAQ from "@/components/interactive/faq";
import Resources from "@/components/interactive/resources";
import { MODULES } from "@/lib/modules";

const MISSION_STATS = [
  { value: "6–12 mo", label: "Typical ISS mission duration" },
  { value: "~9 mo", label: "One-way transit to Mars" },
  { value: "Every system", label: "Affected by microgravity" },
  { value: "0", label: "Gravity to fall back on" },
];

const COUNTERMEASURES = [
  {
    title: "Reload the skeleton",
    body: "~2.5 hours of daily resistive and aerobic exercise on the ARED, treadmill, and cycle ergometer — sometimes paired with bisphosphonates — to slow bone and muscle loss.",
    accent: "#5dffc2",
  },
  {
    title: "Defend blood volume",
    body: "Fluid and salt loading before re-entry, compression anti-G garments, and in-flight lower-body negative pressure to preserve plasma volume and baroreflex tone.",
    accent: "#38e1ff",
  },
  {
    title: "Shelter from storms",
    body: "Passive shielding, dedicated storm shelters for solar particle events, and dose monitoring — though galactic cosmic rays remain the hardest unsolved problem for Mars.",
    accent: "#ffb23e",
  },
  {
    title: "Protect the mind & clock",
    body: "Engineered lighting to anchor circadian rhythm against 16 sunrises a day, structured sleep, and behavioral-health support for isolation and confinement.",
    accent: "#b06bff",
  },
];

const FAQS = [
  {
    q: "Is the human body permanently damaged by spaceflight?",
    a: "Mostly no. The majority of changes — fluid shifts, heart remodeling, balance disturbance, even much of the muscle loss — reverse over weeks to months back on Earth. The concerns are the changes that may not fully recover, such as some bone density and certain eye (SANS) findings, plus the cumulative cancer risk from radiation on very long missions.",
  },
  {
    q: "Why is going to Mars so much harder than the ISS?",
    a: "The ISS sits in low Earth orbit, still partly shielded by Earth's magnetic field, with resupply and an emergency return possible in hours. A Mars mission means roughly nine months each way with no shield, no resupply, a 20-minute communication delay, and a crew that must land and work under gravity after months of deconditioning — entirely on their own.",
  },
  {
    q: "Why does studying astronauts matter for medicine on Earth?",
    a: "Spaceflight compresses years of physiological change into months, making it a natural laboratory for aging, disuse, and disease. Bone loss mirrors osteoporosis, cardiovascular deconditioning resembles prolonged bed rest, and fluid-shift research informs how we understand intracranial pressure and glaucoma. Countermeasures developed for crews often translate back to patients.",
  },
  {
    q: "Can astronauts exercise their way out of these problems?",
    a: "Exercise is the single most important countermeasure — about 2.5 hours a day dramatically slows bone and muscle loss and helps protect the heart. But it doesn't fully prevent losses, and it does nothing for radiation, the eye changes of SANS, or the immune and psychological effects, which is why a layered set of countermeasures is needed.",
  },
  {
    q: "How much radiation do astronauts actually receive?",
    a: "In deep space, dose rates can run 50–100 times the natural background at sea level. A round trip to Mars could expose a crew member to a sizeable fraction of a career radiation limit. Galactic cosmic rays are a constant low-level threat, while a single solar particle event can deliver a dangerous dose within hours.",
  },
];

const RESOURCES = [
  {
    source: "NASA",
    title: "Human Research Program",
    blurb: "NASA's hub for the science of keeping astronauts healthy on long-duration missions, including the five hazards of spaceflight.",
    href: "https://www.nasa.gov/hrp/",
    accent: "#38e1ff",
  },
  {
    source: "NASA",
    title: "The Human Body in Space",
    blurb: "An accessible overview of how microgravity and radiation affect every major physiological system.",
    href: "https://www.nasa.gov/humans-in-space/",
    accent: "#5dffc2",
  },
  {
    source: "NASA",
    title: "The Twins Study",
    blurb: "The landmark study comparing astronaut Scott Kelly after a year in space with his identical twin on Earth.",
    href: "https://www.nasa.gov/twins-study/",
    accent: "#b06bff",
  },
  {
    source: "ESA",
    title: "Human & Robotic Exploration",
    blurb: "The European Space Agency's research on life sciences, physiology, and preparing crews for the Moon and Mars.",
    href: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration",
    accent: "#ffb23e",
  },
  {
    source: "NASA",
    title: "Bone & Muscle Loss in Microgravity",
    blurb: "How and why the weight-bearing skeleton and antigravity muscles waste away — and what's done about it.",
    href: "https://www.nasa.gov/humans-in-space/",
    accent: "#ff6b3d",
  },
  {
    source: "NIH / NCBI",
    title: "Space Physiology Literature",
    blurb: "Search peer-reviewed research on spaceflight physiology, SANS, and radiation biology in the open biomedical archive.",
    href: "https://pubmed.ncbi.nlm.nih.gov/?term=spaceflight+physiology",
    accent: "#ff5db1",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Mission stat strip */}
      <section className="relative z-10 border-y hairline bg-deep/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[color-mix(in_oklab,var(--color-ink)_8%,transparent)] sm:grid-cols-4 sm:divide-y-0">
          {MISSION_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="px-6 py-8">
              <div className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-faint">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Anatomy of a mission — interactive timeline */}
      <section id="timeline" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 pt-24">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            Anatomy of a mission
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            One body, four phases, zero gravity
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            Follow the physiological clock from the launch pad to landing day.
            Tap a phase to see which systems are under stress — and why.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <MissionTimeline />
        </Reveal>
      </section>

      {/* Modules */}
      <section id="modules" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 py-24">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            {MODULES.length} systems · one body
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Pick a system and see how it adapts
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            Each free module pairs a scroll-driven explainer and an animated
            before/after comparison with a deep dive, key terms, a self-test,
            and a real flight-surgeon clinical case.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {MODULES.map((m, i) => (
            <ModuleCard key={m.slug} module={m} i={i} />
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass p-8 sm:p-14">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-azure/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-plasma/20 blur-3xl" />
            <div className="relative max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Why space physiology is medicine&apos;s most extreme stress test
              </h2>
              <p className="mt-5 leading-relaxed text-mute">
                Spaceflight compresses years of physiological change into months.
                The heart remodels, bone dissolves, the inner ear loses its
                reference, and radiation accumulates with no atmosphere to absorb
                it. Understanding these adaptations doesn&apos;t just protect
                astronauts — it sharpens our grasp of aging, disuse, fluid
                balance, and bone disease back on Earth.
              </p>
              <p className="mt-4 leading-relaxed text-mute">
                As missions stretch toward the Moon and Mars, keeping humans
                healthy becomes the limiting factor. That makes space medicine
                one of the most interdisciplinary frontiers in clinical science.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Fighting back — countermeasures */}
      <section id="countermeasures" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 pb-28">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            Fighting back
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            How crews hold the line against space
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            Every adaptation has a countermeasure in development. None are
            perfect — and the gaps that remain define the medicine of deep-space
            exploration.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {COUNTERMEASURES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl glass p-7 transition-transform duration-300 hover:-translate-y-1">
                <div
                  className="h-10 w-10 rounded-xl"
                  style={{
                    background: `color-mix(in oklab, ${c.accent} 22%, transparent)`,
                    boxShadow: `0 0 24px -6px ${c.accent}`,
                  }}
                />
                <h3
                  className="mt-5 font-display text-xl font-bold tracking-tight"
                  style={{ color: c.accent }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mute">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-3xl scroll-mt-28 px-6 pb-28">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            Common questions
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            The questions everyone asks
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            Quick, plain-language answers to the things people most want to know
            about the human body in space.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <FAQ items={FAQS} />
        </Reveal>
      </section>

      {/* Resources */}
      <section id="resources" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 pb-28">
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-widest text-faint">
            Go deeper
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Resources &amp; further reading
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            Curated, authoritative starting points to explore space medicine
            beyond this atlas. All links open in a new tab.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Resources items={RESOURCES} />
        </Reveal>
      </section>
    </>
  );
}
