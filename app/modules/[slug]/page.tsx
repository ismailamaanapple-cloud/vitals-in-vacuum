import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MODULES, getModule } from "@/lib/modules";
import ModuleHeroVisual from "@/components/module-hero-visual";
import ScrollExplainer from "@/components/interactive/scroll-explainer";
import BeforeAfter from "@/components/interactive/before-after";
import Quiz from "@/components/interactive/quiz";
import ClinicalCaseCard from "@/components/interactive/clinical-case";
import Reveal from "@/components/interactive/reveal";
import DeepDiveSection from "@/components/interactive/deep-dive";
import KeyTerms from "@/components/interactive/key-terms";
import MythReality from "@/components/interactive/myth-reality";
import Countermeasures from "@/components/interactive/countermeasures";

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) return { title: "Module not found" };
  return {
    title: `${m.title} in Space — Vitals in Vacuum`,
    description: m.summary,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const idx = MODULES.findIndex((x) => x.slug === slug);
  const next = MODULES[(idx + 1) % MODULES.length];

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28">
        <div
          className="pointer-events-none absolute -top-32 right-0 h-[40rem] w-[40rem] rounded-full opacity-20 blur-[120px]"
          style={{ background: m.accent }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Link
              href="/#modules"
              className="text-xs font-medium text-faint transition-colors hover:text-ink"
            >
              ← All modules
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: m.accent }}>
                Module {m.index}
              </span>
              <span className="h-px w-8 bg-haze" />
              <span className="text-xs text-faint">{m.duration} read</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl sm:leading-[0.95]">
              {m.title}
            </h1>
            <p className="mt-3 text-lg" style={{ color: m.accent }}>
              {m.subtitle}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-mute">
              {m.summary}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {m.facts.map((f) => (
                <div key={f.label}>
                  <div
                    className="font-display text-2xl font-bold tabular-nums"
                    style={{ color: m.accent }}
                  >
                    {f.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-tight text-faint">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative h-[360px] sm:h-[460px]">
            <ModuleHeroVisual color={m.accent} variant={m.visual} />
          </div>
        </div>
      </section>

      {/* Scroll explainer */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <h2 className="mb-12 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            How it unfolds
          </h2>
        </Reveal>
        <ScrollExplainer steps={m.steps} accent={m.accent} />
      </section>

      {/* Deep dive — long-form education */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <DeepDiveSection data={m.deepDive} accent={m.accent} />
        </Reveal>
      </section>

      {/* Before / after */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <div className="mb-8 text-center">
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              Compare
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {m.slider.title}
            </h2>
          </div>
          <BeforeAfter data={m.slider} accent={m.accent} variant={m.visual} />
        </Reveal>
      </section>

      {/* Myth vs reality */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-8 text-center">
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              Clear the air
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Myth vs. reality
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-mute">
              Common assumptions about {m.title.toLowerCase()} physiology in
              space — tap each card to flip it.
            </p>
          </div>
          <MythReality items={m.misconceptions} accent={m.accent} />
        </Reveal>
      </section>

      {/* Quiz */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <Quiz questions={m.quiz} accent={m.accent} />
        </Reveal>
      </section>

      {/* Key terms glossary */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <div className="mb-8">
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              Key terms
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              The vocabulary of {m.title.toLowerCase()} adaptation
            </h2>
            <p className="mt-3 max-w-xl text-sm text-mute">
              Tap any term to expand its definition.
            </p>
          </div>
          <KeyTerms terms={m.keyTerms} accent={m.accent} />
        </Reveal>
      </section>

      {/* Countermeasures */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-8">
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              Countermeasures
            </div>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What flight surgeons do about it
            </h2>
            <p className="mt-3 max-w-xl text-sm text-mute">
              The tools — proven and experimental — used to protect crew from
              this system&apos;s decline.
            </p>
          </div>
          <Countermeasures items={m.countermeasures} accent={m.accent} />
        </Reveal>
      </section>

      {/* Clinical case */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <ClinicalCaseCard data={m.case} accent={m.accent} />
        </Reveal>
      </section>

      {/* Next module */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <Link
          href={`/modules/${next.slug}`}
          className="group flex flex-col items-start justify-between gap-4 rounded-3xl glass p-8 transition-transform hover:-translate-y-1 sm:flex-row sm:items-center"
        >
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              Next module
            </div>
            <div className="mt-2 font-display text-2xl font-semibold">
              {next.index} · {next.title}
            </div>
            <div className="mt-1 text-sm" style={{ color: next.accent }}>
              {next.subtitle}
            </div>
          </div>
          <span
            className="text-2xl transition-transform group-hover:translate-x-1"
            style={{ color: next.accent }}
          >
            →
          </span>
        </Link>
      </section>
    </article>
  );
}
