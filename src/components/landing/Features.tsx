import { PenLine, Brush, RefreshCw, Trophy } from "lucide-react";

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
  const primary = ITEMS[0];
  const rest = ITEMS.slice(1);
  const PrimaryIcon = primary.icon;

  return (
    <section id="features" className="py-8 sm:py-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-3">
          {/* Primary feature — spans full height */}
          <div className="bg-[var(--green-soft)] border border-[var(--border)] rounded-lg p-6 flex flex-col justify-center transition-colors duration-150 hover:bg-[oklch(0.92_0.04_145)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-md bg-[var(--green)] flex items-center justify-center">
                <PrimaryIcon size={16} strokeWidth={1.6} className="text-white" />
              </div>
              <h3 className="font-medium text-base tracking-tight">
                {primary.title}
              </h3>
            </div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
              {primary.body}
            </p>
          </div>

          {/* Secondary features */}
          {rest.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5 flex items-start gap-4 transition-colors duration-150 hover:bg-[var(--surface-2)]"
            >
              <Icon
                size={18}
                strokeWidth={1.6}
                className="text-[var(--green)] shrink-0 mt-0.5"
              />
              <div>
                <h3 className="font-medium text-[15px] tracking-tight leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mt-1.5">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
