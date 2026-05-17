import Link from "next/link";
import Image from "next/image";
import { HeroDemo } from "./HeroDemo";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90dvh] flex items-center">
      <Image
        src="/panda/bmb1.png"
        alt=""
        width={100}
        height={360}
        className="absolute -left-2 top-[12%] w-20 lg:w-24 opacity-60 hidden md:block pointer-events-none select-none"
      />
      <Image
        src="/panda/pen.png"
        alt=""
        width={200}
        height={400}
        className="absolute right-[8%] -bottom-8 w-[140px] lg:w-[180px] opacity-25 rotate-[-25deg] hidden lg:block pointer-events-none select-none"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center w-full">
        <div className="animate-fade-in-up">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--green-deep)] mb-5 font-medium">
            пишите &middot; понимайте &middot; запоминайте
          </div>
          <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tighter leading-none font-display font-medium">
            Учите иероглифы
            <br />
            через письмо.
            <br />
            <span className="text-[var(--green-deep)] typewriter-cursor">
              Запоминайте надолго
            </span>
          </h1>
          <p className="mt-7 text-[var(--foreground-muted)] max-w-lg text-base sm:text-lg leading-relaxed">
            Правильный порядок черт, активная практика и умные повторения —
            всё, чтобы знания остались с вами.
          </p>
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <Link
              href="/learn"
              className="btn btn-primary btn-lg h-13 px-7 text-base relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Начать бесплатно
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-[var(--background)] bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-2)]"
                />
              ))}
            </div>
            <div className="text-sm text-[var(--foreground-muted)]">
              <span className="font-medium text-[var(--foreground)]">
                12 000+
              </span>{" "}
              учеников уже с нами
            </div>
          </div>
        </div>
        <div className="relative animate-float">
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
