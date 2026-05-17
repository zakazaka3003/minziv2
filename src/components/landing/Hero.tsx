import Link from "next/link";
import Image from "next/image";
import { HeroDemo } from "./HeroDemo";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle bamboo decoration left edge */}
      <Image
        src="/panda/bmb1.png"
        alt=""
        width={80}
        height={280}
        className="absolute -left-4 top-[18%] w-14 lg:w-18 opacity-[0.08] hidden md:block pointer-events-none select-none"
      />

      {/* Faint mountain silhouettes at bottom */}
      <div className="mountain-silhouette" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center w-full">
        <div className="animate-fade-in-up">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--green-deep)] mb-4 font-medium">
            пишите &middot; понимайте &middot; запоминайте
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] tracking-[-0.035em] leading-[1.05] font-display font-medium">
            Учите иероглифы
            <br />
            через письмо.
            <br />
            <span className="text-[var(--green-deep)] typewriter-cursor">
              Запоминайте надолго
            </span>
          </h1>
          <p className="mt-5 text-[var(--foreground-muted)] max-w-md text-[15px] leading-relaxed">
            Правильный порядок черт, активная практика и умные повторения —
            всё, чтобы знания остались с вами.
          </p>
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <Link
              href="/learn"
              className="btn btn-primary btn-lg h-12 px-6 text-[15px] relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Начать бесплатно
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[var(--background)] bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-2)]"
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
