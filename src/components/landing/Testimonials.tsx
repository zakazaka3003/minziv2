const REVIEWS = [
  {
    name: "Анна К.",
    sub: "изучает 8 месяцев",
    body: "Раньше я путалась в чертах и быстро забывала иероглифы. С Minzi всё стало на свои места — пишу красиво и запоминаю надолго.",
    featured: true,
  },
  {
    name: "Дмитрий Л.",
    sub: "изучает 1 год",
    body: "Понравился подход через письмо и умные повторения. Прогресс видно с первой недели.",
  },
  {
    name: "Екатерина М.",
    sub: "изучает 6 месяцев",
    body: "Это лучшее приложение для изучения китайского, что я пробовала.",
  },
];

export function Testimonials() {
  const featured = REVIEWS[0];
  const rest = REVIEWS.slice(1);

  return (
    <section id="testimonials" className="py-14 sm:py-18 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left — heading + featured quote with large quotation marks */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-3 font-medium">
              Отзывы
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-medium tracking-[-0.02em] leading-[1.1] mb-8">
              Что говорят ученики
            </h2>

            {/* Large quotation mark */}
            <div className="text-[5rem] sm:text-[6rem] font-display text-[var(--green-soft)] leading-[0.5] select-none mb-2">
              &ldquo;
            </div>
            <blockquote className="text-lg sm:text-xl font-display leading-[1.45] tracking-[-0.01em] text-[var(--foreground)] max-w-md">
              {featured.body}
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--green-soft)] border border-[var(--border)] flex items-center justify-center text-sm font-medium text-[var(--green-deep)]">
                {featured.name[0]}
              </div>
              <div>
                <div className="font-medium text-sm">{featured.name}</div>
                <div className="text-xs text-[var(--foreground-muted)]">{featured.sub}</div>
              </div>
            </div>
          </div>

          {/* Right — smaller quote cards stacked */}
          <div className="flex flex-col gap-4 lg:pt-12">
            {rest.map((r) => (
              <figure
                key={r.name}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-200 hover:bg-[var(--surface-2)]"
              >
                <div className="text-2xl font-display text-[var(--green-soft)] leading-[0.5] mb-3 select-none">
                  &ldquo;
                </div>
                <blockquote className="text-[15px] text-[var(--foreground)] leading-relaxed">
                  {r.body}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[var(--green-soft)] border border-[var(--border)] flex items-center justify-center text-sm font-medium text-[var(--green-deep)]">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-[var(--foreground-muted)]">{r.sub}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
