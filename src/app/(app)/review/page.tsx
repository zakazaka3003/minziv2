"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProgress, dueChars, type Outcome, type CharProgress } from "@/store/progress";
import { getChar, meaningRu, meaningShort } from "@/lib/characters";
import { Card } from "@/components/ui/Card";
import { Panda } from "@/components/ui/Panda";
import { Volume2, X, AlertCircle, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type Tab = "due" | "hard" | "recent";

const OUTCOMES: { id: Outcome; label: string; sublabel: string; icon: React.ElementType; tone: string }[] = [
  { id: "again", label: "Не помню", sublabel: "Показать чаще", icon: X, tone: "border-[var(--red)] text-[var(--red-deep)] bg-[var(--red-soft)]" },
  { id: "hard", label: "Сложно", sublabel: "Показать позже", icon: AlertCircle, tone: "border-amber-300 text-amber-800 bg-amber-50" },
  { id: "good", label: "Нормально", sublabel: "Показать позже", icon: CheckCircle, tone: "border-[var(--bamboo)] text-[var(--green-deep)] bg-[var(--bamboo-soft)]" },
  { id: "easy", label: "Легко", sublabel: "Показать позже", icon: Sparkles, tone: "border-[var(--green)] text-[var(--green-deep)] bg-[var(--green-soft)]" },
];

function charsByTab(chars: Record<string, CharProgress>, tab: Tab): string[] {
  const all = Object.values(chars);
  const now = Date.now();
  switch (tab) {
    case "due":
      return dueChars(chars).map((c) => c.hanzi);
    case "hard":
      return all
        .filter((c) => c.status === "weak" || c.lapses >= 2)
        .sort((a, b) => b.lapses - a.lapses)
        .map((c) => c.hanzi);
    case "recent":
      return all
        .filter((c) => c.lastSeen && now - c.lastSeen < 7 * 86400_000)
        .sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0))
        .map((c) => c.hanzi);
  }
}

export default function ReviewPage() {
  const chars = useProgress((s) => s.chars);
  const streak = useProgress((s) => s.streak);
  const recordOutcome = useProgress((s) => s.recordOutcome);

  const [tab, setTab] = useState<Tab>("due");
  const [selectedHanzi, setSelectedHanzi] = useState<string | null>(null);

  const dueCnt = useMemo(() => dueChars(chars).length, [chars]);
  const hardCnt = useMemo(() => Object.values(chars).filter((c) => c.status === "weak" || c.lapses >= 2).length, [chars]);
  const queue = useMemo(() => charsByTab(chars, tab), [chars, tab]);

  const selectedChar = selectedHanzi ? getChar(selectedHanzi) : null;
  const hasAnyStudied = Object.keys(chars).length > 0;

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const onPick = (o: Outcome) => {
    if (!selectedHanzi) return;
    recordOutcome(selectedHanzi, o);
    setSelectedHanzi(null);
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "due", label: "Готово к повторению", count: dueCnt },
    { id: "hard", label: "Трудные", count: hardCnt },
    { id: "recent", label: "Недавние" },
  ];

  if (!hasAnyStudied) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-8 py-12 text-center flex flex-col items-center gap-5">
        <Panda mood="resting" size={140} />
        <h1 className="text-3xl font-display font-medium">Повторений нет</h1>
        <p className="text-[var(--foreground-muted)]">
          Пройдите хотя бы один урок, чтобы здесь появились иероглифы для повторения.
        </p>
        <Link href="/learn" className="btn btn-primary">
          Начать урок
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-medium">Повторение</h1>
        <Panda mood="success" size={64} />
      </header>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSelectedHanzi(null); }}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              tab === t.id
                ? "border-[var(--green)] text-[var(--foreground)]"
                : "border-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={cn(
                "ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 rounded-full text-xs px-1.5",
                tab === t.id
                  ? "bg-[var(--green)] text-white"
                  : "bg-[var(--surface-3)] text-[var(--foreground-muted)]"
              )}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-12 text-[var(--foreground-muted)]">
          {tab === "due" && "Все повторения выполнены. Возвращайтесь позже."}
          {tab === "hard" && "Нет трудных иероглифов. Продолжайте заниматься!"}
          {tab === "recent" && "Нет недавних иероглифов."}
        </div>
      ) : (
        <>
          {/* Character grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
            {queue.slice(0, 20).map((h) => {
              const c = getChar(h);
              if (!c) return null;
              const isSelected = selectedHanzi === h;
              return (
                <button
                  key={h}
                  type="button"
                  onClick={() => setSelectedHanzi(isSelected ? null : h)}
                  className={cn(
                    "card-soft px-2 py-4 flex flex-col items-center gap-1.5 transition-all",
                    isSelected
                      ? "ring-2 ring-[var(--green)] shadow-md"
                      : "hover:shadow-sm"
                  )}
                >
                  <span className="hanzi text-4xl leading-none">{c.hanzi}</span>
                  <span className="pinyin text-xs text-[var(--foreground-muted)]">
                    {c.pinyin}
                  </span>
                  <span className="text-xs text-[var(--foreground-muted)] truncate max-w-full">
                    {meaningShort(c)}
                  </span>
                </button>
              );
            })}
          </div>

          {queue.length > 20 && (
            <div className="text-center text-sm text-[var(--foreground-muted)] mb-6">
              и ещё {queue.length - 20}...
            </div>
          )}
        </>
      )}

      {/* Selected card + outcomes */}
      {selectedChar && (
        <Card className="p-6 flex flex-col items-center gap-4 float-up">
          <div className="flex items-center gap-3">
            <span className="hanzi text-6xl leading-none">{selectedChar.hanzi}</span>
            <button
              onClick={() => speak(selectedChar.hanzi)}
              className="btn btn-ghost h-9 w-9 p-0"
              aria-label="Произнести"
            >
              <Volume2 size={16} />
            </button>
          </div>
          <div className="text-center">
            <div className="pinyin text-xl text-[var(--foreground-muted)]">
              {selectedChar.pinyin}
            </div>
            <div className="text-lg font-medium mt-1">{meaningRu(selectedChar)}</div>
          </div>
          <div className="grid grid-cols-4 gap-2 w-full mt-2">
            {OUTCOMES.map(({ id, label, sublabel, icon: Icon, tone }) => (
              <button
                key={id}
                onClick={() => onPick(id)}
                className={cn(
                  "rounded-[14px] border px-3 py-3 flex flex-col items-center gap-1 text-xs font-medium hover:shadow-sm transition-shadow",
                  tone
                )}
              >
                <Icon size={16} />
                <span>{label}</span>
                <span className="text-[10px] opacity-70 font-normal">{sublabel}</span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Streak */}
      {streak > 0 && (
        <div className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
          Серия: {streak} {streak === 1 ? "день" : streak < 5 ? "дня" : "дней"}
        </div>
      )}
    </div>
  );
}
