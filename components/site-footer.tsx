import Link from "next/link";
import { MODULES } from "@/lib/modules";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t hairline mt-24">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="font-display text-lg font-semibold">
              Vitals in Vacuum
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
              A free, interactive atlas of human physiology in spaceflight —
              built to help students learn about, and be inspired by, the
              extraordinary medicine that keeps humans alive beyond Earth.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              Modules
            </div>
            <ul className="mt-3 space-y-2">
              {MODULES.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/modules/${m.slug}`}
                    className="text-sm text-mute transition-colors hover:text-ink"
                  >
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-faint">
              About
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              A free educational resource for students, future clinicians, and
              the space-curious. Everything here is open to learn from — no
              account, no paywall. Content synthesizes published spaceflight
              physiology and is for learning, not medical advice.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t hairline pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Vitals in Vacuum</span>
          <span className="font-mono">
            Educational use · Not medical advice
          </span>
        </div>
      </div>
    </footer>
  );
}
