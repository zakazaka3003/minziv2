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
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[#1a3f2a] to-[var(--background)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)]" style={{ top: "-1px", bottom: "-1px" }} />
      </div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--background)] to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent z-[1]" />

      <div className="relative z-[2] max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-center">
        <div className="flex items-center gap-6">
          <Image
            src="/panda/reading_for_web.png"
            alt=""
            width={180}
            height={180}
            className="hidden md:block drop-shadow-lg"
          />
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter leading-none text-white">
            Почему это
            <br />
            <span className="text-[#a9d8b4]">работает</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-white/95">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-2.5">
              <div className="h-11 w-11 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-white/80">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div className="font-medium tracking-tight">{title}</div>
              <div className="text-sm text-white/60 leading-relaxed">
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
