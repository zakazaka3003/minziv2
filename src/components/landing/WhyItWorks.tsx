import Image from "next/image";
import { Brain, Eye, CalendarDays, Sprout } from "lucide-react";

const ITEMS = [
  {
    icon: Brain,
    title: "Вы пишете",
    body: "Движение рукой активирует моторную память.",
  },
  {
    icon: Eye,
    title: "Вы видите",
    body: "Визуальное восприятие помогает запомнить образ.",
  },
  {
    icon: CalendarDays,
    title: "Вы повторяете",
    body: "Алгоритм повторений закрепляет в нужное время.",
  },
  {
    icon: Sprout,
    title: "Вы запоминаете",
    body: "Информация переходит в долгосрочную память.",
  },
];

export function WhyItWorks() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#152e20]">
      <div className="relative z-[2] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Large typographic statement — full width, editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-display font-medium tracking-[-0.03em] leading-[1.05] text-white">
              Почему это
              <br />
              работает
            </h2>
            <p className="mt-5 text-[oklch(0.72_0.03_145)] text-base leading-relaxed max-w-md">
              Метод Minzi основан на четырёх принципах когнитивной науки. Каждый этап обучения задействует отдельный канал памяти.
            </p>
            <Image
              src="/panda/reading_for_web.png"
              alt=""
              width={200}
              height={200}
              className="mt-8 w-32 lg:w-40 drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] hidden sm:block"
            />
          </div>

          {/* Right: 4 items as a numbered list, not cards */}
          <div className="space-y-6 pt-2">
            {ITEMS.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="h-9 w-9 shrink-0 rounded-full border border-[oklch(0.4_0.04_145)] flex items-center justify-center">
                  <Icon size={16} strokeWidth={1.6} className="text-[oklch(0.75_0.1_150)]" />
                </div>
                <div>
                  <div className="font-medium text-white text-base tracking-tight">{title}</div>
                  <div className="text-sm text-[oklch(0.62_0.03_145)] mt-0.5 leading-relaxed">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
