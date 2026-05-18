import Link from "next/link";
import { HeroDemo } from "./HeroDemo";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="pt-12 sm:pt-16 lg:pt-20 pb-0">
          {/* Headline — cinematic scale, full width */}
          <h1 className="text-[clamp(2.5rem,6vw,6rem)] font-display font-medium tracking-[-0.04em] leading-[0.95] max-w-[900px]">
            Учите иероглифы
            <br />
            <span className="text-[var(--green-deep)]">через письмо</span>
          </h1>

          {/* Sub-content row: text left, stats right */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end max-w-[900px]">
            <p className="text-[var(--foreground-muted)] text-base sm:text-lg leading-[1.6] max-w-[440px]">
              Правильный порядок черт, активная практика
              и&nbsp;умные повторения — чтобы знания остались с&nbsp;вами.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/learn"
                className="btn btn-primary h-12 px-7 text-[15px] group"
              >
                <span className="flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/login"
                className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>

        {/* App preview — full-width, visually dominant */}
        <div className="mt-10 sm:mt-14 lg:mt-16 -mb-px">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-t-2xl p-4 sm:p-6 lg:p-8 shadow-[0_-4px_40px_-12px_rgba(28,35,30,0.08)]">
            <div className="max-w-[520px] mx-auto">
              <HeroDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
