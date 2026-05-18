import Link from "next/link";
import Image from "next/image";
import { HeroDemo } from "./HeroDemo";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8">
        {/* Top: large cinematic headline spanning full width */}
        <div className="animate-fade-in-up max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-5 font-medium">
            пишите &middot; понимайте &middot; запоминайте
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-medium tracking-[-0.035em] leading-[1.02]">
            Учите иероглифы
            <br />
            через письмо.
          </h1>
          <p className="mt-1 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-medium tracking-[-0.03em] leading-[1.08] text-[var(--green-deep)]">
            Запоминайте надолго
          </p>
        </div>

        {/* Bottom: description + CTA left, app preview right — asymmetric */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-[0.55fr_1fr] gap-8 lg:gap-12 items-end">
          <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <p className="text-[var(--foreground-muted)] max-w-sm text-base leading-[1.7]">
              Правильный порядок черт, активная практика и умные повторения,
              чтобы знания остались с вами.
            </p>
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <Link
                href="/learn"
                className="btn btn-primary h-12 px-7 text-[15px] relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="absolute inset-0 animate-shimmer pointer-events-none" />
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-1.5">
                  {["А", "Д", "Е", "М", "С"].map((letter, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-[var(--background)] bg-[var(--green-soft)] flex items-center justify-center text-[10px] font-medium text-[var(--green-deep)]"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-[var(--foreground-muted)]">
                  <span className="font-medium text-[var(--foreground)]">12 000+</span> учеников
                </span>
              </div>
            </div>
          </div>

          {/* App preview — visually dominant */}
          <div className="relative animate-float lg:-mb-4">
            <HeroDemo />
            <Image
              src="/panda/panda_resting.png"
              alt=""
              width={100}
              height={100}
              className="absolute -right-2 -bottom-2 w-16 sm:w-20 opacity-90 pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
