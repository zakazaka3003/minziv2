import Link from "next/link";
import { Volume2, Play, ArrowRight } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section header — left-aligned, editorial */}
        <div className="max-w-[480px] mb-12 sm:mb-16">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-3 font-medium">
            Как устроено обучение
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-medium tracking-[-0.03em] leading-[1.05]">
            От первой черты до&nbsp;уверенного письма
          </h2>
        </div>

        {/* Steps grid — 4 columns on large, asymmetric step sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] rounded-xl overflow-hidden">
          <Step n={1} title="Значение" sub="Учите смысл, произношение и контекст использования">
            <div className="mt-4 text-center">
              <span className="hanzi text-5xl">你</span>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="pinyin text-lg">nǐ</span>
                <Volume2 size={12} className="text-[var(--foreground-soft)]" />
              </div>
              <div className="text-sm text-[var(--foreground-muted)] mt-1">ты, вы</div>
            </div>
          </Step>

          <Step n={2} title="Порядок черт" sub="Смотрите анимацию и запоминайте движения">
            <div className="mt-4">
              <div className="cali-grid border border-[var(--border)] rounded-lg aspect-square max-w-[120px] mx-auto flex items-center justify-center">
                <span className="hanzi text-5xl" style={{ color: "#c43a3a" }}>你</span>
              </div>
              <div className="text-center mt-2 text-xs text-[var(--foreground-muted)]">
                черта 2 из 7
              </div>
            </div>
          </Step>

          <Step n={3} title="Письмо" sub="Тренируйтесь писать и получайте подсказки" active>
            <div className="mt-4">
              <div className="cali-grid border border-[var(--border)] rounded-lg aspect-square max-w-[120px] mx-auto flex items-center justify-center">
                <span className="hanzi text-5xl text-[var(--foreground-soft)]">你</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3">
                <button className="btn btn-ghost h-7 px-3 text-xs">Заново</button>
                <button className="btn btn-ghost h-7 px-3 text-xs">Подсказка</button>
              </div>
            </div>
          </Step>

          <Step n={4} title="Повторение" sub="Закрепляйте в нужный момент и помните надолго">
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-[var(--green)]" />
                <span className="text-[var(--foreground-muted)]">Через 1 день</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-[var(--green)] opacity-60" />
                <span className="text-[var(--foreground-muted)]">Через 3 дня</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-[var(--green)] opacity-30" />
                <span className="text-[var(--foreground-muted)]">Через 7 дней</span>
              </div>
            </div>
          </Step>
        </div>

        <div className="mt-8 text-center">
          <Link href="/learn" className="btn btn-secondary group text-sm">
            Попробовать урок
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  sub,
  active,
  children,
}: {
  n: number;
  title: string;
  sub: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`p-6 sm:p-8 flex flex-col ${active ? "bg-[var(--green-soft)]" : "bg-[var(--surface)]"}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${
          active
            ? "bg-[var(--green)] text-white"
            : "border border-[var(--border-strong)] text-[var(--foreground-muted)]"
        }`}>
          {n}
        </div>
        <span className="font-medium text-base tracking-tight">{title}</span>
      </div>
      <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">{sub}</p>
      {children}
    </div>
  );
}
