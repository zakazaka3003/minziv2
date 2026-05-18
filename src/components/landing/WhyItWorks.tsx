import { Brain, Eye, CalendarDays, Sprout } from "lucide-react";

const STATS = [
  { value: "3×", label: "быстрее запоминание через письмо" },
  { value: "92%", label: "учеников помнят иероглифы через месяц" },
  { value: "12 000+", label: "активных учеников" },
];

const PRINCIPLES = [
  {
    icon: Brain,
    title: "Моторная память",
    body: "Движение рукой создаёт устойчивые нейронные связи.",
  },
  {
    icon: Eye,
    title: "Визуальное распознавание",
    body: "Вы запоминаете не только значение, но и форму иероглифа.",
  },
  {
    icon: CalendarDays,
    title: "Интервальное повторение",
    body: "Алгоритм рассчитывает оптимальный момент для повторения.",
  },
  {
    icon: Sprout,
    title: "Постепенное усложнение",
    body: "От простых иероглифов к составным — без перегрузки.",
  },
];

export function WhyItWorks() {
  return (
    <section className="bg-[#152e20] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        {/* Top: headline + stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-20 items-start">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-medium tracking-[-0.03em] leading-[1.05]">
              Метод, подтверждённый
              <br />
              когнитивной наукой
            </h2>
            <p className="mt-4 text-[oklch(0.72_0.03_145)] text-base leading-relaxed max-w-md">
              Каждый этап обучения задействует отдельный канал памяти.
              Письмо, зрение, контекст и&nbsp;повторение работают вместе.
            </p>
          </div>

          {/* Stats — right */}
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.value}>
                <div className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-[oklch(0.82_0.12_150)]">
                  {s.value}
                </div>
                <div className="text-sm text-[oklch(0.58_0.03_145)] mt-1 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: 4 principles in a row */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={20} strokeWidth={1.5} className="text-[oklch(0.72_0.1_150)] mb-3" />
              <div className="font-medium text-base tracking-tight mb-1.5">{title}</div>
              <p className="text-sm text-[oklch(0.58_0.03_145)] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
