const REVIEWS = [
  {
    name: "Анна",
    sub: "6 месяцев",
    body: "Раньше постоянно забывала иероглифы. С Minzi наконец начала их писать и лучше понимать. Результат ощущается!",
    featured: true,
  },
  {
    name: "Дмитрий",
    sub: "1 год",
    body: "Очень нравится практика письма и подсказки по чертам. Чувствую, как растёт уверенность.",
  },
  {
    name: "Екатерина",
    sub: "6 месяцев",
    body: "Удобные повторения\u00a0— не надо думать, когда повторять, приложение само напоминает. Очень помогает!",
  },
];

export function Testimonials() {
  const featured = REVIEWS[0];
  const rest = REVIEWS.slice(1);

  return (
    <section id="testimonials" className="py-10 sm:py-14">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: editorial heading + featured large quote */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-3 font-medium">
              Отзывы
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-medium tracking-[-0.02em] leading-[1.1] mb-8">
              Что говорят ученики
            </h2>
            <figure className="border-l-2 border-[var(--green)] pl-6 py-2">
              <blockquote className="text-lg sm:text-xl font-display leading-relaxed text-[var(--foreground)]">
                &ldquo;{featured.body}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--green-soft)] border border-[var(--border)] flex items-center justify-center text-sm font-medium text-[var(--green-deep)]">
                  {featured.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{featured.name}</div>
                  <div className="text-xs text-[var(--foreground-muted)]">{featured.sub}</div>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Right: smaller quotes stacked */}
          <div className="flex flex-col gap-4 lg:pt-16">
            {rest.map((r) => (
              <figure
                key={r.name}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors duration-150 hover:bg-[var(--surface-2)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full bg-[var(--green-soft)] border border-[var(--border)] flex items-center justify-center text-sm font-medium text-[var(--green-deep)]">
                    {r.name[0]}
                  </div>
                  <figcaption>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-[var(--foreground-muted)]">{r.sub}</div>
                  </figcaption>
                </div>
                <blockquote className="text-sm text-[var(--foreground)] leading-relaxed">
                  &ldquo;{r.body}&rdquo;
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
