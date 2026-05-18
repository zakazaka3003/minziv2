import Link from "next/link";
import { Volume2, Play, ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Изучайте значение и произношение",
    body: "Понимайте смысл и контекст использования.",
  },
  {
    n: 2,
    title: "Смотрите порядок черт",
    body: "Смотрите анимацию и запоминайте движения.",
  },
  {
    n: 3,
    title: "Пишите сами",
    body: "Тренируйтесь писать и получайте подсказки.",
  },
  {
    n: 4,
    title: "Закрепляйте и запоминайте",
    body: "Повторяйте в нужный момент и помните надолго.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-12 sm:py-16 bg-[var(--surface-2)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20 items-center">
        {/* Left — editorial text block */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-3 font-medium">
            Как проходит обучение
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-medium tracking-[-0.03em] leading-[1.05]">
            От первой черты
            <br />
            <span className="text-[var(--green-deep)]">до уверенного письма</span>
          </h2>
          <ol className="mt-8 space-y-5">
            {STEPS.map(({ n, title, body }) => (
              <li key={n} className="flex gap-4 items-start">
                <div className="h-8 w-8 shrink-0 rounded-full bg-[var(--green)] text-white flex items-center justify-center text-xs font-semibold mt-0.5">
                  {n}
                </div>
                <div>
                  <div className="font-medium text-base tracking-tight">{title}</div>
                  <div className="text-sm text-[var(--foreground-muted)] mt-0.5 leading-relaxed">
                    {body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/learn" className="btn btn-secondary group text-sm">
              Попробовать демо-урок
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Right — overlapping cards with depth */}
        <div className="relative h-[380px] sm:h-[420px] hidden lg:block">
          {/* Card 1 — background left */}
          <div className="absolute left-0 top-8 w-[52%] -rotate-2 z-[1]">
            <MockCard title="Значение">
              <div className="hanzi text-6xl text-center">你</div>
              <div className="pinyin text-center text-[var(--foreground-muted)] mt-2">nǐ</div>
              <div className="text-center text-sm mt-1">ты, вы</div>
              <div className="text-[10px] uppercase tracking-wider mt-3 text-[var(--foreground-soft)]">Примеры</div>
              <div className="mt-1.5 grid gap-1">
                <Example han="你好" pin="nǐ hǎo" ru="привет" />
                <Example han="你们" pin="nǐ men" ru="вы (мн. ч.)" />
              </div>
            </MockCard>
          </div>

          {/* Card 2 — center, elevated, dominant */}
          <div className="absolute left-[22%] top-0 w-[52%] z-[3]">
            <MockCard title="Порядок черт" elevated>
              <div className="cali-grid border border-[var(--border)] rounded-md p-1 mt-1">
                <div className="hanzi text-7xl text-center text-[var(--ink)]">
                  <span style={{ color: "#c43a3a" }}>你</span>
                </div>
              </div>
              <div className="text-center mt-2.5 text-xs text-[var(--foreground-muted)]">2 / 6</div>
              <div className="flex items-center justify-center gap-2 mt-2.5">
                <button className="btn btn-ghost h-8 w-8 p-0">
                  <ArrowRight size={14} className="rotate-180" />
                </button>
                <button className="btn btn-primary h-9 w-9 p-0">
                  <Play size={14} />
                </button>
                <button className="btn btn-ghost h-8 w-8 p-0">
                  <ArrowRight size={14} />
                </button>
              </div>
            </MockCard>
          </div>

          {/* Card 3 — background right */}
          <div className="absolute right-0 top-12 w-[52%] rotate-2 z-[2]">
            <MockCard title="Практика">
              <div className="cali-grid border border-[var(--border)] rounded-md p-1">
                <div className="hanzi text-7xl text-center text-[var(--foreground-soft)]">你</div>
              </div>
              <div className="bg-[var(--surface-2)] rounded-md mt-2.5 px-2.5 py-1.5">
                <div className="text-[var(--foreground-muted)] text-xs">
                  你 теперь живёт в вашей библиотеке.
                </div>
              </div>
              <button className="btn btn-primary w-full mt-2.5 h-8 text-xs">
                Далее <ArrowRight size={12} />
              </button>
            </MockCard>
          </div>
        </div>

        {/* Mobile fallback: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto scroll-hide pb-4 lg:hidden -mx-4 px-4">
          <div className="shrink-0 w-[260px] -rotate-1">
            <MockCard title="Значение">
              <div className="hanzi text-5xl text-center">你</div>
              <div className="pinyin text-center text-[var(--foreground-muted)] mt-1">nǐ</div>
              <div className="text-center text-sm mt-1">ты, вы</div>
            </MockCard>
          </div>
          <div className="shrink-0 w-[260px]">
            <MockCard title="Порядок черт" elevated>
              <div className="cali-grid border border-[var(--border)] rounded-md p-1">
                <div className="hanzi text-6xl text-center"><span style={{ color: "#c43a3a" }}>你</span></div>
              </div>
            </MockCard>
          </div>
          <div className="shrink-0 w-[260px] rotate-1">
            <MockCard title="Практика">
              <div className="hanzi text-5xl text-center text-[var(--foreground-soft)]">你</div>
              <button className="btn btn-primary w-full mt-3 h-8 text-xs">Далее <ArrowRight size={12} /></button>
            </MockCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockCard({
  title,
  elevated,
  children,
}: {
  title: string;
  elevated?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg p-4 flex flex-col gap-1.5 bg-[var(--surface)] border border-[var(--border)] transition-transform ${
        elevated ? "shadow-lg scale-[1.02]" : "shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between text-[11px] text-[var(--foreground-muted)]">
        <span className="flex items-center gap-1">
          <ArrowRight size={10} className="rotate-180" /> {title}
        </span>
        <Volume2 size={10} />
      </div>
      {children}
    </div>
  );
}

function Example({ han, pin, ru }: { han: string; pin: string; ru: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="hanzi text-base">{han}</span>
      <span className="pinyin text-[10px] text-[var(--foreground-muted)]">{pin}</span>
      <span className="text-[10px] text-[var(--foreground-muted)] ml-auto">{ru}</span>
    </div>
  );
}
