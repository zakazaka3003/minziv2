import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CTABand() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl bg-[#1a3f2a] p-10 sm:p-14 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3f2a]/90 to-[#1a3f2a]/50" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_auto] gap-8 items-center">
            <div className="flex items-start gap-6">
              <Image
                src="/panda/sitting_near_rock.png"
                alt=""
                width={160}
                height={200}
                className="hidden sm:block shrink-0 drop-shadow-lg"
              />
              <div>
                <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tighter leading-none text-white">
                  Начните учить иероглифы
                  <br />
                  <span className="text-[#a9d8b4]">правильно</span> уже сегодня
                </h3>
                <p className="mt-4 text-white/70 text-base max-w-lg leading-relaxed">
                  Бесплатно, без карты, доступно прямо сейчас.
                </p>
              </div>
            </div>
            <Link
              href="/learn"
              className="btn btn-primary h-13 px-8 text-base relative overflow-hidden group self-start md:self-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                Начать бесплатно
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
              <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
