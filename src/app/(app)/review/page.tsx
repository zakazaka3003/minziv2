"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProgress, dueChars, type Outcome, type CharProgress, type DailyEntry } from "@/store/progress";
import { getChar, meaningRu, meaningShort, ALL_CHARACTERS, type CharRecord } from "@/lib/characters";
import { Card } from "@/components/ui/Card";
import { Panda } from "@/components/ui/Panda";
import { WritingQuiz } from "@/components/learn/WritingQuiz";
import { StrokeAnimation } from "@/components/learn/StrokeAnimation";
import {
  Volume2, RotateCcw, Eye, ChevronRight, ChevronDown, Flame,
  BookOpen, PenTool, Brain, Zap, Star, CheckCircle, XCircle,
  ArrowRight, Trophy, Target, Clock, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ─── Types ─────────────────────────────────────────────────────────── */

type SessionPhase =
  | "idle"        // dashboard
  | "writing"     // writing review with SRS
  | "recognition" // multiple choice quiz
  | "context"     // fill-in-the-blank sentences
  | "summary";    // session results

interface SessionStats {
  total: number;
  correct: number;
  written: number;
  startTime: number;
}

/* ─── Helpers ───────────────────────────────────────────────────────── */

const speak = (text: string) => {
  if (typeof window === "undefined") return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const today = () => new Date().toISOString().slice(0, 10);

const TIPS: Record<string, string> = {
  "你": "Первая черта — слева сверху вниз чуть наклонно.",
  "我": "Горизонтальная черта в середине пишется до вертикальной.",
  "是": "Начинайте с горизонтальной черты сверху.",
  "的": "Левая часть 白 пишется первой.",
  "不": "Горизонтальная, затем вертикальная, затем откидная.",
};

function getRandomTip(hanzi: string): string {
  if (TIPS[hanzi]) return TIPS[hanzi];
  return "Соблюдайте порядок черт: сверху вниз, слева направо.";
}

function pluralDays(n: number): string {
  if (n === 1) return "день";
  if (n >= 2 && n <= 4) return "дня";
  return "дней";
}

/* Simple sentence templates for context review */
const SENTENCE_TEMPLATES: { template: string; answer: string; hanzi: string }[] = [
  { template: "___好", answer: "你", hanzi: "你" },
  { template: "___是学生", answer: "我", hanzi: "我" },
  { template: "这___一本书", answer: "是", hanzi: "是" },
  { template: "___的名字", answer: "你", hanzi: "你" },
  { template: "___不知道", answer: "我", hanzi: "我" },
];

/* ─── Heatmap ───────────────────────────────────────────────────────── */

function ReviewHeatmap({ daily }: { daily: DailyEntry[] }) {
  const weeks = 7;
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const now = new Date();

  const cells: { date: string; count: number }[] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const dt = new Date(now);
      dt.setDate(dt.getDate() - (w * 7 + (6 - d)));
      const key = dt.toISOString().slice(0, 10);
      const entry = daily.find((e) => e.date === key);
      cells.push({ date: key, count: entry?.reviewed ?? 0 });
    }
  }

  const maxCount = Math.max(1, ...cells.map((c) => c.count));

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {days.map((d) => (
          <span key={d} className="text-[10px] text-center text-[var(--foreground-soft)]">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          const intensity = c.count / maxCount;
          const bg = c.count === 0
            ? "bg-[var(--surface-3)]"
            : intensity < 0.3
            ? "bg-[#c8e6c9]"
            : intensity < 0.6
            ? "bg-[#81c784]"
            : intensity < 0.85
            ? "bg-[#4caf50]"
            : "bg-[#2e7d4f]";
          return (
            <div
              key={i}
              className={cn("w-full aspect-square rounded-full", bg)}
              title={`${c.date}: ${c.count} повторений`}
            />
          );
        })}
      </div>
      <p className="text-[10px] text-[var(--foreground-soft)] mt-2">
        Чем темнее, тем больше повторений
      </p>
    </div>
  );
}

/* ─── Weak Characters List ──────────────────────────────────────────── */

