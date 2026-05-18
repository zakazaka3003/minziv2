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
    <section className="relative py-12 sm:py-16 overflow-hidden bg-[var(--surface-2)]">
      <div className="relative z-[2] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-center">
          {/* Left: heading + panda */}
          <div className="flex flex-col items-center lg:items-start gap-4 lg:max-w-[260px]">
            <Image
              src="/panda/reading_for_web.png"
              alt=""
              width={200}
              height={200}
              className="w-28 lg:w-36 drop-shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
            />
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-medium tracking-[-0.02em] leading-[1.1] text-center lg:text-left">
              Почему это
              <br />
              <span className="text-[var(--green-deep)]">работает</span>
            </h2>
          </div>

          {/* Right: 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ITEMS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors duration-200 hover:bg-white"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <Icon
                    size={16}
                    strokeWidth={1.6}
                    className="text-[var(--green)]"
                  />
                  <span className="font-medium tracking-tight text-[15px]">
                    {title}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
