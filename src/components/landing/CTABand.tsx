import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABand() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-medium tracking-[-0.03em] leading-[1.05]">
            Начните учить
            <br />
            <span className="text-[var(--green-deep)]">правильно</span>
          </h3>
          <p className="mt-4 text-[var(--foreground-muted)] text-base leading-relaxed">
            Бесплатно, без карты, доступно прямо сейчас.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/learn"
              className="btn btn-primary h-12 px-8 text-[15px] group"
            >
              Начать бесплатно
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <div className="mt-4 text-xs text-[var(--foreground-soft)]">
            Более 12 000 учеников уже учат иероглифы с Minzi
          </div>
        </div>
      </div>
    </section>
  );
}
