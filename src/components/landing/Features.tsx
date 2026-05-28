import { PenLine, Brush, RefreshCw, Trophy, ArrowRight } from "lucide-react";

const ITEMS = [
  {
    icon: PenLine,
    title: "Пишите, а не просто смотрите",
    body: "Активное письмо задействует память сильнее, чем чтение.",
    primary: true,
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
    <section id="features" className="py-12 sm:py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {ITEMS.map(({ icon: Icon, title, body, primary }) => (
            <div
              key={title}
              className={`group rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:shadow-md hover:border-[var(--border-strong)] ${
                primary ? "p-7 sm:p-8" : "p-6"
              }`}
            >
              <div className={`rounded-full border border-[var(--border)] flex items-center justify-center mb-5 ${
                primary
                  ? "h-14 w-14 bg-[var(--green-soft)]"
                  : "h-11 w-11 bg-[var(--surface-2)]"
              }`}>
                <Icon
                  size={primary ? 22 : 18}
                  strokeWidth={1.5}
                  className={primary ? "text-[var(--green)]" : "text-[var(--foreground-muted)]"}
                />
              </div>
              <h3 className={`font-medium tracking-tight leading-snug ${
                primary ? "text-lg mb-2" : "text-[15px] mb-1.5"
              }`}>
                {title}
              </h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {body}
              </p>
              <div className="mt-4">
                <ArrowRight
                  size={16}
                  className="text-[var(--foreground-soft)] group-hover:text-[var(--green)] group-hover:translate-x-0.5 transition-all duration-200"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
