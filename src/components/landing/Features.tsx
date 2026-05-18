import { PenLine, Brush, RefreshCw, Trophy } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-[var(--surface-2)] border-y border-[var(--border)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--border)] rounded-xl overflow-hidden">
          {/* Primary — large left cell */}
          <div className="bg-[var(--surface)] p-8 sm:p-10 lg:p-12 flex flex-col justify-center lg:row-span-2">
            <div className="h-10 w-10 rounded-lg bg-[var(--green)] flex items-center justify-center mb-5">
              <PenLine size={20} strokeWidth={1.6} className="text-white" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.025em] leading-[1.1]">
              Пишите,
              <br />
              а&nbsp;не&nbsp;просто смотрите
            </h3>
            <p className="mt-4 text-[var(--foreground-muted)] leading-relaxed max-w-sm text-base">
              Активное письмо задействует моторную и визуальную память одновременно. Запоминание происходит в&nbsp;3&nbsp;раза быстрее, чем при пассивном чтении.
            </p>
          </div>

          {/* Top-right */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 flex items-start gap-4">
            <Brush size={20} strokeWidth={1.6} className="text-[var(--green)] shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-base tracking-tight">Правильный порядок черт</h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mt-1.5">
                Пошаговые анимации учат писать каждый штрих точно и&nbsp;красиво, как в&nbsp;прописях.
              </p>
            </div>
          </div>

          {/* Bottom-right — splits into two */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)]">
            <div className="bg-[var(--surface)] p-6 sm:p-8 flex items-start gap-4">
              <RefreshCw size={20} strokeWidth={1.6} className="text-[var(--green)] shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-base tracking-tight">Умные повторения</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mt-1.5">
                  Алгоритм напоминает в&nbsp;нужный момент, чтобы вы&nbsp;не&nbsp;забывали.
                </p>
              </div>
            </div>
            <div className="bg-[var(--surface)] p-6 sm:p-8 flex items-start gap-4">
              <Trophy size={20} strokeWidth={1.6} className="text-[var(--green)] shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-base tracking-tight">Прогресс</h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mt-1.5">
                  Видите свой рост и&nbsp;знаете, над&nbsp;чем работать дальше.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
