import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CTABand() {
  return (
    <section className="py-4 sm:py-6">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center p-8 sm:p-10 lg:p-14">
            {/* Left: text + CTA */}
            <div className="max-w-lg">
              <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-medium tracking-[-0.02em] leading-[1.08]">
                Начните учить иероглифы
                <br />
                <span className="text-[var(--green-deep)]">правильно</span> уже сегодня
              </h3>
              <p className="mt-4 text-[var(--foreground-muted)] text-sm leading-relaxed max-w-sm">
                Бесплатно, без карты, доступно прямо сейчас.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Link
                  href="/learn"
                  className="btn btn-primary h-12 px-7 text-[15px] group"
                >
                  Начать бесплатно
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <span className="text-xs text-[var(--foreground-muted)] hidden sm:block">
                  12 000+ учеников
                </span>
              </div>
            </div>

            {/* Right: panda breathing in composition */}
            <Image
              src="/panda/sitting_near_rock.png"
              alt=""
              width={280}
              height={280}
              className="w-[160px] sm:w-[200px] lg:w-[260px] self-end pointer-events-none select-none drop-shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
