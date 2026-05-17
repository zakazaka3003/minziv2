const REVIEWS = [
  {
    name: "Анна",
    sub: "6 месяцев",
    body: "Раньше постоянно забывала иероглифы. С Minzi наконец начала их писать и лучше понимать. Результат ощущается!",
  },
  {
    name: "Дмитрий",
    sub: "1 год",
    body: "Очень нравится практика письма и подсказки по чертам. Чувствую, как растёт уверенность.",
  },
  {
    name: "Екатерина",
    sub: "6 месяцев",
    body: "Удобные повторения — не надо думать, когда повторять, приложение само напоминает. Очень помогает!",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--green-deep)] mb-3 font-medium text-center">
          Отзывы
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-[-0.03em] leading-[1.1] text-center mb-8">
          Что говорят ученики
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-5 transition-all duration-300 hover:shadow-md hover:border-[var(--border-strong)]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--green-soft)] to-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center font-display font-medium text-sm text-[var(--green-deep)]">
                  {r.name[0]}
                </div>
                <figcaption>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs text-[var(--foreground-muted)]">
                    {r.sub}
                  </div>
                </figcaption>
              </div>
              <blockquote className="text-[13px] text-[var(--foreground)] leading-relaxed">
                &ldquo;{r.body}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
