const REVIEWS = [
  {
    name: "Анна",
    sub: "учит 6 месяцев",
    body: "Раньше постоянно забывала иероглифы. С Minzi наконец начала их писать — и запоминать. Ощущение, что они действительно остаются в голове.",
  },
  {
    name: "Дмитрий",
    sub: "учит 1 год",
    body: "Очень нравится практика письма и подсказки по чертам. Чувствую, как растёт уверенность.",
  },
  {
    name: "Екатерина",
    sub: "учит 6 месяцев",
    body: "Не надо думать, когда повторять — приложение само напоминает. Очень помогает!",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-[var(--surface-2)] border-y border-[var(--border)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left: heading + featured quote */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--foreground-soft)] mb-3 font-medium">
              Отзывы
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium tracking-[-0.02em] leading-[1.1] mb-10">
              Что говорят
              <br />
              ученики
            </h2>
            <figure>
              <blockquote className="text-xl sm:text-2xl font-display leading-[1.4] tracking-[-0.01em] border-l-2 border-[var(--green)] pl-6">
                &ldquo;{REVIEWS[0].body}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pl-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--green-soft)] border border-[var(--border)] flex items-center justify-center text-sm font-medium text-[var(--green-deep)]">
                  {REVIEWS[0].name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{REVIEWS[0].name}</div>
                  <div className="text-xs text-[var(--foreground-muted)]">{REVIEWS[0].sub}</div>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Right: remaining quotes, stacked */}
          <div className="flex flex-col gap-4 lg:pt-20">
            {REVIEWS.slice(1).map((r) => (
              <figure
                key={r.name}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-150 hover:bg-white"
              >
                <blockquote className="text-base text-[var(--foreground)] leading-relaxed">
                  &ldquo;{r.body}&rdquo;
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
