import Image from "next/image";
import { Brain, Eye, CalendarDays, Sprout } from "lucide-react";

const ITEMS = [
  {
    icon: Brain,
    title: "Вы пишете",
    body: "Движение рукой активирует моторную память \u2014 вы запоминаете через действие.",
  },
  {
    icon: Eye,
    title: "Вы видите",
    body: "Визуальное восприятие помогает запомнить структуру и форму иероглифа.",
  },
  {
    icon: CalendarDays,
    title: "Вы повторяете",
    body: "Алгоритм интервальных повторений закрепляет знания в нужный момент.",
  },
  {
    icon: Sprout,
    title: "Вы запоминаете",
    body: "Информация постепенно переходит в долгосрочную память.",
  },
];

export function WhyItWorks() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dark jade background */}
      <div className="absolute inset-0 bg-[#152e20]" />

      {/* Mountain silhouettes */}
      <div
        className="absolute inset-x-0 bottom-0 h-[200px] opacity-[0.15]"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 200' preserveAspectRatio='none'%3E%3Cpath d='M0 200L120 140L240 170L360 100L480 150L600 80L720 130L840 60L960 110L1080 50L1200 90L1320 40L1440 70V200H0Z' fill='%230d1f14'/%3E%3Cpath d='M0 200L180 160L360 180L540 120L720 160L900 100L1080 140L1260 80L1440 120V200H0Z' fill='%230d1f14' opacity='0.6'/%3E%3C/svg%3E") no-repeat bottom/100% auto`,
        }}
      />

      {/* Top fog transition */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--background)] to-transparent z-[1]" />
      {/* Bottom fog transition */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent z-[1]" />

      {/* Atmospheric mist layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#152e20] via-transparent to-[#152e20]/80 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(169,216,180,0.08),transparent_60%)]" />

      {/* Bamboo silhouettes on edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-12 opacity-[0.06] hidden lg:block"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 400'%3E%3Cline x1='24' y1='0' x2='24' y2='400' stroke='%23a9d8b4' stroke-width='2.5'/%3E%3Cline x1='16' y1='60' x2='32' y2='60' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='16' y1='140' x2='32' y2='140' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='16' y1='220' x2='32' y2='220' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='16' y1='300' x2='32' y2='300' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cpath d='M24 60 Q40 40 36 15' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3Cpath d='M24 140 Q8 120 10 95' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3Cpath d='M24 220 Q40 200 38 175' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3Cpath d='M24 300 Q8 280 10 255' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3C/svg%3E") repeat-y left/contain`,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-12 opacity-[0.06] hidden lg:block"
        style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 400'%3E%3Cline x1='24' y1='0' x2='24' y2='400' stroke='%23a9d8b4' stroke-width='2.5'/%3E%3Cline x1='16' y1='80' x2='32' y2='80' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='16' y1='180' x2='32' y2='180' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='16' y1='280' x2='32' y2='280' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cpath d='M24 80 Q8 60 10 35' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3Cpath d='M24 180 Q40 160 38 135' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3Cpath d='M24 280 Q8 260 10 235' stroke='%23a9d8b4' stroke-width='1' fill='none'/%3E%3C/svg%3E") repeat-y right/contain`,
        }}
      />

      <div className="relative z-[2] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
          {/* Left: heading + panda */}
          <div className="flex flex-col items-center lg:items-start gap-6 lg:max-w-[320px]">
            <Image
              src="/panda/reading_for_web.png"
              alt=""
              width={200}
              height={200}
              className="w-36 lg:w-44 drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-[-0.03em] leading-[1.1] text-white text-center lg:text-left">
              Почему это
              <br />
              <span className="text-[#a9d8b4]">работает</span>
            </h2>
          </div>

          {/* Right: 2x2 grid of glass cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ITEMS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 transition-colors duration-300 hover:bg-white/[0.07]"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
              >
                <div className="h-9 w-9 rounded-md border border-white/10 bg-white/[0.05] flex items-center justify-center text-[#a9d8b4] mb-3">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <div className="font-medium tracking-tight text-white text-[15px]">
                  {title}
                </div>
                <div className="text-[13px] text-white/50 leading-relaxed mt-1.5">
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
