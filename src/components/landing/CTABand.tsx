import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CTABand() {
  return (
    <section className="relative py-6 sm:py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-xl min-h-[320px] sm:min-h-[360px]">
          {/* Base dark jade */}
          <div className="absolute inset-0 bg-[#152e20]" />

          {/* Mountain landscape background layer */}
          <div
            className="absolute inset-x-0 bottom-0 h-full opacity-[0.12]"
            style={{
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400' preserveAspectRatio='none'%3E%3Cpath d='M0 400L200 200L350 280L500 150L650 250L800 120L950 220L1100 100L1250 180L1440 80V400H0Z' fill='%230d1f14'/%3E%3Cpath d='M0 400L150 300L300 340L450 220L600 300L750 180L900 280L1050 160L1200 260L1350 140L1440 200V400H0Z' fill='%230d1f14' opacity='0.5'/%3E%3C/svg%3E") no-repeat bottom/100% auto`,
            }}
          />

          {/* Atmospheric mist */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#152e20]/90 via-[#152e20]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(169,216,180,0.06),transparent_60%)]" />

          {/* Moon glow */}
          <div className="absolute top-6 right-[20%] w-16 h-16 rounded-full bg-[#e8d5a3]/15 blur-lg hidden sm:block" />
          <div className="absolute top-8 right-[20.5%] w-10 h-10 rounded-full bg-[#e8d5a3]/20 hidden sm:block" />

          {/* Bamboo silhouettes on edges */}
          <div
            className="absolute right-0 top-0 bottom-0 w-10 opacity-[0.05] hidden md:block"
            style={{
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 360'%3E%3Cline x1='20' y1='0' x2='20' y2='360' stroke='%23a9d8b4' stroke-width='2'/%3E%3Cline x1='14' y1='60' x2='26' y2='60' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='14' y1='140' x2='26' y2='140' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='14' y1='220' x2='26' y2='220' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3Cline x1='14' y1='300' x2='26' y2='300' stroke='%23a9d8b4' stroke-width='1.5'/%3E%3C/svg%3E") repeat-y right/contain`,
            }}
          />

          {/* Panda integrated into composition */}
          <Image
            src="/panda/sitting_near_rock.png"
            alt=""
            width={280}
            height={280}
            className="absolute right-4 sm:right-8 lg:right-16 bottom-0 w-[160px] sm:w-[200px] lg:w-[260px] opacity-90 pointer-events-none select-none"
          />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-14 flex flex-col gap-5 max-w-lg">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-[-0.03em] leading-[1.1] text-white">
              Начните учить иероглифы
              <br />
              <span className="text-[#a9d8b4]">правильно</span> уже сегодня
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Бесплатно, без карты, доступно прямо сейчас.
            </p>
            <div className="flex items-center gap-4 mt-1">
              <Link
                href="/learn"
                className="btn btn-primary h-11 px-6 text-sm relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 animate-shimmer pointer-events-none" />
              </Link>
              <span className="text-white/30 text-xs hidden sm:block">
                Присоединяйтесь к 12 000+ ученикам
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
