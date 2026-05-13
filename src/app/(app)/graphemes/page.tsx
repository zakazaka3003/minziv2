"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ALL_CHARACTERS, getChar, meaningRu, type CharRecord } from "@/lib/characters";
import { Card } from "@/components/ui/Card";
import { RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface CharMatch {
  character: string;
  score: number;
}

export default function GraphemesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<number[][][]>([]);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef<number[][]>([]);
  const [matches, setMatches] = useState<CharMatch[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharRecord | null>(null);
  const [relatedChars, setRelatedChars] = useState<CharRecord[]>([]);
  const [ready, setReady] = useState(false);
  const [textQuery, setTextQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matcherRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hlRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const hl = await import("hanzilookup-js");
        hlRef.current = hl;
        hl.init("mmah", "/mmah.json", (success: boolean) => {
          if (cancelled) return;
          if (success) {
            matcherRef.current = new hl.Matcher("mmah");
            setReady(true);
          }
        });
      } catch (e) {
        console.error("Failed to load hanzilookup", e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const lookup = useCallback(() => {
    if (!matcherRef.current || !hlRef.current || strokesRef.current.length === 0) return;
    try {
      const analyzed = new hlRef.current.AnalyzedCharacter(strokesRef.current);
      matcherRef.current.match(analyzed, 12, (results: CharMatch[]) => {
        setMatches(results);
      });
    } catch {
      // ignore
    }
  }, []);

  const selectChar = useCallback((hanzi: string) => {
    const c = getChar(hanzi);
    if (!c) return;
    setSelectedChar(c);
    const related = ALL_CHARACTERS.filter(
      (ch) => ch.components?.includes(hanzi) || ch.radical === hanzi
    ).slice(0, 20);
    setRelatedChars(related);
  }, []);

  const searchByText = useCallback((q: string) => {
    setTextQuery(q);
    if (!q.trim()) {
      setSelectedChar(null);
      setRelatedChars([]);
      return;
    }
    const ch = getChar(q.trim());
    if (ch) {
      selectChar(q.trim());
      return;
    }
    const found = ALL_CHARACTERS.filter(
      (c) =>
        c.hanzi.includes(q) ||
        c.radical === q ||
        c.components?.includes(q)
    ).slice(0, 20);
    if (found.length > 0) {
      selectChar(found[0].hanzi);
    }
  }, [selectChar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = () => canvas.getBoundingClientRect();
    const scale = () => canvas.width / rect().width;

    const getPos = (e: MouseEvent | Touch): [number, number] => {
      const r = rect();
      const s = scale();
      return [(e.clientX - r.left) * s, (e.clientY - r.top) * s];
    };

    const onDown = (e: MouseEvent) => {
      drawingRef.current = true;
      const [x, y] = getPos(e);
      currentStrokeRef.current = [[x, y]];
    };

    const onMove = (e: MouseEvent) => {
      if (!drawingRef.current) return;
      const [x, y] = getPos(e);
      currentStrokeRef.current.push([x, y]);
      ctx.strokeStyle = "#2a2c28";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const pts = currentStrokeRef.current;
      if (pts.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(pts[pts.length - 2][0], pts[pts.length - 2][1]);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const onUp = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      if (currentStrokeRef.current.length > 1) {
        strokesRef.current.push([...currentStrokeRef.current]);
        lookup();
      }
      currentStrokeRef.current = [];
    };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const [x, y] = getPos(touch);
      drawingRef.current = true;
      currentStrokeRef.current = [[x, y]];
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!drawingRef.current) return;
      const touch = e.touches[0];
      const [x, y] = getPos(touch);
      currentStrokeRef.current.push([x, y]);
      ctx.strokeStyle = "#2a2c28";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const pts = currentStrokeRef.current;
      if (pts.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(pts[pts.length - 2][0], pts[pts.length - 2][1]);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      onUp();
    };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [lookup]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokesRef.current = [];
    setMatches([]);
    setSelectedChar(null);
    setRelatedChars([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-display font-medium">Поиск графем</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-1">
          Нарисуйте иероглиф или графему, чтобы найти её значение и связанные иероглифы
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drawing area */}
        <div>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Рисуйте здесь
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:shadow-sm transition-shadow"
                aria-label="Очистить"
              >
                <RotateCcw size={14} />
              </button>
            </div>
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="w-full aspect-square rounded-[14px] border border-[var(--border)] bg-white cursor-crosshair cali-grid"
            />
            {!ready && (
              <div className="text-xs text-[var(--foreground-muted)] mt-2 text-center">
                Загрузка данных для распознавания...
              </div>
            )}
          </Card>

          {/* Text search */}
          <div className="mt-4 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]" />
            <input
              type="text"
              value={textQuery}
              onChange={(e) => searchByText(e.target.value)}
              placeholder="Или введите иероглиф / графему..."
              className="w-full pl-9 pr-4 py-2.5 rounded-[12px] border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green)]/30 focus:border-[var(--green)]"
            />
          </div>

          {/* Matches from handwriting */}
          {matches.length > 0 && (
            <div className="mt-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-soft)] mb-2">
                Результаты
              </div>
              <div className="flex flex-wrap gap-2">
                {matches.map((m) => (
                  <button
                    key={m.character}
                    type="button"
                    onClick={() => selectChar(m.character)}
                    className={cn(
                      "hanzi text-3xl w-12 h-12 flex items-center justify-center rounded-[10px] border transition-all",
                      selectedChar?.hanzi === m.character
                        ? "border-[var(--green)] bg-[var(--green-soft)] shadow-sm"
                        : "border-[var(--border)] bg-white hover:shadow-sm"
                    )}
                  >
                    {m.character}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Character info */}
        <div>
          {selectedChar ? (
            <Card className="p-6 float-up">
              <div className="flex items-center gap-4 mb-4">
                <span className="hanzi text-7xl leading-none">{selectedChar.hanzi}</span>
                <div>
                  <div className="pinyin text-xl text-[var(--foreground-muted)]">
                    {selectedChar.pinyin || "—"}
                  </div>
                  <div className="text-lg font-medium mt-1">
                    {meaningRu(selectedChar) || selectedChar.meaningPrimary || "—"}
                  </div>
                  {selectedChar.radical && (
                    <div className="text-xs text-[var(--foreground-muted)] mt-1">
                      Ключ: {selectedChar.radical}
                    </div>
                  )}
                </div>
              </div>

              {selectedChar.components && selectedChar.components.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-soft)] mb-2">
                    Составные графемы
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedChar.components.map((comp, i) => {
                      const compChar = getChar(comp);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => selectChar(comp)}
                          className="card-soft px-3 py-2 flex items-center gap-2 hover:shadow-sm transition-shadow"
                        >
                          <span className="hanzi text-2xl">{comp}</span>
                          {compChar && (
                            <span className="text-xs text-[var(--foreground-muted)]">
                              {meaningRu(compChar) || compChar.meaningPrimary}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedChar.etymology && (
                <div className="text-sm text-[var(--foreground-muted)] mb-4 italic">
                  {selectedChar.etymology}
                </div>
              )}

              {relatedChars.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-soft)] mb-2">
                    Иероглифы с этой графемой
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {relatedChars.map((c) => (
                      <button
                        key={c.hanzi}
                        type="button"
                        onClick={() => selectChar(c.hanzi)}
                        className="card-soft px-2 py-3 flex flex-col items-center gap-1 hover:shadow-sm transition-shadow"
                      >
                        <span className="hanzi text-2xl">{c.hanzi}</span>
                        <span className="pinyin text-[10px] text-[var(--foreground-muted)]">
                          {c.pinyin}
                        </span>
                        <span className="text-[10px] text-[var(--foreground-muted)] truncate max-w-full">
                          {meaningRu(c) || "—"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <Search size={32} className="text-[var(--foreground-soft)] mb-3" />
              <div className="text-[var(--foreground-muted)]">
                Нарисуйте графему слева или введите её в поле поиска
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
