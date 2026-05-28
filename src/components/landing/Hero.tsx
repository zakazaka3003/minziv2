import Link from "next/link";
import Image from "next/image";
import { HeroDemo } from "./HeroDemo";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bamboo decoration — left edge */}
      <Image
        src="/bamboo/bamboo_2.png"
        alt=""
        width={120}
        height={400}
        className="absolute left-0 top-[5%] w-[70px] sm:w-[90px] lg:w-[110px] opacity-[0.12] pointer-events-none select-none hidden lg:block"
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 lg:pt-16 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center">
          {/* Left — text content */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-5 font-medium">
              пишите &middot; понимайте &middot; запоминайте
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[3.8rem] font-display font-medium tracking-[-0.03em] leading-[1.06]">
              Учите иероглифы
              <br />
              через письмо.
              <br />
              <span className="text-[var(--green-deep)]">Запоминайте надолго</span>
            </h1>
            <p className="mt-5 text-[var(--foreground-muted)] max-w-[400px] text-[15px] leading-[1.65]">
              Minzi помогает освоить китайские иероглифы с&nbsp;помощью активного письма, умных повторений и&nbsp;контекстных примеров.
            </p>
            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <Link
                href="/learn"
                className="btn btn-primary h-12 px-7 text-[15px] group"
              >
                <span className="flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {["А", "Д", "Е", "М"].map((letter, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[var(--background)] bg-[var(--green-soft)] flex items-center justify-center text-xs font-medium text-[var(--green-deep)]"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[var(--foreground-muted)]">
                  <span className="font-medium text-[var(--foreground)]">12 000+</span> учеников
                  <br />
                  <span className="text-xs">уже с нами</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right — app preview + phone mockup */}
          <div className="relative">
            <div className="max-w-[480px] mx-auto lg:mx-0 lg:ml-auto">
              <HeroDemo />
            </div>
            {/* Phone mockup overlay — positioned to overlap right side */}
            <div className="absolute -right-4 sm:right-0 top-[15%] w-[120px] sm:w-[140px] lg:w-[160px] hidden md:block pointer-events-none select-none">
              <div className="bg-white rounded-[24px] border-[3px] border-[#1c231e] p-2 shadow-lg">
                <div className="rounded-[18px] overflow-hidden bg-[var(--surface)] aspect-[9/16] flex flex-col items-center justify-center gap-2 p-3">
                  <div className="text-[8px] text-[var(--foreground-soft)] uppercase tracking-wider">2 / 8</div>
                  <div className="text-[10px] text-[var(--foreground-soft)]">Пишите</div>
                  <div className="hanzi text-3xl text-[var(--ink)]">你</div>
                  <div className="text-[8px] text-[var(--foreground-muted)] mt-1">Ты, Вы</div>
                  <div className="mt-auto w-8 h-8 rounded-full bg-[var(--green)] flex items-center justify-center">
                    <PenIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mountain silhouettes — bottom edge, ink wash style */}
      <div className="relative h-[60px] sm:h-[80px] lg:h-[100px] overflow-hidden opacity-[0.06] pointer-events-none select-none">
        <svg viewBox="0 0 1600 100" fill="none" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0 100 L0 70 Q200 20 400 60 Q500 40 600 55 Q750 15 900 50 Q1000 30 1100 45 Q1250 10 1400 40 Q1500 25 1600 35 L1600 100Z" fill="#1c231e" />
          <path d="M0 100 L0 80 Q300 50 500 75 Q700 45 900 65 Q1100 40 1300 60 Q1500 45 1600 55 L1600 100Z" fill="#1c231e" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}

function PenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </svg>
  );
}
