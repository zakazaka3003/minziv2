import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-4">
      <div className="ink-divider" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start text-sm text-[var(--foreground-muted)]">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <Image src="/icon.svg" alt="" width={24} height={24} />
            <span className="text-sm font-display font-semibold tracking-tight text-[var(--foreground)]">
              Minzi
            </span>
          </Link>
          <p className="max-w-sm text-[13px] leading-relaxed">
            Учите китайские иероглифы через письмо и понимание.
          </p>
          <p className="mt-2 text-[11px] text-[var(--foreground-soft)]">
            Данные: HSK 3.0, Hanzi Writer, MakeMeAHanzi, CC-CEDICT.
          </p>
        </div>
        <nav className="flex flex-col gap-1.5 text-[13px]">
          <Link
            href="#"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Политика конфиденциальности
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Условия использования
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Связаться с нами
          </Link>
        </nav>
      </div>
    </footer>
  );
}