function WeakCharsList({ chars }: { chars: Record<string, CharProgress> }) {
  const weak = useMemo(() =>
    Object.values(chars)
      .filter((c) => c.status === "weak" || c.lapses >= 2)
      .sort((a, b) => b.lapses - a.lapses)
      .slice(0, 5),
    [chars]
  );

  if (weak.length === 0) return (
    <p className="text-sm text-[var(--foreground-muted)]">Нет слабых иероглифов</p>
  );

  const reasons = [
    { label: "Ошибки в написании", color: "bg-[var(--red)]" },
    { label: "Ошибки в порядке черт", color: "bg-amber-400" },
    { label: "Забывается быстро", color: "bg-amber-300" },
  ];

  return (
    <div className="space-y-3">
      {weak.map((cp, idx) => {
        const c = getChar(cp.hanzi);
        if (!c) return null;
        const reason = reasons[idx % reasons.length];
        const barWidth = Math.min(100, Math.max(20, (cp.lapses / 5) * 100));
        return (
          <div key={cp.hanzi} className="flex items-center gap-3">
            <span className="hanzi text-2xl w-8 text-center">{cp.hanzi}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--foreground-muted)] truncate">{reason.label}</p>
              <div className="h-1.5 rounded-full bg-[var(--surface-3)] mt-1">
                <div
                  className={cn("h-full rounded-full", reason.color)}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── SRS Outcome Buttons with Pandas ───────────────────────────────── */

const SRS_BUTTONS: { id: Outcome; label: string; sublabel: string; color: string; bgColor: string; pandaSrc: string }[] = [
  { id: "again", label: "Снова", sublabel: "Очень сложно", color: "text-[var(--red-deep)]", bgColor: "bg-[var(--red-soft)] border-[var(--red)]/30", pandaSrc: "/panda/panda_head_sad.png" },
  { id: "hard", label: "Трудно", sublabel: "Было сложно", color: "text-amber-800", bgColor: "bg-amber-50 border-amber-300/50", pandaSrc: "/panda/panda_head_neutral.png" },
  { id: "good", label: "Хорошо", sublabel: "Понял(а)", color: "text-[var(--green-deep)]", bgColor: "bg-[var(--green-soft)] border-[var(--green)]/30", pandaSrc: "/panda/panda_head_smile.png" },
  { id: "easy", label: "Легко", sublabel: "Очень легко", color: "text-[var(--green-deep)]", bgColor: "bg-[var(--bamboo-soft)] border-[var(--bamboo)]/30", pandaSrc: "/panda/panda_head_happy.png" },
];

/* ─── Recognition Quiz ──────────────────────────────────────────────── */

function RecognitionCard({
  char,
  options,
  onAnswer,
}: {
  char: CharRecord;
  options: string[];
  onAnswer: (correct: boolean) => void;
}) {
  const [chosen, setChosen] = useState<string | null>(null);
  const correctAnswer = meaningRu(char) || char.meaningPrimary;

  const handleChoice = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    const isCorrect = opt === correctAnswer;
    setTimeout(() => onAnswer(isCorrect), 800);
  };

  return (
    <div className="flex flex-col items-center gap-6 float-up">
      <p className="text-sm text-[var(--foreground-muted)]">Выберите значение иероглифа</p>
      <div className="flex items-center gap-3">
        <span className="hanzi text-7xl leading-none">{char.hanzi}</span>
        <button onClick={() => speak(char.hanzi)} className="btn btn-ghost h-9 w-9 p-0">
          <Volume2 size={16} />
        </button>
      </div>
      <span className="pinyin text-lg text-[var(--foreground-muted)]">{char.pinyin}</span>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {options.map((opt) => {
          const isCorrect = opt === correctAnswer;
          const isChosen = chosen === opt;
          return (
            <button
              key={opt}
              onClick={() => handleChoice(opt)}
              disabled={chosen !== null}
              className={cn(
                "rounded-[14px] border px-4 py-3.5 text-sm font-medium transition-all text-left",
                chosen === null && "hover:border-[var(--green)] hover:shadow-sm",
                isChosen && isCorrect && "border-[var(--green)] bg-[var(--green-soft)] ring-2 ring-[var(--green)]",
                isChosen && !isCorrect && "border-[var(--red)] bg-[var(--red-soft)] ring-2 ring-[var(--red)]",
                chosen && !isChosen && isCorrect && "border-[var(--green)] bg-[var(--green-soft)]",
                !chosen && "border-[var(--border)] bg-white",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Context Fill Card ─────────────────────────────────────────────── */

function ContextCard({
  char,
  allChars,
  onAnswer,
}: {
  char: CharRecord;
  allChars: CharRecord[];
  onAnswer: (correct: boolean) => void;
}) {
  const [chosen, setChosen] = useState<string | null>(null);

  const { sentence, answer, distractors } = useMemo(() => {
    const ruMeaning = meaningRu(char) || char.meaningPrimary;
    const template = SENTENCE_TEMPLATES.find((t) => t.hanzi === char.hanzi);
    const sentenceText = template ? template.template : `___是好的`;
    const correctAns = char.hanzi;
    const pool = allChars
      .filter((c) => c.hanzi !== char.hanzi && c.level <= Math.max(char.level, 2))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.hanzi);
    const opts = [correctAns, ...pool].sort(() => Math.random() - 0.5);
    return { sentence: sentenceText, answer: correctAns, distractors: opts };
  }, [char, allChars]);

  const handleChoice = (opt: string) => {
    if (chosen) return;
    setChosen(opt);
    setTimeout(() => onAnswer(opt === answer), 800);
  };

  return (
    <div className="flex flex-col items-center gap-6 float-up">
      <p className="text-sm text-[var(--foreground-muted)]">Вставьте нужный иероглиф</p>
      <div className="hanzi text-4xl tracking-widest bg-white rounded-[18px] border border-[var(--border)] px-8 py-5">
        {sentence.split("___").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <span className={cn(
                "inline-block w-12 border-b-2 mx-1 text-center",
                chosen === answer ? "border-[var(--green)] text-[var(--green)]" :
                chosen ? "border-[var(--red)] text-[var(--red)]" :
                "border-[var(--border-strong)]"
              )}>
                {chosen || "\u00A0"}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {distractors.map((opt) => {
          const isCorrect = opt === answer;
          const isChosen = chosen === opt;
          return (
            <button
              key={opt}
              onClick={() => handleChoice(opt)}
              disabled={chosen !== null}
              className={cn(
                "hanzi text-3xl rounded-[14px] border px-6 py-4 transition-all",
                chosen === null && "hover:border-[var(--green)] hover:shadow-sm",
                isChosen && isCorrect && "border-[var(--green)] bg-[var(--green-soft)] ring-2 ring-[var(--green)]",
                isChosen && !isCorrect && "border-[var(--red)] bg-[var(--red-soft)] ring-2 ring-[var(--red)]",
                chosen && !isChosen && isCorrect && "border-[var(--green)] bg-[var(--green-soft)]",
                !chosen && "border-[var(--border)] bg-white",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Summary Screen ────────────────────────────────────────────────── */

function SummaryScreen({
  stats,
  streak,
  onClose,
}: {
  stats: SessionStats;
  streak: number;
  onClose: () => void;
}) {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  const timeMin = Math.round((Date.now() - stats.startTime) / 60000);

  return (
    <div className="flex flex-col items-center gap-6 py-8 float-up">
      <Panda mood="success" size={140} />
      <h2 className="text-2xl font-display font-medium">Отличная работа!</h2>
      <p className="text-[var(--foreground-muted)]">Постоянство — ключ к успеху.</p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="card-soft p-4 text-center">
          <div className="text-2xl font-bold text-[var(--green)]">{stats.total}</div>
          <div className="text-xs text-[var(--foreground-muted)] mt-1">повторено</div>
        </div>
        <div className="card-soft p-4 text-center">
          <div className="text-2xl font-bold text-[var(--green)]">{accuracy}%</div>
          <div className="text-xs text-[var(--foreground-muted)] mt-1">точность</div>
        </div>
        <div className="card-soft p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{timeMin}</div>
          <div className="text-xs text-[var(--foreground-muted)] mt-1">мин</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="streak-pill">
          <span>🔥</span>
          <span>{streak} {pluralDays(streak)} подряд</span>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={onClose} className="btn btn-success">
          Готово
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN REVIEW PAGE
   ═══════════════════════════════════════════════════════════════════════ */

export default function ReviewPage() {
  const chars = useProgress((s) => s.chars);
  const streak = useProgress((s) => s.streak);
  const daily = useProgress((s) => s.daily);
  const recordOutcome = useProgress((s) => s.recordOutcome);

  /* Session state */
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const [queue, setQueue] = useState<string[]>([]);
  const [queueIdx, setQueueIdx] = useState(0);
  const [subPhase, setSubPhase] = useState<"writing" | "recognition" | "context">("writing");
  const [writingDone, setWritingDone] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [sessionStats, setSessionStats] = useState<SessionStats>({ total: 0, correct: 0, written: 0, startTime: Date.now() });
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);

  /* Dashboard stats */
  const dueCnt = useMemo(() => dueChars(chars).length, [chars]);
  const weakCnt = useMemo(() => Object.values(chars).filter((c) => c.status === "weak" || c.lapses >= 2).length, [chars]);
  const todayEntry = useMemo(() => {
    const t = today();
    return daily.find((e) => e.date === t);
  }, [daily]);
  const todayReviewed = todayEntry?.reviewed ?? 0;
  const todayCorrect = todayEntry?.correct ?? 0;
  const todayTotal = todayEntry?.total ?? 0;
  const hasAnyStudied = Object.keys(chars).length > 0;

  /* Mini bar chart for sidebar */
  const todayBars = useMemo(() => {
    const last7 = daily.slice(-7);
    const maxR = Math.max(1, ...last7.map((d) => d.reviewed));
    return last7.map((d) => ({
      date: d.date,
      height: Math.max(8, (d.reviewed / maxR) * 100),
      reviewed: d.reviewed,
    }));
  }, [daily]);

  /* Current review character */
  const currentHanzi = queue[queueIdx] ?? null;
  const currentChar = currentHanzi ? getChar(currentHanzi) : null;

  /* Build quiz options for recognition */
  const quizOptions = useMemo(() => {
    if (!currentChar) return [];
    const correct = meaningRu(currentChar) || currentChar.meaningPrimary;
    const pool = ALL_CHARACTERS
      .filter((c) => c.hanzi !== currentChar.hanzi && c.level <= Math.max(currentChar.level, 2) && meaningRu(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => meaningRu(c));
    return [correct, ...pool].sort(() => Math.random() - 0.5);
  }, [currentChar]);

  /* Start review session */
  const startSession = useCallback((mode: "all" | "weak" | "writing") => {
    let q: string[];
    if (mode === "weak") {
      q = Object.values(chars)
        .filter((c) => c.status === "weak" || c.lapses >= 2)
        .sort((a, b) => b.lapses - a.lapses)
        .map((c) => c.hanzi);
    } else {
      q = dueChars(chars).map((c) => c.hanzi);
    }
    if (q.length === 0) return;

    // Shuffle for variety, limit to 18 per session
    const shuffled = q.sort(() => Math.random() - 0.5).slice(0, 18);
    setQueue(shuffled);
    setQueueIdx(0);
    setSubPhase("writing");
    setWritingDone(false);
    setShowStrokeOrder(false);
    setSessionStats({ total: 0, correct: 0, written: 0, startTime: Date.now() });
    setPhase("writing");
  }, [chars]);

  /* Advance to next character or phase */
  const handleSRSOutcome = useCallback((outcome: Outcome) => {
    if (!currentHanzi) return;
    recordOutcome(currentHanzi, outcome);
    setSessionStats((s) => ({
      ...s,
      total: s.total + 1,
      correct: outcome !== "again" ? s.correct + 1 : s.correct,
      written: s.written + 1,
    }));

    const nextIdx = queueIdx + 1;
    if (nextIdx >= queue.length) {
      setPhase("summary");
    } else {
      setQueueIdx(nextIdx);
      setSubPhase("writing");
      setWritingDone(false);
      setShowStrokeOrder(false);
    }
  }, [currentHanzi, queueIdx, queue.length, recordOutcome]);

  /* ─── Empty state ─────────────────────────────────────────────────── */
  if (!hasAnyStudied) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-8 py-12 text-center flex flex-col items-center gap-5">
        <Panda mood="resting" size={140} />
        <h1 className="text-3xl font-display font-medium">Повторений нет</h1>
        <p className="text-[var(--foreground-muted)]">
          Пройдите хотя бы один урок, чтобы здесь появились иероглифы для повторения.
        </p>
        <Link href="/learn" className="btn btn-primary">Начать урок</Link>
      </div>
    );
  }

  /* ─── Summary phase ───────────────────────────────────────────────── */
  if (phase === "summary") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8">
        <SummaryScreen stats={sessionStats} streak={streak} onClose={() => setPhase("idle")} />
      </div>
    );
  }

  /* ─── Active review session ───────────────────────────────────────── */
  if (phase !== "idle" && currentChar) {
    const progress = queue.length > 0 ? ((queueIdx + 1) / queue.length) * 100 : 0;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-display font-semibold mb-1 text-[var(--ink)]">Повторение</h1>
          <p className="text-sm text-[var(--foreground-muted)] mb-1">Сегодняшняя цель</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[var(--green)] leading-none tabular-nums">{todayReviewed}</span>
              <span className="text-sm text-[var(--foreground-muted)] pb-0.5">/ 30 мин</span>
            </div>
            <div className="flex-1 h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--green)] transition-[width] duration-500"
                style={{ width: `${Math.min(100, (todayReviewed / 30) * 100)}%` }}
              />
            </div>
            {streak > 0 && (
              <div className="streak-pill text-sm">
                <span>🔥</span>
                <span>{streak} {pluralDays(streak)} подряд</span>
              </div>
            )}
          </div>

          {/* Session progress */}
          <div className="flex items-center gap-3">
            <PenTool size={16} className="text-[var(--foreground-muted)]" />
            <span className="text-sm text-[var(--foreground-muted)]">Письменное повторение</span>
            <span className="text-sm tabular-nums text-[var(--foreground-muted)]">{queueIdx + 1} / {queue.length}</span>
            <div className="flex-1" />
            <button onClick={() => setPhase("summary")} className="btn btn-ghost text-sm py-1.5 px-3">
              Пропустить ⏭
            </button>
          </div>
        </header>

        {/* Main writing area - 2 column */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Left: character info */}
          <div className="card p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <button onClick={() => speak(currentChar.hanzi)} className="btn btn-ghost h-9 w-9 p-0">
                <Volume2 size={18} />
              </button>
              <span className="pinyin text-xl">{currentChar.pinyin}</span>
            </div>

            <div className="hanzi text-8xl text-center leading-none py-4">{currentChar.hanzi}</div>
            <div className="text-center text-lg font-medium">{meaningRu(currentChar) || currentChar.meaningPrimary}</div>

            {currentChar.components && currentChar.components.length > 0 && (
              <div>
                <p className="text-xs text-[var(--foreground-muted)] mb-1.5">Состоит из:</p>
                <div className="flex items-center gap-2 justify-center">
                  {currentChar.components.map((comp, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="text-[var(--foreground-soft)]">+</span>}
                      <span className="hanzi text-2xl card-soft px-3 py-1.5">{comp}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs text-[var(--foreground-muted)] mb-1">Примеры:</p>
              <div className="flex gap-3 hanzi text-xl text-[var(--foreground-muted)]">
                {ALL_CHARACTERS
                  .filter((c) => c.hanzi !== currentChar.hanzi && c.hanzi.includes(currentChar.hanzi))
                  .slice(0, 3)
                  .map((c) => (
                    <span key={c.hanzi}>{c.hanzi}</span>
                  ))}
                {/* Compound words */}
                {currentChar.hanzi === "你" && <><span>你好</span><span>你们</span><span>你是</span></>}
                {currentChar.hanzi === "我" && <><span>我们</span><span>我的</span></>}
                {currentChar.hanzi === "是" && <><span>是的</span><span>不是</span></>}
              </div>
            </div>
          </div>

          {/* Right: writing canvas + actions */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-[var(--foreground-muted)]">
              Напишите иероглиф. Соблюдайте порядок черт.
            </p>

            <div className="flex items-start gap-4">
              <div className="relative">
                {showStrokeOrder ? (
                  <div className="rounded-[18px] border border-[var(--border)] bg-white overflow-hidden" style={{ width: 324, height: 324, padding: 12 }}>
                    <StrokeAnimation hanzi={currentChar.hanzi} size={300} autoplay />
                  </div>
                ) : (
                  <WritingQuiz
                    key={`${currentHanzi}-${queueIdx}`}
                    hanzi={currentChar.hanzi}
                    size={300}
                    showOutline
                    onComplete={(info) => {
                      setWritingDone(true);
                      setSessionStats((s) => ({ ...s, written: s.written + 1 }));
                    }}
                  />
                )}
              </div>

              {/* Side buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowStrokeOrder(false);
                    setWritingDone(false);
                  }}
                  className="card-soft w-14 h-14 flex flex-col items-center justify-center gap-0.5 hover:bg-[var(--surface-2)] transition-colors"
                  title="Заново"
                >
                  <RotateCcw size={20} className="text-[var(--foreground-muted)]" />
                  <span className="text-[10px] text-[var(--foreground-muted)]">Заново</span>
                </button>
                <button
                  onClick={() => setShowStrokeOrder(!showStrokeOrder)}
                  className="card-soft w-14 h-14 flex flex-col items-center justify-center gap-0.5 hover:bg-[var(--surface-2)] transition-colors"
                  title="Показать порядок"
                >
                  <Eye size={20} className="text-[var(--foreground-muted)]" />
                  <span className="text-[10px] text-[var(--foreground-muted)] leading-tight text-center">Показать порядок</span>
                </button>
              </div>
            </div>

            {/* SRS Buttons with Pandas */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-lg mt-2">
              {SRS_BUTTONS.map(({ id, label, sublabel, color, bgColor, pandaSrc }) => (
                <button
                  key={id}
                  onClick={() => handleSRSOutcome(id)}
                  className={cn(
                    "rounded-[18px] border px-3 py-4 flex flex-col items-center gap-2 transition-all hover:shadow-md hover:-translate-y-0.5",
                    bgColor, color,
                  )}
                >
                  <Image src={pandaSrc} alt={label} width={48} height={48} className="select-none" />
                  <span className="font-semibold text-sm">{label}</span>
                  <span className="text-[11px] opacity-70">{sublabel}</span>
                </button>
              ))}
            </div>

            {/* Tip section */}
            <div className="w-full max-w-lg">
              <button
                onClick={() => setShowTip(!showTip)}
                className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors w-full"
              >
                <span className="text-lg">⚙️</span>
                <span className="font-medium text-[var(--green-deep)]">Совет</span>
                <ChevronDown size={14} className={cn("transition-transform", showTip && "rotate-180")} />
              </button>
              {showTip && (
                <div className="mt-2 text-sm text-[var(--foreground-muted)] pl-7">
                  {getRandomTip(currentChar.hanzi)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════
     DASHBOARD (idle phase)
     ═══════════════════════════════════════════════════════════════════════ */

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Page title + daily goal — reference style */}
      <h1 className="text-3xl font-display font-semibold mb-2 text-[var(--ink)]">Повторение</h1>
      <p className="text-sm text-[var(--foreground-muted)] mb-1">Сегодняшняя цель</p>
      <div className="flex items-end gap-3 mb-2">
        <span className="text-4xl font-bold text-[var(--green)] leading-none tabular-nums">
          {todayReviewed}
        </span>
        <span className="text-base text-[var(--foreground-muted)] pb-0.5">/ 30 мин</span>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-2.5 rounded-full bg-[var(--surface-3)] overflow-hidden max-w-lg">
          <div
            className="h-full rounded-full bg-[var(--green)] transition-[width] duration-500"
            style={{ width: `${Math.min(100, (todayReviewed / 30) * 100)}%` }}
          />
        </div>
        {streak > 0 && (
          <div className="streak-pill">
            <span>🔥</span>
            <span>{streak} {pluralDays(streak)} подряд</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* ─── Main content ─────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Session cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Due today */}
            <button
              onClick={() => startSession("all")}
              disabled={dueCnt === 0}
              className="card p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--green-soft)] flex items-center justify-center">
                <BookOpen size={22} className="text-[var(--green)]" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--green)]">{dueCnt}</div>
                <div className="text-sm text-[var(--foreground-muted)]">к повторению</div>
              </div>
              {dueCnt > 0 && (
                <span className="btn btn-success text-xs py-1.5 px-4">Начать</span>
              )}
            </button>

            {/* Weak characters */}
            <button
              onClick={() => startSession("weak")}
              disabled={weakCnt === 0}
              className="card p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Zap size={22} className="text-amber-500" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">{weakCnt}</div>
                <div className="text-sm text-[var(--foreground-muted)]">слабых</div>
              </div>
              {weakCnt > 0 && (
                <span className="btn btn-secondary text-xs py-1.5 px-4">Тренировать</span>
              )}
            </button>

            {/* Writing practice */}
            <button
              onClick={() => startSession("writing")}
              disabled={dueCnt === 0}
              className="card p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <PenTool size={22} className="text-blue-500" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{Math.min(dueCnt, 18)}</div>
                <div className="text-sm text-[var(--foreground-muted)]">письмо</div>
              </div>
              {dueCnt > 0 && (
                <span className="btn btn-secondary text-xs py-1.5 px-4">Писать</span>
              )}
            </button>
          </div>

          {/* Due characters preview grid */}
          {dueCnt > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-medium">Готово к повторению</h2>
                <span className="text-sm text-[var(--foreground-muted)]">{dueCnt} иероглифов</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {dueChars(chars).slice(0, 24).map((cp) => {
                  const c = getChar(cp.hanzi);
                  if (!c) return null;
                  return (
                    <div
                      key={cp.hanzi}
                      className="card-soft p-2 flex flex-col items-center gap-1 hover:shadow-sm transition-shadow"
                    >
                      <span className="hanzi text-2xl">{c.hanzi}</span>
                      <span className="text-[10px] text-[var(--foreground-muted)] truncate w-full text-center">
                        {meaningShort(c)}
                      </span>
                    </div>
                  );
                })}
              </div>
              {dueCnt > 24 && (
                <p className="text-center text-xs text-[var(--foreground-muted)] mt-3">
                  и ещё {dueCnt - 24}...
                </p>
              )}
            </Card>
          )}

          {dueCnt === 0 && (
            <Card className="p-8 text-center">
              <Panda mood="success" size={100} className="mx-auto mb-4" />
              <h2 className="text-xl font-display font-medium mb-2">Все повторения выполнены!</h2>
              <p className="text-[var(--foreground-muted)]">Возвращайтесь позже или изучите новый урок.</p>
              <Link href="/learn" className="btn btn-primary mt-4 inline-flex">Продолжить обучение</Link>
            </Card>
          )}
        </div>

        {/* ─── Right sidebar ────────────────────────────────────────── */}
        <div className="space-y-5">
          {/* Today stats */}
          <Card className="p-5">
            <h3 className="font-medium mb-4">Сегодня</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--green)]">{todayReviewed}</div>
                <div className="text-[11px] text-[var(--foreground-muted)]">к изучению</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--red)]">{weakCnt}</div>
                <div className="text-[11px] text-[var(--foreground-muted)]">слабых</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-[var(--foreground-muted)]" />
              <span className="text-sm text-[var(--foreground-muted)]">{Math.max(1, Math.round(todayReviewed * 0.7))} мин потрачено</span>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-12 mt-3">
              {todayBars.map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[var(--green)] transition-all"
                  style={{ height: `${bar.height}%` }}
                  title={`${bar.date}: ${bar.reviewed}`}
                />
              ))}
            </div>
          </Card>

          {/* Weak characters */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Слабые иероглифы</h3>
              {weakCnt > 0 && (
                <button onClick={() => startSession("weak")} className="text-xs text-[var(--green)] font-medium hover:underline">
                  Смотреть все
                </button>
              )}
            </div>
            <WeakCharsList chars={chars} />
          </Card>

          {/* Heatmap */}
          <Card className="p-5">
            <h3 className="font-medium mb-3">Календарь повторений</h3>
            <ReviewHeatmap daily={daily} />
          </Card>

          {/* Motivational card */}
          <div className="rounded-[var(--radius-lg)] overflow-hidden relative bg-gradient-to-br from-[var(--green-soft)] to-[var(--bamboo-soft)] p-5">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--green-deep)] mb-1">Отличная работа!</h3>
                <p className="text-xs text-[var(--green-deep)] opacity-80">Постоянство — ключ к успеху.</p>
              </div>
              <Panda mood="practicing" size={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
