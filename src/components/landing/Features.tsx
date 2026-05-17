import { PenLine, Brush, RefreshCw, Trophy } from "lucide-react";

const ITEMS = [
  {
    icon: PenLine,
    title: "Пишите, а не просто смотрите",
    body: "Активное письмо задействует память сильнее, чем чтение.",
  },
  {
    icon: Brush,
    title: "Правильный порядок черт",
    body: "Анимации и подсказки учат писать точно и красиво.",
  },
  {
    icon: RefreshCw,
    title: "Умные повторения",
    body: "Повторяем в нужный момент, чтобы вы не забывали.",
  },
  {
    icon: Trophy,
    title: "Отслеживание прогресса",
    body: "Видите свой рост и знаете, над чем работать дальше.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ITEMS.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-5 flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md hover:border-[var(--border-strong)]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-10 w-10 rounded-md bg-[var(--green-soft)] text-[var(--green-deep)] flex items-center justify-center">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-medium text-[15px] tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
