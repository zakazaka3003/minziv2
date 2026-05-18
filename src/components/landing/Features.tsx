import { PenLine, Brush, RefreshCw, Trophy } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-6 sm:py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3">
          {/* Primary feature — large, left-heavy */}
          <div className="bg-[var(--green-soft)] border border-[var(--border)] rounded-lg p-8 sm:p-10 flex flex-col justify-center min-h-[200px] transition-colors duration-150 hover:bg-[oklch(0.92_0.04_145)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--green)] flex items-center justify-center">
                <PenLine size={20} strokeWidth={1.6} className="text-white" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-[-0.02em]">
                Пишите, а не просто смотрите
              </h3>
            </div>
            <p className="text-[var(--foreground-muted)] leading-relaxed max-w-md ml-[52px]">
              Активное письмо задействует моторную и визуальную память одновременно — запоминание происходит в 3 раза быстрее, чем при пассивном чтении.
            </p>
          </div>

          {/* Secondary features — stacked vertically, compact */}
          <div className="flex flex-col gap-3">
            <FeatureRow
              icon={Brush}
              title="Правильный порядок черт"
              body="Анимации и подсказки учат писать точно и красиво."
            />
            <FeatureRow
              icon={RefreshCw}
              title="Умные повторения"
              body="Повторяем в нужный момент, чтобы вы не забывали."
            />
            <FeatureRow
              icon={Trophy}
              title="Отслеживание прогресса"
              body="Видите свой рост и знаете, над чем работать дальше."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors duration-150 hover:bg-[var(--surface-2)]">
      <Icon size={18} strokeWidth={1.6} className="text-[var(--green)] shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-[15px] tracking-tight leading-snug">{title}</h3>
        <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mt-1">{body}</p>
      </div>
    </div>
  );
}
