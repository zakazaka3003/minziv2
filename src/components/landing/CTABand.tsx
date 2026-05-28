import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CTABand() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Mountain landscape background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/bg/bg_mountain_sun.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.15]"
        />
      </div>

      {/* Bamboo decoration — right edge */}
      <Image
        src="/bamboo/bamboo_3.png"
        alt=""
        width={100}
        height={350}
        className="absolute right-0 bottom-0 w-[60px] sm:w-[80px] lg:w-[100px] opacity-[0.08] pointer-events-none select-none hidden lg:block"
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-display font-medium tracking-[-0.03em] leading-[1.08]">
            Начните учить иероглифы
            <br />
            <span className="text-[var(--green-deep)]">правильно</span> уже сегодня
          </h3>
          <p className="mt-4 text-[var(--foreground-muted)] text-[15px] leading-relaxed max-w-md mx-auto">
            Бесплатно, без карты, доступно прямо сейчас.
          </p>
          <div className="mt-8">
            <Link
              href="/learn"
              className="btn btn-primary h-12 px-8 text-[15px] group inline-flex"
            >
              Начать бесплатно
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
