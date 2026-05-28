import Link from "next/link";
import { Brain, RefreshCw, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

const ITEMS = [
  {
    icon: Brain,
    title: "Активное воспроизведение",
    body: "Письмо активирует больше областей мозга, чем пассивное чтение.",
  },
  {
    icon: RefreshCw,
    title: "Интервальное повторение",
    body: "Алгоритм подбирает идеальное время для повторения.",
  },
  {
    icon: BookOpen,
    title: "Контекст и примеры",
    body: "Вы запоминаете не просто символы, а понимание и применение.",
  },
  {
    icon: CheckCircle,
    title: "Прогресс наглядно",
    body: "Чёткая статистика помогает видеть свои достижения.",
  },
];

export function WhyItWorks() {
  return (
    <section className="bg-[#152e20] text-white py-14 sm:py-18 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left — editorial */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[oklch(0.55_0.03_145)] mb-3 font-medium">
              Почему Minzi работает
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-medium tracking-[-0.02em] leading-[1.1]">
              Создано на науке
              <br />
              о памяти
            </h2>
            <p className="mt-4 text-[oklch(0.68_0.03_145)] text-[15px] leading-relaxed max-w-sm">
              Мы используем проверенные методы когнитивной науки, чтобы обучение было эффективным и&nbsp;комфортным.
            </p>
            <Link
              href="#how"
              className="inline-flex items-center gap-1.5 mt-6 text-[oklch(0.75_0.1_150)] text-sm font-medium hover:text-white transition-colors group"
            >
              Узнать больше о методах
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right — 4 cards in 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {ITEMS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-[oklch(0.3_0.04_145)] bg-[oklch(0.18_0.04_145)] p-5 sm:p-6 transition-colors duration-200 hover:bg-[oklch(0.2_0.04_145)]"
              >
                <div className="h-11 w-11 rounded-full bg-[oklch(0.25_0.05_145)] border border-[oklch(0.35_0.04_145)] flex items-center justify-center mb-4">
                  <Icon size={18} strokeWidth={1.5} className="text-[oklch(0.72_0.1_150)]" />
                </div>
                <h3 className="font-medium text-[15px] tracking-tight mb-1.5">{title}</h3>
                <p className="text-sm text-[oklch(0.58_0.03_145)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
