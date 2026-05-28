import Link from "next/link";
import { Search, PenLine, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: 1,
    icon: Search,
    title: "Изучайте",
    body: "Смысл, произношение и примеры использования.",
  },
  {
    n: 2,
    icon: PenLine,
    title: "Пишите",
    body: "Учитесь правильному порядку черт.",
  },
  {
    n: 3,
    icon: RefreshCw,
    title: "Повторяйте",
    body: "Умные интервалы закрепляют знания надолго.",
  },
  {
    n: 4,
    icon: CheckCircle,
    title: "Применяйте",
    body: "Используйте иероглифы в контексте.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-14 sm:py-18 lg:py-20 bg-[var(--surface-2)] border-y border-[var(--border)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Left — editorial text */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-3 font-medium">
              Как это работает
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-medium tracking-[-0.02em] leading-[1.1]">
              От первой черты
              <br />
              до уверенного письма
            </h2>
            <p className="mt-4 text-[var(--foreground-muted)] text-[15px] leading-relaxed max-w-sm">
              Пошаговый путь, который делает сложное простым и&nbsp;понятным.
            </p>
          </div>

          {/* Right — 4 step cards in 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {STEPS.map(({ n, icon: Icon, title, body }) => (
              <div
                key={n}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 transition-colors duration-200 hover:bg-white"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center">
                    <Icon size={20} strokeWidth={1.5} className="text-[var(--foreground-muted)]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-6 w-6 rounded-full bg-[var(--green)] text-white flex items-center justify-center text-xs font-semibold">
                    {n}
                  </span>
                  <span className="font-medium text-[15px] tracking-tight">{title}</span>
                </div>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
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
